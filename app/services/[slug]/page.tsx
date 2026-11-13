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

// 和文の見出しを語の途中で折り返さないよう、括弧の前で分けて inline-block にする
function splitName(name: string) {
  return name.split(/(?=（)/).map((part) => (
    <span key={part} className="inline-block">
      {part}
    </span>
  ));
}

// hero: Banner（見出し・一文・行動だけ）· sections: Rows ＋ 費用の板 · Band ink（対応エリア）
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

      {/* hero: 見出し（1〜7列）、一文と行動（8〜12列）、下に墨の太線 */}
      <section className="bg-paper">
        <div className="container pt-[var(--space-xl)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 items-end border-b-bar border-ink pb-[var(--space-xl)]">
            <h1 className="lg:col-span-7 text-display">{splitName(s.name)}</h1>
            <div className="lg:col-span-5">
              <p className="lead">{s.lead}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={LINE} className="btn btn--primary">
                  <i className="ri-line-fill text-xl" aria-hidden="true"></i>
                  LINEで無料相談
                </a>
                <Link href="/price" className="btn btn--secondary">
                  料金・概算を見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rows：問いを1〜5列、サインの行と費用の板を6〜12列 */}
      <section className="bg-paper py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
          <h2 className="lg:col-span-5">こんなサインはありませんか</h2>
          <div className="lg:col-span-7">
            <ul className="border-t-bar border-ink">
              {s.symptoms.map((sym) => (
                <li key={sym} className="flex items-start gap-3 py-5 border-b-hair border-paper-3 text-lg text-ink">
                  <i className="ri-check-line text-xl leading-8 text-ink" aria-hidden="true"></i>
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
            <dl className="plate mt-12 p-6 md:p-8">
              <dt className="label">費用の目安</dt>
              <dd className="mt-2 font-display font-bold text-title text-ink tabular-nums">{s.priceFrom}</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* Band ink：対応エリアの6市町を大きな字で */}
      <section className="bg-ink text-plate-ink grained grained--light py-[var(--section-gap)]">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
          <h2 className="lg:col-span-4 text-plate-ink">対応エリア</h2>
          <div className="lg:col-span-8">
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-8 border-t-hair border-muted">
              {AREAS.map((name) => (
                <li
                  key={name}
                  className="py-6 border-b-hair border-muted font-display font-bold text-section leading-tight text-plate-ink"
                >
                  {name}
                </li>
              ))}
            </ul>
            {(s.slug === 'gaiheki-tosou' || s.slug === 'yane-tosou') && (
              <p className="mt-10">
                <Link href={`/${s.slug}/ami`} className="btn btn--on-ink">
                  阿見町の{s.name}はこちら
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
