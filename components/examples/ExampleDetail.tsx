'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { examples } from "@/lib/examples";

type Example = (typeof examples)[number];

export default function ExampleDetail({
  example,
  related,
}: {
  example: Example;
  related: Example[];
}) {
  const router = useRouter();
  const [showBefore, setShowBefore] = useState(false);

  return (
    <article className="bg-background-50">
      <section className="relative w-full h-[280px] md:h-[380px] overflow-hidden">
        <img
          src={example.afterImage}
          alt={`${example.title} 施工後`}
          title={`茨城県 ${example.location} 塗装施工事例 丸愛装業 - ${example.title}`}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/50"></div>
        <div className="absolute inset-0 flex items-end w-full">
          <div className="w-full px-4 md:px-6 lg:px-8 max-w-5xl mx-auto pb-6 md:pb-8">
            <nav aria-label="パンくずリスト">
              <Link
                href="/works"
                className="inline-flex items-center gap-1.5 text-background-200 text-base hover:text-background-50 transition-colors mb-3 cursor-pointer"
              >
                <i className="ri-arrow-left-line"></i>
                施工事例一覧に戻る
              </Link>
            </nav>
            <span className="inline-block px-3 py-1 rounded-full bg-accent-500/90 text-background-50 text-sm font-semibold mb-2 whitespace-nowrap">
              {example.category}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-background-50">
              <strong>{example.title}</strong>
            </h1>
          </div>
        </div>
      </section>

      <section className="w-full py-10 md:py-14">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-4">
                  ビフォーアフター
                </h2>
                <div className="relative rounded-xl overflow-hidden border border-background-200/70 group cursor-pointer" onClick={() => setShowBefore(!showBefore)}>
                  <div className="h-64 md:h-80 overflow-hidden">
                    <img
                      src={showBefore ? example.beforeImage : example.afterImage}
                      alt={showBefore ? `${example.title} 施工前` : `${example.title} 施工後`}
                      title={showBefore ? `${example.title} 施工前の状態` : `${example.title} 施工後の仕上がり`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-base font-semibold whitespace-nowrap ${
                      showBefore
                        ? "bg-foreground-700/80 text-background-100"
                        : "bg-accent-500/90 text-background-50"
                    }`}>
                      {showBefore ? "施工前" : "施工後"}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-4 py-1.5 rounded-full bg-background-50/90 text-foreground-700 text-sm font-medium whitespace-nowrap">
                      クリックで切替
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => setShowBefore(false)}
                    className={`flex-1 py-2 rounded-lg text-base font-medium transition-all whitespace-nowrap cursor-pointer ${
                      !showBefore
                        ? "bg-accent-500 text-background-50"
                        : "bg-background-100 text-foreground-600 border border-background-200/70 hover:bg-background-200"
                    }`}
                  >
                    <i className="ri-check-line mr-1"></i>施工後
                  </button>
                  <button
                    onClick={() => setShowBefore(true)}
                    className={`flex-1 py-2 rounded-lg text-base font-medium transition-all whitespace-nowrap cursor-pointer ${
                      showBefore
                        ? "bg-foreground-700 text-background-100"
                        : "bg-background-100 text-foreground-600 border border-background-200/70 hover:bg-background-200"
                    }`}
                  >
                    <i className="ri-time-line mr-1"></i>施工前
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-4">
                  工事内容
                </h2>
                <p className="text-base md:text-lg text-foreground-700 leading-relaxed">
                  {example.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-4">
                  使用塗料・特徴
                </h2>
                <div className="flex flex-wrap gap-2">
                  {example.features.map((feat) => (
                    <span key={feat} className="px-4 py-2 rounded-full bg-secondary-100 text-secondary-800 text-base font-medium whitespace-nowrap">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-background-100 rounded-xl p-5 md:p-6 border border-background-200/70 sticky top-24">
                <h2 className="font-heading text-lg font-bold text-foreground-900 mb-4">
                  工事概要
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-foreground-500 mb-1">施工場所</dt>
                    <dd className="text-base text-foreground-800 font-medium flex items-center gap-1.5">
                      <i className="ri-map-pin-line text-primary-500 text-base"></i>
                      {example.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-foreground-500 mb-1">延床面積</dt>
                    <dd className="text-base text-foreground-800 font-medium flex items-center gap-1.5">
                      <i className="ri-home-4-line text-primary-500 text-base"></i>
                      {example.area}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-foreground-500 mb-1">施工期間</dt>
                    <dd className="text-base text-foreground-800 font-medium flex items-center gap-1.5">
                      <i className="ri-calendar-line text-primary-500 text-base"></i>
                      {example.period}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-foreground-500 mb-1">施工カテゴリ</dt>
                    <dd className="text-base text-foreground-800 font-medium flex items-center gap-1.5">
                      <i className="ri-tools-line text-primary-500 text-base"></i>
                      {example.category}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 pt-6 border-t border-background-200/70">
                  <h2 className="font-heading text-lg font-bold text-foreground-900 mb-3">
                    お客様の声
                  </h2>
                  <div className="bg-background-50 rounded-lg p-4 border border-background-200/70">
                    <div className="flex items-start gap-2">
                      <i className="ri-double-quotes-l text-accent-400 text-lg shrink-0"></i>
                      <p className="text-base text-foreground-600 leading-relaxed italic">
                        {example.testimonial}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-background-200/70">
                  <a
                    href="/#simulation"
                    className="block w-full py-3 rounded-full bg-primary-500 text-background-50 text-base font-semibold text-center hover:bg-primary-600 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-price-tag-3-line mr-1.5"></i>
                    概算料金をチェック
                  </a>
                  <a
                    href="tel:029-886-7913"
                    className="block w-full mt-3 py-3 rounded-full bg-background-50 text-foreground-800 border border-background-300/60 text-base font-medium text-center hover:bg-background-200 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-phone-line mr-1.5"></i>
                    029-886-7913
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="w-full py-10 md:py-14 bg-background-100">
          <div className="w-full px-4 md:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-2">
                同じカテゴリの施工事例
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {related.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => router.push(`/works/${rel.id}`)}
                  className="text-left bg-background-50 rounded-xl overflow-hidden border border-background-200/70 hover:border-primary-300 transition-colors cursor-pointer group"
                >
                  <div className="h-36 md:h-40 overflow-hidden">
                    <img
                      src={rel.afterImage}
                      alt={rel.title}
                      title={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold whitespace-nowrap">
                      {rel.category}
                    </span>
                    <h3 className="font-heading text-base font-bold text-foreground-900 mt-2 leading-snug line-clamp-2">
                      {rel.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/works"
                className="inline-block px-6 py-2.5 rounded-full bg-background-50 text-foreground-700 border border-background-300/60 text-base font-medium hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                すべての施工事例を見る
                <i className="ri-arrow-right-line ml-1 align-middle"></i>
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
