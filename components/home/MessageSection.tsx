// 代表からのメッセージ：墨の帯（Statement）。生成された代表の顔写真と挿絵は外し、言葉だけで見せる。
const storyCards = [
  {
    title: "100万円の重み",
    text: "3年〜5年かけて貯めた大切なお金。そのお金で外壁塗装を行うからこそ、業者選びは慎重に。",
  },
  {
    title: "業者選びの現実",
    text: "「面倒だから」と訪問業者に任せていませんか？支払った金額がしっかり施工に反映される業者を。",
  },
  {
    title: "現場で見た真実",
    text: "高額でも品質が伴わない現実を数多く目撃。「お客様の期待に真っ直ぐ応えたい」と独立を決意。",
  },
  {
    title: "丸愛装業の約束",
    text: "見積〜施工〜アフターまで代表が全責任。小さな会社だからこそ一件一件に真心を込めて。",
  },
];

export default function MessageSection() {
  return (
    <section id="message" className="bg-ink text-plate-ink grained grained--light py-[var(--section-gap-s)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 items-baseline">
          <h2 className="md:col-span-6 text-plate-ink">誰が塗るの？</h2>
          <p className="md:col-span-6 text-plate-ink">
            <span className="block font-display font-bold text-title">代表取締役の小林力也です。</span>
            <span className="block mt-1 text-base">見積もりから施工、アフターまで、代表が責任を持ちます。</span>
          </p>
        </div>

        <div className="mt-[var(--space-2xl)] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6">
          <p className="md:col-span-8 font-display font-bold text-title text-plate-ink max-w-[24em]">
            皆さんは100万円を貯めるのに、どのくらいの時間がかかりますか？
          </p>
          <p className="md:col-span-8 text-lead leading-relaxed text-plate-ink">
            今の物価では3年〜5年かかる方も。その大切なお金で行う外壁塗装、本当に信頼できる業者に任せられていますか？
          </p>
        </div>

        <ul className="mt-[var(--space-2xl)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[color-mix(in_oklab,var(--color-plate-ink)_35%,transparent)]">
          {storyCards.map((card) => (
            <li
              key={card.title}
              className="pt-6 pb-2 sm:pr-6 lg:[&:not(:first-child)]:pl-6 lg:[&:not(:first-child)]:border-l border-[color-mix(in_oklab,var(--color-plate-ink)_35%,transparent)]"
            >
              <h3 className="text-plate-ink">{card.title}</h3>
              <p className="mt-3 text-base text-plate-ink">{card.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-[var(--space-2xl)] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <p className="md:col-span-8 text-base leading-relaxed text-plate-ink">
            このホームページをご覧くださったすべての方が、信頼できる塗装業者と出会えることを願っております。そして、もしご縁がありましたら、丸愛装業にもお気軽にご相談ください。お家を守る大切な工事、全力でお手伝いさせていただきます。
          </p>
          <p className="md:col-span-4 md:text-right font-display font-bold text-title text-plate-ink">
            代表取締役 小林力也
          </p>
        </div>
      </div>
    </section>
  );
}
