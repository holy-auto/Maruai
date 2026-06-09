// lib/seo.ts
import type { City } from './content';
import type { Faq } from './faq';

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.maruai-sougyo.com';

// 本番だけ index 許可。staging/preview は noindex にして勝手なインデックスを防ぐ。
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': `${SITE}/#business`,
  name: '株式会社 丸愛装業',
  url: `${SITE}/`,
  telephone: '+81-29-886-7913',
  faxNumber: '+81-29-886-5499',
  priceRange: '¥¥',
  address: {
    '@type': 'PostalAddress',
    postalCode: '300-0325',
    addressRegion: '茨城県',
    addressLocality: '稲敷郡阿見町',
    streetAddress: '上条888',
    addressCountry: 'JP',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 36.032, longitude: 140.214 }, // GBPの正確なピンに差し替え
  areaServed: ['阿見町', '牛久市', '土浦市', 'つくば市', '取手市', '龍ケ崎市'].map((name) => ({
    '@type': 'City',
    name,
  })),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: ['https://www.instagram.com/maruaisougyou'],
  founder: { '@type': 'Person', name: '小林 力也' },
};

export function serviceAreaJsonLd(c: City, opts: { serviceType: string; slugBase: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.serviceType,
    name: `${c.name}の${opts.serviceType}`,
    url: `${SITE}/${opts.slugBase}/${c.slug}`,
    provider: { '@id': `${SITE}/#business` },
    areaServed: { '@type': 'City', name: c.name },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.url}`,
    })),
  };
}

// FAQPage：リッチリザルトは2026/5で終了したが、内容理解・AI向けに有効なので残す
export function faqJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
