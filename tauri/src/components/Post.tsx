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
            appURL + "/api/tweet/getComments",
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
          console.log(data, postInfo);
          setCommentPost(data.data);
          setPage("comment");
          setSelectPost(postInfo);
        }}
        className="py-2"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {postInfo.username} {convertTime(postInfo.time)}
          </span>
        </div>
        <p className="mt-2">{convertLineBreak(postInfo.content)}</p>
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

function convertTime(time: string | number | Date) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "午後" : "午前";
  const hour = hours % 12;
  const zeroPaddingHour = hour === 0 ? 12 : hour;
  const zeroPaddingMinutes = String(minutes).padStart(2, "0");
  return `${year}年${month}月${day}日 ${ampm} ${zeroPaddingHour}:${zeroPaddingMinutes}`;
}
//preactで動作する改行を反映させるために、改行コードをbrタグに変換する関数
function convertLineBreak(message: string | null | undefined) {
  if (message === null || message === undefined) return;
  return message.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}
