import Sidebar from "./components/Sidebar.jsx";
import MainContent from "./components/MainContent.jsx";
import RightSidebar from "./components/RightSidebar.jsx";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appURL = "https://shimizudanitter.takos.jp/JqFYyQK5fun4/";
function App() {
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("匿名");
  const [page, setPage] = useState("home");
  const [comment, setComment] = useState([]);
  const [selectPost, setSelectPost] = useState("");
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${appURL}/api/tweet/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit: 400 }),
      });
      const data = await res.json();
      setPosts(data.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="flex">
        <Sidebar setUserName={setUserName} setPage={setPage} />
        <MainContent
          posts={posts}
          setPosts={setPosts}
          userName={userName}
          appURL={appURL}
          page={page}
          setPage={setPage}
          commentPost={comment}
          setCommentPost={setComment}
          selectPost={selectPost}
          setSelectPost={setSelectPost}
        />
        <RightSidebar
          appURL={appURL}
        />
      </div>
    </>
  );
}

export default App;
