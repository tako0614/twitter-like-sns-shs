/**
 * 投稿関連のカスタムHook
 * 投稿の取得・作成ロジックをコンポーネントから分離
 */

import { useState, useCallback } from 'react';
import { api, ApiError } from '../api/client';
import { useAppContext } from '../contexts/AppContext';

const INITIAL_POSTS_LIMIT = 400;
const REFRESH_LIMIT = 15;

/**
 * 投稿一覧の取得と更新を管理するHook
 */
export const usePosts = () => {
  const { posts, setPosts } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** 投稿一覧を取得 */
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getPosts({ limit: INITIAL_POSTS_LIMIT });
      setPosts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : '投稿の取得に失敗しました';
      setError(message);
      console.error('投稿の取得に失敗しました:', err);
    } finally {
      setIsLoading(false);
    }
  }, [setPosts]);

  /** 投稿一覧を更新（新規投稿後など） */
  const refreshPosts = useCallback(async () => {
    try {
      const data = await api.getPosts({ limit: REFRESH_LIMIT });
      setPosts(data);
    } catch (err) {
      console.error('投稿の更新に失敗しました:', err);
    }
  }, [setPosts]);

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    refreshPosts,
  };
};

/**
 * 新規投稿作成を管理するHook
 */
export const useCreatePost = () => {
  const { userName } = useAppContext();
  const { refreshPosts } = usePosts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** 新規ツイートを投稿 */
  const createTweet = useCallback(async (content: string): Promise<boolean> => {
    if (!content.trim()) {
      alert('何か入力してください');
      return false;
    }
    if (!userName) {
      alert('ユーザーネームを設定してください。');
      return false;
    }

    setIsSubmitting(true);
    try {
      await api.createPost({
        text: content,
        type: 'tweet',
        userName,
      });
      await refreshPosts();
      alert('ツイートしました');
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        alert(`投稿に失敗しました: ${err.message}`);
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [userName, refreshPosts]);

  return {
    isSubmitting,
    createTweet,
  };
};
