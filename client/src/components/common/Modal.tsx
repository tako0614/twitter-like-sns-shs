/**
 * モーダルコンポーネント
 * 投稿フォームやコメントフォームで共通利用
 */

import type { ReactNode } from 'react';

interface ModalProps {
  /** モーダルの表示状態 */
  isOpen: boolean;
  /** モーダルを閉じる処理 */
  onClose: () => void;
  /** モーダルのタイトル */
  title: string;
  /** モーダル内のコンテンツ */
  children: ReactNode;
}

/**
 * 再利用可能なモーダルコンポーネント
 * 背景クリックまたは×ボタンで閉じることができる
 */
export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 w-full h-full overflow-hidden bg-black/50 left-0 top-0 flex justify-center items-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 backdrop-blur border border-gray-700 max-w-md max-h-[350px] w-full h-full rounded-xl shadow-lg relative p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <div className="absolute right-0 top-0 p-4">
          <button
            className="text-3xl text-white font-bold cursor-pointer hover:text-gray-300"
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        {/* タイトル */}
        <h2 className="text-white font-bold text-2xl mt-2 mb-4">
          {title}
        </h2>

        {/* コンテンツ */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
