import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCities, getCity, getWorksByCity, getVoicesByCity } from '@/lib/content';
import { serviceAreaJsonLd } from '@/lib/seo';
import { JsonLd } from './JsonLd';
import { Breadcrumbs } from './Breadcrumbs';

const LINE = 'https://line.me/ti/p/UxXZqXMSWE';
const TEL = 'tel:0298867913';

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

      <section className="w-full pt-6 pb-14 md:pb-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
          <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">{c.name}の{serviceName}・屋根塗装</span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground-900 mb-4">{c.name}で、<br /><span className="text-primary-700">塗るのはこの職人</span>です。</h1>
          <p className="text-base md:text-lg text-foreground-600 leading-relaxed mb-6">{c.name}を含む60分圏内に対応。営業も下請けもいない完全自社施工で、顔の見える職人がご相談から仕上げ・アフターまで担当します。</p>
          <div className="flex flex-wrap gap-3">
            <a href={LINE} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-green-500 text-background-50 font-semibold hover:bg-green-600 transition-colors"><i className="ri-line-fill text-lg"></i>LINEで無料相談</a>
            <a href={TEL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-background-300/60 text-foreground-700 font-medium hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-colors"><i className="ri-phone-line"></i>029-886-7913</a>
          </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-20 bg-background-100">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">{c.name}の塗り替えについて</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-900">{c.name}で、{serviceName}をお考えの方へ。</h2>
          </div>
          <p className="text-base text-foreground-600 leading-relaxed max-w-3xl">{c.intro}</p>
          {c.climate_note && (
            <p className="mt-5 text-base text-foreground-600 leading-relaxed max-w-3xl border-l-4 border-accent-400 pl-4">{c.climate_note}</p>
          )}
        </div>
      </section>

      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">Works</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-900">{c.name}での施工事例</h2>
          </div>
          {works.length === 0 ? (
            <p className="text-center text-foreground-500">{c.name}での施工事例は準備中です。お問い合わせいただければ、近隣エリアの事例をご紹介します。</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {works.map((w) => (
                <article key={w.id} className="bg-background-100 rounded-xl border border-background-200/70 overflow-hidden">
                  <div className="grid grid-cols-2 h-40">
                    {w.before_url ? <Image src={w.before_url} alt={`${c.name} ${w.service} 施工前`} width={400} height={400} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center bg-background-200 text-foreground-400 text-sm">BEFORE</div>}
                    {w.after_url ? <Image src={w.after_url} alt={`${c.name} ${w.service} 施工後`} width={400} height={400} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center bg-background-300 text-foreground-500 text-sm">AFTER</div>}
                  </div>
                  <div className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">{w.service}</span>
                    <h3 className="font-heading text-lg font-bold text-foreground-900 mt-2 leading-snug">{w.title}</h3>
                    <p className="text-sm text-foreground-500 mt-1">{[w.paint, w.built_years ? `築${w.built_years}年` : null].filter(Boolean).join('・')}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {voices.length > 0 && (
        <section className="w-full py-14 md:py-20 bg-background-100">
          <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">Voice</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-900">{c.name}のお客様の声</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {voices.map((v) => (
                <div key={v.id} className="bg-background-50 rounded-xl border border-background-200/70 p-6">
                  <div className="text-accent-400 tracking-widest mb-3">{'★'.repeat(v.rating)}<span className="text-background-300">{'★'.repeat(Math.max(0, 5 - v.rating))}</span></div>
                  {v.headline && <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2 leading-snug">{v.headline}</h3>}
                  {v.body && <p className="text-base text-foreground-600 leading-relaxed">{v.body}</p>}
                  {v.who && <p className="mt-4 text-sm text-foreground-500">{v.who}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">Price</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-900 mb-3">{c.name}の{serviceName}の費用</h2>
          <p className="text-base text-foreground-600 leading-relaxed mb-6">延床25坪・足場込・税抜で、シリコン塗装75万円〜。坪数とグレードを選ぶと、その場で概算が出せます。</p>
          <Link href="/price" className="inline-flex items-center gap-1.5 px-8 py-3.5 rounded-full bg-primary-500 text-background-50 font-semibold hover:bg-primary-600 transition-colors">概算シミュレーターを使う<i className="ri-arrow-right-line"></i></Link>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="w-full py-14 md:py-20 bg-background-100">
          <div className="w-full px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">Area</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-900">近隣の対応エリア</h2>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {nearby.map((n) => (
                <Link key={n.slug} href={`/${slugBase}/${n.slug}`} className="px-4 py-2 rounded-full bg-background-50 border border-background-200/70 text-base text-foreground-700 hover:border-primary-300 hover:text-primary-700 transition-colors">{n.name}の{serviceName}</Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full py-14 md:py-20 bg-primary-700 text-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{c.name}で、もう一社お見積りを。</h2>
          <p className="text-background-100/85 mb-6">診断もお見積りも無料です。比べていただいて構いません。</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={LINE} className="px-8 py-3.5 rounded-full bg-green-500 text-background-50 font-semibold hover:bg-green-600 transition-colors">LINEで相談する</a>
            <a href={TEL} className="px-8 py-3.5 rounded-full bg-background-50 text-primary-700 font-semibold hover:bg-background-100 transition-colors">029-886-7913 に電話</a>
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
