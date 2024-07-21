import { useState } from "react";
import CommentButton from "./CommentButton";
type PostProps = {
  username: string;
  time: string;
  content: string;
  id: string;
  like: number;
  comment: number;
  appURL: string;
  setPage: (page: string) => void;
};

const Post = (
  { username, time, content, id, like, comment, appURL, setPage }: PostProps,
) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(like);
  return (
    <div className="bg-gray-700 p-4 rounded-md mb-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{username} {time}</span>
      </div>
      <p className="mt-2">{content}</p>
      <div className="flex items-center justify-start space-x-4 mt-4">
        <CommentButton
          comment={comment}
          appURL={appURL}
          userName={username}
          id={id}
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
                  id: id,
                }),
              });
              const data = await res.json();
              console.log(data);
              console.log(id);
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
