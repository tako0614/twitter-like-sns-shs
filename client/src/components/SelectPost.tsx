/**
 * 選択された投稿の詳細表示コンポーネント
 * コメントページで親投稿として表示
 * 責務: 選択された投稿の詳細表示
 */

import CommentButton from './CommentButton';
import { useAppContext } from '../contexts/AppContext';
import { useLike } from '../hooks';
import type { PostInfo } from '../types';

interface SelectPostProps {
  postInfo: PostInfo | null;
}

/**
 * 選択投稿詳細
 */
const SelectPost = ({ postInfo }: SelectPostProps) => {
  const { navigateToHome, commentPost, setCommentPost } = useAppContext();
  const { isLiked, likedCount, handleLike } = useLike(
    postInfo?.like ?? 0,
    postInfo?.id ?? ''
  );

  if (!postInfo) return null;

  return (
    <div className="bg-gray-700 p-4 rounded-md mb-4">
      {/* 戻るボタン */}
      <div className="flex w-full pb-2">
        <button
          className="text-white text-xl font-semibold hover:text-gray-300 transition-colors"
          onClick={navigateToHome}
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

export default SelectPost;
