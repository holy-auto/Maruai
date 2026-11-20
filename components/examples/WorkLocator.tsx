import { MAIN_MAP, WATER_PATH } from "@/lib/ibarakiMap";
import { cityOf } from "@/lib/examples";

// 施工場所の位置図：茨城県南部の小さな地図に、施工した市町村を朱で塗り、本社（阿見町）に点を打つ
export default function WorkLocator({ location, className = "" }: { location: string; className?: string }) {
  const city = cityOf(location);
  const target = MAIN_MAP.munis.find((m) => m.name === city);
  const hq = MAIN_MAP.munis.find((m) => m.name === "阿見町");
  // 施工地の周りを切り出して少し寄る（地図全体だと市が小さすぎる）
  const cx = target?.cx ?? 320, cy = target?.cy ?? 280;
  const vw = 360, vh = 270;
  const x0 = Math.max(0, Math.min(MAIN_MAP.w - vw, cx - vw / 2));
  const y0 = Math.max(0, Math.min(MAIN_MAP.h - vh, cy - vh / 2));
  return (
    <figure className={`m-0 ${className}`}>
      <svg
        viewBox={`${x0} ${y0} ${vw} ${vh}`}
        className="block w-full h-auto rounded-control bg-[oklch(90%_0.04_230)]"
        role="img"
        aria-label={`施工場所：${location}（茨城県南部の地図）`}
      >
        {MAIN_MAP.neighbors.map((n) => (
          <path key={n.name} d={n.d} fill="oklch(93% 0.006 80)" stroke="oklch(85% 0.008 80)" strokeWidth="1" />
        ))}
        {MAIN_MAP.munis.map((m) => (
          <path
            key={m.name}
            d={m.d}
            fill={m.name === city ? "var(--color-accent)" : "oklch(99% 0.004 85)"}
            stroke={m.name === city ? "var(--color-accent-deep)" : "oklch(82% 0.01 80)"}
            strokeWidth={m.name === city ? 2 : 1}
          />
        ))}
        <path d={WATER_PATH} fill="oklch(90% 0.04 230)" stroke="oklch(90% 0.04 230)" strokeWidth="0.6" />
        {target && (
          <text
            x={target.cx}
            y={target.cy + 6}
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill="white"
            stroke="var(--color-accent-deep)"
            strokeWidth="4"
            paintOrder="stroke"
          >
            {city}
          </text>
        )}
        {hq && city !== "阿見町" && (
          <g>
            <circle cx={hq.cx} cy={hq.cy} r="8" fill="var(--color-ink)" stroke="white" strokeWidth="2.5" />
            <text x={hq.cx + 13} y={hq.cy + 6} fontSize="16" fontWeight="700" fill="var(--color-ink)" stroke="white" strokeWidth="3.5" paintOrder="stroke">
              本社
            </text>
          </g>
        )}
      </svg>
    </figure>
  );
}
