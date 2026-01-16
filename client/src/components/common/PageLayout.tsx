/**
 * ページレイアウトコンポーネント
 * 各ページ共通のレイアウトを提供
 */

import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

/**
 * ページレイアウト
 */
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex-grow h-screen bg-gray-800 text-white p-4 overflow-hidden">
      <div className="h-full overflow-y-auto hidden-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
