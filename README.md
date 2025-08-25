# WordGuessr

日本限定のテキスト版 GeoGuessr。AI が生成する短文ヒントから日本の市町村を当てるゲーム。

## 技術スタック
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Leaflet / react-leaflet
- Supabase (Postgres)
- OpenAI 互換 API (OPENAI_API_KEY)

## セットアップ
1. 依存をインストール
```bash
npm i
```
2. 環境変数を設定（`.env.local` を作成）
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```
3. スキーマとポリシーを適用（Supabase の接続文字列を `SUPABASE_DB_URL` に）
```bash
npm run db:schema
npm run db:policies
```
4. 最小シード投入
```bash
npm run seed
```

## 開発
```bash
npm run dev
```

## デプロイ
- Vercel: Next.js をそのままデプロイ
- 環境変数: 上記4つを設定
- Supabase: 上記 SQL を適用し、シードを実行

## 出典・クレジット (/about にも記載)
- 自治体境界: Geolonia Japanese Admins (`https://geolonia.github.io/japanese-admins/`)
- 統計: e-Stat (`https://www.e-stat.go.jp/`)
- 観光: 観光庁 (`https://www.mlit.go.jp/kankocho/`)

## ライセンス
各データの配布条件に従います。
