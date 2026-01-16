/**
 * コメント関連のカスタムHook
 * コメントの取得・作成ロジックをコンポーネントから分離
 */

import { useState, useCallback } from 'react';
import { api, ApiError } from '../api/client';
import { useAppContext } from '../contexts/AppContext';

/**
 * コメント機能を管理するHook
 */
export const useComments = () => {
  const { userName, selectPost, setCommentPost, navigateToComment } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** コメントを取得してコメントページへ遷移 */
  const fetchCommentsAndNavigate = useCallback(async (post: typeof selectPost) => {
    if (!post) return;

    try {
      const comments = await api.getComments({ id: post.id });
      navigateToComment(post, comments);
    } catch (err) {
      if (err instanceof ApiError) {
        alert(`コメントの取得に失敗しました: ${err.message}`);
      }
    }
  }, [navigateToComment]);

  /** コメントを投稿 */
  const createComment = useCallback(async (content: string): Promise<boolean> => {
    if (!userName) {
      alert('ユーザーネームを設定してください。');
      return false;
    }
    if (!content.trim()) {
      alert('何か入力してください');
      return false;
    }
    if (!selectPost) return false;

    setIsSubmitting(true);
    try {
      await api.createPost({
        text: content,
        type: 'comment',
        userName,
        commentedTweet: selectPost.id,
      });

      alert('返信しました');

      // コメント一覧を更新
      const comments = await api.getComments({ id: selectPost.id });
      setCommentPost(comments);
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        alert(`返信に失敗しました: ${err.message}`);
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [userName, selectPost, setCommentPost]);

  /** コメント一覧を再取得 */
  const refreshComments = useCallback(async () => {
    if (!selectPost) return;

    try {
      const comments = await api.getComments({ id: selectPost.id });
      setCommentPost(comments);
    } catch (err) {
      console.error('コメントの更新に失敗しました:', err);
    }
  }, [selectPost, setCommentPost]);

  return {
    isSubmitting,
    createComment,
    fetchCommentsAndNavigate,
    refreshComments,
  };
};
