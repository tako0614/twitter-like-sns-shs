/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Post from "./Post.tsx";
import SelectPost from "./SelectPost.tsx";
const MainContent = (
  {
    posts,
    setPosts,
    userName,
    appURL,
    page,
    setPage,
    commentPost,
    setCommentPost,
    selectPost,
    setSelectPost,
  }: {
    posts: any;
    setPosts: React.Dispatch<React.SetStateAction<any>>;
    userName: string;
    appURL: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    page: string;
    commentPost: any;
    setCommentPost: React.Dispatch<React.SetStateAction<any>>;
    selectPost: any;
    setSelectPost: React.Dispatch<React.SetStateAction<string>>;
  },
) => {
  const [newPostContent, setNewPostContent] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");
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
                postInfo={post}
                appURL={appURL}
                setPage={setPage}
                setCommentPost={setCommentPost}
                setSelectPost={setSelectPost}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (page === "search") {
    return (
      <div className="flex-grow h-screen bg-gray-800 text-white p-4 overflow-hidden">
        <div className="h-full overflow-y-auto hidden-scrollbar">
          {/* 検索フォーム */}
          <div className="mb-4 bg-gray-800 p-2 rounded-md flex">
            <input
              className="w-full bg-gray-900 p-4 rounded-md text-white"
              placeholder="検索"
            />
            <div>
            </div>
          </div>
          <h2 className="text-xl pl-2">トレンド</h2>
        </div>
      </div>
    );
  }
  if (page === "comment") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const [newPostContent, setNewPostContent] = useState("");
    return (
      <div className="flex-grow h-screen bg-gray-800 text-white p-4 overflow-hidden">
        <div className="h-full overflow-y-auto hidden-scrollbar">
          <SelectPost
            postInfo={selectPost as any}
            setSelectPost={setSelectPost}
            setCommentPost={setCommentPost}
            setPage={setPage}
            appURL={appURL}
          />
          <div className="mb-4 bg-gray-700 p-4 rounded-md">
            <textarea
              className="w-full bg-gray-800 p-2 rounded-md text-white"
              placeholder="返信する"
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
            />
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={async () => {
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
                    text: newCommentContent,
                    type: "comment",
                    userName: userName,
                    comentedTweet: selectPost.id,
                  }),
                });
                alert("返信しました");
                setNewCommentContent("");
              }}
            >
              返信
            </button>
          </div>
          <div className="space-y-4">
            {commentPost.map((post: any, index: number) => (
              <Post
                key={index}
                postInfo={post}
                appURL={appURL}
                setPage={setPage}
                setCommentPost={setCommentPost}
                setSelectPost={setSelectPost}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default MainContent;
