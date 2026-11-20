import Link from 'next/link';

// 404：一段暗い面に、見出しと一文、主な行き先へのリンク
export default function NotFound() {
  const links = [
    { href: '/', icon: 'ri-home-4-line', t: 'トップページ' },
    { href: '/services', icon: 'ri-paint-brush-line', t: 'サービス' },
    { href: '/price', icon: 'ri-price-tag-3-line', t: '料金' },
    { href: '/works', icon: 'ri-image-line', t: '施工事例' },
    { href: '/contact', icon: 'ri-mail-line', t: 'お問い合わせ' },
  ];
  return (
    <main className="relative">
      <section className="bg-paper-2 border-b border-paper-3">
        <div className="container pt-[var(--space-3xl)] pb-[var(--space-2xl)] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">404 Not Found</p>
            <h1 className="mt-4 text-[clamp(2rem,2.6vw+1rem,3.25rem)]">ページが見つかりませんでした</h1>
            <p className="lead mt-5">お探しのページは削除されたか、URLが間違っている可能性があります。</p>
          </div>
          <p aria-hidden="true" className="md:col-span-4 md:text-right font-figure font-bold leading-none text-[clamp(5rem,12vw,9rem)] text-paper-3 tabular-nums">
            404
          </p>
        </div>
      </section>
      <section className="bg-paper py-[var(--section-gap-s)]">
        <div className="container">
          <p className="text-title font-display font-bold text-ink">こちらからお探しください</p>
          <ul className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex flex-col items-center gap-2 rounded-card bg-plate border border-paper-3 px-3 py-5 text-sm font-bold text-ink no-underline hover:border-ink">
                  <i className={`${l.icon} text-2xl text-accent`} aria-hidden="true"></i>
                  {l.t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
