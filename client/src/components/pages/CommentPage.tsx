/**
 * コメントページコンポーネント
 * 選択された投稿とそのコメント一覧を表示
 */

import { useState } from 'react';
import SelectPost from '../SelectPost';
import Post from '../Post';
import { api, ApiError } from '../../api/client';
import type { PostInfo, PageType } from '../../types';

interface CommentPageProps {
  /** 選択された投稿 */
  selectPost: PostInfo | null;
  /** 選択投稿を設定する関数 */
  setSelectPost: React.Dispatch<React.SetStateAction<PostInfo | null>>;
  /** コメント一覧 */
  commentPost: PostInfo[];
  /** コメント一覧を設定する関数 */
  setCommentPost: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  /** ユーザー名 */
  userName: string;
  /** ページ遷移関数 */
  setPage: (page: PageType) => void;
}

/**
 * コメントページ
 * 親投稿、コメント入力フォーム、コメント一覧を表示
 */
const CommentPage = ({
  selectPost,
  setSelectPost,
  commentPost,
  setCommentPost,
  userName,
  setPage,
}: CommentPageProps) => {
  const [newCommentContent, setNewCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * コメント投稿処理
   */
  const handleSubmitComment = async () => {
    // バリデーション
    if (!userName) {
      alert('ユーザーネームを設定してください。');
      return;
    }
    if (!newCommentContent.trim()) {
      alert('何か入力してください');
      return;
    }
    if (!selectPost) return;

    setIsSubmitting(true);
    try {
      // コメントを投稿
      await api.createPost({
        text: newCommentContent,
        type: 'comment',
        userName,
        commentedTweet: selectPost.id,
      });

      alert('返信しました');
      setNewCommentContent('');

      // コメント一覧を更新
      const comments = await api.getComments({ id: selectPost.id });
      setCommentPost(comments);
    } catch (error) {
      if (error instanceof ApiError) {
        alert(`返信に失敗しました: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow h-screen bg-gray-800 text-white p-4 overflow-hidden">
      <div className="h-full overflow-y-auto hidden-scrollbar">
        {/* 親投稿 */}
        <SelectPost
          postInfo={selectPost}
          setSelectPost={setSelectPost}
          setCommentPost={setCommentPost}
          setPage={setPage}
          commentPost={commentPost}
        />

        {/* コメント入力フォーム */}
        <div className="mb-4 bg-gray-700 p-4 rounded-md">
          <textarea
            className="w-full bg-gray-800 p-2 rounded-md text-white resize-none"
            placeholder="返信する"
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            disabled={isSubmitting}
            rows={3}
          />
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                       disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            onClick={handleSubmitComment}
            disabled={isSubmitting || !newCommentContent.trim()}
          >
            {isSubmitting ? '送信中...' : '返信'}
          </button>
        </div>

        {/* コメント一覧 */}
        <div className="space-y-4">
          {commentPost.length === 0 ? (
            <p className="text-gray-400 text-center py-4">
              コメントがありません
            </p>
          ) : (
            commentPost.map((post) => (
              <Post
                key={post.id}
                postInfo={post}
                setPage={setPage}
                setCommentPost={setCommentPost}
                setSelectPost={setSelectPost}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
