// なぜ、この値段で塗れる？：同じ100万円がどこへ行くかを、横に積んだ棒グラフで見せる。
// 数字（約40%・約30%・約30万円・100%）はお客様（施主）にご確認いただいた内容のまま。
// 色の役割：工事に使われるお金だけ朱、中間マージンは灰色（失われるお金として後ろに下げる）。

type Segment = { key: string; label: string; note: string; pct: number; amount: string; tone: "lost" | "lost2" | "work" };

const ROWS: { who: string; sub: string; segments: Segment[] }[] = [
  {
    who: "一般的な塗装業者",
    sub: "営業会社 → 下請け → 職人",
    segments: [
      { key: "sales", label: "営業会社のマージン", note: "広告費・営業マン人件費", pct: 40, amount: "約40万円", tone: "lost" },
      { key: "sub", label: "下請け会社のマージン", note: "中間管理費・諸経費", pct: 30, amount: "約30万円", tone: "lost2" },
      { key: "work", label: "工事に使われる", note: "職人・材料", pct: 30, amount: "約30万円", tone: "work" },
    ],
  },
  {
    who: "丸愛装業",
    sub: "お客様 → 自社の職人（直接）",
    segments: [{ key: "work", label: "工事に使われる", note: "職人・材料（営業マージン0%・下請けゼロ）", pct: 100, amount: "100万円", tone: "work" }],
  },
];

const TONE: Record<Segment["tone"], { bar: string; text: string }> = {
  lost: { bar: "bg-[oklch(40%_0.035_255)]", text: "text-plate-ink" },
  lost2: { bar: "bg-[oklch(70%_0.025_255)]", text: "text-ink" },
  work: { bar: "bg-accent", text: "text-accent-ink" },
};

const LEGEND: { tone: Segment["tone"]; label: string }[] = [
  { tone: "lost", label: "営業会社のマージン" },
  { tone: "lost2", label: "下請け会社のマージン" },
  { tone: "work", label: "工事（職人・材料）に使われるお金" },
];

export default function MoneyFlowSection() {
  return (
    <section id="moneyflow" className="bg-paper py-[var(--section-gap)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <div className="md:col-span-6">
            <p className="eyebrow">Why Maruai</p>
            <h2 className="mt-4">なぜ、この値段で塗れる？</h2>
          </div>
          <p className="lead md:col-span-6">
            同じ100万円の塗装工事。お金の流れを比べれば、違いは一目瞭然です。
          </p>
        </div>

        {/* 棒グラフ */}
        <figure className="mt-[var(--space-2xl)] m-0 rounded-card bg-plate border border-paper-3 shadow-card p-6 md:p-10">
          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <span className="font-display font-bold text-title text-ink">お客様が支払う100万円の行き先</span>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2" aria-hidden="true">
              {LEGEND.map((l) => (
                <li key={l.tone} className="inline-flex items-center gap-2">
                  <span className={`inline-block w-3.5 h-3.5 rounded-[3px] ${TONE[l.tone].bar}`}></span>
                  {l.label}
                </li>
              ))}
            </ul>
          </figcaption>

          <div className="mt-8 space-y-10" aria-hidden="true">
            {ROWS.map((row) => (
              <div key={row.who}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-display font-bold text-[1.25rem] text-ink">{row.who}</p>
                  <p className="text-sm text-muted">{row.sub}</p>
                </div>
                {/* 棒：セグメントの間に2pxの隙間、両端は4pxの角丸 */}
                <div className="mt-3 flex gap-[2px] h-16 md:h-20">
                  {row.segments.map((seg, i) => (
                    <div
                      key={seg.key}
                      title={`${seg.label}：${seg.amount}（${seg.pct}%）`}
                      style={{ width: `${seg.pct}%` }}
                      className={`relative flex flex-col justify-center px-3 md:px-4 min-w-0 ${TONE[seg.tone].bar} ${TONE[seg.tone].text} ${
                        i === 0 ? "rounded-l-[4px]" : ""
                      } ${i === row.segments.length - 1 ? "rounded-r-[4px]" : ""}`}
                    >
                      <span className="font-figure font-bold text-[1.125rem] md:text-[1.5rem] leading-none tabular-nums whitespace-nowrap">
                        {seg.pct}%
                      </span>
                      <span className="hidden sm:block mt-1 text-[0.75rem] md:text-[0.8125rem] font-bold leading-tight truncate">
                        {seg.amount}
                      </span>
                    </div>
                  ))}
                </div>
                {/* 棒の下に、各セグメントの名前と内訳 */}
                <div className="mt-2 flex gap-[2px]">
                  {row.segments.map((seg) => (
                    <p key={seg.key} style={{ width: `${seg.pct}%` }} className="min-w-0 pr-2 text-[0.75rem] md:text-sm text-ink-2 leading-snug">
                      <span className="block font-bold text-ink">{seg.label}</span>
                      <span className="hidden md:block">{seg.note}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 読み上げ・印刷用の表 */}
          <table className="visually-hidden">
            <caption>お客様が支払う100万円の行き先</caption>
            <thead>
              <tr><th scope="col">業者</th><th scope="col">項目</th><th scope="col">割合</th><th scope="col">金額</th></tr>
            </thead>
            <tbody>
              {ROWS.flatMap((row) =>
                row.segments.map((seg) => (
                  <tr key={row.who + seg.key}>
                    <th scope="row">{row.who}</th><td>{seg.label}（{seg.note}）</td><td>{seg.pct}%</td><td>{seg.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </figure>

        {/* 結果の比較：工事に使われる金額 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          <div className="rounded-card bg-paper-2 border border-paper-3 p-6 md:p-8">
            <p className="text-sm font-bold text-ink-2">一般的な業者で、工事に使われるのは</p>
            <p className="mt-2 flex items-baseline gap-1.5 font-figure font-bold text-ink-2 tabular-nums">
              <span className="text-[clamp(3.25rem,5vw,4.5rem)] leading-none">約30</span>
              <span className="font-display text-[1.5rem]">万円</span>
            </p>
            <p className="mt-2 text-sm text-ink-2">支払った金額の約30%しか工事に使われない</p>
          </div>
          <div className="hidden md:grid place-items-center" aria-hidden="true">
            <span className="grid place-items-center w-14 h-14 rounded-full bg-ink text-plate-ink font-display font-bold text-lg">約3倍</span>
          </div>
          <div className="rounded-card bg-plate border-2 border-accent shadow-card p-6 md:p-8">
            <p className="text-sm font-bold text-accent">丸愛装業なら、工事に使われるのは</p>
            <p className="mt-2 flex items-baseline gap-1.5 font-figure font-bold text-ink tabular-nums">
              <span className="text-[clamp(3.25rem,5vw,4.5rem)] leading-none">100</span>
              <span className="font-display text-[1.5rem]">万円</span>
            </p>
            <p className="mt-2 text-sm text-ink-2">支払った金額の100%が職人と材料に</p>
          </div>
        </div>

        <p className="mt-8 text-base text-ink-2 max-w-[44em]">
          単に「安い」だけじゃない。無駄を省いて品質に全振りすることで、適正価格×最高品質の両立を実現しています。
        </p>
      </div>
    </section>
  );
}
