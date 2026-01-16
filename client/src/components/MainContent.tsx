/**
 * メインコンテンツコンポーネント
 * ページ切り替えを管理し、適切なページコンポーネントを表示
 * 責務: ページルーティングのみ
 */

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CommentPage from './pages/CommentPage';
import { useAppContext } from '../contexts/AppContext';

/**
 * メインコンテンツ
 * pageの値に応じて適切なページコンポーネントを描画
 */
const MainContent = () => {
  const { page } = useAppContext();

  switch (page) {
    case 'home':
      return <HomePage />;
    case 'search':
      return <SearchPage />;
    case 'comment':
      return <CommentPage />;
    default:
      return <HomePage />;
  }
};

export default MainContent;
