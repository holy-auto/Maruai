import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'お役立ちコラム',
  description: '外壁塗装の時期の見分け方、火災保険の使い方、塗料グレードの選び方など、塗り替え前に知っておきたい情報をお届けします。',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const posts = await getPosts().catch(() => []);
  return (
    <>
      <div className="page-hero"><div className="wrap"><span className="eyebrow">お役立ちコラム</span><h1 className="mincho">塗り替え前に、知っておきたいこと。</h1></div></div>
      <section>
        <div className="wrap" style={{ maxWidth: 760 }}>
          {posts.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)' }}>記事は準備中です。</p>
          ) : (
            <div style={{ display: 'grid', gap: 18 }}>
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="extra-card" style={{ display: 'block' }}>
                  <p style={{ fontSize: '.78rem', color: 'var(--slate)' }}>{new Date(p.published_at).toLocaleDateString('ja-JP')}</p>
                  <h2 className="mincho" style={{ fontSize: '1.2rem', margin: '.2em 0' }}>{p.title}</h2>
                  {p.excerpt && <p style={{ fontSize: '.88rem', color: 'var(--ink-soft)' }}>{p.excerpt}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
