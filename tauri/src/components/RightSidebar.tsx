/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TrendingTopic from "./TrendingTopic.tsx";
import { useEffect, useState } from "react";
const RightSidebar = ({ appURL }) => {
  interface Trend {
    keyword: string;
    score: number;
  }
  const [trends, setTrends] = useState<Trend[]>([]);
  useEffect(() => {
    fetch(appURL + "/api/trends", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setTrends(data.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[450px] h-screen bg-gray-900 text-white p-4 flex flex-col">
      <div className="mt-4  flex-1">
        <div className="bg-gray-800 p-4 rounded-md">
          <h2 className="text-xl mb-2">今はどうしてる？</h2>
          {trends.map((topic, index) => {
            return (
              <TrendingTopic
                key={index}
                topic={"トレンド"}
                description={topic.keyword}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-auto">
        
        <a className="text-center bg-black p-2 rounded-xl mx-10 mb-4 block" href="https://github.com/tako0614" target="_blank">github</a>
      </div>
    </div>
  );
};

export default RightSidebar;
