# WordGuessr

日本限定のテキスト版 GeoGuessr。AI が生成する短文ヒントから日本の市町村を当てるゲーム。

## 技術スタック

### フロントエンド
- **Next.js 15.5.0** (App Router, TypeScript)
- **React 19.1.1** (最新のReact Server Components対応)
- **Tailwind CSS 4.1.12** (最新のCSS-in-JS対応)
- **Framer Motion 12.23.12** (アニメーション)

### 地図・位置情報
- **Leaflet 1.9.4** (オープンソース地図ライブラリ)
- **react-leaflet 5.0.0** (React用Leafletラッパー)
- **@turf/centroid** (地理計算ライブラリ)

### AI・自然言語処理
- **OpenAI GPT-4o-mini** (ヒント生成)
- **Zod 3.25.76** (型安全なデータ検証)

### バックエンド・データベース
- **Next.js API Routes** (サーバーサイドAPI)
- **JWT認証** (jose 6.0.13)
- **JSONデータ** (市町村・特徴データ)

### 開発・ビルドツール
- **TypeScript 5.9.2** (型安全な開発)
- **PostCSS 8.5.6** (CSS処理)
- **ts-node 10.9.2** (TypeScript実行環境)

## 主要機能

### ゲームシステム
- **47都道府県の主要都市** (47都市)
- **3段階の難易度** (easy/normal/hard)
- **AI生成ヒント** (18-28文字の創造的な問題文)
- **リアルタイムスコアリング** (距離ベース)

### 特徴データ
- **7種類の特徴タイプ**:
  - `festival`: 祭り・イベント
  - `specialty`: 特産品・名物
  - `landmark`: ランドマーク・観光地
  - `food`: 郷土料理・食文化
  - `climate`: 気候・地理的特徴
  - `culture`: 文化・歴史
  - `history`: 歴史的背景

### レスポンシブデザイン
- **ビューポート高対応** (h-dvh)
- **グリッドレイアウト** (grid-rows)
- **モバイルファースト** (Tailwind CSS)

## セットアップ
1. 依存をインストール
```bash
npm i
```
2. 環境変数を設定（`.env.local` を作成）
```env
OPENAI_API_KEY=your_openai_api_key_here
```
3. 開発サーバー起動
```bash
npm run dev
```

## 開発

### データ構造
- **市町村データ**: `data/municipalities.json`
- **特徴データ**: `data/traits.json`
- **型定義**: `lib/types.ts`

### API エンドポイント
- `GET /api/round` - 新しいラウンド生成
- `POST /api/round/[id]/guess` - 回答提出
- `GET /api/round/[id]/reveal` - 正解・豆知識表示
- `GET /api/leaderboard` - リーダーボード

### コンポーネント構成
- `MapClient` - 地図表示のラッパー
- `MapInner` - Leaflet地図の実装
- `HintCard` - 問題文表示
- `ResultModal` - 結果表示
- `TopBar` - ヘッダーナビゲーション

## デプロイ
- **Vercel**: Next.js をそのままデプロイ
- **環境変数**: `OPENAI_API_KEY` を設定
- **静的生成**: 地図データは事前生成済み

## 出典・クレジット
- **自治体境界**: Geolonia Japanese Admins
- **統計データ**: e-Stat
- **観光情報**: 観光庁
- **地図タイル**: OpenStreetMap

## ライセンス
各データの配布条件に従います。
