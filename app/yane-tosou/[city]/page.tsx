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
    title: `${c.name}の屋根塗装｜完全自社施工の丸愛装業`,
    description: `${c.name}で屋根塗装なら丸愛装業。遮熱・防水で建物の寿命を延ばします。外壁との同時施工で足場代を効率化。完全自社施工・無料診断。`,
    alternates: { canonical: `/yane-tosou/${city}` },
    openGraph: { title: `${c.name}の屋根塗装｜丸愛装業`, url: `/yane-tosou/${city}` },
  };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <RegionPage citySlug={city} serviceName="屋根塗装" serviceType="屋根塗装" slugBase="yane-tosou" serviceListLabel="屋根塗装" />;
}
