import AreaMap from "./AreaMap";

// どこまで来てくれる？：説明と、茨城県南部の地図
export default function AreaSection() {
  return (
      <section id="area" className="bg-paper-2 border-b border-paper-3 py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow">Area</p>
            <h2 className="mt-4">どこまで来てくれる？</h2>
            <p className="mt-6 text-base text-ink-2">
              丸愛装業ではお客様のご相談や不安をなるべく早く解決するために、すぐ駆けつけられる60分以内のエリアに限定しています。ご近所だからこそ、完工後のアフターフォローも万全です。
            </p>
            <p className="mt-4 label">※親族の方、お知り合いの方が県外の場合はご相談ください。</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <AreaMap />
          </div>
        </div>
      </section>
  );
}
