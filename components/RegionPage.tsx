import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCities, getCity, getWorksByCity, getVoicesByCity } from '@/lib/content';
import { serviceAreaJsonLd } from '@/lib/seo';
import { JsonLd } from './JsonLd';
import { Breadcrumbs } from './Breadcrumbs';

const LINE = 'https://line.me/ti/p/UxXZqXMSWE';
const TEL = 'tel:0298867913';

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-0.5 text-xl text-ink" role="img" aria-label={`5段階中${r}の評価`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < r ? 'ri-star-fill' : 'ri-star-line'} aria-hidden="true"></i>
      ))}
    </div>
  );
}

// 構成：パンくず → Banner（見出し 1〜7列、一文と行動 8〜12列）→ 塗り替えについて（paper-2 の帯、Split）
// → 施工事例（Grid）→ お客様の声（Rows）→ 費用（見出しと板）→ 近隣エリア（Index）→ 墨の帯（Statement と連絡先）
export async function RegionPage({
  citySlug,
  serviceName,
  serviceType,
  slugBase,
}: {
  citySlug: string;
  serviceName: string;
  serviceType: string;
  slugBase: string;
  serviceListLabel?: string;
}) {
  const c = await getCity(citySlug);
  if (!c) notFound();

  const [works, voices, cities] = await Promise.all([
    getWorksByCity(citySlug),
    getVoicesByCity(citySlug),
    getCities(),
  ]);
  const nearby = cities.filter((x) => c.nearby.includes(x.slug));

  return (
    <main className="relative">
      <JsonLd data={serviceAreaJsonLd(c, { serviceType, slugBase })} />
      <Breadcrumbs
        items={[
          { name: 'ホーム', url: '/' },
          { name: serviceName, url: `/services/${slugBase}` },
          { name: `${c.name}の${serviceName}`, url: `/${slugBase}/${c.slug}` },
        ]}
      />

      {/* Banner */}
      <section className="bg-paper">
        <div className="container pt-[var(--space-2xl)] pb-[calc(var(--section-gap)/2)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end border-b-bar border-ink pb-[var(--space-xl)]">
            <h1 className="md:col-span-7 text-display-s">
              {c.name}で、
              <br />
              塗るのはこの職人です。
            </h1>
            <div className="md:col-span-5">
              <p className="lead">{c.name}を含む60分圏内に対応。営業も下請けもいない完全自社施工で、顔の見える職人がご相談から仕上げ・アフターまで担当します。</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={LINE} className="btn btn--primary">
                  <i className="ri-line-fill text-xl" aria-hidden="true"></i>LINEで無料相談
                </a>
                <a href={TEL} className="btn btn--secondary font-figure tabular-nums">
                  <i className="ri-phone-line text-xl" aria-hidden="true"></i>029-886-7913
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 塗り替えについて：paper-2 の帯、見出し 1〜5列・本文 6〜12列 */}
      <section className="bg-paper-2 py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
          <h2 className="md:col-span-5">{c.name}で、{serviceName}をお考えの方へ。</h2>
          <div className="md:col-span-6 md:col-start-7 md:pt-3">
            <p className="text-base text-ink-2 max-w-[38em]">{c.intro}</p>
            {c.climate_note && (
              <p className="mt-6 pt-6 border-t-hair border-paper-3 text-base text-ink-2 max-w-[38em]">{c.climate_note}</p>
            )}
          </div>
        </div>
      </section>

      {/* 施工事例：Grid（3列、写真は白黒、上端に墨の太線） */}
      <section className="bg-paper py-[calc(var(--section-gap)/2)]">
        <div className="container">
          <h2 className="max-w-none">{c.name}での施工事例</h2>
          {works.length === 0 ? (
            <p className="mt-8 text-base text-ink-2 max-w-[38em]">{c.name}での施工事例は準備中です。お問い合わせいただければ、近隣エリアの事例をご紹介します。</p>
          ) : (
            <div className="mt-[var(--space-xl)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {works.map((w) => (
                <article key={w.id} className="flex flex-col">
                  <div className="grid grid-cols-2 gap-1">
                    <figure className="photo m-0 aspect-square" data-slot="before">
                      {w.before_url ? (
                        <Image src={w.before_url} alt={`${c.name} ${w.service} 施工前`} width={400} height={400} />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center label">施工前</span>
                      )}
                    </figure>
                    <figure className="photo m-0 aspect-square" data-slot="after">
                      {w.after_url ? (
                        <Image src={w.after_url} alt={`${c.name} ${w.service} 施工後`} width={400} height={400} />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center label">施工後</span>
                      )}
                    </figure>
                  </div>
                  <div className="mt-4 pt-4 border-t-hair border-paper-3">
                    {w.service && <p className="label">{w.service}</p>}
                    <h3 className="mt-1">{w.title}</h3>
                    <p className="mt-1 text-sm text-ink-2">{[w.paint, w.built_years ? `築${w.built_years}年` : null].filter(Boolean).join('・')}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* お客様の声：Rows（見出し 1〜5列、本文 6〜12列、行の間は細線） */}
      {voices.length > 0 && (
        <section className="bg-paper py-[calc(var(--section-gap)/2)]">
          <div className="container">
            <h2 className="max-w-none">{c.name}のお客様の声</h2>
            <div className="mt-[var(--space-xl)] rule-bar divide-y divide-paper-3 border-b-hair border-paper-3">
              {voices.map((v) => (
                <article key={v.id} className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 py-6 md:py-8">
                  <div className="md:col-span-5">
                    <Stars rating={v.rating} />
                    {v.headline && <h3 className="mt-3">{v.headline}</h3>}
                  </div>
                  <div className="md:col-span-6 md:col-start-7">
                    {v.body && <p className="text-base text-ink-2 max-w-[38em]">{v.body}</p>}
                    {v.who && <p className="label mt-3">{v.who}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 費用：見出し 1〜6列、料金の一文と行動を板に（8〜12列） */}
      <section className="bg-paper py-[calc(var(--section-gap-l)/2)]">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 items-start">
          <h2 className="md:col-span-6">{c.name}の{serviceName}の費用</h2>
          <div className="plate md:col-span-5 md:col-start-8 p-6 md:p-8">
            <p className="text-base text-ink">延床25坪・足場込・税抜で、シリコン塗装75万円〜。坪数とグレードを選ぶと、その場で概算が出せます。</p>
            <Link href="/price" className="btn btn--secondary mt-6">
              <i className="ri-calculator-line text-xl" aria-hidden="true"></i>概算シミュレーターを使う
            </Link>
          </div>
        </div>
      </section>

      {/* 近隣エリア：Index（細線で区切ったリンクの列） */}
      {nearby.length > 0 && (
        <section className="bg-paper py-[calc(var(--section-gap)/2)]">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
            <h2 className="md:col-span-4">近隣の対応エリア</h2>
            <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t-hair border-paper-3">
              {nearby.map((n) => (
                <li key={n.slug} className="border-b-hair border-paper-3">
                  <Link
                    href={`/${slugBase}/${n.slug}`}
                    className="link flex items-center min-h-[56px] text-base no-underline hover:underline"
                  >
                    {n.name}の{serviceName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 墨の帯：最後のひと押し */}
      <section className="grained grained--light bg-ink text-plate-ink py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 items-end">
          <div className="md:col-span-7">
            <h2 className="text-plate-ink">{c.name}で、もう一社お見積りを。</h2>
            <p className="mt-4 text-base text-plate-ink max-w-[38em]">診断もお見積りも無料です。比べていただいて構いません。</p>
          </div>
          <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
            <a href={LINE} className="btn btn--on-ink">
              <i className="ri-line-fill text-xl" aria-hidden="true"></i>LINEで相談する
            </a>
            <a href={TEL} className="btn btn--on-ink">
              <span className="font-figure tabular-nums">029-886-7913</span> に電話
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function regionStaticParams() {
  const cities = await getCities().catch(() => []);
  return cities.map((c) => ({ city: c.slug }));
}
