/**
 * ホームページコンポーネント
 * タイムライン表示と新規投稿機能を提供
 * 責務: タイムラインUIの組み立てのみ
 */

import { useCallback } from 'react';
import Post from '../Post';
import { PostForm } from '../common/PostForm';
import { PageLayout } from '../common';
import { useAppContext } from '../../contexts/AppContext';
import { useCreatePost } from '../../hooks';

/**
 * ホームページ
 */
const HomePage = () => {
  const { posts, userName } = useAppContext();
  const { createTweet } = useCreatePost();

  /** ツイート投稿ハンドラ */
  const handlePostTweet = useCallback(async (content: string) => {
    if (!userName) {
      alert('ユーザーネームを設定してください。');
      return;
    }
    await createTweet(content);
  }, [userName, createTweet]);

  return (
    <PageLayout>
      {/* 投稿フォーム */}
      <div className="mb-4 bg-gray-700 p-4 rounded-md">
        <PostForm
          submitLabel="ツイート"
          placeholder="今何してる？"
          onSubmit={handlePostTweet}
        />
      </div>

      {/* タイムライン */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">投稿がありません</p>
        ) : (
          posts.map((post) => <Post key={post.id} postInfo={post} />)
        )}
      </div>
    </PageLayout>
  );
};

export default HomePage;
