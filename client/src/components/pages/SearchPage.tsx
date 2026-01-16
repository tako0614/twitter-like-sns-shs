/**
 * 検索ページコンポーネント
 * トレンド表示と投稿検索機能を提供
 * 責務: 検索UIの組み立てのみ
 */

import { useEffect } from 'react';
import { PageLayout } from '../common';
import { TrendList, SearchForm, SearchResultList } from '../search';
import { useTrends, useSearch } from '../../hooks';

/**
 * 検索ページ
 */
const SearchPage = () => {
  const { trends, fetchTrends } = useTrends();
  const {
    searchResult,
    searchWord,
    setSearchWord,
    searchPageType,
    isSearching,
    search,
    resetToTrend,
  } = useSearch();

  // トレンドを取得
  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  /** フォーム送信処理 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await search(searchWord);
  };

  return (
    <PageLayout>
      {/* 検索フォーム */}
      <SearchForm
        searchWord={searchWord}
        onSearchWordChange={setSearchWord}
        onSubmit={handleSubmit}
        isLoading={isSearching}
      />

      {/* ローディング表示 */}
      {isSearching && (
        <div className="text-center py-4">
          <span className="text-gray-400">検索中...</span>
        </div>
      )}

      {/* トレンド表示 */}
      {searchPageType === 'trend' && !isSearching && (
        <>
          <h2 className="text-xl pl-2">トレンド</h2>
          <p className="text-gray-400 text-sm pl-2 mb-4">
            ※精度はまだ改善中です
          </p>
          <TrendList trends={trends} onTrendClick={search} />
        </>
      )}

      {/* 検索結果表示 */}
      {searchPageType === 'search' && !isSearching && (
        <SearchResultList results={searchResult} onBackToTrend={resetToTrend} />
      )}
    </PageLayout>
  );
};

export default SearchPage;
