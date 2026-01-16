/**
 * 右サイドバーコンポーネント
 * トレンドキーワードを表示
 */

import { useEffect, useState } from 'react';
import TrendingTopic from './TrendingTopic';
import { api } from '../api/client';
import type { Trend } from '../types';

/**
 * 右サイドバー
 * トレンドキーワード一覧とGitHubリンクを表示
 */
const RightSidebar = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // トレンドを取得
  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await api.getTrends();
        setTrends(data);
      } catch (error) {
        console.error('トレンドの取得に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrends();
  }, []);

  return (
    <div className="w-[450px] h-screen bg-gray-900 text-white p-4 flex flex-col">
      {/* トレンドセクション */}
      <div className="mt-4 flex-1">
        <div className="bg-gray-800 p-4 rounded-md">
          <h2 className="text-xl mb-2">今はどうしてる？</h2>

          {/* ローディング表示 */}
          {isLoading && (
            <p className="text-gray-400 text-sm">読み込み中...</p>
          )}

          {/* トレンド一覧 */}
          {!isLoading && trends.length === 0 && (
            <p className="text-gray-400 text-sm">トレンドがありません</p>
          )}

          {!isLoading && trends.map((topic, index) => (
            <TrendingTopic
              key={index}
              topic="トレンド"
              description={topic.keyword}
            />
          ))}
        </div>
      </div>

      {/* フッター */}
      <div className="mt-auto">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-blue-500 hover:bg-blue-600 transition-colors py-2 rounded"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default RightSidebar;
