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
    <>
      <JsonLd data={articleJsonLd} />
      <Breadcrumbs items={[{ name: 'ホーム', url: '/' }, { name: 'コラム', url: '/blog' }, { name: p.title, url: `/blog/${slug}` }]} />
      <article className="section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p style={{ fontSize: '.8rem', color: 'var(--slate)' }}>{new Date(p.published_at).toLocaleDateString('ja-JP')}</p>
          <h1 className="mincho" style={{ fontSize: 'clamp(1.6rem,4vw,2.3rem)', margin: '.3em 0 1em' }}>{p.title}</h1>
          <div style={{ color: 'var(--ink-soft)', lineHeight: 1.95, whiteSpace: 'pre-wrap' }}>{p.body}</div>
        </div>
      </article>
    </>
  );
}
