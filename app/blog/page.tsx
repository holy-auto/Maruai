import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/content';
import { PageHero } from '@/components/site/PageHero';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'お役立ちコラム',
  description: '外壁塗装の時期の見分け方、火災保険の使い方、塗料グレードの選び方など、塗り替え前に知っておきたい情報をお届けします。',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const posts = await getPosts().catch(() => []);
  return (
    <main className="relative">
      <PageHero eyebrow="Column" title="塗り替え前に、知っておきたいこと。" />
      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-3xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-foreground-500">記事は準備中です。</p>
          ) : (
            <div className="grid gap-4">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="block bg-background-100 rounded-xl border border-background-200/70 p-6 hover:border-primary-300 transition-colors">
                  <p className="text-sm text-foreground-500">{new Date(p.published_at).toLocaleDateString('ja-JP')}</p>
                  <h2 className="font-heading text-lg md:text-xl font-bold text-foreground-900 my-1">{p.title}</h2>
                  {p.excerpt && <p className="text-base text-foreground-600 leading-relaxed">{p.excerpt}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
