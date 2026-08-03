'use client';
import { useState, useEffect, useMemo } from "react";
import { updateSimulationEstimate } from "@/hooks/useSimulationEstimate";

const basePrices: Record<string, number> = {
  urethane: 65,
  silicon: 75,
  radical: 85,
  fluorine: 95,
  inorganic: 105,
};

const planOptions = [
  { key: "urethane", name: "ウレタン塗装", stars: 1, basePrice: 65 },
  { key: "silicon", name: "シリコン塗装", stars: 2, basePrice: 75 },
  { key: "radical", name: "ラジカル塗装", stars: 3, basePrice: 85 },
  { key: "fluorine", name: "フッ素塗装", stars: 4, basePrice: 95 },
  { key: "inorganic", name: "無機塗装", stars: 5, basePrice: 105 },
];

type PartsKey = "yane" | "nokiten" | "hafuita" | "toi" | "amado";

const partsOptions: { key: PartsKey; label: string; icon: string; surcharge: number }[] = [
  { key: "yane", label: "屋根塗装", icon: "ri-home-line", surcharge: 0.20 },
  { key: "nokiten", label: "軒天井塗装", icon: "ri-building-line", surcharge: 0.10 },
  { key: "hafuita", label: "破風板塗装", icon: "ri-layout-line", surcharge: 0.08 },
  { key: "toi", label: "樋（とい）塗装", icon: "ri-drop-line", surcharge: 0.08 },
  { key: "amado", label: "雨戸塗装", icon: "ri-shield-line", surcharge: 0.10 },
];

function calculateEstimate(
  tsubo: number,
  planKey: string,
  selectedParts: Record<PartsKey, boolean>
): number {
  const base = basePrices[planKey] || 65;
  const areaRatio = tsubo / 25;
  const surchargeTotal = partsOptions.reduce((sum, p) => {
    return sum + (selectedParts[p.key] ? p.surcharge : 0);
  }, 0);
  return Math.round(base * areaRatio * (1 + surchargeTotal));
}

export default function SimulationSection() {
  const [tsubo, setTsubo] = useState<number>(25);
  const [plan, setPlan] = useState<string>("silicon");
  const [selectedParts, setSelectedParts] = useState<Record<PartsKey, boolean>>({
    yane: false,
    nokiten: false,
    hafuita: false,
    toi: false,
    amado: false,
  });
  const [showResult, setShowResult] = useState(false);

  const estimate = useMemo(
    () => calculateEstimate(tsubo, plan, selectedParts),
    [tsubo, plan, selectedParts]
  );

  useEffect(() => {
    setShowResult(true);
  }, []);

  useEffect(() => {
    updateSimulationEstimate(estimate);
  }, [estimate]);

  const togglePart = (key: PartsKey) => {
    setSelectedParts((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getSelectedPartsText = () => {
    const selected = partsOptions.filter((p) => selectedParts[p.key]);
    if (selected.length === 0) return "";
    return "＋" + selected.map((p) => p.label).join("・");
  };

  const handleRequestEstimate = () => {
    const contactForm = document.querySelector("#contact");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const estimateInput = document.getElementById("estimate-field") as HTMLInputElement | null;
        if (estimateInput) {
          const partsText = getSelectedPartsText();
          estimateInput.value = `${estimate}万円（${tsubo}坪・${planOptions.find((p) => p.key === plan)?.name}${partsText}）`;
        }
      }, 800);
    }
  };

  return (
    <section id="simulation" className="w-full py-14 md:py-20 bg-background-50">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">
            Price Simulation
          </span>
          <h4 className="font-heading text-3xl md:text-5xl font-bold text-foreground-900 mb-3">
            <a href="#simulation">塗装料金シミュレーション</a>
          </h4>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 border border-primary-200 mb-4">
            <div className="w-5 h-5 flex items-center justify-center bg-primary-500 rounded-full">
              <i className="ri-check-line text-background-50 text-xs"></i>
            </div>
            <span className="text-primary-700 text-sm md:text-base font-bold">
              完全自社施工・中間マージンゼロ
            </span>
          </div>

          <p className="text-foreground-600 text-base md:text-lg max-w-2xl mx-auto mb-6">
            簡単な入力で、<strong>おおよその料金がすぐにわかります</strong>。
            <br />
            訪問販売の<strong>高額見積もり</strong>と比べてみてください。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-background-100 rounded-xl p-5 md:p-6 border border-background-200/70">
            <h3 className="font-heading text-lg md:text-xl font-bold text-foreground-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center bg-primary-100 rounded-full text-primary-600">
                <i className="ri-home-line text-sm"></i>
              </span>
              1. 延床面積を選択
            </h3>
            <div className="px-2 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-bold text-foreground-700">1坪</span>
                <span className="text-4xl font-heading font-bold text-primary-600">{tsubo}坪</span>
                <span className="text-base font-bold text-foreground-700">100坪</span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={tsubo}
                onChange={(e) => setTsubo(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer bg-background-200 accent-primary-600 hover:accent-primary-500"
                style={{ accentColor: 'var(--accent-color, #15803d)' }}
              />
              <div className="flex justify-between mt-2 px-1">
                <span className="text-xs text-foreground-400">1</span>
                <span className="text-xs text-foreground-400">20</span>
                <span className="text-xs text-foreground-400">40</span>
                <span className="text-xs text-foreground-400">60</span>
                <span className="text-xs text-foreground-400">80</span>
                <span className="text-xs text-foreground-400">100</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-foreground-500">
              ※スライドバーをドラッグして面積を調整してください
            </p>
          </div>

          <div className="bg-background-100 rounded-xl p-5 md:p-6 border border-background-200/70">
            <h3 className="font-heading text-lg md:text-xl font-bold text-foreground-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center bg-primary-100 rounded-full text-primary-600">
                <i className="ri-brush-line text-sm"></i>
              </span>
              2. 塗装プランを選択
            </h3>
            <div className="space-y-2">
              {planOptions.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPlan(p.key)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg border transition-all text-left ${
                    plan === p.key
                      ? "border-primary-400 bg-primary-50"
                      : "border-background-200/70 bg-background-50 hover:border-primary-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        plan === p.key ? "border-primary-500" : "border-foreground-300"
                      }`}
                    >
                      {plan === p.key && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                      )}
                    </div>
                    <div>
                      <span className="block text-base md:text-lg font-semibold text-foreground-800">
                        {p.name}
                      </span>
                      <span className="text-sm text-foreground-500">
                        25坪基準 {p.basePrice}万円（税抜）
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i
                        key={i}
                        className={`text-xs ${
                          i < p.stars ? "ri-star-fill text-accent-400" : "ri-star-line text-background-300"
                        }`}
                      ></i>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-background-100 rounded-xl p-5 md:p-6 border border-background-200/70">
          <h3 className="font-heading text-lg md:text-xl font-bold text-foreground-900 mb-2 flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center bg-primary-100 rounded-full text-primary-600">
              <i className="ri-home-gear-line text-sm"></i>
            </span>
            3. 施工箇所を選択
          </h3>
          <p className="text-xs text-foreground-500 mb-5">
            外壁塗装は基本料金に含まれています。追加で施工したい箇所をチェックしてください。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            <div className="col-span-2 sm:col-span-3 lg:col-span-5 flex items-center gap-3 px-3 sm:px-4 py-3 bg-primary-50 rounded-lg border border-primary-200 mb-1">
              <div className="w-6 h-6 rounded border-2 border-primary-500 bg-primary-500 flex items-center justify-center">
                <i className="ri-check-line text-background-50 text-sm"></i>
              </div>
              <span className="text-base md:text-lg font-semibold text-foreground-800">外壁塗装（基本）</span>
              <span className="ml-auto text-sm text-foreground-500 whitespace-nowrap">込み</span>
            </div>
            {partsOptions.map((p) => {
              const isChecked = selectedParts[p.key];
              return (
                <button
                  key={p.key}
                  onClick={() => togglePart(p.key)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg border transition-all ${
                    isChecked
                      ? "border-primary-400 bg-primary-50"
                      : "border-background-200/70 bg-background-50 hover:border-primary-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isChecked ? "bg-primary-500 border-primary-500" : "border-foreground-300"
                    }`}
                  >
                    {isChecked && <i className="ri-check-line text-background-50 text-sm"></i>}
                  </div>
                  <div className="text-left">
                    <span className="block text-sm sm:text-base font-semibold text-foreground-800 leading-tight">
                      {p.label}
                    </span>
                    <span className="text-sm text-primary-600 font-medium">
                      +{Math.round(p.surcharge * 100)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-foreground-500">
            ※各施工箇所の割増率は25坪あたりの目安です。足場代は基本料金に含まれています。
          </p>
        </div>

        <div
          className={`mt-4 md:mt-6 bg-primary-600 rounded-xl p-6 md:p-8 text-center transition-all duration-500 ${
            showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-primary-200 text-base md:text-lg font-medium mb-2">
            おおよその料金（税抜）
          </p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-background-50">
              {estimate}
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-background-100">万円</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-primary-200 text-base">
            <span className="px-3 py-1 bg-primary-700/50 rounded-full">
              {tsubo}坪
            </span>
            <span className="px-3 py-1 bg-primary-700/50 rounded-full">
              {planOptions.find((p) => p.key === plan)?.name}
            </span>
            {partsOptions
              .filter((p) => selectedParts[p.key])
              .map((p) => (
                <span key={p.key} className="px-3 py-1 bg-primary-700/50 rounded-full">
                  {p.label}
                </span>
              ))}
          </div>

          <div className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25">
            <div className="w-6 h-6 flex items-center justify-center bg-accent-400 rounded-full">
              <i className="ri-check-line text-background-50 text-xs"></i>
            </div>
            <span className="text-background-50 text-sm md:text-base font-bold">
              中間マージンゼロ！この金額が100%職人の手に届きます
            </span>
          </div>

          <p className="mt-3 text-sm text-primary-300">
            ※現地調査後の正式見積もりとは異なる場合があります。足場代込み。
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRequestEstimate}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-4 rounded-full bg-accent-500 text-background-50 font-bold text-base sm:text-lg hover:bg-accent-600 transition-all"
            >
              <i className="ri-file-list-3-line"></i>
              この内容で詳細見積もりを依頼する
            </button>
            <a
              href="tel:029-886-7913"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-4 rounded-full bg-white/15 text-background-50 font-semibold text-base sm:text-lg border border-white/30 hover:bg-white/25 transition-all"
            >
              <i className="ri-phone-line"></i>
              電話で相談する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}