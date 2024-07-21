import Sidebar from "./components/Sidebar.jsx";
import MainContent from "./components/MainContent.jsx";
import RightSidebar from "./components/RightSidebar.jsx";
import { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appURL = "http://localhost:8000";

function App() {
  const [posts, setPosts] = useState([]);
  const [ userName, setUserName ] = useState("");
  const [ page, setPage ] = useState("home");
  const [ isLogin, setIsLogin ] = useState(false);
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
      console.log(data);
      setPosts(data.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <div>
      </div>
      <div className="flex">
        <Sidebar userName={userName} setUserName={setUserName} />
        <MainContent posts={posts} setPosts={setPosts} />
        <RightSidebar />
      </div>
    </>
  );
}

export default App;
