import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import ExamplesHero from '@/components/examples/ExamplesHero';
import ExampleGrid from '@/components/examples/ExampleGrid';
import ExamplesCTA from '@/components/examples/ExamplesCTA';

export const metadata: Metadata = {
  title: '施工事例',
  description:
    '茨城県阿見町の丸愛装業が手がけた外壁塗装・屋根塗装の施工事例。阿見町・牛久市・土浦市・つくば市を中心にビフォーアフターでご覧いただけます。',
  alternates: { canonical: '/works' },
};

export default function WorksPage() {
  return (
    <main className="relative scroll-smooth">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'ホーム', url: '/' },
          { name: '施工事例', url: '/works' },
        ])}
      />
      <ExamplesHero />
      <ExampleGrid />
      <ExamplesCTA />
    </main>
  );
}
