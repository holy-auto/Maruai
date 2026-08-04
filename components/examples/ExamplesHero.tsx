'use client';
export default function ExamplesHero() {
  return (
    <section id="examples-hero" className="relative w-full h-[340px] md:h-[440px] overflow-hidden">
      <img
        src="https://readdy.ai/api/search-image?query=Beautiful%20Japanese%20residential%20street%20with%20well-maintained%20houses%20featuring%20freshly%20painted%20exteriors%20in%20various%20warm%20neutral%20colors%2C%20professional%20architectural%20photography%2C%20bright%20sunny%20day%20with%20blue%20sky%2C%20green%20trees%2C%20clean%20modern%20aesthetic%2C%20high%20quality%2C%20serene%20atmosphere&width=1600&height=900&seq=maruai-examples-hero&orientation=landscape"
        alt="茨城県阿見町 丸愛装業 施工事例"
        title="茨城県の外壁塗装・屋根塗装 施工事例 丸愛装業"
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/40"></div>
      <div className="absolute inset-0 flex items-center justify-center w-full">
        <div className="text-center px-4 w-full">
          <span className="inline-block text-accent-400 text-base font-semibold tracking-widest uppercase mb-3">
            Our works
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-background-50 mb-3">
            <strong>施工事例</strong>
          </h2>
          <p className="text-background-200 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-6">
            <strong>阿見町・牛久市・土浦市・つくば市</strong>を中心に、
            <br className="hidden md:block" />
            数多くの<strong>外壁塗装・屋根塗装</strong>を手掛けてきました
          </p>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <a
          href="#examples-grid"
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector("#examples-grid");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-background-50/20 text-background-50 hover:bg-background-50/30 transition-colors cursor-pointer"
        >
          <i className="ri-arrow-down-s-line text-lg"></i>
        </a>
      </div>
    </section>
  );
}