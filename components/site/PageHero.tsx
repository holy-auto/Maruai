import type { ReactNode } from 'react';

/**
 * 二次ページ共通のヒーロー（hero: Banner）。
 * 画面の半分ほどの高さに見出しと一文だけを置き、最初のセクションが折り目より上に見える。
 * 英字の小見出し（eyebrow）があれば見出しの上に出す。
 */
export function PageHero({
  eyebrow,
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
    <section className="bg-paper-2 border-b border-paper-3 mb-[var(--space-2xl)]">
      <div className="container pt-[var(--space-3xl)] pb-[var(--space-2xl)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <div className="md:col-span-7">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-4 text-[clamp(2rem,2.6vw+1rem,3.25rem)]">{title}</h1>
          </div>
          {description && <p className="lead md:col-span-5">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
