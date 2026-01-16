/**
 * 検索ページコンポーネント
 * トレンド表示と投稿検索機能を提供
 */

import { useState, useEffect } from 'react';
import Post from '../Post';
import { api, ApiError } from '../../api/client';
import type { PostInfo, PageType, Trend, SearchPageType } from '../../types';

interface SearchPageProps {
  /** ページ遷移関数 */
  setPage: (page: PageType) => void;
  /** コメント一覧を設定する関数 */
  setCommentPost: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  /** 選択投稿を設定する関数 */
  setSelectPost: React.Dispatch<React.SetStateAction<PostInfo | null>>;
}

/** 検索結果の最大件数 */
const SEARCH_LIMIT = 25;

/**
 * 検索ページ
 * トレンドキーワードと検索結果を表示
 */
const SearchPage = ({
  setPage,
  setCommentPost,
  setSelectPost,
}: SearchPageProps) => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [searchPageType, setSearchPageType] = useState<SearchPageType>('trend');
  const [searchResult, setSearchResult] = useState<PostInfo[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // トレンドを取得
  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await api.getTrends();
        setTrends(data);
      } catch (error) {
        console.error('トレンドの取得に失敗しました:', error);
      }
    };
    fetchTrends();
  }, []);

  /**
   * 検索実行
   */
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const results = await api.searchPosts({
        query,
        limit: SEARCH_LIMIT,
      });
      setSearchResult(results);
      setSearchPageType('search');
      setSearchWord(query);
    } catch (error) {
      if (error instanceof ApiError) {
        alert(`検索に失敗しました: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * フォーム送信処理
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSearch(searchWord);
  };

  /**
   * トレンドキーワードクリック処理
   */
  const handleTrendClick = async (keyword: string) => {
    await handleSearch(keyword);
  };

  return (
    <div className="flex-grow h-screen bg-gray-800 text-white p-4 overflow-hidden">
      <div className="h-full overflow-y-auto hidden-scrollbar">
        {/* 検索フォーム */}
        <div className="mb-4 bg-gray-800 p-2 rounded-md">
          <form onSubmit={handleSubmit} className="w-full">
            <input
              className="w-full bg-gray-900 p-4 rounded-md text-white"
              placeholder="検索"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              disabled={isLoading}
            />
          </form>
        </div>

        {/* ローディング表示 */}
        {isLoading && (
          <div className="text-center py-4">
            <span className="text-gray-400">検索中...</span>
          </div>
        )}

        {/* トレンド表示 */}
        {searchPageType === 'trend' && !isLoading && (
          <>
            <h2 className="text-xl pl-2">トレンド</h2>
            <p className="text-gray-400 text-sm pl-2 mb-4">
              ※精度はまだ改善中です
            </p>
            {trends.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                トレンドがありません
              </p>
            ) : (
              trends.map((trend, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded-md mb-4 hover:bg-gray-600 cursor-pointer transition-colors"
                  onClick={() => handleTrendClick(trend.keyword)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrendClick(trend.keyword)}
                >
                  <span className="text-sm text-white">
                    {trend.keyword}
                  </span>
                </div>
              ))
            )}
          </>
        )}

        {/* 検索結果表示 */}
        {searchPageType === 'search' && !isLoading && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl pl-2">検索結果</h2>
              <button
                className="text-blue-400 hover:text-blue-300 text-sm"
                onClick={() => {
                  setSearchPageType('trend');
                  setSearchWord('');
                  setSearchResult([]);
                }}
              >
                トレンドに戻る
              </button>
            </div>
            {searchResult.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                検索結果がありません
              </p>
            ) : (
              searchResult.map((post) => (
                <Post
                  key={post.id}
                  postInfo={post}
                  setPage={setPage}
                  setCommentPost={setCommentPost}
                  setSelectPost={setSelectPost}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
