'use client';

// ヒーロー：写真を全幅に敷き、紺のグラデーションの上に明朝の見出し。右下に料金のカード
export default function HeroSection() {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector("#simulation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink text-plate-ink">
      {/* 背景の写真 */}
      <figure className="absolute inset-0 -z-10 m-0" data-slot="hero" data-alt="茨城県つくばみらい市の住宅街">
        <img
          src="/images/stock/tsukubamirai-street.jpg"
          width={1600}
          height={1200}
          alt="茨城県つくばみらい市の住宅街。新しい戸建てが並ぶ並木道"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
        {/* 文字を読みやすくする紺のグラデーション */}
        <div
          aria-hidden="true"
          data-keep
          className="absolute inset-0 z-[2] bg-[linear-gradient(100deg,color-mix(in_oklab,var(--color-ink)_92%,transparent)_0%,color-mix(in_oklab,var(--color-ink)_78%,transparent)_42%,color-mix(in_oklab,var(--color-ink)_25%,transparent)_100%)]"
        />
      </figure>

      <div className="container relative min-h-[calc(100svh-84px)] max-h-[860px] flex flex-col justify-center py-[var(--space-3xl)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow--light">Ami · Ibaraki — Exterior Painting</p>
            {/* 和文は文節ごとに inline-block にして、語の途中で折り返さないようにする */}
            <h1 className="mt-6 text-plate-ink text-[clamp(2.125rem,3.2vw+0.6rem,3.75rem)] leading-[1.4] max-w-none [&>span]:inline-block">
              <span>営業も下請けも</span><span>通さず、</span>
              <br />
              <span>自社の職人が</span><span>塗る。</span>
            </h1>
            <p className="mt-6 text-lead leading-relaxed text-plate-ink opacity-90 max-w-[30em] [&>span]:inline-block">
              <span>街の塗装屋さんから、</span><span>知り合いの塗装屋さんを</span><span>目指して。</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#simulation" onClick={handleCtaClick} className="btn btn--primary">
                <i className="ri-calculator-line text-xl" aria-hidden="true"></i>
                概算料金をシミュレーション
              </a>
              <a href="tel:029-886-7913" className="btn btn--on-ink font-figure tracking-[0.06em]">
                <i className="ri-phone-fill text-xl" aria-hidden="true"></i>
                029-886-7913
              </a>
            </div>
          </div>

          {/* 料金のカード */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-card bg-plate text-ink p-7 md:p-8 shadow-card border-t-4 border-accent">
              <p className="text-sm font-bold tracking-[0.08em] text-ink-2">外壁塗装の料金</p>
              <p className="mt-2 flex items-baseline gap-1.5 font-figure font-bold text-ink tabular-nums">
                <span className="text-[clamp(3.75rem,6vw,5.25rem)] leading-none">65</span>
                <span className="font-display text-[1.5rem]">万円〜</span>
              </p>
              <p className="mt-3 text-sm text-ink-2">ウレタン・延床25坪・足場代込み・税抜</p>
              <ul className="mt-5 pt-5 border-t border-paper-3 grid grid-cols-3 gap-2 text-center">
                {[
                  ["ri-shield-check-line", "10年保証"],
                  ["ri-team-line", "完全自社施工"],
                  ["ri-search-eye-line", "診断無料"],
                ].map(([icon, t]) => (
                  <li key={t} className="flex flex-col items-center gap-1.5 text-[0.8125rem] font-bold text-ink">
                    <i className={`${icon} text-2xl text-accent`} aria-hidden="true"></i>
                    {t}
                  </li>
                ))}
              </ul>
              <a href="/price" className="link mt-5 inline-flex items-center gap-1 text-sm font-bold">
                グレード別の料金を見る
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="absolute right-4 bottom-3 text-[0.6875rem] text-plate-ink opacity-70">イメージ写真（つくばみらい市の住宅街）</p>
    </section>
  );
}
