import type { Metadata } from 'next';
import { FAQS } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { faqJsonLd } from '@/lib/seo';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'よくある質問',
  description: '外壁塗装の見積もり・工事期間・火災保険・支払い方法など、丸愛装業によくいただくご質問をまとめました。',
  alternates: { canonical: '/faq' },
};

// 構成：Banner → Rows（質問ごとに細線で区切った開閉式の行。質問は左の7列、答えはその下）
export default function FaqPage() {
  return (
    <main className="relative">
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHero
        title="よくある質問"
        description="お問い合わせの前に、よくいただくご質問をまとめました。"
      />
      <section className="bg-paper pb-[calc(var(--section-gap-l)/2)]">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-x-8">
          <div className="md:col-span-10 divide-y divide-paper-3 border-b-hair border-paper-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group">
                <summary className="grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-10 items-start gap-x-8 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden group/q">
                  <span className="md:col-span-7 font-display font-bold text-title text-ink [font-feature-settings:'palt'] decoration-1 underline-offset-[0.2em] group-hover/q:underline">
                    {f.q}
                  </span>
                  <span className="md:col-span-3 justify-self-end flex items-center h-[1.4em] text-title text-ink">
                    <i className="ri-add-line text-2xl group-open:hidden" aria-hidden="true"></i>
                    <i className="ri-subtract-line text-2xl hidden group-open:block" aria-hidden="true"></i>
                  </span>
                </summary>
                <div className="grid grid-cols-1 md:grid-cols-10 gap-x-8 pb-8">
                  <p className="md:col-span-7 text-base text-ink-2 max-w-[38em]">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
