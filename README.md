# 丸愛装業 コーポレートサイト（Next.js 15 / Supabase / Vercel）

完全自社施工の塗装会社サイト。実URL・SSG/ISR・構造化データ・地域ページ・概算シミュレーターまで実装済み。

## セットアップ

```bash
npm install
cp .env.example .env.local   # 値を埋める
npm run dev
```

### 1. 環境変数（.env.local）
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`（本番ドメイン。メタ・OGP・sitemap・JSON-LDの絶対URLに使用）

### 2. データベース
`supabase/schema.sql` を Supabase の SQL Editor で実行。テーブル・RLS・阿見町シードまで入ります。

### 3. 画像
`next.config.ts` の `images.remotePatterns` を自分の Supabase Storage ホストに。
OGP用に `public/ogp.jpg`（1200×630）、`public/logo.png` を配置。

## ルート構成
```
/                         トップ
/services                 サービス一覧
/services/[slug]          サービス詳細（gaiheki-tosou / yane-tosou / caulking / bousui）
/works  /works/[id]       施工事例（一覧 / 1件1URL）
/price                    料金＋概算シミュレーター
/voice                    お客様の声
/company                  会社概要・代表挨拶・職人
/faq                      よくある質問（FAQPage JSON-LD）
/contact                  お問い合わせ
/gaiheki-tosou/[city]     地域×外壁塗装（ami / ushiku / ...）
/yane-tosou/[city]        地域×屋根塗装
/blog  /blog/[slug]       コラム
/sitemap.xml  /robots.txt 自動生成
```

## SEOの要点
- 各ページ固有の title / description / canonical（`generateMetadata`）
- `LocalBusiness`（layout）／`Service`／`BreadcrumbList`／`Article` の JSON-LD
- 地域ページは各市の `intro`・施工事例・お客様の声で固有性を確保（薄い量産ページにしない）
- 公開後：Search Console 登録 → sitemap 送信、GA4、Googleビジネスプロフィール整備、Rich Results Test

## 差し替えが必要な箇所
- `［　］` 表記すべて（職人歴・資格・各市intro・事例・声・コラム本文）
- `lib/seo.ts` の geo 座標（GBPの正確なピン）
- 写真（ヒーロー・サービス・施工事例・代表）
- `lib/faq.ts` の支払い方法の回答

## デプロイ
Vercel に接続し、環境変数を設定して push するだけ。ISR（`revalidate=3600`）で事例追加もビルド不要で反映。
