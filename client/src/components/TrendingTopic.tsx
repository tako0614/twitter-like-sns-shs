const TrendingTopic = (
  { topic, description }: { topic: string; description: string },
) => {
  return (
    <div className="mt-2">
      <p className="text-gray-400">{topic}</p>
      <p>{description}</p>
    </div>
  );
};

export default TrendingTopic;
