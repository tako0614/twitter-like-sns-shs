/**
 * 投稿カードコンポーネント
 * タイムラインや検索結果で表示される個々の投稿
 * 責務: 投稿の表示とユーザーインタラクション
 */

import { useState } from 'react';
import CommentButton from './CommentButton';
import { useAppContext } from '../contexts/AppContext';
import { useLike } from '../hooks';
import { api, ApiError } from '../api/client';
import type { PostInfo } from '../types';

interface PostProps {
  postInfo: PostInfo;
}

/**
 * 投稿カード
 */
const Post = ({ postInfo }: PostProps) => {
  const { navigateToComment, setCommentPost, setSelectPost } = useAppContext();
  const { isLiked, likedCount, handleLike } = useLike(postInfo.like, postInfo.id);
  const [isLoading, setIsLoading] = useState(false);

  /** コメントページへ遷移 */
  const handleNavigateToComments = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const comments = await api.getComments({ id: postInfo.id });
      setCommentPost(comments);
      setSelectPost(postInfo);
      navigateToComment(postInfo, comments);
    } catch (error) {
      if (error instanceof ApiError) {
        alert(`コメントの取得に失敗しました: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded-md mb-4 hover:bg-gray-600 transition-colors">
      {/* 投稿本文（クリックでコメントページへ） */}
      <div
        onClick={handleNavigateToComments}
        className="py-2 cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleNavigateToComments()}
      >
        {/* ユーザー情報と投稿日時 */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {postInfo.username} {postInfo.time}
          </span>
        </div>
        {/* 投稿内容 */}
        <p className="mt-2 whitespace-pre-wrap">{postInfo.content}</p>
      </div>

      {/* アクションボタン */}
      <div className="flex items-center justify-start space-x-4 mt-4">
        <CommentButton
          comment={postInfo.comment}
          userName={postInfo.username}
          id={postInfo.id}
          isComment={false}
        />

        {/* いいねボタン */}
        <button
          className={`flex items-center space-x-2 transition-colors ${
            isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
          onClick={handleLike}
          disabled={isLiked}
          aria-label={`いいね ${likedCount}件`}
        >
          <span>{isLiked ? '❤️' : '🤍'}</span>
          <span>{likedCount}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
