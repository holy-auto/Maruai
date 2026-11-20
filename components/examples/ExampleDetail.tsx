import Link from "next/link";
import type { Example } from "@/lib/examples";
import { isRealPhoto } from "@/lib/examples";
import { BeforeAfterPair, CompletionSeal, WorkFacts, WorkFeatures, WorkVoice } from "./ExampleGrid";
import WorkLocator from "./WorkLocator";

// 施工事例の詳細：題名と完工の印 → 工事データと位置図 → 写真（自社の写真があるときだけ）→ 工事内容・塗料・お客様の声 → 同じ工事内容の事例
export default function ExampleDetail({ example, related }: { example: Example; related: Example[] }) {
  const hasPhotos = isRealPhoto(example.beforeImage) || isRealPhoto(example.afterImage);

  return (
    <article className="bg-paper">
      {/* 題名 */}
      <section className="bg-paper-2 border-b border-paper-3">
        <div className="container pt-[var(--space-xl)] pb-[var(--space-2xl)]">
          <nav aria-label="パンくずリスト" className="text-sm text-ink-2">
            <Link href="/" className="no-underline hover:underline">ホーム</Link>
            <i className="ri-arrow-right-s-line mx-1 align-middle text-muted" aria-hidden="true"></i>
            <Link href="/works" className="no-underline hover:underline">施工事例</Link>
          </nav>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Works</p>
              <p className="mt-4 text-sm font-bold text-accent">{example.category}</p>
              <h1 className="mt-1 text-[clamp(1.75rem,2.2vw+1rem,2.75rem)] max-w-[22em]">{example.title}</h1>
            </div>
            <CompletionSeal period={example.period} />
          </div>
        </div>
      </section>

      <section>
        <div className="container py-[var(--space-2xl)] grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">
          {/* 本文 */}
          <div className="lg:col-span-8 min-w-0 flex flex-col gap-8">
            {hasPhotos ? (
              <BeforeAfterPair example={example} priority />
            ) : (
              <p className="flex items-center gap-3 rounded-card border border-dashed border-paper-3 bg-paper-2 px-5 py-4 text-sm text-ink-2">
                <i className="ri-camera-line text-xl text-muted" aria-hidden="true"></i>
                この工事の施工写真は準備中です。
              </p>
            )}

            <div>
              <h2 className="text-title">どんな工事をしたか</h2>
              <p className="mt-3 text-lead text-ink leading-relaxed max-w-[38em]">{example.description}</p>
            </div>

            {example.features.length > 0 && (
              <div>
                <h2 className="text-title">使用塗料・仕様</h2>
                <WorkFeatures features={example.features} className="mt-3" />
              </div>
            )}

            {example.testimonial && (
              <div>
                <h2 className="text-title">お客様の声</h2>
                <div className="mt-5">
                  <WorkVoice example={example} large />
                </div>
              </div>
            )}
          </div>

          {/* 工事データ・位置図・連絡 */}
          <aside className="lg:col-span-4 min-w-0">
            <div className="lg:sticky lg:top-[108px] rounded-card bg-plate border border-paper-3 p-5 md:p-6 flex flex-col gap-5">
              <WorkLocator location={example.location} />
              <WorkFacts example={example} />
              <div className="grid gap-3 pt-2">
                <a href="/#simulation" className="btn btn--primary w-full">
                  <i className="ri-calculator-line text-xl" aria-hidden="true"></i>
                  うちの場合の概算を見る
                </a>
                <a href="tel:029-886-7913" className="btn btn--secondary w-full font-figure">
                  <i className="ri-phone-fill text-xl" aria-hidden="true"></i>
                  029-886-7913
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper-2 border-t border-paper-3">
          <div className="container py-[var(--space-2xl)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-title">同じ工事内容の事例</h2>
              <Link href="/works" className="inline-flex items-center gap-1 text-sm font-bold no-underline hover:text-accent">
                施工事例をすべて見る
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </Link>
            </div>
            <ul role="list" className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((rel) => (
                <li key={rel.id}>
                  <a
                    href={`/works/${rel.id}`}
                    className="group flex gap-4 items-center h-full rounded-card bg-plate border border-paper-3 p-4 no-underline text-ink hover:border-ink"
                  >
                    <WorkLocator location={rel.location} className="w-[96px] shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-xs font-bold text-accent">{rel.category}</span>
                      <span className="block mt-1 font-display font-bold leading-snug group-hover:underline">{rel.title}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
