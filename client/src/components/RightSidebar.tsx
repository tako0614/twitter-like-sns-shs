import TrendingTopic from "./TrendingTopic.tsx";

const RightSidebar = () => {
  const trendingTopics = [
    { topic: "トレンド", description: "ドーピング、厳重注意" },
    { topic: "トレンド", description: "選挙" },
    { topic: "トレンド", description: "鉄道完売" },
    // Add more topics as needed
  ];

  return (
    <div className="w-[400px] h-screen bg-gray-900 text-white p-4 flex flex-col">
      <div className="mt-4  flex-1">
        <div className="bg-gray-800 p-4 rounded-md">
          <h2 className="text-xl mb-2">今はどうしてる？</h2>
          {trendingTopics.map((topic, index) => (
            <TrendingTopic
              key={index}
              topic={topic.topic}
              description={topic.description}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <p className="text-center">github</p>
      </div>
    </div>
  );
};

export default RightSidebar;
