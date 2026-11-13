import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

// パンくず：本文の書体で一段小さく。区切りは斜線、今いるページは墨の地の文字（リンクにしない）
export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="パンくずリスト" className="container pt-[var(--space-lg)]">
        <ol className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-ink-2">
          {items.map((it, i) => (
            <li key={it.url} className="flex items-baseline gap-x-2 min-w-0">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < items.length - 1 ? (
                <Link href={it.url} className="link whitespace-nowrap">
                  {it.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">{it.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
