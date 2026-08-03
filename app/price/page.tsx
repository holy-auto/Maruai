import type { Metadata } from 'next';
import SimulationSection from '@/components/home/SimulationSection';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: '料金プラン',
  description:
    '茨城県阿見町の外壁塗装の料金。ウレタン65万円〜、シリコン75万円〜（25坪・足場込・税抜）。坪数・グレード・施工箇所で概算が出せるシミュレーター付き。',
  alternates: { canonical: '/price' },
};

const GRADES = [
  { jp: 'ウレタン塗装', stars: 1, yen: 65 },
  { jp: 'シリコン塗装', stars: 2, yen: 75 },
  { jp: 'ラジカル塗装', stars: 3, yen: 85 },
  { jp: 'フッ素塗装', stars: 4, yen: 95 },
  { jp: '無機塗装', stars: 5, yen: 105 },
];

export default function PricePage() {
  return (
    <main className="relative scroll-smooth">
      <PageHero
        eyebrow="Price"
        title="料金プラン"
        description="守りたい年数で選べる、明確な料金。シミュレーターでその場で概算も出せます。"
      />

      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">Grade</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-900 mb-3">守りたい年数で、選べる。</h2>
            <p className="text-sm text-foreground-500">※延床面積25坪・足場代込み・税抜価格／外壁塗装が基本。屋根・軒天井・破風板・樋・雨戸などの施工箇所はシミュレーターで追加できます。</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {GRADES.map((g) => (
              <div key={g.jp} className={`rounded-xl border p-5 text-center ${g.stars === 5 ? 'border-primary-400 bg-primary-50' : 'border-background-200/70 bg-background-100'}`}>
                <div className="font-heading font-bold text-base text-foreground-900 mb-1">{g.jp.replace('塗装', '')}</div>
                <div className="text-accent-400 text-sm tracking-widest mb-2">{'★'.repeat(g.stars)}<span className="text-background-300">{'★'.repeat(5 - g.stars)}</span></div>
                <div className="font-heading font-bold text-2xl text-primary-700">{g.yen}<span className="text-sm text-foreground-500">万円〜</span></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <div className="bg-primary-50 rounded-xl border border-primary-200/60 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2">高圧洗浄だけでもOK</h3>
              <p className="text-base text-foreground-600 leading-relaxed">外構・駐車場・カーポートの高圧洗浄（100㎡まで）<span className="font-semibold text-primary-700">税込2万円</span>。塗装をご契約のお客様は無償で実施します。</p>
            </div>
            <div className="bg-secondary-50 rounded-xl border border-secondary-200/60 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2">火災保険の活用診断</h3>
              <p className="text-base text-foreground-600 leading-relaxed">風・雨・雪・雹などによる外壁・屋根の被害は、火災保険の<span className="font-semibold text-secondary-800">風災補償</span>の対象になる場合があります。診断は無料です。</p>
            </div>
          </div>
        </div>
      </section>

      <SimulationSection />
    </main>
  );
}
