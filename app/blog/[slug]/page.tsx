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
    <main className="relative">
      <JsonLd data={articleJsonLd} />
      <Breadcrumbs items={[{ name: 'ホーム', url: '/' }, { name: 'コラム', url: '/blog' }, { name: p.title, url: `/blog/${slug}` }]} />
      <article className="w-full py-10 md:py-14 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-3xl mx-auto">
          <p className="text-sm text-foreground-500">{new Date(p.published_at).toLocaleDateString('ja-JP')}</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground-900 mt-2 mb-8">{p.title}</h1>
          <div className="text-base text-foreground-700 leading-loose whitespace-pre-wrap">{p.body}</div>
        </div>
      </article>
    </main>
  );
}
