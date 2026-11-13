import type { Metadata } from 'next';
import { ContactForm } from './ContactForm';
import { PageHero } from '@/components/site/PageHero';

const LINE = 'https://line.me/ti/p/UxXZqXMSWE';
const TEL = 'tel:0298867913';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: '茨城県阿見町の外壁塗装・丸愛装業へのお問い合わせ。診断・お見積りは無料。LINE・お電話・フォームからどうぞ。',
  alternates: { canonical: '/contact' },
};

// 構成：Banner → Form beside the facts（電話・LINE の事実を左 5列、フォームの板を右 6列）
export default function ContactPage() {
  return (
    <main className="relative">
      <PageHero
        title="お問い合わせ"
        description="ご相談はどのような事でもお気軽にどうぞ。3営業日以内にご返信します。"
      />
      <section className="bg-paper pt-[var(--space-lg)] pb-[calc(var(--section-gap)/2)]">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 items-start">
          <div className="md:col-span-5">
            <h2>お電話・LINEが早いです</h2>

            <div className="mt-8 rule-bar">
              <div className="py-6 border-b-hair border-paper-3">
                <p className="label">TEL（平日 9:00〜18:00）</p>
                <a
                  href={TEL}
                  className="link mt-2 inline-flex items-center gap-2 font-figure font-bold text-[length:var(--text-3xl)] leading-none tabular-nums no-underline hover:underline"
                >
                  <i className="ri-phone-line text-2xl" aria-hidden="true"></i>
                  029-886-7913
                </a>
              </div>
              <div className="py-6 border-b-hair border-paper-3">
                <a href={LINE} className="btn btn--secondary">
                  <i className="ri-line-fill text-xl" aria-hidden="true"></i>
                  LINEで相談する
                </a>
              </div>
              <p className="pt-6 text-base text-ink-2">
                FAX：<span className="font-figure tabular-nums">029-886-5499</span>
                <br />
                Instagram：<a href="https://www.instagram.com/maruaisougyou" className="link">@maruaisougyou</a>
              </p>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
