import SetUserNameButton from "./SetUserNameButton.tsx";
import TweetButton from "./TweetButton.tsx";
import PostButton from "./PostButton.tsx";
const Sidebar = (
  { setUserName, setPage }: {
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<string>>;
  },
) => {
  return (
    <div className="w-[450px] h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <span className="text-xl font-bold">Shimizudanitter</span>
      </div>
      <div className="flex-grow p-4 space-y-4">
        <div
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
          onClick={() => {
            setPage("home");
          }}
        >
          <span>🏠</span>
          <span>ホーム</span>
        </div>
        <div
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
          onClick={() => {
            setPage("search");
          }}
        >
          <span>🔍</span>
          <span>検索</span>
        </div>
        <TweetButton></TweetButton>
        <SetUserNameButton setUserName={setUserName}>
        </SetUserNameButton>
      </div>
      <PostButton />
    </div>
  );
};

export default Sidebar;
