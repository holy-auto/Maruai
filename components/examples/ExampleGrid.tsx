'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Example } from "@/lib/examples";

// composition: Index（施工事例を一行ずつ。先頭の一件は大きく、写真を横に置く）

export type Side = "before" | "after";

const SIDE_LABEL: Record<Side, string> = { before: "施工前", after: "施工後" };

/** 施工前・施工後の写真。data-slot の中に置くので白黒の処理がかかる */
export function BeforeAfterPhoto({
  example,
  side,
  slot,
  title,
  className = "",
  priority = false,
}: {
  example: Example;
  side: Side;
  slot: string;
  title?: string;
  className?: string;
  priority?: boolean;
}) {
  const src = side === "before" ? example.beforeImage : example.afterImage;
  return (
    <div
      className={`photo ${className}`}
      data-slot={slot}
      data-alt={`${example.title}の${SIDE_LABEL[side]}の写真`}
    >
      {src ? (
        <img
          key={src}
          src={src}
          width={1200}
          height={900}
          alt={`${example.title} ${SIDE_LABEL[side]}`}
          title={title}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      ) : null}
    </div>
  );
}

/** 施工前・施工後の切り替え（押し込み式の二つのボタン） */
export function BeforeAfterToggle({
  side,
  onChange,
  label,
}: {
  side: Side;
  onChange: (side: Side) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex border-2 border-ink">
      {(["before", "after"] as const).map((s) => {
        const on = side === s;
        return (
          <button
            key={s}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(s)}
            className={`min-h-[44px] px-5 font-medium whitespace-nowrap cursor-pointer ${
              on
                ? "bg-ink text-plate-ink"
                : "bg-paper-2 text-ink hover:bg-paper-3 active:translate-y-px"
            }`}
          >
            {SIDE_LABEL[s]}
          </button>
        );
      })}
    </div>
  );
}

/** 工事の事実（施工場所・延床面積・施工期間・施工カテゴリ） */
export function WorkFacts({ example, className = "" }: { example: Example; className?: string }) {
  const rows: { term: string; value: string; figure?: boolean }[] = [
    { term: "施工場所", value: example.location },
    { term: "延床面積", value: example.area, figure: true },
    { term: "施工期間", value: example.period, figure: true },
    { term: "施工カテゴリ", value: example.category },
  ];
  return (
    <dl className={className}>
      {rows.map((row) => (
        <div
          key={row.term}
          className="grid grid-cols-[7em_minmax(0,1fr)] gap-x-4 py-2 border-t-hair border-paper-3 first:border-t-0 first:pt-0"
        >
          <dt className="label pt-[2px]">{row.term}</dt>
          <dd className={`m-0 text-base text-ink ${row.figure ? "font-figure tabular-nums" : ""}`}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** 使用塗料・特徴 */
export function WorkFeatures({ features, className = "" }: { features: string[]; className?: string }) {
  if (features.length === 0) return null;
  return (
    <ul role="list" aria-label="使用塗料・特徴" className={`flex flex-wrap gap-x-5 gap-y-1 ${className}`}>
      {features.map((feat) => (
        <li key={feat} className="inline-flex items-center gap-1.5 text-base text-ink">
          <i className="ri-check-line text-base" aria-hidden="true"></i>
          {feat}
        </li>
      ))}
    </ul>
  );
}

/** お客様の声（引用） */
function WorkTestimonial({ text }: { text: string }) {
  if (!text) return null;
  return (
    <figure className="m-0 border-l-2 border-ink pl-4">
      <blockquote className="m-0">
        <p className="text-base text-ink-2">{text}</p>
      </blockquote>
      <figcaption className="label mt-2">お客様の声</figcaption>
    </figure>
  );
}

/** 事例の詳細へのリンク（実際の <a>。修飾キー付きのクリックはブラウザに任せる） */
function WorkLink({
  id,
  onNavigate,
  children,
}: {
  id: string;
  onNavigate: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`/works/${id}`}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onNavigate(id);
      }}
      className="no-underline hover:underline"
    >
      {children}
    </a>
  );
}

export default function ExampleGrid({
  examples,
  categories,
}: {
  examples: Example[];
  categories: string[];
}) {
  const commonCategories = categories;
  const [activeCategory, setActiveCategory] = useState("すべて");
  const [visibleCount, setVisibleCount] = useState(6);
  const [currentSlide, setCurrentSlide] = useState<Record<string, Side>>(() => {
    const initial: Record<string, Side> = {};
    examples.forEach((ex) => {
      initial[ex.id] = "after";
    });
    return initial;
  });
  const router = useRouter();

  const filteredExamples = activeCategory === "すべて"
    ? examples
    : examples.filter((ex) => ex.category === activeCategory);

  const displayedExamples = filteredExamples.slice(0, visibleCount);
  const hasMore = visibleCount < filteredExamples.length;

  useEffect(() => {
    setVisibleCount(6);
    const initial: Record<string, Side> = {};
    examples.forEach((ex) => {
      initial[ex.id] = "after";
    });
    setCurrentSlide(initial);
  }, [activeCategory]);

  const setSlide = (id: string, side: Side) => {
    setCurrentSlide((prev) => ({ ...prev, [id]: side }));
  };

  const goToDetail = (id: string) => {
    router.push(`/works/${id}`);
    window.scrollTo(0, 0);
  };

  const photoTitle = (ex: Example) => `茨城県 ${ex.location} 塗装施工事例 丸愛装業 - ${ex.title}`;

  return (
    <section id="examples-grid" className="bg-paper">
      <div className="container pt-[var(--space-2xl)] pb-[var(--section-gap)]">
        {/* 見出し（1〜5列）と一文（7〜12列）、下端をそろえる */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 items-end">
          <h2 className="md:col-span-5 text-section">
            <a href="#examples-grid" className="no-underline hover:underline">施工事例一覧</a>
          </h2>
          <p className="md:col-span-6 md:col-start-7 text-lg text-ink-2 max-w-[34em]">
            お客様にご満足いただいた施工事例の数々です。ビフォーアフターで仕上がりの違いをぜひご確認ください。
          </p>
        </div>

        {/* カテゴリの絞り込み */}
        <div role="group" aria-label="カテゴリで絞り込む" className="mt-[var(--space-xl)] flex flex-wrap gap-2">
          {commonCategories.map((cat) => {
            const on = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={on}
                onClick={() => setActiveCategory(cat)}
                className={`btn min-h-[44px] px-4 font-body font-medium ${
                  on ? "bg-ink text-plate-ink" : "btn--secondary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 索引：墨の太線から始まり、行のあいだは細線 */}
        <ul role="list" className="mt-[var(--space-lg)] border-t-bar border-ink">
          {displayedExamples.map((ex, i) => {
            const side = currentSlide[ex.id] ?? "after";

            if (i === 0) {
              // 先頭の一件：写真（7列）と、事実・本文（5列）
              return (
                <li
                  key={ex.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 py-[var(--space-xl)]"
                >
                  <figure className="m-0 lg:col-span-7 min-w-0">
                    <BeforeAfterPhoto
                      example={ex}
                      side={side}
                      slot={`work-${ex.id}`}
                      title={photoTitle(ex)}
                      className="aspect-[4/3]"
                    />
                    <figcaption className="mt-3">
                      <BeforeAfterToggle
                        side={side}
                        onChange={(s) => setSlide(ex.id, s)}
                        label={`${ex.title}の写真を切り替え`}
                      />
                    </figcaption>
                  </figure>
                  <div className="lg:col-span-5 min-w-0 flex flex-col gap-6">
                    <h3 className="text-section max-w-none">
                      <WorkLink id={ex.id} onNavigate={goToDetail}>{ex.title}</WorkLink>
                    </h3>
                    <WorkFacts example={ex} />
                    <p className="text-base text-ink">{ex.description}</p>
                    <WorkFeatures features={ex.features} />
                    <WorkTestimonial text={ex.testimonial} />
                  </div>
                </li>
              );
            }

            // 二件目以降：写真（3列）・題名と本文（5列）・事実と声（4列）
            return (
              <li
                key={ex.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 py-[var(--space-lg)] border-t-hair border-paper-3"
              >
                <figure className="m-0 md:col-span-4 lg:col-span-3 md:row-span-2 lg:row-span-1 min-w-0">
                  <BeforeAfterPhoto
                    example={ex}
                    side={side}
                    slot={`work-${ex.id}`}
                    title={photoTitle(ex)}
                    className="aspect-[4/3]"
                  />
                  <figcaption className="mt-2">
                    <BeforeAfterToggle
                      side={side}
                      onChange={(s) => setSlide(ex.id, s)}
                      label={`${ex.title}の写真を切り替え`}
                    />
                  </figcaption>
                </figure>
                <div className="md:col-span-8 lg:col-span-5 min-w-0 flex flex-col gap-3">
                  <h3 className="text-title max-w-none">
                    <WorkLink id={ex.id} onNavigate={goToDetail}>{ex.title}</WorkLink>
                  </h3>
                  <p className="text-base text-ink line-clamp-3">{ex.description}</p>
                  <WorkFeatures features={ex.features} />
                </div>
                <div className="md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-auto min-w-0 flex flex-col gap-4">
                  <WorkFacts example={ex} />
                  <WorkTestimonial text={ex.testimonial} />
                </div>
              </li>
            );
          })}
        </ul>

        {filteredExamples.length === 0 && (
          <p className="py-[var(--space-2xl)] text-base text-ink-2">
            該当する施工事例がまだありません。
          </p>
        )}

        {hasMore && (
          <div className="pt-[var(--space-lg)] border-t-hair border-paper-3">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="btn btn--secondary"
            >
              もっと見る
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
