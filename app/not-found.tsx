import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative">
      <section className="w-full pt-36 pb-24 bg-background-50">
        <div className="w-full px-4 max-w-2xl mx-auto text-center">
          <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-3">404</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground-900 mb-4">
            ページが見つかりませんでした
          </h1>
          <p className="text-foreground-600 text-base mb-8">
            お探しのページは削除されたか、URLが間違っている可能性があります。
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-500 text-background-50 text-base font-semibold hover:bg-primary-600 transition-colors"
          >
            <i className="ri-home-smile-line"></i>
            トップへ戻る
          </Link>
        </div>
      </section>
    </main>
  );
}
