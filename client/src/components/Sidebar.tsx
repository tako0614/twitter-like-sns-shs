import SetUserNameButton from "./SetUserNameButton.tsx";
const Sidebar = ({ userName, setUserName }) => {
  return (
    <div className="w-[400px] h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <span className="text-xl font-bold">Shimizudanitter</span>
      </div>
      <div className="flex-grow p-4 space-y-4">
        <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
          <span>🏠</span>
          <span>ホーム</span>
        </div>
        <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
          <span>📝</span>
          <span>ツイート</span>
        </div>
        <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
          <span>🔍</span>
          <span>検索</span>
        </div>
        <SetUserNameButton userName={userName} setUserName={setUserName}></SetUserNameButton>
      </div>
      <div className="flex items-center justify-center h-16 border-t border-gray-700">
        <button className="bg-blue-500 px-4 py-2 rounded-full text-white">
          ポストする
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
