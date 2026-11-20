import type { Metadata } from 'next';
import { Shippori_Mincho_B1, Zen_Kaku_Gothic_New } from 'next/font/google';
import 'remixicon/fonts/remixicon.css';
import './globals.css';
import { Navbar } from '@/components/site/Navbar';
import { SiteFooter } from '@/components/site/SiteFooter';
import { FloatingMaruai } from '@/components/feature/FloatingMaruai';
import { JsonLd } from '@/components/JsonLd';
import { localBusinessJsonLd, SITE, IS_PRODUCTION } from '@/lib/seo';

// 見出し・数字：しっぽり明朝 B1（職人の手仕事の印象）、本文：Zen Kaku Gothic New。
// CSS 変数は app/tokens.css の --font-* が参照する。
const mincho = Shippori_Mincho_B1({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-mincho',
  display: 'swap',
  preload: false,
});
const zen = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-zen',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: '阿見町の外壁塗装・屋根塗装は丸愛装業｜完全自社施工で適正価格 茨城県',
    template: '%s｜株式会社 丸愛装業',
  },
  description:
    '茨城県阿見町の外壁塗装・屋根塗装専門店「株式会社丸愛装業」。営業会社・下請け業者なしの完全自社施工で中間マージンゼロ。適正価格で最高品質の塗装を実現。無料見積もり・火災保険診断受付中。',
  keywords: [
    '外壁塗装', '屋根塗装', '阿見町', '茨城県', '丸愛装業', '塗装専門店',
    'コーキング', '防水工事', '適正価格', '自社施工', '無料見積もり', '火災保険', '料金シミュレーション',
  ],
  alternates: { canonical: '/' },
  robots: IS_PRODUCTION ? undefined : { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: '株式会社丸愛装業',
    locale: 'ja_JP',
    images: ['/ogp.jpg'],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${mincho.variable} ${zen.variable}`}>
      <body>
        <Navbar />
        {children}
        <SiteFooter />
        <FloatingMaruai />
        <JsonLd data={localBusinessJsonLd} />
      </body>
    </html>
  );
}
