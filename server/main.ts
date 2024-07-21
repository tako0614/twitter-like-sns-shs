import { Hono } from "hono";
import mongoose from "mongoose";
import Tweet from "./models/tweets.ts";
import { generateTimeline } from "./mod.ts";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";

const MONGO_URL = Deno.env.get("MONGO_URL") ||
  "mongodb://localhost:27017/Tweet";
mongoose.connect(MONGO_URL);

const app = new Hono();

app.use("*", prettyJSON());
app.use(
  "/api/*",
  cors(
    {
      origin: "*",
      allowMethods: ["POST", "GET", "OPTIONS"],
    },
  ),
);
app.post("/api/tweet/get", async (c) => {
  let data;
  try {
    data = await c.req.json();
    if (data.limit === undefined) {
      data.limit = 15;
    }
    if (data.skip === undefined) {
      data.skip = {};
    }
  } catch (e) {
    data = {
      limit: 15,
      skip: {},
    };
  }
  const tweets = await Tweet.find({ type: { $ne: "comment" } }).skip(data.skip);
  console.log(tweets.length);
  const timeline = generateTimeline(tweets, data.limit);
  const result = {
    status: true,
    data: timeline,
  };
  return c.json(result);
});

app.post("/api/tweet/post", async (c) => {
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
app.post("/api/tweet/like", async (c) => {
  const data = await c.req.json();
  const { id } = data;
  const tweet = await Tweet.findOne({ _id: id });
  if (!tweet) {
    return c.json({ error: "Tweet does not exist" });
  }
  await Tweet.updateOne({ _id: id }, { $inc: { likes: 1 } });
  return c.json({ status: true });
});

app.post("/api/tweet/getComments", async (c) => {
  const data = await c.req.json();
  const { id } = data;
  console.log(id);
  const tweet = await Tweet.findOne({ _id: id });
  if (!tweet) {
    return c.json({ error: "Tweet does not exist" });
  }
  const comments = tweet.comments;
  const comenntsData = await Promise.all(comments.map(async (commentId) => {
    const comment = await Tweet.findOne({ _id: commentId });
    return comment;
  }));
  const result = generateTimeline(comenntsData);
  return c.json({ status: true, data: result });
});
Deno.serve(app.fetch);



interface Post {
  text: string;
  likes: number;
  comments: string[];
  timestamp: string | number | Date;
}

// キーワード頻度計算
function calculateKeywordFrequency(posts: Post[]): { [key: string]: number } {
  const keywordFrequency: { [key: string]: number } = {};

  posts.forEach((post) => {
    const words = post.text.split(/\s+/);
    words.forEach((word) => {
      if (keywordFrequency[word]) {
        keywordFrequency[word]++;
      } else {
        keywordFrequency[word] = 1;
      }
    });
  });

  return keywordFrequency;
}

// トレンド計算
function calculateTrends(posts: Post[], limit: number = 10): { keyword: string, score: number }[] {
  const keywordFrequency = calculateKeywordFrequency(posts);

  // トレンドスコアを計算
  const trends = Object.entries(keywordFrequency).map(([keyword, frequency]) => ({
    keyword,
    score: frequency,
  }));

  // スコアに基づいてソートし、制限数までのトレンドを返す
  return trends.sort((a, b) => b.score - a.score).slice(0, limit);
}

// トレンドAPIエンドポイント
app.post("/api/trends", async (c) => {
  let data: { limit?: number };
  try {
    data = await c.req.json();
  } catch {
    data = {};
  }

  // 最新の100件の投稿を取得
  const posts = await Tweet.find().sort({ timestamp: -1 }).limit(100).exec();

  // トレンドを計算
  const trends = calculateTrends(posts, data.limit || 10);

  return c.json({ status: true, data: trends });
});