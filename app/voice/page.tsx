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
    <div className="flex items-center gap-0.5 text-xl text-ink" role="img" aria-label={`5段階中${r}の評価`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < r ? 'ri-star-fill' : 'ri-star-line'} aria-hidden="true"></i>
      ))}
    </div>
  );
}

// 構成：Banner → 準備中は Split（見出し 1〜6列、理由と行動 7〜12列）／掲載後は Grid（3列、上端に墨の太線、枠なし）
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
        title="お客様の声"
        description="工事を終えたお客様からいただいた、率直な感想です。"
      />

      <section className="bg-paper pb-[calc(var(--section-gap-l)/2)]">
        <div className="container">
          {voices.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 pt-[var(--space-lg)]">
              <h2 className="md:col-span-6">お客様の声は準備中です</h2>
              <div className="md:col-span-5 md:col-start-8">
                <p className="text-base text-ink-2 max-w-[38em]">
                  工事を終えたお客様から、掲載のご了承をいただいたものから順にご紹介します。
                  それまでは、施工事例のビフォーアフターをご覧ください。
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/works" className="btn btn--primary">
                    <i className="ri-image-line text-xl" aria-hidden="true"></i>施工事例を見る
                  </Link>
                  <Link href="/contact" className="btn btn--secondary">
                    <i className="ri-mail-line text-xl" aria-hidden="true"></i>お問い合わせ
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {voices.map((v) => (
                  <article key={v.id} className="rule-bar flex flex-col pt-6">
                    <div className="flex items-center justify-between gap-3">
                      <Stars rating={v.rating} />
                      {v.service && <p className="label whitespace-nowrap">{v.service}</p>}
                    </div>
                    {v.headline && <h2 className="mt-4 text-title">{v.headline}</h2>}
                    {v.body && <p className="mt-3 flex-1 text-base text-ink-2">{v.body}</p>}
                    <div className="mt-6 pt-4 border-t-hair border-paper-3 flex items-center justify-between gap-3">
                      <p className="label">{v.who ?? 'お客様'}</p>
                      {v.work_id && (
                        <Link href={`/works/${v.work_id}`} className="link text-sm font-medium whitespace-nowrap">
                          施工事例を見る
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <p className="label mt-12">※ 掲載しているお客様の声は、ご本人の了承を得て掲載しています。</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
