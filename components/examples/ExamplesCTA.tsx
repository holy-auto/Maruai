export default function ExamplesCTA() {
  return (
    <section className="w-full py-14 md:py-20 bg-background-50">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-background-100 rounded-xl p-8 md:p-12 border border-background-200/70 text-center">
          <div className="w-16 h-16 flex items-center justify-center bg-accent-100 rounded-full mx-auto mb-6">
            <i className="ri-price-tag-3-line text-accent-600 text-2xl"></i>
          </div>
          <h4 className="font-heading text-2xl md:text-3xl font-bold text-foreground-900 mb-3">
            <a href="#cta">まずは概算料金をチェックしてみませんか？</a>
          </h4>
          <p className="text-foreground-600 text-base md:text-lg max-w-lg mx-auto mb-6 leading-relaxed">
            塗装は<strong>適正価格</strong>で。丸愛装業は<strong>完全自社施工</strong>だから、
            中間マージンのない<strong>納得の料金</strong>でご提案できます。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/#simulation"
              className="px-8 py-3.5 rounded-full bg-primary-500 text-background-50 text-base font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(var(--primary-500),0.25)]"
            >
              <i className="ri-price-tag-3-line mr-1.5"></i>
              概算料金をチェック
            </a>
            <a
              href="tel:029-886-7913"
              className="px-8 py-3.5 rounded-full bg-background-50 text-foreground-800 border border-background-300/60 text-base font-medium hover:bg-background-200 transition-colors whitespace-nowrap"
            >
              <i className="ri-phone-line mr-1.5"></i>
              029-886-7913
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}