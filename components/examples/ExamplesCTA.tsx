// 帯：墨の帯（1ページに1本）。問いの見出し（1〜7列）と、一文と行動（8〜12列）
export default function ExamplesCTA() {
  return (
    <section className="bg-ink text-plate-ink grained grained--light">
      <div className="container py-[var(--section-gap-s)] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 items-end">
        <h2 className="md:col-span-7 text-section text-plate-ink">
          <a href="#cta" className="no-underline hover:underline focus-visible:outline-accent">
            まずは概算料金をチェックしてみませんか？
          </a>
        </h2>
        <div className="md:col-span-5">
          <p className="text-lg text-plate-ink max-w-[34em]">
            塗装は適正価格で。丸愛装業は完全自社施工だから、中間マージンのない納得の料金でご提案できます。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/#simulation" className="btn btn--primary focus-visible:outline-plate-ink">
              <i className="ri-price-tag-3-line text-xl" aria-hidden="true"></i>
              概算料金をチェック
            </a>
            <a href="tel:029-886-7913" className="btn btn--on-ink font-figure">
              <i className="ri-phone-line text-xl" aria-hidden="true"></i>
              029-886-7913
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
