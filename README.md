# Twitter-like SNS

Twitter風のシンプルなSNSアプリケーション。Web版とデスクトップ版（Tauri）の両方を提供します。

## 🚀 機能

- 📝 投稿（ツイート）作成
- 💬 コメント機能
- 🔍 投稿検索
- 📊 トレンドトピック表示
- 👤 ユーザー名設定
- ♾️ 無限スクロール

## 🏗️ プロジェクト構成

```
twitter-like-sns-shs/
├── client/          # Webクライアント（React + Vite）
├── server/          # バックエンドサーバー（Deno + Hono）
├── tauri/           # デスクトップアプリ（Tauri）
└── tests/           # テスト
```

## 📋 技術スタック

### フロントエンド（Client / Tauri）
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- React Infinite Scroll

### バックエンド（Server）
- Deno
- Hono（軽量Webフレームワーク）
- MongoDB + Mongoose
- TinySegmenter（日本語形態素解析）

### デスクトップアプリ
- Tauri
- Rust

## 🛠️ セットアップ

### 前提条件

- Node.js（v18以上推奨）
- Deno（v1.40以上推奨）
- MongoDB
- Rust & Cargo（Tauriアプリ開発時）

### 1. リポジトリのクローン

```bash
git clone https://github.com/yourusername/twitter-like-sns-shs.git
cd twitter-like-sns-shs
```

### 2. 環境変数の設定

サーバーディレクトリに環境変数を設定（必要に応じて）：

```bash
# MongoDB接続URL（デフォルト: mongodb://localhost:27017/Tweet）
export MONGO_URL=mongodb://localhost:27017/Tweet
```

### 3. バックエンドサーバーの起動

```bash
cd server
deno task start
```

サーバーはデフォルトで `http://localhost:8000` で起動します。

### 4. Webクライアントの起動

新しいターミナルウィンドウで：

```bash
cd client
npm install
npm run dev
```

クライアントは `http://localhost:5173` で起動します。

### 5. デスクトップアプリの起動（オプション）

```bash
cd tauri
npm install
npm run tauri dev
```

## 🎮 使い方

### 基本操作

1. **投稿作成**: 上部のテキストエリアに内容を入力し「ツイート」ボタンをクリック
2. **コメント**: 投稿の💬アイコンをクリックしてコメントページへ移動
3. **検索**: 左サイドバーの検索アイコンから投稿を検索
4. **ユーザー名設定**: 左サイドバーの「ユーザー名を設定」ボタンから変更

### API エンドポイント

サーバーは以下のエンドポイントを提供します：

- `POST /:password/api/tweet/get` - 投稿一覧取得
- `POST /:password/api/tweet/comment/get` - コメント取得
- `POST /:password/api/tweet/post` - 投稿作成
- `POST /:password/api/tweet/search` - 投稿検索
- `POST /:password/api/tweet/trend` - トレンド取得

> **注意**: APIにはパスワード認証が必要です（デフォルト: `password`）

## 📁 主要なディレクトリ構造

### Client

```
client/src/
├── components/      # UIコンポーネント
│   ├── common/      # 共通コンポーネント
│   └── pages/       # ページコンポーネント
├── api/             # API クライアント
├── types/           # TypeScript 型定義
└── App.tsx          # メインアプリケーション
```

### Server

```
server/
├── main.ts          # APIサーバー
├── mod.ts           # タイムライン生成ロジック
└── models/          # Mongooseモデル
```

## 🧪 テスト

```bash
cd tests
deno task start
```

## 🔧 開発

### ビルド

#### Webクライアント
```bash
cd client
npm run build
```

#### デスクトップアプリ
```bash
cd tauri
npm run tauri build
```

### リント

```bash
cd client
npm run lint
```

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更を加える場合は、まずissueを開いて変更内容を議論してください。

## 📧 お問い合わせ

質問や提案がある場合は、Issueを作成してください。

---

Made with ❤️ using React, Deno, and Tauri
