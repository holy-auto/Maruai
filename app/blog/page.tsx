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

// 構成：Banner → Index（日付 1〜2列、題と抜粋 3〜10列、行の間は細線）
export default async function BlogPage() {
  const posts = await getPosts().catch(() => []);
  return (
    <main className="relative">
      <PageHero title="塗り替え前に、知っておきたいこと。" />
      <section className="bg-paper pb-[calc(var(--section-gap)/2)]">
        <div className="container">
          {posts.length === 0 ? (
            <p className="text-base text-ink-2">記事は準備中です。</p>
          ) : (
            <ul className="divide-y divide-paper-3 border-b-hair border-paper-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-2 py-6 md:py-8 text-ink no-underline"
                  >
                    <time
                      dateTime={p.published_at}
                      className="md:col-span-2 font-figure text-base text-ink-2 tabular-nums md:leading-[2.2]"
                    >
                      {new Date(p.published_at).toLocaleDateString('ja-JP')}
                    </time>
                    <div className="md:col-span-8">
                      <h2 className="text-title decoration-1 underline-offset-[0.2em] group-hover:underline">{p.title}</h2>
                      {p.excerpt && <p className="mt-2 text-base text-ink-2 max-w-[38em]">{p.excerpt}</p>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
