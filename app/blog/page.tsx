import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/content';
import { PageHero } from '@/components/site/PageHero';
import { PostDate } from '@/components/blog/PostDate';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'お役立ちコラム',
  description: '外壁塗装の時期の見分け方、火災保険の使い方、塗料グレードの選び方など、塗り替え前に知っておきたい情報をお届けします。',
  alternates: { canonical: '/blog' },
};

// 記事がまだない間も、知りたいことにはサイト内の該当ページから答えられるようにしておく
const TOPICS = [
  { icon: 'ri-calendar-check-line', title: '塗り替えの時期の見分け方', text: '築7〜10年が目安。チョーキングやひび割れなど、自分で確かめられるサイン。', href: '/#reason', cta: '見分け方を見る' },
  { icon: 'ri-price-tag-3-line', title: '塗料グレードの選び方', text: 'シリコン・フッ素・無機。耐用年数と価格の違いを図で比べる。', href: '/price', cta: 'プランを比べる' },
  { icon: 'ri-pie-chart-2-line', title: '見積もりが高くなる理由', text: '営業会社と下請けのあいだで、費用の何割が消えているか。', href: '/#moneyflow', cta: 'お金の流れを見る' },
  { icon: 'ri-shield-check-line', title: '火災保険は使える？', text: '台風・強風・雹による被害は、火災保険の対象になる場合があります。', href: '/faq#faq-cost', cta: 'よくある質問へ' },
];

// 構成：PageHero → 記事（最新は大きく、残りはカード）／記事がない間は「準備中」と、知りたいことへの近道
export default async function BlogPage() {
  const posts = await getPosts().catch(() => []);
  const [latest, ...rest] = posts;

  return (
    <main className="relative">
      <PageHero
        eyebrow="Column"
        title="塗り替え前に、知っておきたいこと。"
        description="職人の目線で、塗り替えの時期・塗料・費用のことを書いています。"
      />

      <section className="bg-paper pb-[var(--section-gap)]">
        <div className="container">
          {latest ? (
            <>
              {/* 最新の記事 */}
              <Link
                href={`/blog/${latest.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5 rounded-card bg-plate border border-paper-3 p-6 md:p-10 no-underline text-ink hover:border-ink hover:shadow-card transition-shadow"
              >
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-[4px] bg-accent px-2 py-0.5 text-xs font-bold text-accent-ink">新着</span>
                    <PostDate iso={latest.published_at} />
                  </div>
                  <h2 className="mt-4 max-w-none text-[clamp(1.5rem,1.6vw+1rem,2.25rem)] leading-snug decoration-1 underline-offset-[0.2em] group-hover:underline">
                    {latest.title}
                  </h2>
                  {latest.excerpt && <p className="mt-4 text-base text-ink-2 leading-relaxed max-w-[38em]">{latest.excerpt}</p>}
                </div>
                <div className="lg:col-span-4 flex lg:justify-end lg:items-end">
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-ink group-hover:text-accent">
                    記事を読む
                    <i className="ri-arrow-right-line" aria-hidden="true"></i>
                  </span>
                </div>
              </Link>

              {/* そのほかの記事 */}
              {rest.length > 0 && (
                <ul role="list" className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group flex flex-col h-full rounded-card bg-plate border border-paper-3 p-6 no-underline text-ink hover:border-ink hover:shadow-card transition-shadow"
                      >
                        <PostDate iso={p.published_at} />
                        <h2 className="mt-3 max-w-none text-[1.25rem] leading-snug decoration-1 underline-offset-[0.2em] group-hover:underline">{p.title}</h2>
                        {p.excerpt && <p className="mt-3 text-[0.9375rem] text-ink-2 leading-relaxed line-clamp-3">{p.excerpt}</p>}
                        <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-bold text-ink group-hover:text-accent">
                          記事を読む
                          <i className="ri-arrow-right-line" aria-hidden="true"></i>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              {/* 準備中 */}
              <div className="rounded-card bg-paper-2 border border-paper-3 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="shrink-0 grid place-items-center w-12 h-12 rounded-full bg-plate border border-paper-3 text-accent" aria-hidden="true">
                  <i className="ri-quill-pen-line text-2xl"></i>
                </span>
                <div>
                  <p className="font-display font-bold text-title text-ink">コラムは、ただいま準備中です。</p>
                  <p className="mt-1 text-[0.9375rem] text-ink-2">記事ができるまでは、下のページで同じ内容をご覧いただけます。</p>
                </div>
              </div>

              <h2 className="mt-[var(--space-2xl)] text-title">よく聞かれること</h2>
              <ul role="list" className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {TOPICS.map((t) => (
                  <li key={t.title}>
                    <Link
                      href={t.href}
                      className="group flex flex-col h-full rounded-card bg-plate border border-paper-3 p-6 no-underline text-ink hover:border-ink hover:shadow-card transition-shadow"
                    >
                      <span className="grid place-items-center w-11 h-11 rounded-full bg-paper-2 text-accent" aria-hidden="true">
                        <i className={`${t.icon} text-xl`}></i>
                      </span>
                      <span className="mt-4 font-display font-bold text-[1.1875rem] leading-snug">{t.title}</span>
                      <span className="mt-2 text-[0.9375rem] text-ink-2 leading-relaxed">{t.text}</span>
                      <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-bold group-hover:text-accent">
                        {t.cta}
                        <i className="ri-arrow-right-line" aria-hidden="true"></i>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
