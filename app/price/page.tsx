import type { Metadata } from 'next';
import SimulationSection from '@/components/home/SimulationSection';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: '料金プラン',
  description:
    '茨城県阿見町の外壁塗装の料金。ウレタン65万円〜、シリコン75万円〜（25坪・足場込・税抜）。坪数・グレード・施工箇所で概算が出せるシミュレーター付き。',
  alternates: { canonical: '/price' },
};

// years：塗料の一般的な耐用年数の目安（業界で広く示される範囲。立地・塗料メーカーにより異なる）
// ※丸愛装業として示す年数があれば、ここを書き換える
const GRADES = [
  { jp: 'ウレタン塗装', stars: 1, yen: 65, years: [8, 10] },
  { jp: 'シリコン塗装', stars: 2, yen: 75, years: [10, 15] },
  { jp: 'ラジカル塗装', stars: 3, yen: 85, years: [12, 15] },
  { jp: 'フッ素塗装', stars: 4, yen: 95, years: [15, 20] },
  { jp: '無機塗装', stars: 5, yen: 105, years: [20, 25] },
];
// 料金に含まれるもの（サイト内の記載どおり：足場代込み・3回塗り・高圧洗浄は契約で無償・診断と見積もりは無料）
const INCLUDED = [
  { icon: 'ri-building-2-line', t: '足場代', d: '料金に込み' },
  { icon: 'ri-stack-line', t: '3回塗り', d: '下塗り・中塗り・上塗り' },
  { icon: 'ri-drop-line', t: '高圧洗浄', d: 'ご契約で無償' },
  { icon: 'ri-search-eye-line', t: '現地診断・お見積り', d: '無料' },
];
const YEN_MAX = 110; // 料金の棒の目盛り上限（万円）
const YEARS_MAX = 25; // 耐用年数の目盛り上限（年）
// グレードが上がるほど濃くなる朱（一色の濃淡）
const BAR_TONE = ['oklch(82% 0.07 35)', 'oklch(74% 0.1 35)', 'oklch(66% 0.13 35)', 'oklch(58% 0.15 35)', 'oklch(48% 0.14 35)'];

// 構成：見出し → 料金と耐用年数の比較グラフ → 補足の2項 → シミュレーター
export default function PricePage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Price"
        title="外壁塗装、いくらかかる？"
        description="守りたい年数で選べる、明確な料金。シミュレーターでその場で概算も出せます。"
      />

      <section className="bg-paper pb-[var(--section-gap)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
            <div className="lg:col-span-5"><p className="eyebrow">Plan</p><h2 className="mt-4">守りたい年数で、選べる。</h2></div>

            <p className="lg:col-span-7 lead self-end">
              グレードが上がるほど、塗り替えまでの期間が長くなります。次の塗り替えまで何年持たせたいかで選ぶのがおすすめです。
            </p>
          </div>

          {/* プラン比較のグラフ：料金（左）と耐用年数の目安（右）を同じ行で比べる */}
          <figure className="mt-[var(--space-2xl)] m-0 rounded-card bg-plate border border-paper-3 shadow-card p-5 md:p-8">
            <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <span className="font-display font-bold text-title text-ink">塗料のグレード別　料金と持ちの比較</span>
              <span className="text-[0.8125rem] text-ink-2">料金：延床25坪・足場代込み・税抜</span>
            </figcaption>

            <div aria-hidden="true" className="mt-8">
              {/* 列見出しと目盛り（md 以上） */}
              <div className="hidden md:grid grid-cols-[170px_1fr_1fr] gap-x-8 pb-2 border-b border-paper-3">
                <span className="text-xs font-bold text-muted">塗料・グレード</span>
                <span className="relative text-xs font-bold text-muted">
                  料金（万円）
                  <span className="absolute inset-x-0 top-5 h-4 text-[0.6875rem] font-normal tabular-nums">
                    {[0, 50, 100].map((t) => (
                      <span key={t} className="absolute -translate-x-1/2" style={{ left: `${(t / YEN_MAX) * 100}%` }}>{t}</span>
                    ))}
                  </span>
                </span>
                <span className="relative text-xs font-bold text-muted">
                  耐用年数の目安（年）
                  <span className="absolute inset-x-0 top-5 h-4 text-[0.6875rem] font-normal tabular-nums">
                    {[0, 5, 10, 15, 20, 25].map((t) => (
                      <span key={t} className="absolute -translate-x-1/2 last:-translate-x-full" style={{ left: `${(t / YEARS_MAX) * 100}%` }}>{t}</span>
                    ))}
                  </span>
                </span>
              </div>

              <ul className="md:mt-6">
                {GRADES.map((g, i) => (
                  <li key={g.jp} className="grid grid-cols-1 md:grid-cols-[170px_1fr_1fr] gap-x-8 gap-y-3 py-4 border-b border-paper-3 last:border-b-0">
                    <div className="flex md:flex-col items-baseline md:items-start justify-between gap-1">
                      <span className="font-display font-bold text-[1.25rem] text-ink whitespace-nowrap">{g.jp.replace('塗装', '')}</span>
                      <span className="text-accent text-sm tracking-[0.15em]">
                        {'★'.repeat(g.stars)}
                        <span className="text-paper-3">{'★'.repeat(5 - g.stars)}</span>
                      </span>
                    </div>

                    {/* 料金の棒（0 起点） */}
                    <div className="relative flex items-center gap-3 min-w-0 bg-[linear-gradient(90deg,var(--color-paper-3)_1px,transparent_1px)] bg-[length:calc(100%*50/110)_100%]">
                      <span className="md:hidden w-10 shrink-0 text-xs text-muted">料金</span>
                      <div className="relative flex-1 h-9">
                        <div
                          title={`${g.jp}：${g.yen}万円〜`}
                          className="absolute inset-y-0 left-0 rounded-r-[4px]"
                          style={{ width: `${(g.yen / YEN_MAX) * 100}%`, background: BAR_TONE[i] }}
                        ></div>
                        {/* 金額は棒の内側の右端に（はみ出さないように） */}
                        <span
                          className={`absolute top-1/2 -translate-y-1/2 -translate-x-full pr-3 font-figure font-bold tabular-nums whitespace-nowrap ${i < 2 ? 'text-ink' : 'text-plate'}`}
                          style={{ left: `${(g.yen / YEN_MAX) * 100}%` }}
                        >
                          <span className="text-[1.25rem] md:text-[1.375rem]">{g.yen}</span>
                          <span className="text-sm ml-0.5">万円〜</span>
                        </span>
                      </div>
                    </div>

                    {/* 耐用年数の棒（範囲） */}
                    <div className="relative flex items-center gap-3 min-w-0">
                      <span className="md:hidden w-10 shrink-0 text-xs text-muted">持ち</span>
                      <div className="relative flex-1 h-9 bg-[linear-gradient(90deg,var(--color-paper-3)_1px,transparent_1px)] bg-[length:20%_100%]">
                        <div
                          title={`${g.jp}：${g.years[0]}〜${g.years[1]}年（目安）`}
                          className="absolute top-1/2 -translate-y-1/2 h-4 rounded-full bg-ink"
                          style={{
                            left: `${(g.years[0] / YEARS_MAX) * 100}%`,
                            width: `${((g.years[1] - g.years[0]) / YEARS_MAX) * 100}%`,
                          }}
                        ></div>
                        <span
                          className={`absolute top-1/2 -translate-y-1/2 font-figure font-bold text-ink tabular-nums whitespace-nowrap text-[1.0625rem] ${
                            g.years[1] / YEARS_MAX > 0.7 ? '-translate-x-full pr-2' : 'pl-2'
                          }`}
                          style={{ left: `${((g.years[1] > YEARS_MAX * 0.7 ? g.years[0] : g.years[1]) / YEARS_MAX) * 100}%` }}
                        >
                          {g.years[0]}〜{g.years[1]}年
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 読み上げ用の表 */}
            <table className="visually-hidden">
              <caption>外壁塗装のグレード別料金と耐用年数の目安</caption>
              <thead>
                <tr><th scope="col">塗料</th><th scope="col">グレード</th><th scope="col">料金</th><th scope="col">耐用年数の目安</th></tr>
              </thead>
              <tbody>
                {GRADES.map((g) => (
                  <tr key={g.jp}>
                    <th scope="row">{g.jp}</th><td>5段階中{g.stars}</td><td>{g.yen}万円〜</td><td>{g.years[0]}〜{g.years[1]}年</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-6 pt-4 border-t border-paper-3 text-[0.8125rem] text-ink-2 leading-relaxed">
              ※料金は延床面積25坪・足場代込み・税抜。外壁塗装が基本で、屋根・軒天井・破風板・樋・雨戸などはシミュレーターで追加できます。
              <br />
              ※耐用年数は塗料の一般的な目安です。立地や日当たり、塗料メーカーによって変わります。現地診断でお住まいに合わせてご提案します。
            </p>
          </figure>

          {/* 料金に含まれるもの */}
          <div className="mt-[var(--space-2xl)]">
            <h3 className="text-title">表示の料金に含まれるもの</h3>
            <ul className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
              {INCLUDED.map((it) => (
                <li key={it.t} className="flex flex-col items-center text-center rounded-card bg-plate border border-paper-3 px-3 py-5">
                  <span className="grid place-items-center w-12 h-12 rounded-full bg-paper-2 text-accent" aria-hidden="true">
                    <i className={`${it.icon} text-2xl`}></i>
                  </span>
                  <span className="mt-3 font-display font-bold text-[1.0625rem] text-ink leading-snug">{it.t}</span>
                  <span className="mt-1 text-xs text-ink-2">{it.d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 補足の2項：アイコン付きのカード */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 rounded-card bg-paper-2 border border-paper-3 p-6 md:p-8">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-ink text-plate-ink" aria-hidden="true"><i className="ri-drop-line text-2xl"></i></span>
              <h3 className="mt-4">高圧洗浄だけでもOK</h3>
              <p className="mt-3">
                外構・駐車場・カーポートの高圧洗浄（100㎡まで）<strong className="font-bold">税込2万円</strong>。塗装をご契約のお客様は無償で実施します。
              </p>
            </div>
            <div className="md:col-span-6 rounded-card bg-paper-2 border border-paper-3 p-6 md:p-8">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-accent text-accent-ink" aria-hidden="true"><i className="ri-umbrella-line text-2xl"></i></span>
              <h3 className="mt-4">火災保険の活用診断</h3>
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
