/**
 * いいね機能のカスタムHook
 * いいねロジックをコンポーネントから分離
 */

import { useState, useCallback, useEffect } from 'react';
import { api } from '../api/client';

/**
 * いいね機能を管理するHook
 */
export const useLike = (initialCount: number, postId: string) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(initialCount);

  // initialCountが変更されたらリセット
  useEffect(() => {
    setLikedCount(initialCount);
    setIsLiked(false);
  }, [initialCount, postId]);

  /** いいね処理 */
  const handleLike = useCallback(async () => {
    if (isLiked) return;

    try {
      await api.likePost({ id: postId });
      setIsLiked(true);
      setLikedCount((prev) => prev + 1);
    } catch (err) {
      console.error('いいねに失敗しました:', err);
    }
  }, [isLiked, postId]);

  return {
    isLiked,
    likedCount,
    handleLike,
  };
};
