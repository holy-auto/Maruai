import type { ReactNode } from 'react';

/**
 * 二次ページ共通のヒーローバンド。固定ナビ（h-16/20）分の余白を上に確保する。
 */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative bg-primary-700 pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {eyebrow && (
          <span className="inline-block text-accent-400 text-base font-semibold tracking-widest uppercase mb-3">
            {eyebrow}
          </span>
        )}
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-background-50 mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-background-100/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
