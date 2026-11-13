import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllVoices } from '@/lib/content';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import { PageHero } from '@/components/site/PageHero';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'お客様の声',
  description: '茨城県阿見町の丸愛装業で外壁塗装・屋根塗装を行ったお客様の声。',
  alternates: { canonical: '/voice' },
};

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-0.5 text-lg" role="img" aria-label={`5段階中${r}の評価`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < r ? 'ri-star-fill text-accent-400' : 'ri-star-line text-background-300'}></i>
      ))}
    </div>
  );
}

export default async function VoicePage() {
  const voices = await getAllVoices().catch(() => []);

  return (
    <main className="relative">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'ホーム', url: '/' },
          { name: 'お客様の声', url: '/voice' },
        ])}
      />
      <PageHero
        eyebrow="Voice"
        title="お客様の声"
        description="工事を終えたお客様からいただいた、率直な感想です。"
      />

      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          {voices.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center bg-background-100 rounded-xl border border-background-200/70 p-8 md:p-10">
              <div className="w-14 h-14 flex items-center justify-center bg-primary-50 rounded-full mx-auto mb-4 border border-primary-200/60">
                <i className="ri-chat-smile-2-line text-primary-600 text-2xl"></i>
              </div>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-3">お客様の声は準備中です</h2>
              <p className="text-base text-foreground-600 leading-relaxed mb-6">
                工事を終えたお客様から、掲載のご了承をいただいたものから順にご紹介します。
                それまでは、施工事例のビフォーアフターをご覧ください。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/works" className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full bg-primary-500 text-background-50 font-semibold hover:bg-primary-600 transition-colors">
                  <i className="ri-image-line"></i>施工事例を見る
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full border border-background-300/60 text-foreground-700 font-medium hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-colors">
                  <i className="ri-mail-line"></i>お問い合わせ
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {voices.map((v) => (
                  <article
                    key={v.id}
                    className="flex flex-col bg-background-100 rounded-xl border border-background-200/70 p-6"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <Stars rating={v.rating} />
                      {v.service && (
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold whitespace-nowrap">
                          {v.service}
                        </span>
                      )}
                    </div>
                    {v.headline && (
                      <h2 className="font-heading text-lg font-bold text-foreground-900 mb-2 leading-snug">{v.headline}</h2>
                    )}
                    {v.body && (
                      <p className="flex-1 text-base text-foreground-600 leading-relaxed">
                        <i className="ri-double-quotes-l text-accent-400 mr-1"></i>
                        {v.body}
                      </p>
                    )}
                    <div className="mt-4 pt-4 border-t border-background-200/70 flex items-center justify-between gap-3">
                      <p className="text-sm text-foreground-500">{v.who ?? 'お客様'}</p>
                      {v.work_id && (
                        <Link href={`/works/${v.work_id}`} className="text-sm font-medium text-primary-700 hover:text-primary-800 whitespace-nowrap">
                          施工事例を見る<i className="ri-arrow-right-s-line align-middle"></i>
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-8 text-sm text-foreground-500 text-center">
                ※ 掲載しているお客様の声は、ご本人の了承を得て掲載しています。
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
