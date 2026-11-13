import type { ReactNode } from 'react';

/**
 * 二次ページ共通のヒーロー（hero: Banner）。
 * 画面の半分ほどの高さに見出しと一文だけを置き、最初のセクションが折り目より上に見える。
 * 英字の小見出し（eyebrow）は Hallmark の Floor 54 により表示しない（prop は互換のため受け取るだけ）。
 */
export function PageHero({
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-paper">
      <div className="container pt-[var(--space-3xl)] pb-[var(--space-2xl)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end border-b-bar border-ink pb-[var(--space-xl)]">
          <h1 className="md:col-span-7 text-display">{title}</h1>
          {description && <p className="lead md:col-span-5">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
