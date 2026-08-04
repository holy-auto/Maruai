import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav
        aria-label="パンくずリスト"
        className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto pt-24 md:pt-28 text-sm text-foreground-500"
      >
        {items.map((it, i) => (
          <span key={it.url}>
            {i > 0 && <span className="mx-1.5 text-foreground-300">/</span>}
            {i < items.length - 1 ? (
              <Link href={it.url} className="text-primary-600 hover:text-primary-700 transition-colors">
                {it.name}
              </Link>
            ) : (
              <span className="text-foreground-700">{it.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
