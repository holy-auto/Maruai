// Signature：100万円がどこへ行くか。一般的な業者は押し込まれた面、丸愛装業は打ち出した板で比べる。
// 数字（約40%・約30%・約30万円・100%）はお客様（施主）にご確認いただいた内容のまま。

type Row = { label: string; note?: string; value?: string };

const general: Row[] = [
  { label: "お客様が支払う金額", value: "100万円" },
  { label: "営業会社のマージン", note: "広告費・営業マン人件費", value: "約40%（40万円）" },
  { label: "残り", value: "約60万円" },
  { label: "下請け会社のマージン", note: "中間管理費・諸経費", value: "約30%（30万円）" },
];

const maruai: Row[] = [
  { label: "お客様が支払う金額", value: "100万円" },
  { label: "営業マージン", note: "広告費・営業マン人件費ゼロ", value: "0%" },
  { label: "完全自社施工", note: "代表が現場で直接指揮・下請けゼロ" },
];

function Rows({ rows }: { rows: Row[] }) {
  return (
    <dl className="border-t-bar border-ink">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[1fr_auto] gap-x-6 items-baseline py-4 border-b border-paper-3">
          <dt>
            <span className="block text-base font-medium text-ink">{r.label}</span>
            {r.note && <span className="block label mt-0.5">{r.note}</span>}
          </dt>
          <dd className="font-figure font-bold text-xl text-ink tabular-nums whitespace-nowrap">{r.value ?? ""}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function MoneyFlowSection() {
  return (
    <section id="moneyflow" className="bg-paper py-[calc(var(--section-gap-l)/2)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <h2 className="md:col-span-6">なぜ、この値段で塗れる？</h2>
          <p className="lead md:col-span-6">
            同じ100万円の塗装工事。お金の流れを比べれば、違いは一目瞭然です。
          </p>
        </div>

        <div className="mt-[var(--space-2xl)] grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 items-stretch">
          {/* 一般的な業者：押し込まれた面（paper-2） */}
          <div className="bg-paper-2 p-6 md:p-10 flex flex-col">
            <h3>一般的な塗装業者の場合</h3>
            <p className="mt-1 label">多重構造でお金が目減り</p>
            <div className="mt-6">
              <Rows rows={general} />
            </div>
            <div className="mt-auto pt-8">
              <p className="text-base font-medium text-ink">実際に工事に使われるのは</p>
              <p className="font-figure font-bold leading-none text-ink tabular-nums">
                <span className="text-[clamp(4.5rem,8vw,8rem)]">約30</span>
                <span className="font-display text-[clamp(1.5rem,2vw,2rem)]">万円</span>
              </p>
              <p className="mt-2 text-base text-ink-2">支払った金額の約30%しか工事に使われない</p>
            </div>
          </div>

          {/* 丸愛装業：打ち出した板（plate） */}
          <div className="plate p-6 md:p-10 flex flex-col">
            <h3>丸愛装業の場合</h3>
            <p className="mt-1 label">直接依頼で全額還元</p>
            <div className="mt-6">
              <Rows rows={maruai} />
            </div>
            <div className="mt-auto pt-8">
              <p className="text-base font-medium text-ink">実際に工事に使われる金額</p>
              <p className="font-figure font-bold leading-none text-ink tabular-nums">
                <span className="text-[clamp(4.5rem,8vw,8rem)]">100</span>
                <span className="font-display text-[clamp(1.5rem,2vw,2rem)]">万円</span>
              </p>
              <p className="mt-2 text-base text-ink-2">支払った金額の100%が職人と材料に</p>
            </div>
          </div>
        </div>

        <div className="mt-[var(--space-2xl)] grid grid-cols-1 md:grid-cols-12 gap-x-8">
          <p className="md:col-span-10 font-display font-bold text-title text-ink">
            一般的な業者は約70%が中間マージン。丸愛装業なら100%が職人と材料に。
          </p>
          <p className="md:col-span-8 mt-3 text-base text-ink-2">
            単に「安い」だけじゃない。無駄を省いて品質に全振りすることで、適正価格×最高品質の両立を実現しています。
          </p>
        </div>
      </div>
    </section>
  );
}
