import type { Metadata } from 'next';
import { Shippori_Mincho, Zen_Kaku_Gothic_New, Manrope } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { localBusinessJsonLd, SITE, IS_PRODUCTION } from '@/lib/seo';

const sans = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: false,
});
const serif = Shippori_Mincho({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: false,
});
const num = Manrope({ subsets: ['latin'], variable: '--font-num', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: '外壁塗装なら阿見町の丸愛装業｜完全自社施工・最長10年保証',
    template: '%s｜株式会社 丸愛装業',
  },
  description:
    '茨城県阿見町の外壁塗装・屋根塗装。下請けに出さない完全自社施工で、顔の見える職人がご相談から仕上げ・アフターまで責任を持って担当します。無料診断・お見積り。',
  alternates: { canonical: '/' },
  robots: IS_PRODUCTION ? undefined : { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: '株式会社 丸愛装業',
    locale: 'ja_JP',
    images: ['/ogp.jpg'],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${sans.variable} ${serif.variable} ${num.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <JsonLd data={localBusinessJsonLd} />
      </body>
    </html>
  );
}
