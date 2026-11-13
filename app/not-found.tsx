import Link from 'next/link';

// 構成：Banner（見出し 1〜7列、404 の数字を 9〜12列に大きく、下に墨の太線）→ 一文と、トップへ戻る主ボタン
export default function NotFound() {
  return (
    <main className="relative">
      <section className="bg-paper">
        <div className="container pt-[var(--space-3xl)] pb-[calc(var(--section-gap-l)/2)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end border-b-bar border-ink pb-[var(--space-xl)]">
            <h1 className="md:col-span-7 text-display-s">ページが見つかりませんでした</h1>
            <p className="order-first md:order-none md:col-span-4 md:col-start-9 md:text-right font-figure font-bold leading-[0.9] text-[clamp(6rem,16vw,14rem)] text-ink tabular-nums">
              404
            </p>
          </div>
          <div className="mt-[var(--space-xl)] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 items-start">
            <p className="lead md:col-span-7">お探しのページは削除されたか、URLが間違っている可能性があります。</p>
            <div className="md:col-span-4 md:col-start-9 md:flex md:justify-end">
              <Link href="/" className="btn btn--primary">
                <i className="ri-home-smile-line text-xl" aria-hidden="true"></i>
                トップへ戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
