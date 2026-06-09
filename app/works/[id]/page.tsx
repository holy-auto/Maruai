import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getWork, getAllWorkIds } from '@/lib/content';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const revalidate = 3600;

export async function generateStaticParams() {
  const ids = await getAllWorkIds().catch(() => []);
  return ids.map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const w = await getWork(Number(id));
  if (!w) return {};
  const sub = [w.paint, w.built_years ? `築${w.built_years}年` : null].filter(Boolean).join('・');
  return {
    title: `${w.title}｜施工事例`,
    description: `${w.title}（${w.service}${sub ? '・' + sub : ''}）の施工事例。茨城県阿見町の丸愛装業による完全自社施工。`,
    alternates: { canonical: `/works/${id}` },
  };
}

export default async function WorkDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const w = await getWork(Number(id));
  if (!w) notFound();

  return (
    <>
      <Breadcrumbs items={[{ name: 'ホーム', url: '/' }, { name: '施工事例', url: '/works' }, { name: w.title, url: `/works/${id}` }]} />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 880 }}>
          <span className="eyebrow">{w.service}</span>
          <h1 className="mincho" style={{ fontSize: 'clamp(1.6rem,4vw,2.3rem)', margin: '.4em 0 .6em' }}>{w.title}</h1>
          <p style={{ color: 'var(--slate)', marginBottom: 24 }}>{[w.paint, w.built_years ? `築${w.built_years}年` : null].filter(Boolean).join('・')}</p>
          <div className="work" style={{ marginBottom: 24 }}>
            <div className="ba">
              {w.before_url ? <Image src={w.before_url} alt={`${w.title} 施工前`} width={600} height={600} /> : <div className="b">BEFORE</div>}
              {w.after_url ? <Image src={w.after_url} alt={`${w.title} 施工後`} width={600} height={600} /> : <div className="a">AFTER</div>}
            </div>
          </div>
          {w.body && <p style={{ color: 'var(--ink-soft)', lineHeight: 1.9 }}>{w.body}</p>}
        </div>
      </section>
    </>
  );
}
