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

export default function FaqPage() {
  return (
    <main className="relative">
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHero
        eyebrow="FAQ"
        title="よくある質問"
        description="お問い合わせの前に、よくいただくご質問をまとめました。"
      />
      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-3xl mx-auto space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group bg-background-100 rounded-xl border border-background-200/70 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-5 py-4 md:px-6 md:py-5 font-heading font-bold text-base md:text-lg text-foreground-900">
                <span className="flex items-start gap-2">
                  <i className="ri-question-line text-primary-500 mt-0.5"></i>
                  {f.q}
                </span>
                <i className="ri-arrow-down-s-line text-foreground-400 text-xl transition-transform group-open:rotate-180"></i>
              </summary>
              <div className="px-5 pb-5 md:px-6 md:pb-6 text-base text-foreground-600 leading-relaxed border-t border-background-200/70 pt-4">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
