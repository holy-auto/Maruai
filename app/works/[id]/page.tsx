import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWork, getWorks, getAllWorkIds, workToExample } from '@/lib/content';
import { JsonLd } from '@/components/JsonLd';
import { SITE, breadcrumbJsonLd } from '@/lib/seo';
import ExampleDetail from '@/components/examples/ExampleDetail';
import ExamplesCTA from '@/components/examples/ExamplesCTA';

export const revalidate = 3600;

export async function generateStaticParams() {
  const ids = await getAllWorkIds().catch(() => []);
  return ids.map((id) => ({ id: String(id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const w = await getWork(Number(id));
  if (!w) return {};
  const ex = workToExample(w);
  return {
    title: `${ex.title}｜施工事例`,
    description: `${ex.title}（${ex.category}・${ex.location}・${ex.area}）。${ex.description}`,
    alternates: { canonical: `/works/${id}` },
    openGraph: ex.afterImage ? { images: [ex.afterImage] } : undefined,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const w = await getWork(Number(id));
  if (!w) notFound();

  const example = workToExample(w);

  const all = await getWorks().catch(() => []);
  const related = all
    .map(workToExample)
    .filter((e) => e.id !== example.id && e.category === example.category)
    .slice(0, 3);

  const pageUrl = `${SITE}/works/${example.id}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: example.title,
    description: example.description,
    image: example.afterImage,
    url: pageUrl,
    author: { '@type': 'Organization', name: '株式会社 丸愛装業' },
    publisher: { '@type': 'Organization', name: '株式会社 丸愛装業' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };

  return (
    <main className="relative scroll-smooth">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'ホーム', url: '/' },
          { name: '施工事例', url: '/works' },
          { name: example.title, url: `/works/${example.id}` },
        ])}
      />
      <JsonLd data={articleLd} />
      <ExampleDetail example={example} related={related} />
      <ExamplesCTA />
    </main>
  );
}
