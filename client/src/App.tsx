/**
 * メインアプリケーションコンポーネント
 * アプリケーション全体のレイアウトを担当
 * 責務: レイアウトの組み立てのみ（状態管理はContextに委譲）
 */

import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { api } from './api/client';

/** 初回読み込み時の投稿取得件数 */
const INITIAL_POSTS_LIMIT = 400;

/**
 * アプリケーションコンテンツ
 * Providerの内側で使用
 */
const AppContent = () => {
  const { setPosts } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  // 初回読み込み時に投稿を取得
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts({ limit: INITIAL_POSTS_LIMIT });
        setPosts(data);
      } catch (error) {
        console.error('投稿の取得に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [setPosts]);

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <span className="text-white text-xl">読み込み中...</span>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
};

/**
 * Appコンポーネント
 * AppProviderでラップしてグローバル状態を提供
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
