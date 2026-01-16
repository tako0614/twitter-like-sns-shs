/**
 * 選択された投稿の詳細表示コンポーネント
 * コメントページで親投稿として表示
 */

import { useState, useEffect } from 'react';
import CommentButton from './CommentButton';
import { api } from '../api/client';
import type { PostInfo, PageType } from '../types';

interface SelectPostProps {
  /** 選択された投稿情報 */
  postInfo: PostInfo | null;
  /** 選択投稿を設定する関数 */
  setSelectPost: React.Dispatch<React.SetStateAction<PostInfo | null>>;
  /** コメント一覧を設定する関数 */
  setCommentPost: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  /** ページ遷移関数 */
  setPage: (page: PageType) => void;
  /** コメント一覧 */
  commentPost: PostInfo[];
}

/**
 * 選択投稿詳細
 * 戻るボタン、いいね機能、コメント機能を持つ
 */
const SelectPost = ({
  postInfo,
  setSelectPost,
  setCommentPost,
  setPage,
  commentPost,
}: SelectPostProps) => {
  // hooksは条件分岐の前に配置（React Hooksのルール）
  const [isLiked, setIsLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(0);

  // postInfoが変更されたときにいいね数を更新
  useEffect(() => {
    if (postInfo) {
      setLikedCount(postInfo.like);
      setIsLiked(false);
    }
  }, [postInfo]);

  // postInfoがない場合は何も表示しない
  if (!postInfo) return null;

  /**
   * ホームページに戻る
   */
  const handleBack = () => {
    setPage('home');
    setCommentPost([]);
    setSelectPost(null);
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
    <div className="bg-gray-700 p-4 rounded-md mb-4">
      {/* 戻るボタン */}
      <div className="flex w-full pb-2">
        <button
          className="text-white text-xl font-semibold hover:text-gray-300 transition-colors"
          onClick={handleBack}
          aria-label="ホームに戻る"
        >
          ← 戻る
        </button>
      </div>

      {/* ユーザー情報と投稿日時 */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          {postInfo.username} {postInfo.time}
        </span>
      </div>

      {/* 投稿内容 */}
      <p className="mt-2 whitespace-pre-wrap">{postInfo.content}</p>

      {/* アクションボタン */}
      <div className="flex items-center justify-start space-x-4 mt-4">
        {/* コメントボタン */}
        <CommentButton
          comment={postInfo.comment}
          userName={postInfo.username}
          id={postInfo.id}
          isComment={true}
          setCommentPost={setCommentPost}
          commentPost={commentPost}
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

export default SelectPost;
