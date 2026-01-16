/**
 * ユーザー名設定ボタンコンポーネント
 * クリックするとユーザー名設定モーダルが開く
 */

import { useState } from 'react';
import { Modal } from './common/Modal';

interface SetUserNameButtonProps {
  /** ユーザー名を設定する関数 */
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  /** 子要素（互換性のため保持） */
  children?: React.ReactNode;
}

/**
 * ユーザー名設定ボタン
 * モーダルでユーザー名を入力・設定できる
 */
function SetUserNameButton({ setUserName }: SetUserNameButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [formUserName, setFormUserName] = useState('');

  /**
   * フォーム送信処理
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formUserName.trim()) {
      alert('ユーザー名を入力してください');
      return;
    }

    setUserName(formUserName);
    setShowModal(false);
    alert(`ユーザー名を「${formUserName}」に設定しました。`);
  };

  return (
    <>
      {/* 設定ボタン */}
      <button
        className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer w-full text-left transition-colors"
        onClick={() => setShowModal(true)}
      >
        <span>🔑</span>
        <span>ユーザーネームを設定</span>
      </button>

      {/* 設定モーダル */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="ユーザーネームを設定"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <label className="block mb-2 text-sm font-medium text-white">
            ユーザーネーム
          </label>
          <input
            type="text"
            value={formUserName}
            onChange={(e) => setFormUserName(e.target.value)}
            placeholder="username"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg
                       focus:ring-2 focus:ring-blue-500 outline-none w-full p-3"
          />
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={!formUserName.trim()}
              className="rounded-lg text-white bg-blue-500 px-5 py-2
                         hover:bg-blue-600 focus:outline-none
                         disabled:bg-gray-600 disabled:cursor-not-allowed
                         transition-colors"
            >
              設定
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default SetUserNameButton;
