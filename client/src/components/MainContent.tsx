import { useState } from "react";
import Post from "./Post.tsx";


const MainContent = ({posts, setPosts}) => {

  const [newPostContent, setNewPostContent] = useState("");

  const handlePostTweet = () => {
    if (newPostContent.trim()) {
      const newPost = {
        username: "YourUsername", // Replace with dynamic username if needed
        handle: "YourHandle", // Replace with dynamic handle if needed
        time: "今", // This should dynamically show the time
        content: newPostContent,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
    }
  };
  return (
    <div className="flex-grow h-screen bg-gray-800 text-white p-4">
      <div className="mb-4 bg-gray-700 p-4 rounded-md">
        <textarea
          className="w-full bg-gray-800 p-2 rounded-md text-white"
          placeholder="今何してる？"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePostTweet}
        >
          ツイート
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Post
            username={post.username}
            time={post.time}
            content={post.content}
            id={post.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
