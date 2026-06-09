import type { Metadata } from 'next';
import { getAllVoices } from '@/lib/content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'お客様の声',
  description: '茨城県阿見町の丸愛装業で外壁塗装・屋根塗装を行ったお客様の声。',
  alternates: { canonical: '/voice' },
};

export default async function VoicePage() {
  const voices = await getAllVoices().catch(() => []);
  return (
    <>
      <div className="page-hero"><div className="wrap"><span className="eyebrow">いただいた声</span><h1 className="mincho">お客様の声</h1><p>工事を終えたお客様からいただいた、率直な感想です。</p></div></div>
      <section>
        <div className="wrap">
          {voices.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)' }}>お客様の声は準備中です。</p>
          ) : (
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
          )}
        </div>
      </section>
    </>
  );
}
