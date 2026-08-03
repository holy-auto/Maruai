import type { MetadataRoute } from 'next';
import { getCities, getPostSlugs } from '@/lib/content';
import { SITE } from '@/lib/seo';
import { SERVICE_LIST } from '@/lib/services';
import { examples } from '@/lib/examples';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['', '/services', '/works', '/price', '/voice', '/company', '/faq', '/contact', '/blog'];

  const [cities, postSlugs] = await Promise.all([
    getCities().catch(() => []),
    getPostSlugs().catch(() => []),
  ]);
  const workIds = examples.map((ex) => ex.id);

  return [
    ...staticPaths.map((p) => ({
      url: `${SITE}${p}`,
      changeFrequency: 'monthly' as const,
      priority: p === '' ? 1 : 0.8,
    })),
    ...SERVICE_LIST.map((s) => ({ url: `${SITE}/services/${s.slug}`, priority: 0.7 })),
    ...cities.flatMap((c) => [
      { url: `${SITE}/gaiheki-tosou/${c.slug}`, priority: 0.8 },
      { url: `${SITE}/yane-tosou/${c.slug}`, priority: 0.6 },
    ]),
    ...workIds.map((id) => ({ url: `${SITE}/works/${id}`, priority: 0.6 })),
    ...postSlugs.map((s) => ({ url: `${SITE}/blog/${s}`, priority: 0.5 })),
  ];
}
