/**
 * トレンドトピックコンポーネント
 * 右サイドバーで個々のトレンドを表示
 */

interface TrendingTopicProps {
  /** トピックのカテゴリ（例：「トレンド」） */
  topic: string;
  /** トレンドキーワード */
  description: string;
}

/**
 * トレンドトピック
 * カテゴリラベルとキーワードを表示
 */
const TrendingTopic = ({ topic, description }: TrendingTopicProps) => {
  return (
    <div className="mt-2 py-1">
      <p className="text-gray-400 text-xs">{topic}</p>
      <p className="text-white">{description}</p>
    </div>
  );
};

export default TrendingTopic;
