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
  serviceListLabel,
}: {
  citySlug: string;
  serviceName: string; // 例: 外壁塗装
  serviceType: string; // JSON-LD用
  slugBase: string; // 例: gaiheki-tosou
  serviceListLabel: string; // パンくず用サービス名
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
    <>
      <JsonLd data={serviceAreaJsonLd(c, { serviceType, slugBase })} />
      <Breadcrumbs
        items={[
          { name: 'ホーム', url: '/' },
          { name: serviceName, url: `/services/${slugBase}` },
          { name: `${c.name}の${serviceName}`, url: `/${slugBase}/${c.slug}` },
        ]}
      />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">{c.name}の{serviceName}・屋根塗装</span>
            <h1>{c.name}で、<br /><span className="brush accent">塗るのはこの職人</span>です。</h1>
            <p className="lead">{c.name}を含む60分圏内に対応。営業も下請けもいない完全自社施工で、顔の見える職人がご相談から仕上げ・アフターまで担当します。</p>
            <div className="hero-cta">
              <a className="btn btn-ember" href={LINE}>LINEで無料相談</a>
              <a className="btn btn-ghost" href={TEL}>029-886-7913</a>
            </div>
          </div>
          <div className="hero-visual"><div className="photo-note">［ {c.name}での施工写真 ］</div><div className="hero-badge"><strong>この手が、</strong>お家を守ります。</div></div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">{c.name}の塗り替えについて</span><h2 className="mincho">{c.name}で、{serviceName}をお考えの方へ。</h2></div>
          <p style={{ maxWidth: '62ch', color: 'var(--ink-soft)' }}>{c.intro}</p>
          {c.climate_note && (
            <p style={{ marginTop: 18, maxWidth: '62ch', color: 'var(--ink-soft)', borderLeft: '3px solid var(--ember)', paddingLeft: 14 }}>{c.climate_note}</p>
          )}
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">施工事例</span><h2 className="mincho">{c.name}での施工事例</h2></div>
          {works.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)' }}>{c.name}での施工事例は準備中です。お問い合わせいただければ、近隣エリアの事例をご紹介します。</p>
          ) : (
            <div className="work-grid">
              {works.map((w) => (
                <article key={w.id} className="work">
                  <div className="ba">
                    {w.before_url ? <Image src={w.before_url} alt={`${c.name} ${w.service} 施工前`} width={400} height={400} /> : <div className="b">BEFORE</div>}
                    {w.after_url ? <Image src={w.after_url} alt={`${c.name} ${w.service} 施工後`} width={400} height={400} /> : <div className="a">AFTER</div>}
                  </div>
                  <div className="meta">
                    <span className="tag">{w.service}</span>
                    <h3 className="mincho">{w.title}</h3>
                    <p>{[w.paint, w.built_years ? `築${w.built_years}年` : null].filter(Boolean).join('・')}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {voices.length > 0 && (
        <section>
          <div className="wrap">
            <div className="sec-head"><span className="eyebrow">お客様の声</span><h2 className="mincho">{c.name}のお客様の声</h2></div>
            <div className="voice-grid">
              {voices.map((v) => (
                <div key={v.id} className="voice">
                  <div className="stars">{'★'.repeat(v.rating)}</div>
                  {v.headline && <div className="q mincho">{v.headline}</div>}
                  {v.body && <div className="body">{v.body}</div>}
                  {v.who && <div className="who">{v.who}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">費用の目安</span><h2 className="mincho">{c.name}の{serviceName}の費用</h2></div>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 18 }}>延床25坪・足場込・税抜で、シリコン塗装75万円〜。坪数とグレードを選ぶと、その場で概算が出せます。</p>
          <Link className="btn btn-ghost" href="/price">概算シミュレーターを使う →</Link>
        </div>
      </section>

      {nearby.length > 0 && (
        <section>
          <div className="wrap">
            <div className="sec-head"><span className="eyebrow">対応エリア</span><h2 className="mincho">近隣の対応エリア</h2></div>
            <div className="area-list">
              {nearby.map((n) => (
                <Link key={n.slug} href={`/${slugBase}/${n.slug}`}><span>{n.name}の{serviceName}</span></Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta">
        <div className="wrap">
          <h2 className="mincho">{c.name}で、もう一社お見積りを。</h2>
          <p>診断もお見積りも無料です。比べていただいて構いません。</p>
          <div className="cta-row">
            <a className="btn btn-line" href={LINE}>LINEで相談する</a>
            <a className="btn btn-white" href={TEL}>029-886-7913 に電話</a>
          </div>
        </div>
      </section>
    </>
  );
}

// 共通：generateStaticParams（全市町）
export async function regionStaticParams() {
  const cities = await getCities();
  return cities.map((c) => ({ city: c.slug }));
}
