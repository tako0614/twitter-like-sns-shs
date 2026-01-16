/**
 * アプリケーションのグローバル状態管理Context
 * Prop Drillingを解消し、状態管理を一元化
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { PostInfo, PageType } from '../types';

/** Contextの型定義 */
interface AppContextType {
  // ユーザー関連
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;

  // ページ遷移関連
  page: PageType;
  setPage: (page: PageType) => void;

  // 投稿一覧関連
  posts: PostInfo[];
  setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>;

  // コメント関連
  commentPost: PostInfo[];
  setCommentPost: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  selectPost: PostInfo | null;
  setSelectPost: React.Dispatch<React.SetStateAction<PostInfo | null>>;

  // コメントページへの遷移ヘルパー
  navigateToComment: (post: PostInfo, comments: PostInfo[]) => void;
  navigateToHome: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

/**
 * アプリケーション状態のProvider
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  const [userName, setUserName] = useState('匿名');
  const [page, setPage] = useState<PageType>('home');
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [commentPost, setCommentPost] = useState<PostInfo[]>([]);
  const [selectPost, setSelectPost] = useState<PostInfo | null>(null);

  /** コメントページへ遷移 */
  const navigateToComment = useCallback((post: PostInfo, comments: PostInfo[]) => {
    setSelectPost(post);
    setCommentPost(comments);
    setPage('comment');
  }, []);

  /** ホームへ遷移 */
  const navigateToHome = useCallback(() => {
    setPage('home');
    setCommentPost([]);
    setSelectPost(null);
  }, []);

  const value: AppContextType = {
    userName,
    setUserName,
    page,
    setPage,
    posts,
    setPosts,
    commentPost,
    setCommentPost,
    selectPost,
    setSelectPost,
    navigateToComment,
    navigateToHome,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * AppContextを使用するためのカスタムHook
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
