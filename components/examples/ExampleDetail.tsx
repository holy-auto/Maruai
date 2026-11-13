'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Example } from "@/lib/examples";
import { BeforeAfterPhoto, BeforeAfterToggle, WorkFacts } from "./ExampleGrid";

// 構成：Banner（題名と工事概要の板）→ Split（ビフォーアフター）→ Rows（内容・塗料・声）→ 同じカテゴリの事例
export default function ExampleDetail({
  example,
  related,
}: {
  example: Example;
  related: Example[];
}) {
  const router = useRouter();
  const [showBefore, setShowBefore] = useState(false);
  const side = showBefore ? "before" : "after";

  return (
    <article className="bg-paper">
      {/* 題名（1〜7列）と工事概要の板（8〜12列）、下に墨の太線 */}
      <section>
        <div className="container pt-[var(--space-2xl)] pb-[var(--space-2xl)]">
          <nav aria-label="パンくずリスト">
            <Link href="/works" className="link text-base">
              施工事例一覧に戻る
            </Link>
          </nav>
          <div className="mt-[var(--space-xl)] grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-end border-b-bar border-ink pb-[var(--space-xl)]">
            <h1 className="lg:col-span-7 text-display-s max-w-none">{example.title}</h1>
            <div className="plate lg:col-span-5 p-6 md:p-8">
              <h2 className="text-title max-w-none">工事概要</h2>
              <WorkFacts example={example} className="mt-4" />
              <div className="mt-6 grid gap-3">
                <a href="/#simulation" className="btn btn--secondary w-full">
                  <i className="ri-price-tag-3-line text-xl" aria-hidden="true"></i>
                  概算料金をチェック
                </a>
                <a href="tel:029-886-7913" className="btn btn--secondary w-full font-figure">
                  <i className="ri-phone-line text-xl" aria-hidden="true"></i>
                  029-886-7913
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ビフォーアフター：見出しと切り替え（4列）、写真（8列） */}
      <section>
        <div className="container pb-[var(--section-gap-s)] grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6">
          <div className="lg:col-span-4 lg:self-center flex flex-col gap-6">
            <h2 className="text-section [&>span]:inline-block">
              <span>ビフォー</span><span>アフター</span>
            </h2>
            <BeforeAfterToggle
              side={side}
              onChange={(s) => setShowBefore(s === "before")}
              label={`${example.title}の写真を切り替え`}
            />
          </div>
          <figure className="m-0 lg:col-span-8 min-w-0">
            <BeforeAfterPhoto
              example={example}
              side={side}
              slot="work-detail"
              title={showBefore ? `${example.title} 施工前の状態` : `${example.title} 施工後の仕上がり`}
              className="aspect-[4/3]"
              priority
            />
          </figure>
        </div>
      </section>

      {/* 行：工事内容・使用塗料・お客様の声 */}
      <section>
        <div className="container pb-[var(--section-gap)]">
          <div className="border-t-bar border-ink">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 py-[var(--space-xl)]">
              <h2 className="md:col-span-4 text-title max-w-none">工事内容</h2>
              <p className="md:col-span-8 text-lg text-ink max-w-[38em]">{example.description}</p>
            </div>

            {example.features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 py-[var(--space-xl)] border-t-hair border-paper-3">
                <h2 className="md:col-span-4 text-title max-w-none">使用塗料・特徴</h2>
                <ul role="list" className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {example.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-lg text-ink">
                      <i className="ri-check-line text-xl leading-[1.6]" aria-hidden="true"></i>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {example.testimonial && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 py-[var(--space-xl)] border-t-hair border-paper-3">
                <h2 className="md:col-span-4 text-title max-w-none">お客様の声</h2>
                <blockquote className="md:col-span-8 m-0 border-l-2 border-ink pl-6">
                  <p className="text-lead text-ink max-w-[34em]">{example.testimonial}</p>
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <div className="container pb-[var(--section-gap)]">
            <div className="border-t-bar border-ink pt-[var(--space-xl)] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
              <h2 className="md:col-span-8 text-section">同じカテゴリの施工事例</h2>
              <div className="md:col-span-4 md:justify-self-end">
                <Link href="/works" className="btn btn--secondary">
                  すべての施工事例を見る
                </Link>
              </div>
            </div>
            <ul role="list" className="mt-[var(--space-xl)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {related.map((rel) => (
                <li key={rel.id} className="min-w-0">
                  <a
                    href={`/works/${rel.id}`}
                    onClick={(e) => {
                      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      router.push(`/works/${rel.id}`);
                    }}
                    className="group block no-underline"
                  >
                    <BeforeAfterPhoto
                      example={rel}
                      side="after"
                      slot={`related-${rel.id}`}
                      title={rel.title}
                      className="aspect-[4/3]"
                    />
                    <h3 className="mt-4 text-title max-w-none group-hover:underline">{rel.title}</h3>
                    <p className="label mt-1">{rel.category}</p>
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
