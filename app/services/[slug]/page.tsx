import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES, SERVICE_LIST } from '@/lib/services';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE } from '@/lib/seo';

const LINE = 'https://line.me/ti/p/UxXZqXMSWE';

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
    areaServed: ['阿見町', '牛久市', '土浦市', 'つくば市', '取手市', '龍ケ崎市'].map((name) => ({ '@type': 'City', name })),
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Breadcrumbs items={[{ name: 'ホーム', url: '/' }, { name: 'サービス', url: '/services' }, { name: s.name, url: `/services/${s.slug}` }]} />
      <div className="page-hero"><div className="wrap"><span className="eyebrow">サービス</span><h1 className="mincho">{s.name}</h1><p>{s.lead}</p></div></div>
      <section>
        <div className="wrap">
          <div className="sec-head"><h2 className="mincho">こんなサインはありませんか</h2></div>
          <ul className="svc" style={{ listStyle: 'none', padding: 24, display: 'grid', gap: 10 }}>
            {s.symptoms.map((sym) => (
              <li key={sym} style={{ paddingLeft: '1.4em', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--brand)', fontWeight: 700 }}>✓</span>{sym}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 20, fontWeight: 700 }}>費用の目安：{s.priceFrom}</p>
          <div style={{ marginTop: 24, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a className="btn btn-line" href={LINE}>LINEで無料相談</a>
            <Link className="btn btn-ghost" href="/price">料金・概算を見る →</Link>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><h2 className="mincho">対応エリア</h2></div>
          <div className="area-list">
            {['ami', 'ushiku', 'tsuchiura', 'tsukuba', 'toride', 'ryugasaki'].map((c, i) => (
              <span key={c}>{['阿見町', '牛久市', '土浦市', 'つくば市', '取手市', '龍ケ崎市'][i]}</span>
            ))}
          </div>
          {(s.slug === 'gaiheki-tosou' || s.slug === 'yane-tosou') && (
            <p style={{ marginTop: 16 }}>
              <Link href={`/${s.slug}/ami`} style={{ color: 'var(--brand)' }}>阿見町の{s.name}はこちら →</Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
