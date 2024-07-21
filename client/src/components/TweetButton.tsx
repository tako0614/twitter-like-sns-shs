import { useState } from "react";
function Login() {
  const [showWindow, setShowWindow] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  if (showWindow === false) {
    return (
      <>
        <div
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
          onClick={() => {
            setShowWindow(true);
          }}
        >
          <span>🐦‍⬛</span>
          <span>ツイート</span>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="fixed z-50 w-full h-full overflow-hidden bg-[rgba(75,92,108,0)] left-0 top-0 flex justify-center items-center p-5">
        <div className="bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(24,24,24,0.7)] backdrop-blur border-inherit border-1 max-w-md max-h-[350px] w-full h-full rounded-xl shadow-lg relative p-5">
          <div className="absolute right-0 top-0 p-4">
            <span
              className="ml-0 text-3xl text-black dark:text-white font-[bold] no-underline cursor-pointer"
              onClick={() => {
                setShowWindow(false);
              }}
            >
              ×
            </span>
          </div>
          <form
            className="h-full px-2 lg:px-3 flex flex-col"
            onSubmit={async (e) => {
              e.preventDefault();
            }}
          >
            <div className="text-sm">
              <p className="text-black dark:text-white font-bold text-3xl mt-4 mb-5">
                ツイート
              </p>
            </div>
            <div className="flex flex-col">
              <div className="w-full mb-2">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="bg-[#1f2937] border border-[rgba(0,0,0,5%)] shadow-[0_0.5px_1.5px_rgba(0,0,0,30%),0_0_0_0_rgba(0,122,255,50%)] focus:shadow-[0_0.5px_1.5px_rgba(0,0,0,30%),0_0_0_3px_rgba(0,122,255,50%)] text-white text-sm rounded-lg focus:ring-2 ring-1 ring-[rgba(0,0,0,5%)] outline-none block w-full h-full p-2.5"
                >
                </textarea>
              </div>
            </div>
            <div className="flex justify-end w-full pt-2 gap-1">
              <button
                type="submit"
                className="rounded-lg text-white bg-[#007AFF] ring-1 ring-[rgba(0,122,255,12%)] shadow-[0_1px_2.5px_rgba(0,122,255,24%)] px-5 py-2 hover:bg-[#1f7adb] focus:outline-none disabled:bg-gray-300 disabled:dark:bg-gray-700"
              >
                {"設定！"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
        onClick={() => {
          setShowWindow(true);
        }}
      >
        <span>🐦‍⬛</span>
        <span>ツイート</span>
      </div>
    </>
  );
}
export default Login;
