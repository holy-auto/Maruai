'use client';

// hero: Ledge（上に背の高い面：写真と価格の板、その下端に見出しが乗る）
export default function HeroSection() {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector("#simulation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="top" className="bg-paper">
      <div className="container flex flex-col min-h-[calc(100svh-120px)] pt-[var(--space-lg)] pb-[var(--space-2xl)]">
        {/* 面：写真（8列）と、価格を打ち出した板（4列） */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 min-h-[260px]">
          <figure
            className="photo md:col-span-8 min-h-[200px] m-0"
            data-slot="hero"
            data-alt="丸愛装業が塗り替えた阿見町の家の外観"
          >
            <img
              src="/images/hero.jpg"
              width={1200}
              height={700}
              alt="青空の下に並ぶ住宅街のイメージ"
              fetchPriority="high"
              style={{ objectPosition: "50% 45%" }}
            />
          </figure>
          <div className="plate md:col-span-4 flex flex-col justify-end p-6 md:p-8">
            <p className="label text-ink-2">外壁塗装の料金</p>
            <p className="mt-2 font-figure font-bold leading-[0.9] text-ink tabular-nums">
              <span className="text-[clamp(5rem,9vw,9rem)]">65</span>
              <span className="font-display text-[clamp(1.5rem,2vw,2rem)]">万円〜</span>
            </p>
            <p className="mt-3 text-sm text-ink-2">ウレタン・延床25坪・足場代込み・税抜</p>
            <a href="/price" className="link mt-4 text-sm self-start">グレード別の料金を見る</a>
          </div>
        </div>

        {/* 下端：見出し・一文・行動 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end pt-[var(--space-xl)]">
          <div className="md:col-span-8">
            {/* 和文は文節ごとに inline-block にして、語の途中で折り返さないようにする */}
            <h1 className="text-display-s max-w-none [&>span]:inline-block">
              <span>営業も下請けも</span><span>通さず、</span>
              <br />
              <span>自社の職人が</span><span>塗る。</span>
            </h1>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#simulation" onClick={handleCtaClick} className="btn btn--primary">
                <i className="ri-calculator-line text-xl" aria-hidden="true"></i>
                概算料金をシミュレーション
              </a>
              <a href="tel:029-886-7913" className="btn btn--secondary font-figure">
                <i className="ri-phone-line text-xl" aria-hidden="true"></i>
                029-886-7913
              </a>
            </div>
          </div>
          <p className="lead md:col-span-4 [&>span]:inline-block">
            <span>街の塗装屋さんから、</span><span>知り合いの塗装屋さんを</span><span>目指して。</span>
          </p>
        </div>
      </div>
    </section>
  );
}
