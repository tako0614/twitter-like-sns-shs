/**
 * タイムライン生成ユーティリティ
 * 投稿のスコアリングとソートを行う
 */

/** 投稿データの型 */
interface PostDocument {
  _doc: {
    _id: string;
    userName: string;
    text: string;
    timestamp: Date;
    likes: number;
    comments: string[];
  };
}

/** スコア付き投稿の型 */
interface ScoredPost extends PostDocument {
  score: number;
}

/** タイムライン用の整形済み投稿 */
interface FormattedPost {
  id: string;
  username: string;
  time: Date;
  content: string;
  score: number;
  like: number;
  comment: number;
}

/**
 * 投稿のスコアを計算
 * エンゲージメント（いいね・コメント）と新鮮さを考慮
 *
 * @param post - 評価対象の投稿
 * @returns 計算されたスコア値
 */
export function calculateScore(
  post: {
    likes: number;
    comments: Array<string>;
    timestamp: string | number | Date;
  },
): number {
  // エンゲージメントスコア: いいね×1 + コメント×3
  const engagementScore = post.likes * 1 + post.comments.length * 3;

  // 新鮮さスコア: 時間経過で減衰
  const timeNow = new Date().getTime();
  const postTime = new Date(post.timestamp).getTime();
  const timeDifferenceMinutes = (timeNow - postTime) / (1000 * 60);
  const freshnessScore = 1 / (1 + timeDifferenceMinutes / 60); // 1時間ごとに減衰

  // 総合スコア: エンゲージメント70% + 新鮮さ30%
  return engagementScore * 0.7 + freshnessScore * 0.3;
}

/**
 * 投稿にランダム性を追加
 * 同スコアの投稿が常に同じ順序にならないようにする
 *
 * @param posts - スコア付き投稿の配列
 * @param factor - ランダム性の強さ（デフォルト: 0.1）
 * @returns ランダム化されたスコアを持つ投稿の配列
 */
function addRandomness(posts: ScoredPost[], factor = 0.1): ScoredPost[] {
  return posts.map((post) => ({
    ...post,
    score: post.score + Math.random() * factor,
  }));
}

/**
 * タイムラインを生成
 * 投稿をスコアリングし、降順でソートして返す
 *
 * @param posts - 投稿ドキュメントの配列
 * @param limit - 返却する最大件数（省略時は全件）
 * @returns 整形済みの投稿配列
 */
export function generateTimeline(
  posts: PostDocument[],
  limit?: number,
): FormattedPost[] {
  // スコアを計算
  const scoredPosts: ScoredPost[] = posts.map((post) => ({
    ...post,
    score: calculateScore({
      likes: post._doc.likes,
      comments: post._doc.comments,
      timestamp: post._doc.timestamp,
    }),
  }));

  // ランダム化要素を追加
  const randomizedPosts = addRandomness(scoredPosts);

  // タイムライン用のフォーマットに変換
  const formatted: FormattedPost[] = randomizedPosts.map((post) => ({
    id: post._doc._id,
    username: post._doc.userName,
    time: post._doc.timestamp,
    content: post._doc.text,
    score: post.score,
    like: post._doc.likes,
    comment: post._doc.comments.length,
  }));

  // スコアで降順ソート
  const sortedPosts = formatted.sort((a, b) => b.score - a.score);

  // 件数制限がある場合は切り詰め
  if (limit) {
    return sortedPosts.slice(0, limit);
  }
  return sortedPosts;
}
