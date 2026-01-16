/**
 * APIクライアント
 * 全てのAPI呼び出しを一元管理し、エラーハンドリングを統一
 */

import type {
  PostInfo,
  Trend,
  ApiResponse,
  CreatePostRequest,
  GetPostsRequest,
  SearchRequest,
  GetCommentsRequest,
  LikeRequest,
} from '../types';

/** APIのベースURL */
const API_BASE_URL = 'https://shimizudanitter.takos.jp';

/**
 * APIエラークラス
 * API呼び出し時のエラーを表現
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 共通のfetch処理
 * エラーハンドリングとJSON解析を統一
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      throw new ApiError(
        `API error: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'ネットワークエラーが発生しました'
    );
  }
}

/**
 * 投稿一覧を取得
 * @param request 取得条件（件数制限など）
 * @returns 投稿一覧
 */
export async function getPosts(
  request: GetPostsRequest
): Promise<PostInfo[]> {
  const response = await fetchApi<ApiResponse<PostInfo[]>>('/api/tweet/get', {
    body: JSON.stringify(request),
  });
  return response.data;
}

/**
 * 新規投稿を作成
 * @param request 投稿内容
 */
export async function createPost(
  request: CreatePostRequest
): Promise<void> {
  // サーバー側のフィールド名に合わせてリクエストボディを構築
  // 注意: サーバー側で "comentedTweet" (タイポ) が使われている
  const body: Record<string, unknown> = {
    text: request.text,
    type: request.type,
    userName: request.userName,
  };

  if (request.commentedTweet) {
    body.comentedTweet = request.commentedTweet; // サーバー側のフィールド名に合わせる
  }

  await fetchApi('/api/tweet/post', {
    body: JSON.stringify(body),
  });
}

/**
 * 投稿を検索
 * @param request 検索条件
 * @returns 検索結果の投稿一覧
 */
export async function searchPosts(
  request: SearchRequest
): Promise<PostInfo[]> {
  const response = await fetchApi<ApiResponse<PostInfo[]>>('/api/tweet/search', {
    body: JSON.stringify(request),
  });
  return response.data;
}

/**
 * コメント一覧を取得
 * @param request 対象投稿のID
 * @returns コメント一覧
 */
export async function getComments(
  request: GetCommentsRequest
): Promise<PostInfo[]> {
  const response = await fetchApi<ApiResponse<PostInfo[]>>('/api/tweet/getComments', {
    body: JSON.stringify(request),
  });
  return response.data;
}

/**
 * 投稿にいいねする
 * @param request 対象投稿のID
 */
export async function likePost(
  request: LikeRequest
): Promise<void> {
  await fetchApi('/api/tweet/like', {
    body: JSON.stringify(request),
  });
}

/**
 * トレンド一覧を取得
 * @returns トレンドキーワード一覧
 */
export async function getTrends(): Promise<Trend[]> {
  const response = await fetchApi<ApiResponse<Trend[]>>('/api/trends', {});
  return response.data;
}

/** APIクライアントをまとめてエクスポート */
export const api = {
  getPosts,
  createPost,
  searchPosts,
  getComments,
  likePost,
  getTrends,
};
