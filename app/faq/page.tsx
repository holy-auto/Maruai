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

// 構成：Banner → Rows（質問を1〜5列、答えを6〜12列。行の間は細い罫。答えは常に見える）
export default function FaqPage() {
  return (
    <main className="relative">
      <JsonLd data={faqJsonLd(FAQS)} />
      <PageHero
        title="よくある質問"
        description="お問い合わせの前に、よくいただくご質問をまとめました。"
      />
      <section className="bg-paper pb-[calc(var(--section-gap-l)/2)]">
        <div className="container">
          <dl className="border-b border-paper-3">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 py-8 border-t border-paper-3 first:border-t-0"
              >
                <dt className="md:col-span-5 font-display font-bold text-title text-ink">{f.q}</dt>
                <dd className="md:col-span-7 text-base text-ink-2 max-w-[38em]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
