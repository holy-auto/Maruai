// 施工内容（Rows）と施工エリア（paper-2 の帯の上の一覧）
const services = [
  {
    title: "外壁塗装",
    subtitle: "美観と耐久性を両立",
    desc: "お家の美観を保ち、風雨から大切な住まいを守る外壁塗装。適切な塗料選びと丁寧な施工で、10年先も色褪せない仕上がりを実現します。",
    points: ["遮熱・断熱効果で光熱費削減", "紫外線・酸性雨から建物を保護", "10年保証で安心の長期サポート"],
  },
  {
    title: "屋根塗装",
    subtitle: "雨漏り防止と断熱性能向上",
    desc: "雨漏り防止と耐久性アップのための屋根塗装。専門的な知識と技術で、お家の一番重要な部分をしっかり守ります。",
    points: ["防水性を高め雨漏りを根本防止", "遮熱塗料で夏の室温を快適に", "屋根材の寿命を最大限に延ばす"],
  },
  {
    title: "コーキング",
    subtitle: "気密性を高め建物寿命を延長",
    desc: "窓や壁の隙間を埋め、雨や風の侵入を防ぐコーキング工事。細かな部分まで丁寧に施工し、気密性を高めます。",
    points: ["窓枠・目地の劣化を完全補修", "高い弾性で建物の動きに追随", "外壁塗装前に必須の下地処理"],
  },
  {
    title: "防水工事",
    subtitle: "水の侵入から建物を完全防御",
    desc: "ベランダや屋上の防水工事。水漏れから建物を守り、住まいの価値を維持する重要な施工です。",
    points: ["ベランダ・屋上の水漏れ防止", "FRP・ウレタン防水で確実施工", "コンクリートの中性化を抑制"],
  },
];

const AREAS = ["阿見町", "牛久市", "土浦市", "つくば市", "取手市", "龍ヶ崎市"];

export default function ServiceSection() {
  return (
    <>
      <section id="service" className="bg-paper py-[calc(var(--section-gap)/2)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
            <h2 className="md:col-span-6">どんな工事を頼める？</h2>
            <div className="md:col-span-6">
              <p className="lead">
                外壁塗装・屋根塗装・コーキング・防水工事。すべて完全自社施工・中間マージンゼロで、適正価格と最高品質を両立します。
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base font-medium text-ink">
                <li className="inline-flex items-center gap-1.5"><i className="ri-shield-check-line" aria-hidden="true"></i>10年保証</li>
                <li className="inline-flex items-center gap-1.5"><i className="ri-user-star-line" aria-hidden="true"></i>代表が全責任</li>
                <li className="inline-flex items-center gap-1.5"><i className="ri-price-tag-3-line" aria-hidden="true"></i>適正価格</li>
              </ul>
            </div>
          </div>

          <ul className="mt-[var(--space-2xl)] border-t-bar border-ink">
            {services.map((s) => (
              <li key={s.title} className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 py-8 md:py-10 border-b border-paper-3">
                <div className="md:col-span-4">
                  <h3 className="text-[clamp(1.625rem,1.2vw+1.1rem,2.25rem)] leading-tight">{s.title}</h3>
                  <p className="mt-2 label">{s.subtitle}</p>
                </div>
                <div className="md:col-span-8 grid grid-cols-1 lg:grid-cols-8 gap-x-8 gap-y-4">
                  <p className="lg:col-span-5 text-base text-ink-2">{s.desc}</p>
                  <ul className="lg:col-span-3 space-y-1.5 text-[0.9375rem] text-ink">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <i className="ri-check-line mt-1" aria-hidden="true"></i>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-base text-ink-2">
            まずはおおよその料金をチェックしてみませんか？{" "}
            <a href="#simulation" className="link font-medium">料金シミュレーションへ</a>
          </p>
        </div>
      </section>

      <section className="bg-paper-2 py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
          <div className="md:col-span-5">
            <h2>どこまで来てくれる？</h2>
            <p className="mt-6 text-base text-ink-2">
              丸愛装業ではお客様のご相談や不安をなるべく早く解決するために、すぐ駆けつけられる60分以内のエリアに限定しています。ご近所だからこそ、完工後のアフターフォローも万全です。
            </p>
            <p className="mt-4 label">※親族の方、お知り合いの方が県外の場合はご相談ください。</p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="font-display font-bold text-title text-ink">60分以内に駆けつけられる距離で</p>
            <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 border-t-bar border-ink" aria-label="主な施工エリア">
              {AREAS.map((a) => (
                <li key={a} className="py-5 border-b border-paper-3 font-display font-bold text-[clamp(1.375rem,1vw+1rem,1.875rem)] text-ink">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
