export function calculateScore(
  post: {
    likes: number;
    comments: Array<string>;
    timestamp: string | number | Date;
  },
) {
  // エンゲージメントスコアの計算
  const engagementScore = post.likes * 1 + post.comments.length * 3;

  // 新鮮さスコアの計算（時間差を分単位で計算）
  const timeNow = new Date().getTime();
  const postTime = new Date(post.timestamp).getTime();
  const timeDifferenceMinutes = (timeNow - postTime) / (1000 * 60); // 分単位の差
  const freshnessScore = 1 / (1 + timeDifferenceMinutes / 60); // 1時間ごとに減衰

  // 総合スコアの計算（エンゲージメントと新鮮さの重み付けを固定）
  return engagementScore * 0.7 + freshnessScore * 0.3;
}

// ランダム化要素の導入
function addRandomness(posts: any[], factor = 0.1) {
  return posts.map((post) => ({
    ...post,
    score: post.score + Math.random() * factor,
  }));
}

// タイムラインの生成
export function generateTimeline(posts: any[], limit?: number) {
  // スコアを計算
  const scoredPosts = posts.map((post) => ({
    ...post,
    score: calculateScore(post),
  }));
  // ランダム化要素を追加
  const randomizedPosts = addRandomness(scoredPosts);
  const fmt = randomizedPosts.map((post) => ({
    username: post._doc.userName,
    time: post._doc.timestamp,
    content: post._doc.text,
    score: post.score,
    id: post._doc._id,
    like: post._doc.likes,
    comment: post._doc.comments.length,
  }));
  // スコアに基づいて投稿をソート（降順）
  const sortedPosts = fmt.sort((a, b) => b.score - a.score);

  if (limit) {
    return sortedPosts.slice(0, limit);
  }
  return sortedPosts;
}
