import { Hono } from "hono";
import mongoose from "mongoose";
import Tweet from "./models/tweets.ts";
import { generateTimeline } from "./mod.ts";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import TinySegmenter from "tiny-segmenter";
const MONGO_URL = Deno.env.get("MONGO_URL") ||
  "mongodb://localhost:27017/Tweet";
mongoose.connect(MONGO_URL);

const app = new Hono();

app.use("*", prettyJSON());
app.use(
  "/*",
  cors(
    {
      origin: "*",
      allowMethods: ["POST", "GET", "OPTIONS"],
    },
  ),
);
const PASSWORD = "password";
app.post("/:password/api/tweet/get", async (c) => {
  const { password } = c.req.param();
  if (password !== PASSWORD) {
    return c.json({ error: "Invalid password" });
  }
  let data;
  try {
    data = await c.req.json();
    if (data.limit === undefined) {
      data.limit = 100;
    }
    if (data.skip === undefined) {
      data.skip = [];
    }
  } catch (e) {
    data = {
      limit: 100,
      skip: [],
    };
  }
  const tweets = await Tweet.find({ type: { $ne: "comment" }, _id: { $nin: data.skip } });
  const timeline = generateTimeline(tweets, data.limit);
  const result = {
    status: true,
    data: timeline,
  };
  return c.json(result);
});

app.post("/:password/api/tweet/post", async (c) => {
  const { password } = c.req.param();
  if (password !== PASSWORD) {
    return c.json({ error: "Invalid password" });
  }
  const data = await c.req.json();
  const { text, type, userName } = data;
  if (
    typeof text !== "string" || typeof type !== "string" ||
    typeof userName !== "string"
  ) {
    return c.json({ error: "Invalid data" });
  }
  //tweetの長さを140文字に制限
  if (text.length > 140) {
    return c.json({ error: "Tweet is too long" });
  }
  //ユーザー名が空白だったり20文字以上だったりするとエラーを返す
  if (userName.length === 0 || userName.length > 20) {
    return c.json({ error: "Invalid username" });
  }
  if (type === "comment") {
    const isTweetExist = await Tweet.findOne({ _id: data.comentedTweet });
    if (!isTweetExist) {
      return c.json({ error: "Tweet does not exist" });
    }
    const result = await Tweet.create({
      text,
      type,
      comentedTweet: data.comentedTweet,
      userName,
    });
    await Tweet.updateOne({ _id: data.comentedTweet }, {
      $push: { comments: result._id },
    });
    return c.json({ status: true } as { status: boolean });
  }
  if (type === "tweet") {
    await Tweet.create({
      text,
      type,
      userName,
    });
    return c.json({ status: true });
  }
});
app.post("/:password/api/tweet/like", async (c) => {
  const { password } = c.req.param();
  if (password !== PASSWORD) {
    return c.json({ error: "Invalid password" });
  }
  const data = await c.req.json();
  const { id } = data;
  const tweet = await Tweet.findOne({ _id: id });
  if (!tweet) {
    return c.json({ error: "Tweet does not exist" });
  }
  await Tweet.updateOne({ _id: id }, { $inc: { likes: 1 } });
  return c.json({ status: true });
});

app.post("/:password/api/tweet/getComments", async (c) => {
  const { password } = c.req.param();
  if (password !== PASSWORD) {
    return c.json({ error: "Invalid password" });
  }
  const data = await c.req.json();
  const { id } = data;
  const tweet = await Tweet.findOne({ _id: id });
  if (!tweet) {
    console.log(id);
    return c.json({ error: "Tweet does not exist", data: [] });
  }
  const comments = tweet.comments;
  const comenntsData = await Promise.all(comments.map(async (commentId) => {
    const comment = await Tweet.findOne({ _id: commentId });
    return comment;
  }));
  const result = generateTimeline(comenntsData);
  return c.json({ status: true, data: result });
});

//tweetの検索 limitを指定できるようにする
app.post("/:password/api/tweet/search", async (c) => {
  const { password } = c.req.param();
  if (password !== PASSWORD) {
    return c.json({ error: "Invalid password" });
  }
  const data = await c.req.json();
  const { query, limit } = data;
  if (typeof query !== "string") {
    return c.json({ error: "Invalid query" });
  }
  const tweets = await Tweet.find({ text: { $regex: query } }).limit(limit);
  const result = generateTimeline(tweets);
  return c.json({ status: true, data: result });
});

/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */
/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */
/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */
/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */
/*ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */
const stopwords = new Set([
  "は",
  "が",
  "に",
  "を",
  "の",
  "と",
  "で",
  "や",
  "など",
  "も",
  "へ",
  "から",
  "まで",
  "より",
  "か",
  "し",
  "な",
  "だ",
  "です",
  "ます",
  "ある",
  "いる",
  "する",
  "なる",
  "できる",
  "くる",
  "いく",
  "られる",
  "れる",
  "さ",
  "よう",
  "そう",
  "これ",
  "それ",
  "あれ",
  "この",
  "その",
]);

const segmenter = new TinySegmenter();

// 投稿データの型
interface Post {
  text: string;
  likes: number;
  comments: string[];
  timestamp: string | number | Date;
}

// キーワード抽出とストップワードの除去
function extractKeywords(text: string): string[] {
  const tokens = segmenter.segment(text);
  const words = tokens.filter((word: string | any[]) =>
    typeof word === 'string' && !stopwords.has(word) && word.length > 1
  );
  return words;
}

// キーワード頻度計算
async function calculateKeywordFrequency(
  posts: Post[],
): Promise<{ [key: string]: number }> {
  const keywordFrequency: { [key: string]: number } = {};

  for (const post of posts) {
    const keywords = extractKeywords(post.text);
    keywords.forEach((keyword) => {
      if (keywordFrequency[keyword]) {
        keywordFrequency[keyword]++;
      } else {
        keywordFrequency[keyword] = 1;
      }
    });
  }

  return keywordFrequency;
}

// トレンド計算
async function calculateTrends(
  posts: Post[],
  limit: number = 10,
): Promise<{ keyword: string; score: number }[]> {
  const keywordFrequency = await calculateKeywordFrequency(posts);

  // トレンドスコアを計算
  const trends = Object.entries(keywordFrequency).map((
    [keyword, frequency],
  ) => ({
    keyword,
    score: frequency,
  }));

  // スコアに基づいてソートし、制限数までのトレンドを返す
  return trends.sort((a, b) => b.score - a.score).slice(0, limit);
}

// トレンドAPIエンドポイント
app.post("/:password/api/trends", async (c) => {
  const { password } = c.req.param();
  if (password !== PASSWORD) {
    return c.json({ error: "Invalid password" });
  }
  let data: { limit?: number };
  try {
    data = await c.req.json();
  } catch {
    data = {};
  }

  // 最新の100件の投稿を取得
  const posts = await Tweet.find().sort({ timestamp: -1 }).limit(100).exec();

  // トレンドを計算
  const trends = await calculateTrends(posts, data.limit || 10);

  return c.json({ status: true, data: trends });
});

Deno.serve(app.fetch);
