import type { Metadata } from 'next';
import { FAQS } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'よくある質問',
  description: '外壁塗装の見積もり・工事期間・火災保険・支払い方法など、丸愛装業によくいただくご質問をまとめました。',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <div className="page-hero"><div className="wrap"><span className="eyebrow">ご相談の前に</span><h1 className="mincho">よくある質問</h1><p>お問い合わせの前に、よくいただくご質問をまとめました。</p></div></div>
      <section>
        <div className="wrap faq">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="ans">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
