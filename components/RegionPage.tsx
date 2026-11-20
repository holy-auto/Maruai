import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCities, getCity, getWorksByCity, getVoicesByCity } from '@/lib/content';
import { serviceAreaJsonLd } from '@/lib/seo';
import { JsonLd } from './JsonLd';
import { Breadcrumbs } from './Breadcrumbs';
import WorkLocator from './examples/WorkLocator';
import { isRealPhoto } from '@/lib/examples';

const LINE = 'https://line.me/ti/p/UxXZqXMSWE';
const TEL = 'tel:0298867913';

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-0.5 text-lg text-accent" role="img" aria-label={`5段階中${r}の評価`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < r ? 'ri-star-fill' : 'ri-star-line'} aria-hidden="true"></i>
      ))}
    </div>
  );
}

// 構成：パンくず → Banner（見出し 1〜7列、一文と行動 8〜12列）→ 塗り替えについて（paper-2 の帯、Split）
// → 施工事例（カード）→ お客様の声（カード）→ 費用（カード）→ 近隣エリア（リンクのカード）。最後の連絡先はフッターの帯が担う
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
      <section className="bg-paper-2 border-b border-paper-3">
        <div className="container pt-[var(--space-xl)] pb-[var(--space-2xl)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 items-center">
            <div className="md:col-span-7">
            <p className="eyebrow">Area</p>
            <h1 className="mt-4 text-[clamp(2rem,2.6vw+1rem,3.25rem)] [&>span]:inline-block">
              <span>{c.name}で、</span>
              <br />
              <span>塗るのはこの職人です。</span>
            </h1>
            <div className="mt-5">
              <p className="lead">{c.name}を含む60分圏内に対応。営業も下請けもいない完全自社施工で、顔の見える職人がご相談から仕上げ・アフターまで担当します。</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={LINE} target="_blank" rel="nofollow noopener noreferrer" className="btn btn--primary">
                  <i className="ri-line-fill text-xl" aria-hidden="true"></i>LINEで無料相談
                </a>
                <a href={TEL} className="btn btn--secondary font-figure tabular-nums">
                  <i className="ri-phone-line text-xl" aria-hidden="true"></i>029-886-7913
                </a>
              </div>
            </div>
            </div>
            <div className="md:col-span-5 rounded-card bg-plate border border-paper-3 p-4">
              <WorkLocator location={`茨城県${c.name}`} />
              <p className="mt-3 text-xs text-muted">茨城県南部の地図（{c.name}を朱で表示）</p>
            </div>
          </div>
        </div>
      </section>

      {/* 塗り替えについて：paper-2 の帯、見出し 1〜5列・本文 6〜12列 */}
      <section className="bg-paper py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
          <h2 className="md:col-span-5 text-[clamp(1.5rem,1.4vw+1rem,2.25rem)]">{c.name}で、{serviceName}をお考えの方へ。</h2>
          <div className="md:col-span-6 md:col-start-7 rounded-card bg-plate border border-paper-3 p-6 md:p-8">
            <p className="text-base text-ink-2 max-w-[38em]">{c.intro}</p>
            {c.climate_note && (
              <p className="mt-5 pt-5 border-t border-paper-3 text-base text-ink-2 max-w-[38em]"><i className="ri-sun-cloudy-line text-accent mr-1.5" aria-hidden="true"></i>{c.climate_note}</p>
            )}
          </div>
        </div>
      </section>

      {/* 施工事例：Grid（3列、写真は白黒、上端に墨の太線） */}
      <section className="bg-paper py-[calc(var(--section-gap)/2)]">
        <div className="container">
          <p className="eyebrow">Works</p>
          <h2 className="mt-4 max-w-none text-[clamp(1.5rem,1.4vw+1rem,2.25rem)]">{c.name}での施工事例</h2>
          {works.length === 0 ? (
            <p className="mt-6 rounded-card border border-dashed border-paper-3 bg-paper-2 px-5 py-4 text-sm text-ink-2">{c.name}での施工事例は準備中です。お問い合わせいただければ、近隣エリアの事例をご紹介します。</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {works.map((w) => (
                <article key={w.id} className="flex flex-col rounded-card bg-plate border border-paper-3 p-5">
                  {(isRealPhoto(w.before_url) || isRealPhoto(w.after_url)) && (
                  <div className="grid grid-cols-2 gap-2">
                    <figure className="photo relative m-0 aspect-square" data-slot="before">
                      {isRealPhoto(w.before_url) ? (
                        <Image src={w.before_url} alt={`${c.name} ${w.service} 施工前`} width={400} height={400} />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center label">施工前</span>
                      )}
                    </figure>
                    <figure className="photo relative m-0 aspect-square" data-slot="after">
                      {isRealPhoto(w.after_url) ? (
                        <Image src={w.after_url} alt={`${c.name} ${w.service} 施工後`} width={400} height={400} />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center label">施工後</span>
                      )}
                    </figure>
                  </div>
                  )}
                  <div>
                    {w.service && <p className="text-sm font-bold text-accent">{w.service}</p>}
                    <h3 className="mt-1 text-[1.1875rem]"><Link href={`/works/${w.id}`} className="no-underline hover:underline">{w.title}</Link></h3>
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
            <p className="eyebrow">Voice</p>
            <h2 className="mt-4 max-w-none text-[clamp(1.5rem,1.4vw+1rem,2.25rem)]">{c.name}のお客様の声</h2>
            <div className="mt-8 grid gap-4">
              {voices.map((v) => (
                <article key={v.id} className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 rounded-card bg-plate border border-paper-3 p-6">
                  <div className="md:col-span-5">
                    <Stars rating={v.rating} />
                    {v.headline && <h3 className="mt-3">{v.headline}</h3>}
                  </div>
                  <div className="md:col-span-6 md:col-start-7">
                    {v.body && <p className="text-base text-ink-2 max-w-[38em]">{v.body}</p>}
                    {v.who && <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-2"><i className="ri-user-smile-line text-muted" aria-hidden="true"></i>{v.who}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 費用：見出し 1〜6列、料金の一文と行動を板に（8〜12列） */}
      <section className="bg-paper-2 border-y border-paper-3 py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 items-start">
          <h2 className="md:col-span-6 text-[clamp(1.5rem,1.4vw+1rem,2.25rem)]">{c.name}の{serviceName}の費用</h2>
          <div className="md:col-span-5 md:col-start-8 rounded-card bg-plate border border-paper-3 shadow-card p-6 md:p-8">
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
            <h2 className="md:col-span-4 text-[clamp(1.5rem,1.4vw+1rem,2.25rem)]">近隣の対応エリア</h2>
            <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/${slugBase}/${n.slug}`}
                    className="flex items-center justify-between gap-3 min-h-[56px] rounded-card bg-plate border border-paper-3 px-5 text-base font-bold text-ink no-underline hover:border-ink"
                  >
                    <span className="inline-flex items-center gap-2"><i className="ri-map-pin-2-line text-accent" aria-hidden="true"></i>{n.name}の{serviceName}</span>
                    <i className="ri-arrow-right-line text-muted" aria-hidden="true"></i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

    </main>
  );
}

export async function regionStaticParams() {
  const cities = await getCities().catch(() => []);
  return cities.map((c) => ({ city: c.slug }));
}
