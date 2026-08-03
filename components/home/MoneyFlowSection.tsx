'use client';
import { useEffect, useRef, useState } from "react";

function FlowStep({
  label,
  amount,
  percentage,
  colorClass,
  isLast,
  visible,
  delay,
}: {
  label: string;
  amount: string;
  percentage?: string;
  colorClass: string;
  isLast?: boolean;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`flex items-center gap-3 transition-all duration-700 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full ${colorClass} shrink-0`}>
        <span className="font-heading font-bold text-background-50 text-xs md:text-sm text-center leading-tight">
          {amount}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-foreground-800 font-bold text-sm md:text-base leading-snug">{label}</p>
        {percentage && (
          <span className="text-foreground-500 text-xs md:text-sm">{percentage}</span>
        )}
      </div>
      {!isLast && (
        <div className="flex items-center shrink-0">
          <i className="ri-arrow-down-line text-foreground-400 text-lg md:text-xl"></i>
        </div>
      )}
    </div>
  );
}

export default function MoneyFlowSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="moneyflow" className="w-full py-10 md:py-20 bg-background-100">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-14">
          <span className="inline-block text-accent-500 text-sm md:text-base font-semibold tracking-widest uppercase mb-2">
            Secret
          </span>
          <h4 className="font-heading text-2xl md:text-5xl font-bold text-foreground-900 mb-3">
            <a href="#moneyflow">安さの秘密</a>
          </h4>
          <p className="text-foreground-600 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            同じ<strong>100万円の塗装工事</strong>。<br className="sm:hidden" />
            なぜ丸愛装業は<strong>高品質で適正価格</strong>なのか？<br className="hidden md:block" />
            お金の流れを比べれば、<strong>秘密は一目瞭然</strong>です。
          </p>
        </div>

        {/* Flow Comparison */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left: General Contractor */}
          <div className="bg-background-50 rounded-xl border-2 border-foreground-200/50 overflow-hidden">
            {/* Header */}
            <div className="bg-foreground-100/60 px-4 md:px-6 py-3 md:py-4 flex items-center gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-foreground-200 rounded-full shrink-0">
                <i className="ri-building-2-line text-foreground-600 text-base md:text-lg"></i>
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-base md:text-xl font-bold text-foreground-800">
                  一般的な塗装業者の場合
                </h3>
                <p className="text-foreground-500 text-xs md:text-sm">多重構造でお金が目減り</p>
              </div>
            </div>

            {/* Flow */}
            <div className="p-4 md:p-6">
              {/* Start: Customer Payment */}
              <div className="flex justify-center mb-3">
                <div
                  className={`bg-background-50 border-2 border-foreground-300/60 rounded-xl px-4 py-2 md:px-6 md:py-3 text-center transition-all duration-700 ${
                    sectionVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: "0ms" }}
                >
                  <span className="text-foreground-500 text-xs md:text-sm">お客様が支払う金額</span>
                  <p className="font-heading text-xl md:text-3xl font-bold text-foreground-900">100万円</p>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center mb-1">
                <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "100ms" }}>
                  <i className="ri-arrow-down-line text-foreground-400 text-xl md:text-2xl"></i>
                </div>
              </div>

              {/* Step 1: Sales Company */}
              <div
                className={`bg-rose-50 border border-rose-200 rounded-xl p-3 md:p-4 mb-1 transition-all duration-700 ${
                  sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-rose-500 rounded-full shrink-0">
                      <span className="font-heading font-bold text-background-50 text-xs md:text-sm">40万円</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground-800 font-bold text-sm md:text-base">営業会社のマージン</p>
                      <p className="text-foreground-500 text-xs md:text-sm">広告費・営業マン人件費</p>
                    </div>
                  </div>
                  <span className="text-rose-600 font-bold text-sm md:text-lg shrink-0 ml-2">▲ 約40%</span>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center py-1">
                <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "300ms" }}>
                  <i className="ri-arrow-down-line text-foreground-400 text-xl md:text-2xl"></i>
                </div>
              </div>

              {/* Remaining */}
              <div className="flex justify-center mb-1">
                <div
                  className={`bg-foreground-100/70 rounded-lg px-3 py-1.5 text-center transition-all duration-700 ${
                    sectionVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: "350ms" }}
                >
                  <span className="text-foreground-500 text-xs">残り</span>
                  <p className="font-heading text-base md:text-lg font-bold text-foreground-700">約60万円</p>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center py-1">
                <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "400ms" }}>
                  <i className="ri-arrow-down-line text-foreground-400 text-xl md:text-2xl"></i>
                </div>
              </div>

              {/* Step 2: Subcontractor */}
              <div
                className={`bg-amber-50 border border-amber-200 rounded-xl p-3 md:p-4 mb-1 transition-all duration-700 ${
                  sectionVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: "450ms" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-amber-500 rounded-full shrink-0">
                      <span className="font-heading font-bold text-background-50 text-xs md:text-sm">30万円</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground-800 font-bold text-sm md:text-base">下請け会社のマージン</p>
                      <p className="text-foreground-500 text-xs md:text-sm">中間管理費・諸経費</p>
                    </div>
                  </div>
                  <span className="text-amber-600 font-bold text-sm md:text-lg shrink-0 ml-2">▲ 約30%</span>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center py-1">
                <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "550ms" }}>
                  <i className="ri-arrow-down-line text-foreground-400 text-xl md:text-2xl"></i>
                </div>
              </div>

              {/* Final */}
              <div
                className={`bg-foreground-100/70 rounded-xl p-3 md:p-4 text-center transition-all duration-700 ${
                  sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <p className="text-foreground-500 text-xs md:text-sm mb-1">実際に工事に使われるのは...</p>
                <p className="font-heading text-2xl md:text-3xl font-bold text-foreground-700">
                  約<span className="text-rose-600">30</span>万円
                </p>
                <p className="text-foreground-500 text-xs md:text-sm mt-1">
                  <i className="ri-error-warning-line text-rose-500"></i> 支払った金額の<strong className="text-rose-600">約30%</strong>しか工事に使われない
                </p>
              </div>
            </div>
          </div>

          {/* Right: Maruai */}
          <div className="bg-background-50 rounded-xl border-2 border-accent-300/60 overflow-hidden">
            {/* Header */}
            <div className="bg-accent-100/70 px-4 md:px-6 py-3 md:py-4 flex items-center gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-accent-200 rounded-full shrink-0">
                <i className="ri-home-smile-line text-accent-700 text-base md:text-lg"></i>
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-base md:text-xl font-bold text-accent-800">
                  丸愛装業の場合
                </h3>
                <p className="text-accent-600 text-xs md:text-sm">直接依頼で全額還元</p>
              </div>
            </div>

            {/* Flow */}
            <div className="p-4 md:p-6">
              {/* Start: Customer Payment */}
              <div className="flex justify-center mb-3">
                <div
                  className={`bg-background-50 border-2 border-accent-300/60 rounded-xl px-4 py-2 md:px-6 md:py-3 text-center transition-all duration-700 ${
                    sectionVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: "0ms" }}
                >
                  <span className="text-foreground-500 text-xs md:text-sm">お客様が支払う金額</span>
                  <p className="font-heading text-xl md:text-3xl font-bold text-foreground-900">100万円</p>
                </div>
              </div>

              {/* Arrow straight down */}
              <div className="flex justify-center mb-1">
                <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "100ms" }}>
                  <i className="ri-arrow-down-line text-accent-400 text-xl md:text-2xl"></i>
                </div>
              </div>

              {/* Direct: No Middleman - big highlight */}
              <div
                className={`bg-accent-50 border-2 border-accent-300/60 rounded-xl p-4 md:p-5 text-center mb-1 transition-all duration-700 ${
                  sectionVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto flex items-center justify-center bg-accent-200 rounded-full mb-2 md:mb-3">
                  <i className="ri-shield-check-line text-accent-700 text-xl md:text-2xl"></i>
                </div>
                <p className="text-accent-800 font-bold text-base md:text-lg mb-1">営業マージン 0%</p>
                <p className="text-accent-600 text-xs md:text-sm">広告費・営業マン人件費ゼロ</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1">
                <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "300ms" }}>
                  <i className="ri-arrow-down-line text-accent-400 text-xl md:text-2xl"></i>
                </div>
              </div>

              {/* Direct Construction */}
              <div
                className={`bg-accent-50 border-2 border-accent-300/60 rounded-xl p-4 md:p-5 text-center mb-1 transition-all duration-700 ${
                  sectionVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto flex items-center justify-center bg-accent-200 rounded-full mb-2 md:mb-3">
                  <i className="ri-user-star-line text-accent-700 text-xl md:text-2xl"></i>
                </div>
                <p className="text-accent-800 font-bold text-base md:text-lg mb-1">完全自社施工</p>
                <p className="text-accent-600 text-xs md:text-sm">代表が現場で直接指揮・下請けゼロ</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-1">
                <div className={`transition-all duration-700 ${sectionVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "450ms" }}>
                  <i className="ri-arrow-down-line text-accent-400 text-xl md:text-2xl"></i>
                </div>
              </div>

              {/* Final: Full Value */}
              <div
                className={`bg-accent-500 rounded-xl p-4 md:p-6 text-center transition-all duration-700 ${
                  sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <p className="text-background-50/80 text-xs md:text-sm mb-1">実際に工事に使われる金額</p>
                <p className="font-heading text-2xl md:text-3xl font-bold text-background-50">
                  <span className="text-3xl md:text-4xl">100</span>万円
                </p>
                <p className="text-background-50/80 text-xs md:text-sm mt-1">
                  <i className="ri-check-double-line"></i> 支払った金額の<strong>100%</strong>が職人と材料に
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div
          className={`mt-6 md:mt-10 bg-background-50 rounded-xl border border-background-200/70 p-4 md:p-6 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-accent-100 rounded-full shrink-0">
              <i className="ri-lightbulb-line text-accent-700 text-xl md:text-2xl"></i>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-foreground-800 text-base md:text-lg font-bold leading-relaxed">
                一般的な業者は<strong className="text-rose-600">約70%が中間マージン</strong>。
                丸愛装業なら<strong className="text-accent-700">100%が職人と材料</strong>に。
              </p>
              <p className="text-foreground-600 text-sm md:text-base leading-relaxed mt-1">
                単に「安い」だけじゃない。無駄を省いて品質に全振りすることで、
                <strong className="text-accent-700">適正価格×最高品質</strong>の両立を実現しています。
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-8 md:mt-12 transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <style>{`
            @keyframes cta-arrow-bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(4px); }
            }
            @keyframes cta-shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
            .cta-arrow-anim {
              animation: cta-arrow-bounce 1.5s ease-in-out infinite;
            }
            .cta-shimmer-anim::after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 60%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
              animation: cta-shimmer 2.5s ease-in-out infinite;
            }
          `}</style>
          <div className="relative bg-background-50 rounded-2xl border-2 border-accent-300/60 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-accent-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-accent-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            <div className="relative p-6 md:p-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 border border-accent-300/60 mb-4 md:mb-5">
                <div className="w-5 h-5 flex items-center justify-center bg-accent-500 rounded-full">
                  <i className="ri-time-line text-background-50 text-xs"></i>
                </div>
                <span className="text-accent-700 text-xs md:text-sm font-bold">30秒でわかる</span>
              </div>

              <h3 className="font-heading text-xl md:text-3xl font-bold text-foreground-900 mb-2 md:mb-3">
                あなたのお家はいくら？
              </h3>
              <p className="text-foreground-600 text-sm md:text-base mb-6 md:mb-8 max-w-lg mx-auto leading-relaxed">
                坪数とプランを選ぶだけ。<strong>おおよその料金</strong>がその場ですぐにわかります。
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <a
                  href="#simulation"
                  className="cta-shimmer-anim relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-10 py-4 sm:py-5 rounded-full bg-accent-500 text-background-50 font-bold text-base sm:text-lg md:text-xl hover:bg-accent-600 transition-colors cursor-pointer shadow-[0_0_30px_rgba(var(--accent-500),0.25)] hover:shadow-[0_0_45px_rgba(var(--accent-500),0.4)]"
                >
                  <span className="relative z-10 inline-flex items-center gap-2 sm:gap-3">
                    <i className="ri-calculator-line text-lg sm:text-xl md:text-2xl"></i>
                    <span className="whitespace-nowrap">料金シミュレーションを試す</span>
                    <i className="ri-arrow-down-line text-base sm:text-lg md:text-xl cta-arrow-anim"></i>
                  </span>
                </a>
                <a
                  href="tel:029-886-7913"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-4 sm:py-5 rounded-full bg-background-100 text-foreground-700 font-semibold text-sm sm:text-base hover:bg-background-200 transition-colors border border-background-300/70 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-phone-line"></i>
                  まずは電話で質問する
                </a>
              </div>

              <p className="mt-4 md:mt-5 text-xs text-foreground-400">
                <i className="ri-shield-check-line text-accent-500"></i> 無料・登録不要・30秒で完了
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}