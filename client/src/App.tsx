/**
 * メインアプリケーションコンポーネント
 * アプリケーション全体のレイアウトと状態管理を担当
 */

import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import { api } from './api/client';
import type { PostInfo, PageType } from './types';

/** 初回読み込み時の投稿取得件数 */
const INITIAL_POSTS_LIMIT = 400;

/**
 * Appコンポーネント
 * サイドバー、メインコンテンツ、右サイドバーを配置
 */
function App() {
  // 投稿一覧
  const [posts, setPosts] = useState<PostInfo[]>([]);
  // ユーザー名（デフォルトは匿名）
  const [userName, setUserName] = useState('匿名');
  // 現在のページ
  const [page, setPage] = useState<PageType>('home');
  // コメント一覧（コメントページ用）
  const [commentPost, setCommentPost] = useState<PostInfo[]>([]);
  // 選択された投稿（コメントページ用）
  const [selectPost, setSelectPost] = useState<PostInfo | null>(null);
  // 読み込み中フラグ
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
  }, []);

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
      {/* 左サイドバー：ナビゲーションとユーザー設定 */}
      <Sidebar setUserName={setUserName} setPage={setPage} />

      {/* メインコンテンツ：タイムライン、検索、コメント */}
      <MainContent
        posts={posts}
        setPosts={setPosts}
        userName={userName}
        page={page}
        setPage={setPage}
        commentPost={commentPost}
        setCommentPost={setCommentPost}
        selectPost={selectPost}
        setSelectPost={setSelectPost}
      />

      {/* 右サイドバー：トレンド表示 */}
      <RightSidebar />
    </div>
  );
}

export default App;
