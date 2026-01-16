/**
 * 投稿一覧表示コンポーネント
 * 投稿リストの表示のみを担当（プレゼンテーショナル）
 */

import Post from '../Post';
import type { PostInfo } from '../../types';

interface PostListProps {
  posts: PostInfo[];
  emptyMessage?: string;
}

/**
 * 投稿一覧
 */
const PostList = ({ posts, emptyMessage = '投稿がありません' }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <p className="text-gray-400 text-center py-8">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} postInfo={post} />
      ))}
    </div>
  );
};

export default PostList;
