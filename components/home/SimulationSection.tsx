'use client';
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { updateSimulationEstimate } from "@/hooks/useSimulationEstimate";

// 足場代など面積に依存しない固定費（万円）。坪数で割り引かないよう分離する。
const BASE_FIXED = 15;

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
  // 固定費（足場代等）は坪数で減らさず、面積依存分のみスケールする。25坪で base に一致。
  const areaCost = BASE_FIXED + (base - BASE_FIXED) * areaRatio;
  return Math.round(areaCost * (1 + surchargeTotal));
}

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-sm text-ink" role="img" aria-label={`耐久性 5段階中${count}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={i < count ? "ri-star-fill" : "ri-star-line text-muted"} aria-hidden="true"></i>
      ))}
    </span>
  );
}

export default function SimulationSection() {
  const router = useRouter();
  const [tsubo, setTsubo] = useState<number>(25);
  const [plan, setPlan] = useState<string>("silicon");
  const [selectedParts, setSelectedParts] = useState<Record<PartsKey, boolean>>({
    yane: false,
    nokiten: false,
    hafuita: false,
    toi: false,
    amado: false,
  });

  const estimate = useMemo(
    () => calculateEstimate(tsubo, plan, selectedParts),
    [tsubo, plan, selectedParts]
  );

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
    const partsText = getSelectedPartsText();
    const estimateText = `${estimate}万円（${tsubo}坪・${planOptions.find((p) => p.key === plan)?.name}${partsText}）`;
    const contactForm = document.querySelector("#contact");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const estimateInput = document.getElementById("estimate-field") as HTMLInputElement | null;
        if (estimateInput) estimateInput.value = estimateText;
      }, 800);
    } else {
      // お問い合わせセクションが無いページ（/price 等）ではトップの問い合わせへ遷移し、概算を引き継ぐ
      try {
        sessionStorage.setItem("maruai-estimate", estimateText);
      } catch {
        /* ストレージ不可でも遷移は行う */
      }
      router.push("/#contact");
    }
  };

  const planName = planOptions.find((p) => p.key === plan)?.name;
  const partsLabels = partsOptions.filter((p) => selectedParts[p.key]).map((p) => p.label);

  return (
    <section id="simulation" className="bg-paper py-[calc(var(--section-gap)/2)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <h2 className="md:col-span-6">あなたのお家はいくら？</h2>
          <div className="md:col-span-6">
            <p className="lead">
              坪数とプランを選ぶだけ。おおよその料金がその場ですぐにわかります。訪問販売の高額見積もりと比べてみてください。
            </p>
            <p className="mt-3 label">無料・登録不要・30秒で完了</p>
          </div>
        </div>

        <div className="mt-[var(--space-2xl)] grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-start">
          {/* 手順：本当に順番がある作業なので <ol> */}
          <ol className="lg:col-span-7 border-t-bar border-ink [counter-reset:step]">
            <li className="py-8 border-b border-paper-3 [counter-increment:step]">
              <h3 className="flex items-baseline gap-3 before:content-[counter(step)] before:font-figure before:text-3xl">
                延床面積を選択
              </h3>
              <div className="mt-6">
                <div className="flex items-end justify-between gap-4">
                  <span className="label">10坪</span>
                  <output htmlFor="tsubo-range" className="font-figure font-bold text-[clamp(3rem,5vw,4.5rem)] leading-none text-ink tabular-nums">
                    {tsubo}
                    <span className="font-display text-2xl ml-1">坪</span>
                  </output>
                  <span className="label">100坪</span>
                </div>
                <input
                  id="tsubo-range"
                  type="range"
                  min={10}
                  max={100}
                  step={1}
                  value={tsubo}
                  onChange={(e) => setTsubo(Number(e.target.value))}
                  aria-label="延床面積（坪）"
                  className="mt-4 w-full h-3 cursor-pointer"
                  style={{ accentColor: "var(--color-accent-deep)" }}
                />
                <div className="flex justify-between mt-2 label tabular-nums" aria-hidden="true">
                  <span>10</span>
                  <span>30</span>
                  <span>50</span>
                  <span>70</span>
                  <span>90</span>
                  <span>100</span>
                </div>
                <p className="mt-3 label">※スライドバーをドラッグして面積を調整してください</p>
              </div>
            </li>

            <li className="py-8 border-b border-paper-3 [counter-increment:step]">
              <h3 className="flex items-baseline gap-3 before:content-[counter(step)] before:font-figure before:text-3xl">
                塗装プランを選択
              </h3>
              <ul className="mt-6 border-t border-paper-3">
                {planOptions.map((p) => {
                  const active = plan === p.key;
                  return (
                    <li key={p.key}>
                      <button
                        type="button"
                        onClick={() => setPlan(p.key)}
                        aria-pressed={active}
                        className={`w-full grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 min-h-[64px] text-left border-b border-paper-3 transition-colors duration-short ${
                          active ? "bg-plate outline outline-2 outline-ink -outline-offset-2" : "hover:bg-paper-2"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 border-2 border-ink flex items-center justify-center ${active ? "bg-ink" : ""}`}
                          aria-hidden="true"
                        >
                          {active && <span className="w-2 h-2 bg-plate-ink"></span>}
                        </span>
                        <span>
                          <span className="block text-lg font-bold text-ink">{p.name}</span>
                          <span className="label">25坪基準 {p.basePrice}万円（税抜）</span>
                        </span>
                        <Stars count={p.stars} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li className="py-8 border-b border-paper-3 [counter-increment:step]">
              <h3 className="flex items-baseline gap-3 before:content-[counter(step)] before:font-figure before:text-3xl">
                施工箇所を選択
              </h3>
              <p className="mt-3 label">外壁塗装は基本料金に含まれています。追加で施工したい箇所をチェックしてください。</p>
              <div className="mt-5 flex items-center justify-between gap-3 px-4 py-3 bg-paper-2">
                <span className="inline-flex items-center gap-3 text-base font-bold text-ink">
                  <i className="ri-checkbox-line text-xl" aria-hidden="true"></i>
                  外壁塗装（基本）
                </span>
                <span className="label">込み</span>
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {partsOptions.map((p) => {
                  const isChecked = selectedParts[p.key];
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => togglePart(p.key)}
                      aria-pressed={isChecked}
                      className={`flex items-center gap-3 px-3 py-3 min-h-[56px] text-left border-2 transition-colors duration-short ${
                        isChecked ? "border-ink bg-plate" : "border-paper-3 hover:border-ink"
                      }`}
                    >
                      <i className={`text-xl ${isChecked ? "ri-checkbox-fill" : "ri-checkbox-blank-line"}`} aria-hidden="true"></i>
                      <span>
                        <span className="block text-base font-bold text-ink leading-tight">{p.label}</span>
                        <span className="label tabular-nums">+{Math.round(p.surcharge * 100)}%</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 label">※各施工箇所の割増率は25坪あたりの目安です。足場代は基本料金に含まれています。</p>
            </li>
          </ol>

          {/* 概算：選ぶあいだも見えるよう、右に留める */}
          <div className="lg:col-span-5 lg:sticky lg:top-[var(--space-lg)] bg-ink text-plate-ink grained grained--light p-6 md:p-8" aria-live="polite">
            <p className="text-base font-medium text-plate-ink">おおよその料金（税抜）</p>
            <p className="mt-2 font-figure font-bold leading-none tabular-nums text-plate-ink">
              <span className="text-[clamp(4.5rem,8vw,7.5rem)]">{estimate}</span>
              <span className="font-display text-3xl ml-1">万円</span>
            </p>
            <p className="mt-4 text-base text-plate-ink">
              {tsubo}坪 ／ {planName}
              {partsLabels.length > 0 && <> ＋ {partsLabels.join("・")}</>}
            </p>
            <p className="mt-5 pt-5 border-t border-[color-mix(in_oklab,var(--color-plate-ink)_30%,transparent)] text-base font-bold text-plate-ink">
              中間マージンゼロ。この金額が100%職人の手に届きます
            </p>
            <p className="mt-2 text-sm text-plate-ink">※現地調査後の正式見積もりとは異なる場合があります。足場代込み。</p>
            <div className="mt-6 flex flex-col gap-3">
              <button type="button" onClick={handleRequestEstimate} className="btn btn--primary w-full">
                <i className="ri-file-list-3-line text-xl" aria-hidden="true"></i>
                この内容で詳細見積もりを依頼する
              </button>
              <a href="tel:029-886-7913" className="btn btn--on-ink w-full">
                <i className="ri-phone-line text-xl" aria-hidden="true"></i>
                電話で相談する
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
