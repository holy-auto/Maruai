import Link from "next/link";
import { getWorks, workToExample } from "@/lib/content";
import { CompletionSeal } from "@/components/examples/ExampleGrid";
import WorkLocator from "@/components/examples/WorkLocator";

// 施工事例の抜粋：新しい3件を、工事の記録のカードで。一覧は /works
export default async function WorksSection() {
  const works = (await getWorks().catch(() => [])).map(workToExample).slice(0, 3);
  if (works.length === 0) return null;
  return (
    <section id="works" className="bg-paper py-[var(--section-gap)]">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Works</p>
            <h2 className="mt-4">どんな家を、塗ってきた？</h2>
          </div>
          <Link href="/works" className="btn btn--secondary">
            施工事例をすべて見る
            <i className="ri-arrow-right-line" aria-hidden="true"></i>
          </Link>
        </div>

        <ul role="list" className="mt-[var(--space-2xl)] grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* スマホは2件、タブレット以上は3件 */}
          {works.map((ex, i) => (
            <li key={ex.id} className={i >= 2 ? "hidden md:block" : undefined}>
              <Link
                href={`/works/${ex.id}`}
                className="group flex flex-col h-full rounded-card bg-plate border border-paper-3 p-5 no-underline text-ink hover:border-ink hover:shadow-card transition-shadow"
              >
                <WorkLocator location={ex.location} />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-accent">{ex.category}</span>
                  <CompletionSeal period={ex.period} />
                </div>
                <h3 className="mt-3 text-[1.25rem] leading-snug group-hover:underline">{ex.title}</h3>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed line-clamp-3">{ex.description}</p>
                <dl className="mt-auto pt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-control bg-paper-2 px-3 py-2">
                    <dt className="text-muted">延床面積</dt>
                    <dd className="m-0 mt-0.5 font-bold text-ink">{ex.area}</dd>
                  </div>
                  <div className="rounded-control bg-paper-2 px-3 py-2">
                    <dt className="text-muted">使用塗料など</dt>
                    <dd className="m-0 mt-0.5 font-bold text-ink truncate">{ex.features[0] ?? "—"}</dd>
                  </div>
                </dl>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
