# 公開即応マニュアル（LAUNCH）

目標：**友達のOKが出た瞬間に、数分で本番公開できる状態**にしておく。
ポイントは「stagingで本番同等に動かす（ただし noindex）」→「フラグとドメインだけ切り替える」。

---

## A. いま準備しておくこと（OK前・自分だけで完了できる）

1. **Supabase**：プロジェクト作成 → `supabase/schema.sql` 実行（阿見シードまで入る）
2. **GitHub**：このプロジェクトをpush
3. **Vercel**：GitHubリポを接続。環境変数をセット：
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_ENV=staging` ← これでサイトは **noindex**（勝手にインデックスされない）
   - `NEXT_PUBLIC_SITE_URL` は仮で vercel.app のURLでOK
4. デプロイ → `xxxx.vercel.app` で**本番同等に動く**。友達にはこのURLを見せる。
5. **DNSのTTLを下げておく**（既存 maruai-sougyo.com を引き継ぐ場合）。例：3600→300。切替が即反映になる。
6. GA4プロパティ・Search Consoleのアカウントだけ先に用意（検証は公開後）。

> staging中は `robots.txt` が全Disallow＋全ページ `noindex` になる仕組み済み（`lib/seo.ts` の `IS_PRODUCTION`）。安心して公開URLを共有できる。

---

## B. OKが出た瞬間にやること（数分〜DNS反映待ち）

1. 実素材を反映してpush（写真／各市intro／`［　］`差し替え／geo座標）
2. Vercelの環境変数を本番に：
   - `NEXT_PUBLIC_SITE_ENV=production`
   - `NEXT_PUBLIC_SITE_URL=https://www.maruai-sougyo.com`（本番ドメイン）
   - → 再デプロイで **robotsがallowに・noindex解除**
3. Vercelに**本番ドメインを追加** → DNS切替（TTL下げ済みなら即〜数分）
4. 旧サイトがある場合は**旧URL → 新URLへ301リダイレクト**
5. **Search Console**で所有権確認 → `sitemap.xml` を送信
6. GA4 計測開始

---

## C. 公開直後の確認（5分チェック）

- [ ] `https://本番/robots.txt` が `Allow: /` ＋ sitemap 行になっている
- [ ] トップのソースに `noindex` が**残っていない**
- [ ] `https://本番/sitemap.xml` が出る
- [ ] LocalBusiness を Rich Results Test でエラー0
- [ ] スマホ表示・電話/LINEリンク・シミュレーターが動く

---

## D. 公開後（集客・継続）

- **Googleビジネスプロフィール**整備＋クチコミ獲得（地域集客の最大レバー。NAPをサイトと一致）
- 施工事例・各市intro・コラムを追加（ISRなのでビルド不要）

---

### 切替まとめ（これだけ覚えればOK）
```
staging  : NEXT_PUBLIC_SITE_ENV=staging      （noindex・誰でも見れる仮公開）
本番公開 : NEXT_PUBLIC_SITE_ENV=production   ＋ 本番ドメイン接続
```
