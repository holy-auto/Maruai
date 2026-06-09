import type { Metadata } from 'next';
import { ContactForm } from './ContactForm';

const LINE = 'https://line.me/ti/p/UxXZqXMSWE';
const TEL = 'tel:0298867913';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: '茨城県阿見町の外壁塗装・丸愛装業へのお問い合わせ。診断・お見積りは無料。LINE・お電話・フォームからどうぞ。',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <div className="page-hero"><div className="wrap"><span className="eyebrow">お気軽にどうぞ</span><h1 className="mincho">お問い合わせ</h1><p>ご相談はどのような事でもお気軽にどうぞ。3営業日以内にご返信します。</p></div></div>
      <section>
        <div className="wrap contact-grid">
          <div className="contact-info">
            <span className="eyebrow">お電話・LINEが早いです</span>
            <div className="big" style={{ marginTop: 14 }}>029-886-7913</div>
            <p>電話受付：平日 9:00〜18:00</p>
            <div className="cta-row" style={{ justifyContent: 'flex-start' }}>
              <a className="btn btn-line" href={LINE}>LINEで相談する</a>
              <a className="btn btn-ember" href={TEL}>電話をかける</a>
            </div>
            <p style={{ marginTop: 20, fontSize: '.86rem', color: 'var(--ink-soft)' }}>
              FAX：029-886-5499<br />Instagram：<a href="https://www.instagram.com/maruaisougyou" style={{ color: 'var(--brand)' }}>@maruaisougyou</a>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
