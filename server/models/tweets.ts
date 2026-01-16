/**
 * ツイートモデル
 * 投稿とコメントのデータ構造を定義
 */

import mongoose from "mongoose";

/**
 * ツイートスキーマ
 * @field text - 投稿本文（最大280文字）
 * @field type - 投稿タイプ（"tweet" | "comment"）
 * @field comentedTweet - コメント先のツイートID（注意: タイポだが後方互換性のため維持）
 * @field userName - 投稿者名
 * @field comments - コメントIDの配列
 * @field likes - いいね数
 * @field timestamp - 投稿日時
 */
const tweetSchema = new mongoose.Schema({
  // 投稿本文
  text: {
    type: String,
    required: true,
    maxlength: 280,
  },
  // 投稿タイプ
  type: {
    type: String,
    required: true,
    enum: ["tweet", "comment"],
  },
  // コメント先のツイートID
  // TODO: フィールド名を "commentedTweet" に修正（要マイグレーション）
  comentedTweet: {
    type: mongoose.Schema.Types.ObjectId,
  },
  // 投稿者名
  userName: {
    type: String,
    required: true,
  },
  // コメントIDの配列
  comments: {
    type: [String],
  },
  // いいね数
  likes: {
    type: Number,
    default: 0,
  },
  // 投稿日時
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
