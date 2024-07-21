import { useState } from "react";

type PostProps = {
  username: string;
  time: string;
  content: string;
  id: string;
};

const Post = ({ username, time, content,id }: PostProps) => {
  const [retweets, setRetweets] = useState(0);
  const [likes, setLikes] = useState(0);
  console.log(id);
  return (
    <div className="bg-gray-700 p-4 rounded-md mb-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{username} {time}</span>
      </div>
      <p className="mt-2">{content}</p>
      <div className="flex items-center justify-start space-x-4 mt-4">
        <button
          className="flex items-center space-x-2 text-gray-400 hover:text-blue-500"
          onClick={() => setRetweets(retweets + 1)}
        >
          <span>🔁</span>
          <span>{retweets}</span>
        </button>
        <button
          className="flex items-center space-x-2 text-gray-400 hover:text-red-500"
          onClick={() => setLikes(likes + 1)}
        >
          <span>❤️</span>
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
