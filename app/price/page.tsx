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

// sections: Table（見出しを1〜5列、料金表を6〜12列、下に補足の2項）· SimulationSection（別担当）
export default function PricePage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Price"
        title="外壁塗装、いくらかかる？"
        description="守りたい年数で選べる、明確な料金。シミュレーターでその場で概算も出せます。"
      />

      <section className="bg-paper pt-[var(--space-xl)] pb-[var(--section-gap)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
            <h2 className="lg:col-span-5">守りたい年数で、選べる。</h2>

            <div className="lg:col-span-7 min-w-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-t-bar border-ink text-left">
                  <caption className="visually-hidden">外壁塗装のグレード別料金</caption>
                  <thead>
                    <tr className="border-b-hair border-paper-3">
                      <th scope="col" className="label py-3 pr-4">塗料</th>
                      <th scope="col" className="label py-3 pr-4">グレード</th>
                      <th scope="col" className="label py-3 text-right">料金</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GRADES.map((g) => (
                      <tr key={g.jp} className="border-b-hair border-paper-3">
                        <th scope="row" className="py-4 pr-4 font-display font-bold text-title text-ink whitespace-nowrap">
                          {g.jp.replace('塗装', '')}
                        </th>
                        <td className="py-4 pr-4 whitespace-nowrap">
                          <span role="img" aria-label={`5段階中${g.stars}`} className="text-ink">
                            {'★'.repeat(g.stars)}
                            {'☆'.repeat(5 - g.stars)}
                          </span>
                        </td>
                        <td className="py-4 text-right whitespace-nowrap text-ink">
                          <span className="font-figure font-bold text-title tabular-nums">{g.yen}</span>
                          <span className="ml-1 text-base">万円〜</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-ink-2 max-w-[38em]">
                ※延床面積25坪・足場代込み・税抜価格／外壁塗装が基本。屋根・軒天井・破風板・樋・雨戸などの施工箇所はシミュレーターで追加できます。
              </p>
            </div>
          </div>

          {/* 補足の2項：上端に墨の太線、2列 */}
          <div className="mt-[var(--space-3xl)] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
            <div className="md:col-span-6 rule-bar pt-6">
              <h3>高圧洗浄だけでもOK</h3>
              <p className="mt-3">
                外構・駐車場・カーポートの高圧洗浄（100㎡まで）<strong className="font-bold">税込2万円</strong>。塗装をご契約のお客様は無償で実施します。
              </p>
            </div>
            <div className="md:col-span-6 rule-bar pt-6">
              <h3>火災保険の活用診断</h3>
              <p className="mt-3">
                風・雨・雪・雹などによる外壁・屋根の被害は、火災保険の<strong className="font-bold">風災補償</strong>の対象になる場合があります。診断は無料です。
              </p>
            </div>
          </div>
        </div>
      </section>

      <SimulationSection />
    </main>
  );
}
