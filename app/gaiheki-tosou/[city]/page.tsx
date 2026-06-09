import type { Metadata } from 'next';
import { getCity } from '@/lib/content';
import { RegionPage, regionStaticParams } from '@/components/RegionPage';

export const revalidate = 3600;
export const generateStaticParams = regionStaticParams;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = await getCity(city);
  if (!c) return {};
  return {
    title: `${c.name}の外壁塗装｜完全自社施工の丸愛装業`,
    description: `${c.name}で外壁塗装・屋根塗装なら丸愛装業。下請けに出さない完全自社施工で、顔の見える職人が最後まで担当。${c.name}での施工事例とお客様の声を掲載。無料診断・お見積りはお気軽に。`,
    alternates: { canonical: `/gaiheki-tosou/${city}` },
    openGraph: { title: `${c.name}の外壁塗装｜丸愛装業`, url: `/gaiheki-tosou/${city}` },
  };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <RegionPage citySlug={city} serviceName="外壁塗装" serviceType="外壁塗装" slugBase="gaiheki-tosou" serviceListLabel="外壁塗装" />;
}
