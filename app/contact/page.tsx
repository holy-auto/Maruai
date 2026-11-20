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

// 構成：PageHero → 3つの窓口（電話・LINE・フォーム）→ ご依頼の流れ ＋ フォーム
const FLOW = [
  { t: 'ご相談', d: 'お電話・LINE・フォームから。', icon: 'ri-chat-3-line' },
  { t: '現地診断', d: '代表が外壁・屋根を点検します（無料）。', icon: 'ri-search-eye-line' },
  { t: 'お見積り', d: '内訳の明確な見積書をお出しします（無料）。', icon: 'ri-file-list-3-line' },
  { t: '施工', d: '自社の職人が塗ります。', icon: 'ri-paint-brush-line' },
  { t: 'アフター', d: '完工後も、近くだからすぐ伺えます。', icon: 'ri-shield-check-line' },
];

export default function ContactPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Contact"
        title="お問い合わせ"
        description="ご相談はどのような事でもお気軽にどうぞ。診断・お見積りは無料です。"
      />

      {/* 3つの窓口 */}
      <section className="bg-paper">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href={TEL} className="group flex flex-col rounded-card bg-plate border border-paper-3 p-6 no-underline text-ink hover:border-ink">
            <span className="flex items-center gap-2 text-sm font-bold text-ink-2">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-accent text-accent-ink" aria-hidden="true"><i className="ri-phone-fill text-xl"></i></span>
              お電話でのご相談
            </span>
            <span className="mt-4 font-figure font-bold text-[clamp(1.75rem,2vw+1rem,2.25rem)] leading-none tracking-[0.04em] tabular-nums">029-886-7913</span>
            <span className="mt-2 text-sm text-ink-2">平日 9:00〜18:00 ／ FAX 029-886-5499</span>
            <span className="mt-auto pt-4 text-xs font-bold text-accent">いちばん早くつながります</span>
          </a>
          <a href={LINE} target="_blank" rel="nofollow noopener noreferrer" className="group flex flex-col rounded-card bg-plate border border-paper-3 p-6 no-underline text-ink hover:border-ink">
            <span className="flex items-center gap-2 text-sm font-bold text-ink-2">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-line text-white" aria-hidden="true"><i className="ri-line-fill text-xl"></i></span>
              LINEでのご相談
            </span>
            <span className="mt-4 font-display font-bold text-[1.5rem] leading-tight">写真を送って相談できます</span>
            <span className="mt-2 text-sm text-ink-2">気になる箇所の写真があると、お話が早く進みます。</span>
            <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold group-hover:text-accent">LINEで友だち追加<i className="ri-arrow-right-line" aria-hidden="true"></i></span>
          </a>
          <a href="#form" className="group flex flex-col rounded-card bg-plate border border-paper-3 p-6 no-underline text-ink hover:border-ink">
            <span className="flex items-center gap-2 text-sm font-bold text-ink-2">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-ink text-plate-ink" aria-hidden="true"><i className="ri-mail-line text-xl"></i></span>
              フォームでのご相談
            </span>
            <span className="mt-4 font-display font-bold text-[1.5rem] leading-tight">24時間受け付けています</span>
            <span className="mt-2 text-sm text-ink-2">3営業日以内にご返信します。</span>
            <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold group-hover:text-accent">フォームへ<i className="ri-arrow-down-line" aria-hidden="true"></i></span>
          </a>
        </div>
      </section>

      {/* ご依頼の流れ ＋ フォーム */}
      <section id="form" className="bg-paper py-[var(--section-gap)] scroll-mt-[100px]">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow">Flow</p>
            <h2 className="mt-4 text-[clamp(1.5rem,1.4vw+1rem,2.25rem)]">ご相談から完工まで</h2>
            <ol className="mt-8 relative">
              {FLOW.map((f, i) => (
                <li key={f.t} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < FLOW.length - 1 && (
                    <span aria-hidden="true" className="absolute left-6 top-12 bottom-0 w-px bg-paper-3"></span>
                  )}
                  <span className="relative shrink-0 grid place-items-center w-12 h-12 rounded-full bg-plate border border-paper-3 text-ink">
                    <i className={`${f.icon} text-xl`} aria-hidden="true"></i>
                    <span className="absolute -top-1 -right-1 grid place-items-center w-5 h-5 rounded-full bg-accent text-accent-ink font-figure text-[0.6875rem] font-bold">{i + 1}</span>
                  </span>
                  <span className="pt-1.5">
                    <span className="block font-display font-bold text-[1.1875rem] text-ink">{f.t}</span>
                    <span className="block mt-0.5 text-sm text-ink-2">{f.d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-8 flex items-center gap-2 text-sm text-ink-2">
              <i className="ri-instagram-line text-lg" aria-hidden="true"></i>
              Instagram：<a href="https://www.instagram.com/maruaisougyou" target="_blank" rel="nofollow noopener noreferrer" className="link">@maruaisougyou</a>
            </p>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
