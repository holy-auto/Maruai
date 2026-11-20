import type { Metadata } from 'next';
import Link from 'next/link';
import AreaMap from '@/components/home/AreaMap';
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

      {/* 見出し：一段暗い面に、題名と一文と行動 */}
      <section className="bg-paper-2 border-b border-paper-3">
        <div className="container pt-[var(--space-xl)] pb-[var(--space-2xl)] grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Service</p>
            <h1 className="mt-4 text-[clamp(2.25rem,3vw+1rem,3.5rem)]">{splitName(s.name)}</h1>
            <p className="lead mt-5">{s.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={LINE} target="_blank" rel="nofollow noopener noreferrer" className="btn btn--primary">
                <i className="ri-line-fill text-xl" aria-hidden="true"></i>
                LINEで無料相談
              </a>
              <Link href="/price" className="btn btn--secondary">
                <i className="ri-calculator-line text-xl" aria-hidden="true"></i>
                料金・概算を見る
              </Link>
            </div>
          </div>
          {s.image && (
            <figure className="lg:col-span-5 m-0">
              <div className="photo relative aspect-[4/3]" data-slot="service-hero">
                <img src={s.image} alt={s.imageAlt ?? `${s.name}の施工写真`} width={1200} height={900} style={{ objectPosition: s.imagePosition ?? "50% 50%" }} />
              </div>
              {s.imageIsStock && <figcaption className="mt-2 text-xs text-muted">イメージ写真</figcaption>}
            </figure>
          )}
        </div>
      </section>

      {/* こんなサイン ＋ 費用の目安 */}
      <section className="bg-paper py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">
          <div className="lg:col-span-7">
            <p className="eyebrow">Check</p>
            <h2 className="mt-4 text-[clamp(1.625rem,1.6vw+1rem,2.5rem)]">こんなサインはありませんか</h2>
            <ul className="mt-8 grid gap-3">
              {s.symptoms.map((sym) => (
                <li key={sym} className="flex items-start gap-3 rounded-card bg-plate border border-paper-3 px-5 py-4 text-base text-ink">
                  <i className="ri-checkbox-circle-fill text-xl leading-7 text-accent" aria-hidden="true"></i>
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-2">ひとつでも当てはまれば、まずは無料の現地診断をどうぞ。</p>
          </div>
          <aside className="lg:col-span-5">
            <dl className="rounded-card bg-plate border border-paper-3 shadow-card p-6 md:p-8 lg:sticky lg:top-[108px]">
              <dt className="flex items-center gap-2 text-sm font-bold text-ink-2">
                <i className="ri-price-tag-3-line text-accent text-lg" aria-hidden="true"></i>費用の目安
              </dt>
              <dd className="m-0 mt-3 font-display font-bold text-[1.375rem] leading-snug text-ink tabular-nums">{s.priceFrom}</dd>
              <dd className="m-0 mt-6 grid gap-3">
                <Link href="/#simulation" className="btn btn--primary w-full">
                  <i className="ri-calculator-line text-xl" aria-hidden="true"></i>
                  うちの場合の概算を見る
                </Link>
                <a href="tel:029-886-7913" className="btn btn--secondary w-full font-figure">
                  <i className="ri-phone-fill text-xl" aria-hidden="true"></i>
                  029-886-7913
                </a>
              </dd>
            </dl>
          </aside>
        </div>
      </section>

      {/* 対応エリア：茨城県南部の地図 */}
      <section className="bg-paper-2 border-t border-paper-3 py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow">Area</p>
            <h2 className="mt-4 text-[clamp(1.625rem,1.6vw+1rem,2.5rem)]">対応エリア</h2>
            <p className="mt-5 text-base text-ink-2">
              {AREAS.join("・")}を中心に、すぐ駆けつけられる60分圏内で施工しています。
            </p>
            {(s.slug === 'gaiheki-tosou' || s.slug === 'yane-tosou') && (
              <Link href={`/${s.slug}/ami`} className="btn btn--secondary mt-6">
                <i className="ri-map-pin-2-line text-xl" aria-hidden="true"></i>
                阿見町の{s.name}はこちら
              </Link>
            )}
          </div>
          <div className="lg:col-span-7">
            <AreaMap />
          </div>
        </div>
      </section>
    </main>
  );
}
