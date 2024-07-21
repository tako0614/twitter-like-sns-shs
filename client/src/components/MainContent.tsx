import { useState } from "react";
import Post from "./Post.tsx";

const MainContent = (
  { posts, setPosts, userName, appURL, page, setPage }: {
    posts: any;
    setPosts: React.Dispatch<React.SetStateAction<any>>;
    userName: string;
    appURL: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    page: string;
  },
) => {
  const [newPostContent, setNewPostContent] = useState("");

  const handlePostTweet = async () => {
    if (newPostContent.trim()) {
      if (userName === "") {
        alert("ユーザーネームを設定してください。");
        return;
      }
      await fetch(appURL + "/api/tweet/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newPostContent,
          type: "tweet",
          userName: userName,
        }),
      });
      await fetch(appURL + "/api/tweet/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit: 15 }),
      })
        .then((res) => res.json())
        .then((data) => setPosts(data.data));
      setNewPostContent("");
    }
  };
  if (page === "home") {
    return (
      <div className="flex-grow h-screen bg-gray-800 text-white p-4 overflow-hidden">
        <div className="h-full overflow-y-auto hidden-scrollbar">
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
            {posts.map((post: any, index: number) => (
              <Post
                key={index}
                username={post.username}
                time={post.time}
                content={post.content}
                id={post.id}
                like={post.like}
                comment={post.comment}
                appURL={appURL}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (page === "comment") {
    return (
      <div className="flex-grow h-screen bg-gray-800 text-white p-4 overflow-hidden">
        <div className="h-full overflow-y-auto hidden-scrollbar">
        </div>
      </div>
    );
  }
};

export default MainContent;
