import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPostSlugs, getPosts } from '@/lib/content';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, SITE } from '@/lib/seo';
import { PostDate } from '@/components/blog/PostDate';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getPostSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt ?? p.title,
    alternates: { canonical: `/blog/${slug}` },
  };
}

/**
 * 本文はプレーンテキスト。空行で段落を分け、「## 」で始まる行は小見出し、「・」「- 」で始まる行が続けば箇条書きにする。
 */
function Body({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, '\n').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="text-[1.0625rem] text-ink leading-[2] max-w-[38em] space-y-6">
      {blocks.map((b, i) => {
        if (b.startsWith('## ')) {
          return (
            <h2 key={i} className="!mt-12 first:!mt-0 border-l-4 border-accent pl-4 text-[clamp(1.375rem,1vw+1rem,1.75rem)] leading-snug max-w-none">
              {b.slice(3)}
            </h2>
          );
        }
        const lines = b.split('\n');
        if (lines.every((l) => /^(・|- )/.test(l))) {
          return (
            <ul key={i} role="list" className="grid gap-2 rounded-card bg-paper-2 border border-paper-3 px-5 py-4">
              {lines.map((l) => (
                <li key={l} className="flex gap-3">
                  <i className="ri-check-line mt-[0.45em] text-accent" aria-hidden="true"></i>
                  <span>{l.replace(/^(・|- )/, '')}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line">
            {b}
          </p>
        );
      })}
    </div>
  );
}

// 構成：題の帯（パンくず・Column・題・公開日）→ 本文（左）＋ 相談の案内（右、追従）→ ほかのコラム
export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();
  const others = (await getPosts().catch(() => [])).filter((x) => x.slug !== slug).slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    datePublished: p.published_at,
    author: { '@type': 'Organization', name: '株式会社 丸愛装業' },
    publisher: { '@id': `${SITE}/#business` },
    mainEntityOfPage: `${SITE}/blog/${slug}`,
  };

  return (
    <main className="relative">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'ホーム', url: '/' }, { name: 'コラム', url: '/blog' }, { name: p.title, url: `/blog/${slug}` }])} />

      <article className="bg-paper">
        {/* 題 */}
        <header className="bg-paper-2 border-b border-paper-3">
          <div className="container pt-[var(--space-xl)] pb-[var(--space-2xl)]">
            <nav aria-label="パンくずリスト" className="text-sm text-ink-2">
              <Link href="/" className="no-underline hover:underline">ホーム</Link>
              <i className="ri-arrow-right-s-line mx-1 align-middle text-muted" aria-hidden="true"></i>
              <Link href="/blog" className="no-underline hover:underline">コラム</Link>
            </nav>
            <div className="mt-8 max-w-[44em]">
              <p className="eyebrow">Column</p>
              <h1 className="mt-4 max-w-none text-[clamp(1.75rem,2.2vw+1rem,2.75rem)] leading-snug">{p.title}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <PostDate iso={p.published_at} />
                <span className="inline-flex items-center gap-1.5 text-sm text-ink-2">
                  <i className="ri-quill-pen-line text-muted" aria-hidden="true"></i>
                  株式会社 丸愛装業
                </span>
              </div>
              {p.excerpt && <p className="mt-6 text-lead text-ink-2 leading-relaxed">{p.excerpt}</p>}
            </div>
          </div>
        </header>

        <div className="container py-[var(--space-2xl)] grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
          {/* 本文 */}
          <div className="lg:col-span-8 min-w-0">
            {p.body ? <Body text={p.body} /> : null}
            <p className="mt-12">
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold text-ink no-underline hover:text-accent">
                <i className="ri-arrow-left-line" aria-hidden="true"></i>
                コラムの一覧へ
              </Link>
            </p>
          </div>

          {/* 相談の案内 */}
          <aside className="lg:col-span-4 min-w-0">
            <div className="lg:sticky lg:top-[108px] rounded-card bg-plate border border-paper-3 p-5 md:p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="grid place-items-center w-12 h-12 rounded-full bg-ink text-plate-ink font-display font-bold text-xl">丸</span>
                <div>
                  <p className="text-xs text-ink-2">茨城県阿見町の塗装店</p>
                  <p className="font-display font-bold text-[1.125rem] text-ink">株式会社 丸愛装業</p>
                </div>
              </div>
              <p className="text-[0.9375rem] text-ink-2 leading-relaxed">うちの家の場合はどうなのか、気になったらお気軽に。診断・お見積もりは無料です。</p>
              <div className="grid gap-3">
                <a href="/#simulation" className="btn btn--primary w-full">
                  <i className="ri-calculator-line text-xl" aria-hidden="true"></i>
                  うちの場合の概算を見る
                </a>
                <a href="tel:029-886-7913" className="btn btn--secondary w-full font-figure">
                  <i className="ri-phone-fill text-xl" aria-hidden="true"></i>
                  029-886-7913
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {others.length > 0 && (
        <section className="bg-paper-2 border-t border-paper-3">
          <div className="container py-[var(--space-2xl)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-title">ほかのコラム</h2>
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold no-underline hover:text-accent">
                コラムをすべて見る
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </Link>
            </div>
            <ul role="list" className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/blog/${o.slug}`}
                    className="group flex flex-col h-full rounded-card bg-plate border border-paper-3 p-5 no-underline text-ink hover:border-ink"
                  >
                    <PostDate iso={o.published_at} />
                    <span className="mt-2 font-display font-bold leading-snug group-hover:underline">{o.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
