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
    <div className="flex items-center gap-0.5 text-lg text-accent" role="img" aria-label={`5段階中${r}の評価`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < r ? 'ri-star-fill' : 'ri-star-line text-paper-3'} aria-hidden="true"></i>
      ))}
    </div>
  );
}

// 掲載までの流れ（架空の声は載せない、という方針をそのまま見せる）
const FLOW = [
  { icon: 'ri-paint-brush-line', t: '工事が完了', d: '完工後、お引き渡しの際にご感想をうかがいます。' },
  { icon: 'ri-survey-line', t: 'アンケート', d: '仕上がりや職人の対応について、率直にお書きいただきます。' },
  { icon: 'ri-shield-user-line', t: '掲載のご了承', d: 'お名前の出し方も含め、掲載してよいかを必ず確認します。' },
  { icon: 'ri-chat-quote-line', t: 'このページに掲載', d: 'ご了承いただいた声だけを、手を加えずに載せます。' },
];

// 構成：PageHero → 準備中は「掲載までの流れ」と施工事例への案内／掲載後はお客様の声のカード
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

      <section className="bg-paper pb-[var(--section-gap)]">
        <div className="container">
          {voices.length === 0 ? (
            <div className="grid gap-8">
              <div className="rounded-card bg-paper-2 border border-paper-3 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 items-center">
                <div className="lg:col-span-7">
                  <span className="grid place-items-center w-12 h-12 rounded-full bg-plate border border-paper-3 text-accent" aria-hidden="true">
                    <i className="ri-chat-heart-line text-2xl"></i>
                  </span>
                  <h2 className="mt-4 text-[clamp(1.5rem,1.4vw+1rem,2.125rem)]">お客様の声は、ただいま準備中です。</h2>
                  <p className="mt-4 text-base text-ink-2 max-w-[38em] leading-relaxed">
                    丸愛装業では、実際に工事をされたお客様から掲載のご了承をいただいた声だけを載せています。
                    作った口コミや、手を加えた感想は載せません。順次ご紹介しますので、それまでは施工事例をご覧ください。
                  </p>
                </div>
                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link href="/works" className="btn btn--primary">
                    <i className="ri-home-4-line text-xl" aria-hidden="true"></i>施工事例を見る
                  </Link>
                  <Link href="/contact" className="btn btn--secondary">
                    <i className="ri-mail-line text-xl" aria-hidden="true"></i>お問い合わせ
                  </Link>
                </div>
              </div>

              <div>
                <h2 className="text-title">お客様の声を掲載するまで</h2>
                <ol className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {FLOW.map((f, i) => (
                    <li key={f.t} className="relative rounded-card bg-plate border border-paper-3 p-5">
                      <div className="flex items-center gap-3">
                        <span className="grid place-items-center w-11 h-11 rounded-full bg-paper-2 text-ink" aria-hidden="true">
                          <i className={`${f.icon} text-xl`}></i>
                        </span>
                        <span className="font-figure font-bold text-gold tracking-[0.12em]">STEP {i + 1}</span>
                      </div>
                      <h3 className="mt-3 text-[1.1875rem]">{f.t}</h3>
                      <p className="mt-1.5 text-sm text-ink-2 leading-relaxed">{f.d}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-ink-2">
                <span className="font-figure font-bold text-ink text-lg tabular-nums">{voices.length}</span> 件のお声
              </p>
              <ul role="list" className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {voices.map((v) => (
                  <li key={v.id}>
                    <article className="relative h-full flex flex-col rounded-card bg-plate border border-paper-3 p-6 pt-8">
                      <i
                        className="ri-double-quotes-l absolute -top-4 left-5 w-9 h-9 grid place-items-center rounded-full bg-accent text-accent-ink text-xl"
                        aria-hidden="true"
                      ></i>
                      <div className="flex items-center justify-between gap-3">
                        <Stars rating={v.rating} />
                        {v.service && (
                          <span className="rounded-[4px] bg-paper-2 border border-paper-3 px-2.5 py-0.5 text-xs font-bold text-ink whitespace-nowrap">
                            {v.service}
                          </span>
                        )}
                      </div>
                      {v.headline && <h2 className="mt-4 text-[1.25rem] leading-snug">{v.headline}</h2>}
                      {v.body && <p className="mt-3 flex-1 text-[0.9375rem] text-ink-2 leading-relaxed">{v.body}</p>}
                      <div className="mt-5 pt-4 border-t border-paper-3 flex items-center justify-between gap-3">
                        <p className="flex items-center gap-1.5 text-sm text-ink">
                          <i className="ri-user-smile-line text-muted" aria-hidden="true"></i>
                          {v.who ?? 'お客様'}
                        </p>
                        {v.work_id && (
                          <Link href={`/works/${v.work_id}`} className="inline-flex items-center gap-1 text-sm font-bold no-underline hover:text-accent whitespace-nowrap">
                            この工事を見る<i className="ri-arrow-right-line" aria-hidden="true"></i>
                          </Link>
                        )}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted">※ 掲載しているお客様の声は、ご本人の了承を得て、手を加えずに掲載しています。</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
