import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES, SERVICE_LIST } from '@/lib/services';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE } from '@/lib/seo';

const LINE = 'https://line.me/ti/p/UxXZqXMSWE';
const AREAS = ['阿見町', '牛久市', '土浦市', 'つくば市', '取手市', '龍ケ崎市'];

export function generateStaticParams() {
  return SERVICE_LIST.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES[slug];
  if (!s) return {};
  return {
    title: `${s.name}｜阿見町の丸愛装業`,
    description: s.metaDescription,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES[slug];
  if (!s) notFound();

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: s.serviceType,
    name: s.name,
    url: `${SITE}/services/${s.slug}`,
    provider: { '@id': `${SITE}/#business` },
    areaServed: AREAS.map((name) => ({ '@type': 'City', name })),
  };

  return (
    <main className="relative">
      <JsonLd data={serviceJsonLd} />
      <Breadcrumbs items={[{ name: 'ホーム', url: '/' }, { name: 'サービス', url: '/services' }, { name: s.name, url: `/services/${s.slug}` }]} />

      <section className="w-full pt-8 pb-14 md:pb-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
          <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">Service</span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground-900 mb-4">{s.name}</h1>
          <p className="text-base md:text-lg text-foreground-600 leading-relaxed mb-10">{s.lead}</p>

          <div className="bg-background-100 rounded-xl border border-background-200/70 p-6 md:p-8">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-4">こんなサインはありませんか</h2>
            <ul className="space-y-3">
              {s.symptoms.map((sym) => (
                <li key={sym} className="flex items-start gap-2.5 text-base text-foreground-700">
                  <i className="ri-checkbox-circle-line text-primary-500 text-lg mt-0.5"></i>{sym}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-bold text-foreground-900">費用の目安：<span className="text-primary-700">{s.priceFrom}</span></p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href={LINE} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-green-500 text-background-50 font-semibold hover:bg-green-600 transition-colors">
              <i className="ri-line-fill text-lg"></i>LINEで無料相談
            </a>
            <Link href="/price" className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full border border-background-300/60 text-foreground-700 font-medium hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-colors">
              料金・概算を見る<i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-20 bg-background-100">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-900 mb-6">対応エリア</h2>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((name) => (
              <span key={name} className="px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-base text-foreground-700">{name}</span>
            ))}
          </div>
          {(s.slug === 'gaiheki-tosou' || s.slug === 'yane-tosou') && (
            <p className="mt-6">
              <Link href={`/${s.slug}/ami`} className="text-primary-600 hover:text-primary-700 font-medium">阿見町の{s.name}はこちら →</Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
