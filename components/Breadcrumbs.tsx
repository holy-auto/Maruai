import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="パンくず" className="wrap" style={{ paddingTop: 16, fontSize: '.8rem', color: 'var(--slate)' }}>
        {items.map((it, i) => (
          <span key={it.url}>
            {i > 0 && ' / '}
            {i < items.length - 1 ? <Link href={it.url} style={{ color: 'var(--brand)' }}>{it.name}</Link> : it.name}
          </span>
        ))}
      </nav>
    </>
  );
}
