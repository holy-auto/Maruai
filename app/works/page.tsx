import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentWorks } from '@/lib/content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: '施工事例',
  description: '茨城県阿見町の丸愛装業が手がけた外壁塗装・屋根塗装の施工事例。Before / After でご覧ください。',
  alternates: { canonical: '/works' },
};

export default async function WorksPage() {
  const works = await getRecentWorks(60).catch(() => []);
  return (
    <>
      <div className="page-hero"><div className="wrap"><span className="eyebrow">塗り替えの記録</span><h1 className="mincho">施工事例</h1><p>丸愛装業が手がけた塗り替えの記録です。Before / After でご覧ください。</p></div></div>
      <section>
        <div className="wrap">
          {works.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)' }}>施工事例は準備中です。</p>
          ) : (
            <div className="work-grid">
              {works.map((w) => (
                <Link key={w.id} className="work" href={`/works/${w.id}`}>
                  <div className="ba">
                    {w.before_url ? <Image src={w.before_url} alt={`${w.title} 施工前`} width={400} height={400} /> : <div className="b">BEFORE</div>}
                    {w.after_url ? <Image src={w.after_url} alt={`${w.title} 施工後`} width={400} height={400} /> : <div className="a">AFTER</div>}
                  </div>
                  <div className="meta"><span className="tag">{w.service}</span><h3 className="mincho">{w.title}</h3><p>{[w.paint, w.built_years ? `築${w.built_years}年` : null].filter(Boolean).join('・')}</p></div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
