/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
  if (!postInfo) return <></>;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLiked, setIsLiked] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [likedCount, setLikedCount] = useState(postInfo.like);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (postInfo) {
      setLikedCount(postInfo.like);
    }
  }, [postInfo, postInfo.like]);
  return (
    <div className="bg-gray-700 p-4 rounded-md mb-4">
      {/*戻るボタン */}
      <div className="flex w-full pb-2">
        <button
          className="text-white text-xl font-semibold"
          onClick={() => {
            setPage("home");
            setCommentPost([]);
            setSelectPost(null);
          }}
        >
          {"< 戻る"}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          {postInfo.username} {postInfo.time}
        </span>
      </div>
      <p className="mt-2">{postInfo.content}</p>
      <div className="flex items-center justify-start space-x-4 mt-4">
        <CommentButton
          comment={postInfo.comment}
          appURL={appURL}
          userName={postInfo.username}
          id={postInfo.id}
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
