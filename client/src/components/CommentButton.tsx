/**
 * コメントボタンコンポーネント
 * 投稿に対するコメント数表示とコメント投稿モーダルを提供
 */

import { useState, useEffect } from 'react';
import { Modal } from './common/Modal';
import { PostForm } from './common/PostForm';
import { api } from '../api/client';
import type { PostInfo } from '../types';

interface CommentButtonProps {
  /** 現在のコメント数 */
  comment: number;
  /** ユーザー名 */
  userName: string;
  /** 対象投稿のID */
  id: string;
  /** コメントページからの呼び出しかどうか */
  isComment: boolean;
  /** コメント一覧を更新する関数（コメントページ用） */
  setCommentPost?: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  /** 現在のコメント一覧（コメントページ用） */
  commentPost?: PostInfo[];
  /** 子要素（未使用だが互換性のため保持） */
  children?: React.ReactNode;
}

/**
 * コメントボタン
 * クリックするとコメント投稿モーダルが開く
 */
function CommentButton({
  comment,
  userName,
  id,
  isComment,
  setCommentPost,
}: CommentButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [commentCount, setCommentCount] = useState(comment);

  // propsからのコメント数変更を反映
  useEffect(() => {
    setCommentCount(comment);
  }, [comment]);

  /**
   * コメント投稿処理
   */
  const handleSubmitComment = async (content: string) => {
    if (!userName) {
      alert('ユーザーネームを設定してください。');
      return;
    }

    await api.createPost({
      text: content,
      type: 'comment',
      userName,
      commentedTweet: id,
    });

    setCommentCount((prev) => prev + 1);
    alert('返信しました');
    setShowModal(false);

    // コメントページの場合、コメント一覧を更新
    if (isComment && setCommentPost) {
      const comments = await api.getComments({ id });
      setCommentPost(comments);
    }
  };

  return (
    <>
      {/* コメント数表示ボタン */}
      <button
        className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors"
        onClick={() => setShowModal(true)}
        aria-label={`コメント ${commentCount}件`}
      >
        <span>💬</span>
        <span>{commentCount}</span>
      </button>

      {/* コメント投稿モーダル */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="返信"
      >
        <PostForm
          submitLabel="返信"
          placeholder="返信を入力..."
          onSubmit={handleSubmitComment}
        />
      </Modal>
    </>
  );
}

export default CommentButton;
