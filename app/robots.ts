import type { MetadataRoute } from 'next';
import { SITE, IS_PRODUCTION } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // staging/preview：クロール拒否（インデックス汚染を防ぐ）
  if (!IS_PRODUCTION) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  // 本番：全許可＋sitemap
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
