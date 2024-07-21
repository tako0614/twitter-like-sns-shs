import { useState } from "react";
function Login({ userName, setUserName}) {
    const [showWindow, setShowWindow] = useState(false);
    if (showWindow === false) {
      return (
        <>
        <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
        onClick={( () => {
          setShowWindow(true);
        })}
        >
          <span>🔑</span>
          <span>ログイン</span>
        </div>
        </>
      );
    }
    return (
      <>
        <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
        onClick={( () => {
          setShowWindow(true);
        })}
        >
          <span>🔑</span>
          <span>ログイン</span>
        </div>
        <div className="fixed z-50 w-full h-full overflow-hidden bg-[rgba(75,92,108,0.4)] left-0 top-0 flex justify-center items-center p-5">
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
                //
              }}
            >
              <div className="text-sm">
                <p className="text-black dark:text-white font-bold text-3xl mt-4 mb-5">
                  ログイン
                </p>
              </div>
              <div className="flex flex-col">
                <label
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  ユーザーネーム
                </label>
                <div className="w-full mb-2">
                  <input
                    className="bg-white border border-[rgba(0,0,0,5%)] shadow-[0_0.5px_1.5px_rgba(0,0,0,30%),0_0_0_0_rgba(0,122,255,50%)] focus:shadow-[0_0.5px_1.5px_rgba(0,0,0,30%),0_0_0_3px_rgba(0,122,255,50%)] text-gray-900 text-sm rounded-lg focus:ring-2 ring-1 ring-[rgba(0,0,0,5%)] outline-none block w-full p-2.5"
                    onChange={(e) => {
                      if (!e.target) {
                        return;
                      }
                      const target = e.target as HTMLInputElement;
                      setUserName(target.value);
                    }}
                    placeholder={"username"}
                    type={"text"}
                    value={userName}
                  />
                </div>
              </div>
              <div className="flex justify-end w-full pt-2 gap-1">
                <button
                  type="submit"
                  className="rounded-lg text-white bg-[#007AFF] ring-1 ring-[rgba(0,122,255,12%)] shadow-[0_1px_2.5px_rgba(0,122,255,24%)] px-5 py-2 hover:bg-[#1f7adb] focus:outline-none disabled:bg-gray-300 disabled:dark:bg-gray-700"
                >
                  {"ログイン"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
  export default Login;