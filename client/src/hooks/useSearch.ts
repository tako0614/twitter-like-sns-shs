/**
 * 検索関連のカスタムHook
 * トレンド取得・検索ロジックをコンポーネントから分離
 */

import { useState, useCallback } from 'react';
import { api, ApiError } from '../api/client';
import type { PostInfo, Trend, SearchPageType } from '../types';

const SEARCH_LIMIT = 25;

/**
 * トレンド取得を管理するHook
 */
export const useTrends = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /** トレンドを取得 */
  const fetchTrends = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getTrends();
      setTrends(data);
    } catch (err) {
      console.error('トレンドの取得に失敗しました:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    trends,
    isLoading,
    fetchTrends,
  };
};

/**
 * 検索機能を管理するHook
 */
export const useSearch = () => {
  const [searchResult, setSearchResult] = useState<PostInfo[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [searchPageType, setSearchPageType] = useState<SearchPageType>('trend');
  const [isSearching, setIsSearching] = useState(false);

  /** 検索を実行 */
  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const results = await api.searchPosts({
        query,
        limit: SEARCH_LIMIT,
      });
      setSearchResult(results);
      setSearchPageType('search');
      setSearchWord(query);
    } catch (err) {
      if (err instanceof ApiError) {
        alert(`検索に失敗しました: ${err.message}`);
      }
    } finally {
      setIsSearching(false);
    }
  }, []);

  /** トレンド表示に戻る */
  const resetToTrend = useCallback(() => {
    setSearchPageType('trend');
    setSearchWord('');
    setSearchResult([]);
  }, []);

  return {
    searchResult,
    searchWord,
    setSearchWord,
    searchPageType,
    isSearching,
    search,
    resetToTrend,
  };
};
