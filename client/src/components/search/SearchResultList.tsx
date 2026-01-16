/**
 * 検索結果一覧表示コンポーネント
 * 検索結果の表示のみを担当（プレゼンテーショナル）
 */

import Post from '../Post';
import type { PostInfo } from '../../types';

interface SearchResultListProps {
  results: PostInfo[];
  onBackToTrend: () => void;
}

/**
 * 検索結果一覧
 */
const SearchResultList = ({ results, onBackToTrend }: SearchResultListProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl pl-2">検索結果</h2>
        <button
          className="text-blue-400 hover:text-blue-300 text-sm"
          onClick={onBackToTrend}
        >
          トレンドに戻る
        </button>
      </div>
      {results.length === 0 ? (
        <p className="text-gray-400 text-center py-4">
          検索結果がありません
        </p>
      ) : (
        results.map((post) => (
          <Post key={post.id} postInfo={post} />
        ))
      )}
    </>
  );
};

export default SearchResultList;
