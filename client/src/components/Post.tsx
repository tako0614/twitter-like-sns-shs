/**
 * 投稿カードコンポーネント
 * タイムラインや検索結果で表示される個々の投稿
 */

import { useState } from 'react';
import CommentButton from './CommentButton';
import { api, ApiError } from '../api/client';
import type { PostInfo, PageType } from '../types';

interface PostProps {
  /** 投稿情報 */
  postInfo: PostInfo;
  /** ページ遷移関数 */
  setPage: (page: PageType) => void;
  /** コメント一覧を設定する関数 */
  setCommentPost: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  /** 選択中の投稿を設定する関数 */
  setSelectPost: React.Dispatch<React.SetStateAction<PostInfo | null>>;
}

/**
 * 投稿カード
 * いいね機能とコメント表示機能を持つ
 */
const Post = ({
  postInfo,
  setPage,
  setCommentPost,
  setSelectPost,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(postInfo.like);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * コメントページへ遷移
   */
  const handleNavigateToComments = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const comments = await api.getComments({ id: postInfo.id });
      setCommentPost(comments);
      setPage('comment');
      setSelectPost(postInfo);
    } catch (error) {
      if (error instanceof ApiError) {
        alert(`コメントの取得に失敗しました: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * いいね処理
   */
  const handleLike = async () => {
    if (isLiked) return;

    try {
      await api.likePost({ id: postInfo.id });
      setIsLiked(true);
      setLikedCount((prev) => prev + 1);
    } catch (error) {
      console.error('いいねに失敗しました:', error);
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
        {/* コメントボタン */}
        <CommentButton
          comment={postInfo.comment}
          userName={postInfo.username}
          id={postInfo.id}
          isComment={false}
        />

        {/* いいねボタン */}
        <button
          className={`flex items-center space-x-2 transition-colors ${
            isLiked
              ? 'text-red-500'
              : 'text-gray-400 hover:text-red-500'
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
