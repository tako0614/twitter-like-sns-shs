/**
 * コメントページコンポーネント
 * 選択された投稿とそのコメント一覧を表示
 * 責務: コメントUIの組み立てのみ
 */

import { useCallback } from 'react';
import SelectPost from '../SelectPost';
import Post from '../Post';
import { PostForm } from '../common/PostForm';
import { PageLayout } from '../common';
import { useAppContext } from '../../contexts/AppContext';
import { useComments } from '../../hooks';

/**
 * コメントページ
 */
const CommentPage = () => {
  const { selectPost, commentPost } = useAppContext();
  const { createComment } = useComments();

  /** コメント投稿ハンドラ */
  const handleSubmitComment = useCallback(async (content: string) => {
    await createComment(content);
  }, [createComment]);

  return (
    <PageLayout>
      {/* 親投稿 */}
      <SelectPost postInfo={selectPost} />

      {/* コメント入力フォーム */}
      <div className="mb-4 bg-gray-700 p-4 rounded-md">
        <PostForm
          submitLabel="返信"
          placeholder="返信する"
          onSubmit={handleSubmitComment}
        />
      </div>

      {/* コメント一覧 */}
      <div className="space-y-4">
        {commentPost.length === 0 ? (
          <p className="text-gray-400 text-center py-4">コメントがありません</p>
        ) : (
          commentPost.map((post) => <Post key={post.id} postInfo={post} />)
        )}
      </div>
    </PageLayout>
  );
};

export default CommentPage;
