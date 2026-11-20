import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQS, FAQ_CATEGORIES } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { faqJsonLd } from '@/lib/seo';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'よくある質問',
  description: '外壁塗装の見積もり・工事期間・火災保険・支払い方法など、丸愛装業によくいただくご質問をまとめました。',
  alternates: { canonical: '/faq' },
};

// 構成：PageHero → 分類の目次（左、追従）＋ 分類ごとの質問（開閉できるカード）→ 解決しないときの連絡先
export default function FaqPage() {
  return (
    <main className="relative">
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHero
        eyebrow="FAQ"
        title="よくある質問"
        description="お問い合わせの前に、よくいただくご質問をまとめました。"
      />

      <section className="bg-paper pb-[var(--section-gap)]">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-start">
          {/* 分類の目次 */}
          <nav aria-label="質問の分類" className="lg:col-span-3 lg:sticky lg:top-[108px]">
            <ul className="flex lg:flex-col gap-2 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 pb-1 lg:pb-0 [scrollbar-width:none]">
              {FAQ_CATEGORIES.map((c) => (
                <li key={c.key} className="shrink-0">
                  <a
                    href={`#faq-${c.key}`}
                    className="flex items-center gap-2.5 rounded-control border border-paper-3 bg-plate px-4 py-3 text-sm font-bold text-ink no-underline hover:border-ink whitespace-nowrap"
                  >
                    <i className={`${c.icon} text-lg text-accent`} aria-hidden="true"></i>
                    {c.label}
                    <span className="ml-auto pl-3 font-figure text-xs text-muted tabular-nums">
                      {FAQS.filter((f) => f.cat === c.key).length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 分類ごとの質問 */}
          <div className="lg:col-span-9 grid gap-12">
            {FAQ_CATEGORIES.map((c) => (
              <div key={c.key} id={`faq-${c.key}`} className="scroll-mt-[120px]">
                <h2 className="flex items-center gap-3 text-[clamp(1.375rem,1vw+1rem,1.75rem)]">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-paper-2 text-accent" aria-hidden="true">
                    <i className={`${c.icon} text-xl`}></i>
                  </span>
                  {c.label}
                </h2>
                <div className="mt-5 grid gap-3">
                  {FAQS.filter((f) => f.cat === c.key).map((f, i) => (
                    <details
                      key={f.q}
                      open={c.key === 'cost' && i === 0}
                      className="group rounded-card bg-plate border border-paper-3 open:shadow-card [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex items-start gap-4 cursor-pointer list-none px-5 md:px-6 py-5">
                        <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full bg-accent text-accent-ink font-figure font-bold" aria-hidden="true">
                          Q
                        </span>
                        <span className="flex-1 pt-0.5 font-display font-bold text-[1.125rem] md:text-[1.25rem] leading-snug text-ink">
                          {f.q}
                        </span>
                        <i
                          className="ri-add-line shrink-0 mt-1 text-xl text-ink-2 transition-transform group-open:rotate-45"
                          aria-hidden="true"
                        ></i>
                      </summary>
                      <div className="flex items-start gap-4 px-5 md:px-6 pb-6">
                        <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full bg-ink text-plate-ink font-figure font-bold" aria-hidden="true">
                          A
                        </span>
                        <p className="flex-1 pt-1 text-[0.9375rem] md:text-base text-ink-2 leading-[1.9] max-w-[40em]">{f.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}

            {/* 解決しないとき */}
            <div className="rounded-card bg-paper-2 border border-paper-3 p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <p className="font-display font-bold text-title text-ink">ここにない質問は、お気軽にどうぞ。</p>
                <p className="mt-2 text-[0.9375rem] text-ink-2">お電話・LINE・フォームのどれでも、代表が直接お答えします。</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:029-886-7913" className="btn btn--secondary font-figure">
                  <i className="ri-phone-fill text-xl" aria-hidden="true"></i>
                  029-886-7913
                </a>
                <Link href="/contact" className="btn btn--primary">
                  <i className="ri-mail-line text-xl" aria-hidden="true"></i>
                  質問を送る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
