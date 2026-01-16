/**
 * ホームページコンポーネント
 * タイムライン表示と新規投稿機能を提供
 */

import { useState } from 'react';
import Post from '../Post';
import { api, ApiError } from '../../api/client';
import type { PostInfo, PageType } from '../../types';

interface HomePageProps {
  /** 投稿一覧 */
  posts: PostInfo[];
  /** 投稿一覧を更新する関数 */
  setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  /** ユーザー名 */
  userName: string;
  /** ページ遷移関数 */
  setPage: (page: PageType) => void;
  /** コメント一覧を設定する関数 */
  setCommentPost: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  /** 選択投稿を設定する関数 */
  setSelectPost: React.Dispatch<React.SetStateAction<PostInfo | null>>;
}

/** 新規投稿後に取得する件数 */
const REFRESH_LIMIT = 15;

/**
 * ホームページ
 * タイムラインと投稿フォームを表示
 */
const HomePage = ({
  posts,
  setPosts,
  userName,
  setPage,
  setCommentPost,
  setSelectPost,
}: HomePageProps) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * 新規ツイート投稿処理
   */
  const handlePostTweet = async () => {
    // バリデーション
    if (!newPostContent.trim()) {
      alert('何か入力してください');
      return;
    }
    if (!userName) {
      alert('ユーザーネームを設定してください。');
      return;
    }

    setIsSubmitting(true);
    try {
      // 投稿を作成
      await api.createPost({
        text: newPostContent,
        type: 'tweet',
        userName,
      });

      // タイムラインを更新
      const updatedPosts = await api.getPosts({ limit: REFRESH_LIMIT });
      setPosts(updatedPosts);
      setNewPostContent('');
      alert('ツイートしました');
    } catch (error) {
      if (error instanceof ApiError) {
        alert(`投稿に失敗しました: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow h-screen bg-gray-800 text-white p-4 overflow-hidden">
      <div className="h-full overflow-y-auto hidden-scrollbar">
        {/* 投稿フォーム */}
        <div className="mb-4 bg-gray-700 p-4 rounded-md">
          <textarea
            className="w-full bg-gray-800 p-2 rounded-md text-white resize-none"
            placeholder="今何してる？"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            disabled={isSubmitting}
            rows={3}
          />
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12
                       disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            onClick={handlePostTweet}
            disabled={isSubmitting || !newPostContent.trim()}
          >
            {isSubmitting ? '投稿中...' : 'ツイート'}
          </button>
        </div>

        {/* タイムライン */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              投稿がありません
            </p>
          ) : (
            posts.map((post) => (
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

export default HomePage;
