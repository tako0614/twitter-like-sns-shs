/**
 * トレンド一覧表示コンポーネント
 * トレンドキーワードの表示のみを担当（プレゼンテーショナル）
 */

import type { Trend } from '../../types';

interface TrendListProps {
  trends: Trend[];
  onTrendClick: (keyword: string) => void;
}

/**
 * トレンド一覧
 */
const TrendList = ({ trends, onTrendClick }: TrendListProps) => {
  if (trends.length === 0) {
    return (
      <p className="text-gray-400 text-center py-4">
        トレンドがありません
      </p>
    );
  }

  return (
    <>
      {trends.map((trend, index) => (
        <div
          key={index}
          className="bg-gray-700 p-4 rounded-md mb-4 hover:bg-gray-600 cursor-pointer transition-colors"
          onClick={() => onTrendClick(trend.keyword)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onTrendClick(trend.keyword)}
        >
          <span className="text-sm text-white">
            {trend.keyword}
          </span>
        </div>
      ))}
    </>
  );
};

export default TrendList;
