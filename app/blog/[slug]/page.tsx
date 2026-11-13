import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, getPostSlugs } from '@/lib/content';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE } from '@/lib/seo';

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

// 構成：パンくず → Banner（題 1〜8列、日付 9〜12列、下に墨の太線）→ 本文（行長 38em）
export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();

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
      <Breadcrumbs items={[{ name: 'ホーム', url: '/' }, { name: 'コラム', url: '/blog' }, { name: p.title, url: `/blog/${slug}` }]} />
      <article className="bg-paper">
        <div className="container pt-[var(--space-2xl)] pb-[calc(var(--section-gap-l)/2)]">
          <header className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 items-end border-b-bar border-ink pb-[var(--space-xl)]">
            <h1 className="md:col-span-8 text-display-s">{p.title}</h1>
            <p className="label md:col-span-4 md:text-right">
              <time dateTime={p.published_at} className="font-figure text-base tabular-nums">
                {new Date(p.published_at).toLocaleDateString('ja-JP')}
              </time>
            </p>
          </header>
          <div className="mt-[var(--space-xl)] max-w-[38em] text-base text-ink leading-[1.75] whitespace-pre-wrap">{p.body}</div>
        </div>
      </article>
    </main>
  );
}
