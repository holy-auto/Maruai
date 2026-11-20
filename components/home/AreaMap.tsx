import { MAIN_MAP, INSET_MAP, WATER_PATH } from "@/lib/ibarakiMap";

// 対応エリアの地図：国土数値情報の市町村境界から描いた茨城県南部。
// 阿見町（本社）を朱、主な施工エリアの5市を淡い朱、その他の市町村は地の色。
const HQ = "阿見町";
const MAIN_AREAS = ["牛久市", "土浦市", "つくば市", "取手市", "龍ケ崎市"];
// 地名を小さく添える周辺の市町村（読みやすさのため一部だけ）
const CONTEXT_LABELS = ["石岡市", "かすみがうら市", "稲敷市", "美浦村", "つくばみらい市", "守谷市", "常総市", "河内町", "利根町", "行方市"];
// 地名の位置の微調整（重心が境界寄りになる市町村）
const NUDGE: Record<string, [number, number]> = {
  "つくば市": [0, -10],
  "土浦市": [-6, -6],
  "龍ケ崎市": [0, 4],
  "かすみがうら市": [10, -30],
  "阿見町": [6, 2],
};

export default function AreaMap() {
  const { w, h, munis, lake } = MAIN_MAP;
  return (
    <figure className="m-0 rounded-card bg-plate border border-paper-3 shadow-card overflow-hidden">
      <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 md:px-6 pt-5 md:pt-6">
        <span className="flex items-center gap-2 font-display font-bold text-title text-ink">
          <i className="ri-map-pin-2-fill text-accent" aria-hidden="true"></i>
          茨城県南部の対応エリア
        </span>
        <span className="flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-ink-2" aria-hidden="true">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-[3px] bg-accent"></span>本社（阿見町）
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-[3px] bg-[oklch(86%_0.07_35)] border border-[oklch(70%_0.11_35)]"></span>主な施工エリア
          </span>
        </span>
      </figcaption>

      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="block w-full h-auto" role="img" aria-labelledby="area-map-title area-map-desc">
          <title id="area-map-title">茨城県南部の地図：丸愛装業の対応エリア</title>
          <desc id="area-map-desc">
            本社のある阿見町を中心に、牛久市・土浦市・つくば市・取手市・龍ケ崎市が主な施工エリアです。阿見町の北東には霞ヶ浦があります。
          </desc>
          <defs>
            <clipPath id="area-map-clip">
              <rect width={w} height={h} />
            </clipPath>
            {/* 水面（県の外・霞ヶ浦）の淡い青 */}
            <pattern id="area-map-water" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="oklch(90% 0.04 230)" />
            </pattern>
          </defs>
          <rect width={w} height={h} fill="url(#area-map-water)" />
          <g clipPath="url(#area-map-clip)">
            {/* 隣の県（灰色の陸地） */}
            {MAIN_MAP.neighbors.map((n) => (
              <path key={n.name} d={n.d} fill="oklch(93% 0.006 80)" stroke="oklch(85% 0.008 80)" strokeWidth="0.8" />
            ))}
            {munis.map((m) => {
              const isHq = m.name === HQ;
              const isMain = MAIN_AREAS.includes(m.name);
              return (
                <path
                  key={m.name}
                  d={m.d}
                  fill={isHq ? "var(--color-accent)" : isMain ? "oklch(86% 0.07 35)" : "oklch(99% 0.004 85)"}
                  stroke={isHq || isMain ? "oklch(62% 0.12 35)" : "oklch(82% 0.01 80)"}
                  strokeWidth={isHq || isMain ? 1.4 : 0.9}
                  strokeLinejoin="round"
                  className="transition-[fill] duration-short hover:brightness-95"
                >
                  <title>{m.name}{isHq ? "（本社）" : isMain ? "（主な施工エリア）" : ""}</title>
                </path>
              );
            })}
            {/* 水域（霞ヶ浦・利根川など）を市町村の上に重ねる。タイルの継ぎ目が出ないよう同色の細い縁 */}
            <path d={WATER_PATH} fill="oklch(90% 0.04 230)" stroke="oklch(90% 0.04 230)" strokeWidth="0.6" pointerEvents="none" />
          </g>

          {/* 霞ヶ浦 */}
          <text x={lake[0]} y={lake[1]} textAnchor="middle" fontSize="15" fontWeight="700" fill="oklch(45% 0.08 230)" letterSpacing="0.3em">
            霞ヶ浦
          </text>
          <text x={w * 0.36} y={h - 14} textAnchor="middle" fontSize="12" fill="var(--color-muted)" letterSpacing="0.2em">
            千葉県
          </text>

          {/* 周辺の市町村名（小さく） */}
          {munis
            .filter((m) => CONTEXT_LABELS.includes(m.name))
            .map((m) => {
              const [dx, dy] = NUDGE[m.name] ?? [0, 0];
              return (
                <text key={m.name} x={m.cx + dx} y={m.cy + dy} textAnchor="middle" fontSize="11.5" fill="var(--color-muted)">
                  {m.name}
                </text>
              );
            })}

          {/* 主な施工エリアの市名（白い縁取りで読みやすく） */}
          {munis
            .filter((m) => MAIN_AREAS.includes(m.name))
            .map((m) => {
              const [dx, dy] = NUDGE[m.name] ?? [0, 0];
              return (
                <text
                  key={m.name}
                  x={m.cx + dx}
                  y={m.cy + dy + 5}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="var(--color-ink)"
                  stroke="white"
                  strokeWidth="4"
                  paintOrder="stroke"
                >
                  {m.name}
                </text>
              );
            })}

          {/* 本社：阿見町 */}
          {munis
            .filter((m) => m.name === HQ)
            .map((m) => {
              const [dx, dy] = NUDGE[m.name] ?? [0, 0];
              const x = m.cx + dx, y = m.cy + dy;
              return (
                <g key={m.name}>
                  <circle cx={x} cy={y - 26} r="15" fill="var(--color-ink)" />
                  <text x={x} y={y - 21} textAnchor="middle" fontSize="14" fontWeight="700" fill="white">丸</text>
                  <path d={`M${x - 6} ${y - 13} L${x} ${y - 4} L${x + 6} ${y - 13} Z`} fill="var(--color-ink)" />
                  <text x={x} y={y + 16} textAnchor="middle" fontSize="18" fontWeight="700" fill="white" stroke="var(--color-accent-deep)" strokeWidth="3" paintOrder="stroke">
                    阿見町
                  </text>
                </g>
              );
            })}

          {/* 方位 */}
          <g transform={`translate(${w - 28} 34)`} fill="var(--color-ink-2)">
            <path d="M0 -18 L7 6 L0 1 L-7 6 Z" />
            <text y="22" textAnchor="middle" fontSize="12" fontWeight="700">N</text>
          </g>
          {/* 縮尺：10km */}
          <g transform={`translate(18 ${h - 22})`} fill="none" stroke="var(--color-ink-2)" strokeWidth="1.5">
            {/* 10km ＝ 10 / 111.32 度（緯度方向）× 本図の1度あたりのpx（w ÷ 経度0.77度×cos36.05°）≒ 92px */}
            <path d={`M0 0 V6 H${(10 / 111.32) * (w / (0.77 * Math.cos((36.05 * Math.PI) / 180)))} V0`} />
            <text x="0" y="-5" fontSize="11" fill="var(--color-ink-2)" stroke="none">10km</text>
          </g>
        </svg>

        {/* 差し込み図：茨城県全体と、本図の範囲 */}
        <svg
          viewBox={`-4 -4 ${INSET_MAP.w + 8} ${INSET_MAP.h + 8}`}
          className="absolute bottom-3 right-3 w-[64px] sm:w-[88px] md:w-[110px] h-auto rounded-[4px]"
          aria-hidden="true"
        >
          <rect x="-4" y="-4" width={INSET_MAP.w + 8} height={INSET_MAP.h + 8} rx="4" fill="white" stroke="oklch(89.5% 0.01 80)" />
          <path d={INSET_MAP.d} fill="oklch(90% 0.012 80)" stroke="white" strokeWidth="0.4" />
          <rect x={INSET_MAP.box.x} y={INSET_MAP.box.y} width={INSET_MAP.box.w} height={INSET_MAP.box.h} fill="none" stroke="var(--color-accent)" strokeWidth="1.8" />
          <circle cx={INSET_MAP.ami[0]} cy={INSET_MAP.ami[1]} r="3.5" fill="var(--color-accent)" />
          <text x={INSET_MAP.w / 2 + 14} y="16" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--color-ink-2)">茨城県</text>
        </svg>
      </div>

      <p className="px-5 md:px-6 py-3 border-t border-paper-3 text-[0.6875rem] text-muted leading-relaxed">
        出典：国土数値情報（行政区域データ）（国土交通省）、国土地理院ベクトルタイル（水域）を加工して作成。上記以外の地域もご相談ください。
      </p>
    </figure>
  );
}
