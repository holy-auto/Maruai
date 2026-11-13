// 塗り替えのサイン（Table）と、無料診断・火災保険（2つの欄）
const reasons = [
  {
    title: "外壁のはがれ",
    severity: "危険",
    desc: "塗膜が浮き、ひび割れ、めくれが発生。放置すると雨水が内部に侵入し、建物の構造材が腐食する恐れがあります。",
    consequence: ["放置", "雨水浸入", "柱・梁の腐食"],
  },
  {
    title: "白い粉がつく",
    severity: "注意",
    desc: "触ると白い粉が手につく「チョーキング現象」。塗膜の劣化サインで、防水性能が著しく低下している証拠です。",
    consequence: ["放置", "防水性喪失", "外壁内部の劣化"],
  },
  {
    title: "ひび割れ",
    severity: "危険",
    desc: "外壁にできたクラック（ひび割れ）から雨水が侵入。冬場は凍結膨張でさらに亀裂が拡大し、建物の寿命を縮めます。",
    consequence: ["放置", "亀裂拡大", "構造躯体の損傷"],
  },
  {
    title: "カビ・コケ・染み",
    severity: "注意",
    desc: "外壁に発生したカビやコケは見た目だけでなく、建物の美観と資産価値を著しく下げます。湿気の多い北面に発生しやすい傾向です。",
    consequence: ["放置", "美観損失", "資産価値の低下"],
  },
];

export default function ReasonSection() {
  return (
    <section id="reason" className="bg-paper py-[calc(var(--section-gap-l)/2)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <h2 className="md:col-span-6">築7〜10年、塗り替えどき？</h2>
          <p className="lead md:col-span-6">
            7〜10年メンテナンスをしていないお家は、以下のような劣化サインが出始めている可能性があります。早めの対処が、結果的に費用を抑える近道です。
          </p>
        </div>

        {/* md 以上は表。スマホでは各行を縦に積む（横スクロールで切れないように） */}
        <div className="mt-[var(--space-2xl)]">
          <table className="block md:table w-full border-collapse text-left">
            <caption className="visually-hidden">塗り替えが必要なサイン</caption>
            <thead className="hidden md:table-header-group">
              <tr className="border-b-bar border-ink">
                <th scope="col" className="label py-3 pr-6 font-medium w-[26%]">サイン</th>
                <th scope="col" className="label py-3 pr-6 font-medium w-[10%]">目安</th>
                <th scope="col" className="label py-3 pr-6 font-medium">状態</th>
                <th scope="col" className="label py-3 font-medium w-[24%]">放置すると</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group border-t-bar border-ink md:border-t-0">
              {reasons.map((r) => (
                <tr key={r.title} className="block md:table-row border-b border-paper-3 align-top py-6 md:py-0">
                  <th scope="row" className="block md:table-cell md:py-6 md:pr-6 font-display font-bold text-title text-ink">
                    {r.title}
                    <span className="md:hidden ml-3 text-base font-body font-bold">（{r.severity}）</span>
                  </th>
                  <td className="hidden md:table-cell py-6 pr-6 text-base font-bold text-ink whitespace-nowrap">{r.severity}</td>
                  <td className="block md:table-cell mt-3 md:mt-0 md:py-6 md:pr-6 text-base text-ink-2">{r.desc}</td>
                  <td className="block md:table-cell mt-4 md:mt-0 md:py-6">
                    <span className="md:hidden label block mb-1">放置すると</span>
                    <ol className="flex flex-wrap md:block gap-x-1.5 text-[0.9375rem] text-ink md:space-y-1">
                      {r.consequence.map((c, i) => (
                        <li key={c} className="flex items-center gap-1.5">
                          {i > 0 && (
                            <>
                              <i className="ri-arrow-right-line md:hidden text-muted" aria-hidden="true"></i>
                              <i className="ri-arrow-down-line hidden md:inline text-muted" aria-hidden="true"></i>
                            </>
                          )}
                          <span>{c}</span>
                        </li>
                      ))}
                    </ol>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-[var(--space-2xl)] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
          <div className="md:col-span-6 border-t-bar border-ink pt-6">
            <h3>まずは無料診断を</h3>
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

          <div className="md:col-span-6 border-t-bar border-ink pt-6">
            <h3>火災保険の活用もご提案</h3>
            <p className="mt-4 text-base text-ink-2">外壁・屋根の修理には火災保険が適用されるケースがあります。</p>
            <ul className="mt-4 space-y-2 text-base text-ink">
              <li className="flex items-start gap-2">
                <i className="ri-check-line mt-1" aria-hidden="true"></i>
                <span>風災保障が付帯している場合、台風・強風による損傷が補償対象に</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-check-line mt-1" aria-hidden="true"></i>
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
