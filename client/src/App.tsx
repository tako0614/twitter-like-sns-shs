import Sidebar from "./components/Sidebar.jsx";
import MainContent from "./components/MainContent.jsx";
import RightSidebar from "./components/RightSidebar.jsx";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appURL = "http://localhost:8000";

function App() {
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [page, setPage] = useState("home");
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${appURL}/api/tweet/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit: 15 }),
      });
      const data = await res.json();
      setPosts(data.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <div>
      </div>
      <div className="flex">
        <Sidebar setUserName={setUserName} />
        <MainContent
          posts={posts}
          setPosts={setPosts}
          userName={userName}
          appURL={appURL}
          page={page}
          setPage={setPage}
        />
        <RightSidebar />
      </div>
    </>
  );
}

export default App;
