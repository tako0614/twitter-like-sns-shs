/**
 * メインコンテンツコンポーネント
 * ページ切り替えを管理し、適切なページコンポーネントを表示
 */

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CommentPage from './pages/CommentPage';
import type { PostInfo, PageType } from '../types';

interface MainContentProps {
  /** 投稿一覧 */
  posts: PostInfo[];
  /** 投稿一覧を更新する関数 */
  setPosts: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  /** ユーザー名 */
  userName: string;
  /** 現在のページ */
  page: PageType;
  /** ページ遷移関数 */
  setPage: (page: PageType) => void;
  /** コメント一覧 */
  commentPost: PostInfo[];
  /** コメント一覧を設定する関数 */
  setCommentPost: React.Dispatch<React.SetStateAction<PostInfo[]>>;
  /** 選択された投稿 */
  selectPost: PostInfo | null;
  /** 選択投稿を設定する関数 */
  setSelectPost: React.Dispatch<React.SetStateAction<PostInfo | null>>;
}

/**
 * メインコンテンツ
 * pageの値に応じて適切なページコンポーネントを描画
 */
const MainContent = ({
  posts,
  setPosts,
  userName,
  page,
  setPage,
  commentPost,
  setCommentPost,
  selectPost,
  setSelectPost,
}: MainContentProps) => {
  // ページに応じたコンポーネントを表示
  switch (page) {
    case 'home':
      return (
        <HomePage
          posts={posts}
          setPosts={setPosts}
          userName={userName}
          setPage={setPage}
          setCommentPost={setCommentPost}
          setSelectPost={setSelectPost}
        />
      );

    case 'search':
      return (
        <SearchPage
          setPage={setPage}
          setCommentPost={setCommentPost}
          setSelectPost={setSelectPost}
        />
      );

    case 'comment':
      return (
        <CommentPage
          selectPost={selectPost}
          setSelectPost={setSelectPost}
          commentPost={commentPost}
          setCommentPost={setCommentPost}
          userName={userName}
          setPage={setPage}
        />
      );

    default:
      // 未知のページの場合はホームを表示
      return (
        <HomePage
          posts={posts}
          setPosts={setPosts}
          userName={userName}
          setPage={setPage}
          setCommentPost={setCommentPost}
          setSelectPost={setSelectPost}
        />
      );
  }
};

export default MainContent;
