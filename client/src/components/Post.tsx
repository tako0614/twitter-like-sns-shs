/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CommentButton from "./CommentButton";
type PostProps = {
  postInfo: {
    id: string;
    username: string;
    time: string;
    content: string;
    like: number;
    comment: number;
  };
  appURL: string;
  setPage: (page: string) => void;
  setCommentPost: any;
  setSelectPost: any;
};

const Post = (
  { postInfo, appURL, setPage, setCommentPost, setSelectPost }: PostProps,
) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(postInfo.like);
  return (
    <div className="bg-gray-700 p-4 rounded-md mb-4 hover:bg-gray-600">
      <div
        onClick={async () => {
          const res = await fetch(
            "http://localhost:8000/api/tweet/getComments",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: postInfo.id,
              }),
            },
          );
          const data = await res.json();
          console.log(data,postInfo );
          setCommentPost(data.data);
          setPage("comment");
          setSelectPost(postInfo);
        }}
        className="py-2"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {postInfo.username} {postInfo.time}
          </span>
        </div>
        <p className="mt-2">{postInfo.content}</p>
      </div>
      <div className="flex items-center justify-start space-x-4 mt-4">
        <CommentButton
          comment={postInfo.comment}
          appURL={appURL}
          userName={postInfo.username}
          id={postInfo.id}
          isComment={false}
        >
        </CommentButton>
        <button
          className="flex items-center space-x-2 text-gray-400 hover:text-red-500"
          onClick={async () => {
            if (isLiked === false) {
              const res = await fetch(appURL + "/api/tweet/like", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: postInfo.id,
                }),
              });
              const data = await res.json();
              console.log(data);
              setIsLiked(true);
              setLikedCount(likedCount + 1);
            }
          }}
        >
          <span>❤️</span>
          <span>{likedCount}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
