import type { Metadata } from 'next';
import { getAllVoices } from '@/lib/content';
import { PageHero } from '@/components/site/PageHero';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'お客様の声',
  description: '茨城県阿見町の丸愛装業で外壁塗装・屋根塗装を行ったお客様の声。',
  alternates: { canonical: '/voice' },
};

export default async function VoicePage() {
  const voices = await getAllVoices().catch(() => []);
  return (
    <main className="relative">
      <PageHero
        eyebrow="Voice"
        title="お客様の声"
        description="工事を終えたお客様からいただいた、率直な感想です。"
      />
      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          {voices.length === 0 ? (
            <p className="text-center text-foreground-500">お客様の声は準備中です。</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {voices.map((v) => (
                <div key={v.id} className="bg-background-100 rounded-xl border border-background-200/70 p-6">
                  <div className="text-accent-400 tracking-widest mb-3">{'★'.repeat(v.rating)}<span className="text-background-300">{'★'.repeat(Math.max(0, 5 - v.rating))}</span></div>
                  {v.headline && <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2 leading-snug">{v.headline}</h3>}
                  {v.body && <p className="text-base text-foreground-600 leading-relaxed">{v.body}</p>}
                  {v.who && <p className="mt-4 text-sm text-foreground-500">{v.who}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
