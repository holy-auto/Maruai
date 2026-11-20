// 塗り替えどき：築年数のタイムライン、劣化サインのカード、無料診断・火災保険
const reasons = [
  {
    title: "外壁のはがれ",
    icon: "ri-layout-masonry-line",
    severity: "危険",
    desc: "塗膜が浮き、ひび割れ、めくれが発生。放置すると雨水が内部に侵入し、建物の構造材が腐食する恐れがあります。",
    consequence: ["放置", "雨水浸入", "柱・梁の腐食"],
  },
  {
    title: "白い粉がつく",
    icon: "ri-hand-coin-line",
    severity: "注意",
    desc: "触ると白い粉が手につく「チョーキング現象」。塗膜の劣化サインで、防水性能が著しく低下している証拠です。",
    consequence: ["放置", "防水性喪失", "外壁内部の劣化"],
  },
  {
    title: "ひび割れ",
    icon: "ri-flashlight-line",
    severity: "危険",
    desc: "外壁にできたクラック（ひび割れ）から雨水が侵入。冬場は凍結膨張でさらに亀裂が拡大し、建物の寿命を縮めます。",
    consequence: ["放置", "亀裂拡大", "構造躯体の損傷"],
  },
  {
    title: "カビ・コケ・染み",
    icon: "ri-plant-line",
    severity: "注意",
    desc: "外壁に発生したカビやコケは見た目だけでなく、建物の美観と資産価値を著しく下げます。湿気の多い北面に発生しやすい傾向です。",
    consequence: ["放置", "美観損失", "資産価値の低下"],
  },
];

export default function ReasonSection() {
  return (
    <section id="reason" className="bg-paper-2 border-y border-paper-3 py-[var(--section-gap)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <div className="md:col-span-6"><p className="eyebrow">Check</p><h2 className="mt-4">築7〜10年、塗り替えどき？</h2></div>
          <p className="lead md:col-span-6">
            7〜10年メンテナンスをしていないお家は、以下のような劣化サインが出始めている可能性があります。早めの対処が、結果的に費用を抑える近道です。
          </p>
        </div>

        {/* 築年数のタイムライン：0年 → 7〜10年（塗り替えどき） → それ以降（劣化が進む） */}
        <figure className="mt-[var(--space-2xl)] m-0 rounded-card bg-plate border border-paper-3 p-6 md:p-10">
          <figcaption className="font-display font-bold text-title text-ink">築年数と、外壁の状態の目安</figcaption>
          <div className="mt-10 relative" aria-hidden="true">
            {/* 帯：0〜7年 きれい / 7〜10年 塗り替えどき / 10年〜 劣化が進む */}
            <div className="flex h-3 rounded-full overflow-hidden gap-[2px]">
              <div className="w-[46.6%] bg-[oklch(82%_0.05_160)]"></div>
              <div className="w-[20%] bg-accent"></div>
              <div className="flex-1 bg-[oklch(40%_0.035_255)]"></div>
            </div>
            {/* 目盛り */}
            <div className="relative h-8 mt-2 text-sm font-figure font-bold text-ink-2 tabular-nums">
              {[
                ["0", 0],
                ["7年", 46.6],
                ["10年", 66.6],
                ["15年", 100],
              ].map(([t, x]) => (
                <span
                  key={t as string}
                  className="absolute top-0 -translate-x-1/2 first:translate-x-0 last:-translate-x-full whitespace-nowrap"
                  style={{ left: `${x}%` }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-[46.6%_20%_1fr] gap-[2px] text-[0.8125rem] md:text-sm leading-snug">
              <p className="pr-3"><span className="block font-bold text-ink">まだきれい</span><span className="text-ink-2">塗膜が外壁を守っている</span></p>
              <p className="pr-2"><span className="block font-bold text-accent">塗り替えどき</span><span className="text-ink-2">劣化サインが出始める</span></p>
              <p className="pl-2"><span className="block font-bold text-ink">劣化が進む</span><span className="text-ink-2">補修費がかさむ</span></p>
            </div>
          </div>
          <p className="visually-hidden">築0〜7年はまだきれい、7〜10年は劣化サインが出始める塗り替えどき、10年を過ぎると劣化が進み補修費がかさみます。</p>
        </figure>

        {/* 劣化サイン：アイコン付きのカード4枚 */}
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <li key={r.title} className="flex flex-col rounded-card bg-plate border border-paper-3 p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="grid place-items-center w-14 h-14 rounded-full bg-paper-2 text-ink" aria-hidden="true">
                  <i className={`${r.icon} text-[1.75rem]`}></i>
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                    r.severity === "危険" ? "bg-accent text-accent-ink" : "bg-[oklch(92%_0.06_85)] text-ink"
                  }`}
                >
                  <i className={r.severity === "危険" ? "ri-error-warning-fill" : "ri-information-fill"} aria-hidden="true"></i>
                  {r.severity}
                </span>
              </div>
              <h3 className="mt-5 text-[1.375rem]">{r.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-ink-2 leading-relaxed">{r.desc}</p>
              {/* 放置するとどうなるか：矢印でつないだ流れ */}
              <div className="mt-auto pt-5">
                <p className="text-xs font-bold tracking-[0.08em] text-muted">放置すると</p>
                <ol className="mt-2 flex flex-wrap items-center gap-1.5 text-[0.8125rem] font-bold text-ink">
                  {r.consequence.map((c, i) => (
                    <li key={c} className="inline-flex items-center gap-1.5">
                      {i > 0 && <i className="ri-arrow-right-line text-accent" aria-hidden="true"></i>}
                      <span className={`rounded-[4px] px-2 py-1 ${i === r.consequence.length - 1 ? "bg-ink text-plate-ink" : "bg-paper-2"}`}>{c}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6 rounded-card bg-plate border border-paper-3 p-6 md:p-8">
            <span className="grid place-items-center w-12 h-12 rounded-full bg-accent text-accent-ink" aria-hidden="true"><i className="ri-search-eye-line text-2xl"></i></span>
            <h3 className="mt-4">まずは無料診断を</h3>
            <p className="mt-1 label">お気軽にご相談ください</p>
            <p className="mt-4 text-base text-ink-2">
              大切なお住まいを守り、長く住み続けるためにも定期的なメンテナンスが大切です。外壁の劣化は目に見えない部分から進行していることも多く、気づいたときには大きな修繕が必要になることもあります。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn--secondary">
                <i className="ri-chat-check-line text-xl" aria-hidden="true"></i>
                無料相談を申し込む
              </a>
              <a href="tel:029-886-7913" className="link inline-flex items-center gap-1.5 min-h-[48px] font-figure text-lg">
                <i className="ri-phone-line" aria-hidden="true"></i>
                029-886-7913
              </a>
            </div>
          </div>

          <div className="md:col-span-6 rounded-card bg-plate border border-paper-3 p-6 md:p-8">
            <span className="grid place-items-center w-12 h-12 rounded-full bg-ink text-plate-ink" aria-hidden="true"><i className="ri-umbrella-line text-2xl"></i></span>
            <h3 className="mt-4">火災保険の活用もご提案</h3>
            <p className="mt-4 text-base text-ink-2">外壁・屋根の修理には火災保険が適用されるケースがあります。</p>
            <ul className="mt-4 space-y-2 text-base text-ink">
              <li className="flex items-start gap-2">
                <i className="ri-check-line mt-1 text-accent" aria-hidden="true"></i>
                <span>風災保障が付帯している場合、台風・強風による損傷が補償対象に</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-check-line mt-1 text-accent" aria-hidden="true"></i>
                <span>飛来物が外壁や屋根に衝突した突発的な事故も補償される可能性</span>
              </li>
            </ul>
            <p className="mt-4 text-base font-bold text-ink">保険適用の可否も無料で診断します</p>
          </div>
        </div>
      </div>
    </section>
  );
}
