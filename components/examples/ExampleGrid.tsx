'use client';
import { useState } from "react";
import type { Example } from "@/lib/examples";
import { isRealPhoto, parsePeriod } from "@/lib/examples";
import WorkLocator from "./WorkLocator";

// 施工事例の一覧：工事ごとの「記録」。施工場所の位置図・完工した年月・工事データ・お客様の声。
// 写真は自社の施工写真があるときだけ、施工前と施工後を横に並べて出す（生成画像は出さない）。

/** 施工前・施工後を横に並べた写真。自社の写真があるときだけ描く */
export function BeforeAfterPair({ example, priority = false }: { example: Example; priority?: boolean }) {
  if (!isRealPhoto(example.beforeImage) && !isRealPhoto(example.afterImage)) return null;
  const sides = [
    { key: "before", label: "施工前", src: example.beforeImage },
    { key: "after", label: "施工後", src: example.afterImage },
  ].filter((s) => isRealPhoto(s.src));
  return (
    <div className={`grid gap-3 ${sides.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {sides.map((s) => (
        <figure key={s.key} className="m-0">
          <div className="photo relative aspect-[4/3]" data-slot={`work-${example.id}-${s.key}`}>
            <img
              src={s.src}
              width={1200}
              height={900}
              alt={`${example.title} ${s.label}`}
              loading={priority ? undefined : "lazy"}
            />
            <span
              className={`absolute top-2 left-2 z-[2] rounded-[4px] px-2 py-0.5 text-xs font-bold ${
                s.key === "after" ? "bg-accent text-accent-ink" : "bg-ink text-plate-ink"
              }`}
            >
              {s.label}
            </span>
          </div>
        </figure>
      ))}
    </div>
  );
}

/** 完工した年月の印（判子のような朱の枠） */
export function CompletionSeal({ period }: { period: string }) {
  const { ym, days } = parsePeriod(period);
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className="inline-flex flex-col items-center justify-center rounded-[6px] border-2 border-accent text-accent px-2 py-1 leading-none -rotate-2">
        <span className="font-figure font-bold text-[1.0625rem] tabular-nums">{ym}</span>
        <span className="mt-0.5 text-[0.625rem] font-bold tracking-[0.3em] pl-[0.3em]">完工</span>
      </span>
      {days && <span className="text-sm text-ink-2 whitespace-nowrap">工期 {days}</span>}
    </span>
  );
}

/** 工事の事実（施工場所・延床面積・施工期間・工事内容） */
export function WorkFacts({ example, className = "" }: { example: Example; className?: string }) {
  const rows: { term: string; value: string }[] = [
    { term: "施工場所", value: example.location },
    { term: "延床面積", value: example.area },
    { term: "施工時期", value: example.period },
    { term: "工事内容", value: example.category },
  ];
  return (
    <dl className={`text-[0.9375rem] ${className}`}>
      {rows.map((row) => (
        <div key={row.term} className="grid grid-cols-[5.5em_minmax(0,1fr)] gap-x-3 py-2 border-t border-paper-3 first:border-t-0">
          <dt className="text-muted">{row.term}</dt>
          <dd className="m-0 text-ink font-medium">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 使用塗料・特徴（小さな札） */
export function WorkFeatures({ features, className = "" }: { features: string[]; className?: string }) {
  if (features.length === 0) return null;
  return (
    <ul role="list" aria-label="使用塗料・特徴" className={`flex flex-wrap gap-2 ${className}`}>
      {features.map((feat) => (
        <li key={feat} className="rounded-[4px] bg-paper-2 border border-paper-3 px-2.5 py-1 text-[0.8125rem] font-medium text-ink">
          {feat}
        </li>
      ))}
    </ul>
  );
}

/** 「阿見町 T様邸 外壁塗装工事」→「T様」 */
export function customerOf(title: string): string {
  const m = title.match(/([A-ZＡ-Ｚ一-龥ぁ-んァ-ン]+様)/);
  return m ? m[1] : "お客様";
}

/** お客様の声 */
export function WorkVoice({ example, large = false }: { example: Example; large?: boolean }) {
  if (!example.testimonial) return null;
  return (
    <figure className="m-0 relative rounded-card bg-paper-2 px-5 pt-6 pb-4">
      <i className="ri-double-quotes-l absolute -top-3 left-4 text-2xl text-accent bg-plate rounded-full w-8 h-8 grid place-items-center" aria-hidden="true"></i>
      <blockquote className="m-0">
        <p className={`${large ? "text-lead" : "text-[0.9375rem]"} text-ink leading-relaxed`}>{example.testimonial}</p>
      </blockquote>
      <figcaption className="mt-2 text-right text-sm text-ink-2">{customerOf(example.title)}より</figcaption>
    </figure>
  );
}

export default function ExampleGrid({
  examples,
  categories,
}: {
  examples: Example[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("すべて");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = activeCategory === "すべて" ? examples : examples.filter((ex) => ex.category === activeCategory);
  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const countOf = (cat: string) => (cat === "すべて" ? examples.length : examples.filter((e) => e.category === cat).length);

  return (
    <section id="examples-grid" className="bg-paper">
      <div className="container pb-[var(--section-gap)]">
        {/* 絞り込み */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div role="group" aria-label="工事内容で絞り込む" className="-mx-4 px-4 sm:mx-0 sm:px-0 w-[calc(100%+2rem)] sm:w-auto flex sm:flex-wrap gap-2 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 [scrollbar-width:none]">
            {categories.map((cat) => {
              const on = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(6);
                  }}
                  className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 min-h-[40px] rounded-full border px-4 text-sm font-bold transition-colors ${
                    on ? "bg-ink border-ink text-plate-ink" : "bg-plate border-paper-3 text-ink hover:border-ink"
                  }`}
                >
                  {cat}
                  <span className={`text-xs font-figure tabular-nums ${on ? "opacity-80" : "text-muted"}`}>{countOf(cat)}</span>
                </button>
              );
            })}
          </div>
          <p className="text-sm text-ink-2" aria-live="polite">
            <span className="font-figure font-bold text-ink text-lg tabular-nums">{filtered.length}</span> 件の工事
          </p>
        </div>

        {/* 工事の記録 */}
        <ul role="list" className="mt-8 grid gap-6">
          {displayed.map((ex) => (
            <li key={ex.id}>
              <article className="rounded-card bg-plate border border-paper-3 p-5 md:p-7 grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_300px] gap-x-8 gap-y-6">
                {/* 位置図 */}
                <div className="flex flex-wrap md:flex-col gap-4 items-start">
                  <WorkLocator location={ex.location} className="w-[120px] sm:w-[140px] md:w-full shrink-0" />
                  <div className="md:hidden">
                    <CompletionSeal period={ex.period} />
                  </div>
                </div>

                {/* 題名・内容 */}
                <div className="min-w-0 flex flex-col gap-4">
                  <div className="hidden md:block">
                    <CompletionSeal period={ex.period} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-accent">{ex.category}</p>
                    <h2 className="mt-1 text-[clamp(1.375rem,1vw+1rem,1.75rem)] max-w-none">
                      <a href={`/works/${ex.id}`} className="no-underline hover:underline">
                        {ex.title}
                      </a>
                    </h2>
                  </div>
                  <p className="text-[0.9375rem] text-ink-2 leading-relaxed">{ex.description}</p>
                  <WorkFeatures features={ex.features} />
                  <BeforeAfterPair example={ex} />
                  <a href={`/works/${ex.id}`} className="mt-auto self-start inline-flex items-center gap-1 text-sm font-bold text-ink no-underline hover:text-accent">
                    この工事を詳しく見る
                    <i className="ri-arrow-right-line" aria-hidden="true"></i>
                  </a>
                </div>

                {/* 工事データ・お客様の声 */}
                <div className="min-w-0 md:col-start-2 xl:col-start-auto flex flex-col gap-5">
                  <WorkFacts example={ex} />
                  <WorkVoice example={ex} />
                </div>
              </article>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="py-[var(--space-2xl)] text-base text-ink-2">該当する施工事例がまだありません。</p>
        )}

        {hasMore && (
          <div className="mt-8 text-center">
            <button type="button" onClick={() => setVisibleCount((n) => n + 6)} className="btn btn--secondary">
              もっと見る（残り {filtered.length - visibleCount} 件）
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
