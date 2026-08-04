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

export default function ContactPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Contact"
        title="お問い合わせ"
        description="ご相談はどのような事でもお気軽にどうぞ。3営業日以内にご返信します。"
      />
      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <div className="bg-background-100 rounded-xl border border-background-200/70 p-6 md:p-8">
              <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">Tel / LINE</span>
              <h2 className="font-heading text-xl font-bold text-foreground-900 mb-4">お電話・LINEが早いです</h2>
              <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg border border-primary-200/50 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary-500 rounded-full text-background-50"><i className="ri-phone-line text-lg"></i></div>
                <div>
                  <p className="text-sm text-foreground-500">TEL（平日 9:00〜18:00）</p>
                  <a href={TEL} className="text-lg font-bold text-primary-700 hover:text-primary-800">029-886-7913</a>
                </div>
              </div>
              <div className="space-y-3">
                <a href={LINE} className="flex items-center gap-3 px-4 py-3 bg-green-500 rounded-lg text-background-50 hover:bg-green-600 transition-colors">
                  <i className="ri-line-fill text-xl"></i><span className="text-base font-semibold">LINEで相談する</span>
                </a>
              </div>
              <p className="mt-5 text-sm text-foreground-500">
                FAX：029-886-5499<br />
                Instagram：<a href="https://www.instagram.com/maruaisougyou" className="text-primary-600 hover:text-primary-700">@maruaisougyou</a>
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
