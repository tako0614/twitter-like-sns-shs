/**
 * 左サイドバーコンポーネント
 * ナビゲーションメニューとユーザー設定を提供
 */

import SetUserNameButton from './SetUserNameButton';
import type { PageType } from '../types';

interface SidebarProps {
  /** ユーザー名を設定する関数 */
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  /** ページ遷移関数 */
  setPage: (page: PageType) => void;
}

/** ナビゲーションアイテムの型 */
interface NavItem {
  icon: string;
  label: string;
  page: PageType;
}

/** ナビゲーションメニュー項目 */
const navItems: NavItem[] = [
  { icon: '🏠', label: 'ホーム', page: 'home' },
  { icon: '🔍', label: '検索', page: 'search' },
];

/**
 * サイドバー
 * アプリ名、ナビゲーション、ユーザー設定を表示
 */
const Sidebar = ({ setUserName, setPage }: SidebarProps) => {
  return (
    <div className="w-[450px] h-screen bg-gray-900 text-white flex flex-col">
      {/* ヘッダー：アプリ名 */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <span className="text-xl font-bold">Shimizudanitter</span>
      </div>

      {/* ナビゲーションメニュー */}
      <nav className="flex-grow p-4 space-y-4">
        {navItems.map((item) => (
          <button
            key={item.page}
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer w-full text-left transition-colors"
            onClick={() => setPage(item.page)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        {/* ユーザー名設定ボタン */}
        <SetUserNameButton setUserName={setUserName} />
      </nav>
    </div>
  );
};

export default Sidebar;
