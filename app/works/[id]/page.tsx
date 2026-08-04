import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { examples } from '@/lib/examples';
import { JsonLd } from '@/components/JsonLd';
import { SITE, breadcrumbJsonLd } from '@/lib/seo';
import ExampleDetail from '@/components/examples/ExampleDetail';
import ExamplesCTA from '@/components/examples/ExamplesCTA';

export function generateStaticParams() {
  return examples.map((ex) => ({ id: ex.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const ex = examples.find((e) => e.id === id);
  if (!ex) return {};
  return {
    title: `${ex.title}｜施工事例`,
    description: `${ex.title}（${ex.category}・${ex.location}・${ex.area}）。${ex.description}`,
    alternates: { canonical: `/works/${id}` },
    openGraph: { images: [ex.afterImage] },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const example = examples.find((e) => e.id === id);
  if (!example) notFound();

  const related = examples
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
