/**
 * アプリケーション全体で使用する型定義
 */

/** ページの種類 */
export type PageType = 'home' | 'search' | 'comment';

/** 検索ページ内のサブページ */
export type SearchPageType = 'trend' | 'search';

/** 投稿の種類 */
export type PostType = 'tweet' | 'comment';

/**
 * 投稿データの型
 * APIから返却される投稿情報を表現
 */
export interface PostInfo {
  id: string;
  username: string;
  time: string;
  content: string;
  like: number;
  comment: number;
}

/**
 * トレンドデータの型
 * トレンドAPIから返却されるキーワード情報
 */
export interface Trend {
  keyword: string;
  score: number;
}

/**
 * API共通レスポンス型
 */
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

/**
 * 投稿作成リクエストの型
 */
export interface CreatePostRequest {
  text: string;
  type: PostType;
  userName: string;
  commentedTweet?: string;
}

/**
 * 投稿取得リクエストの型
 */
export interface GetPostsRequest {
  limit: number;
  skip?: string[];
}

/**
 * 検索リクエストの型
 */
export interface SearchRequest {
  query: string;
  limit: number;
}

/**
 * コメント取得リクエストの型
 */
export interface GetCommentsRequest {
  id: string;
}

/**
 * いいねリクエストの型
 */
export interface LikeRequest {
  id: string;
}
