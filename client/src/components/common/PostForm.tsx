/**
 * 投稿フォームコンポーネント
 * ツイートとコメントの両方で使用
 */

import { useState } from 'react';

interface PostFormProps {
  /** 送信ボタンのテキスト */
  submitLabel: string;
  /** プレースホルダーテキスト */
  placeholder: string;
  /** 送信時の処理 */
  onSubmit: (content: string) => Promise<void>;
  /** 送信後にフォームをクリアするか */
  clearOnSubmit?: boolean;
}

/**
 * 再利用可能な投稿フォーム
 * テキストエリアと送信ボタンを含む
 */
export const PostForm = ({
  submitLabel,
  placeholder,
  onSubmit,
  clearOnSubmit = true,
}: PostFormProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content);
      if (clearOnSubmit) {
        setContent('');
      }
    } catch (error) {
      console.error('投稿に失敗しました:', error);
      alert('投稿に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        disabled={isSubmitting}
        className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg
                   focus:ring-2 focus:ring-blue-500 outline-none w-full p-3 resize-none
                   disabled:opacity-50"
      />
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="rounded-lg text-white bg-blue-500 px-5 py-2
                     hover:bg-blue-600 focus:outline-none
                     disabled:bg-gray-600 disabled:cursor-not-allowed
                     transition-colors"
        >
          {isSubmitting ? '送信中...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
