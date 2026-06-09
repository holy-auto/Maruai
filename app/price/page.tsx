import type { Metadata } from 'next';
import { Simulator } from '@/components/Simulator';

export const metadata: Metadata = {
  title: '料金プラン',
  description: '茨城県阿見町の外壁塗装の料金。ウレタン65万円〜、シリコン75万円〜（25坪・足場込・税抜）。坪数とグレードで概算が出せるシミュレーター付き。',
  alternates: { canonical: '/price' },
};

const GRADES = [
  { en: 'URETHANE', jp: 'ウレタン', stars: 1, yen: 65 },
  { en: 'SILICON', jp: 'シリコン', stars: 2, yen: 75 },
  { en: 'RADICAL', jp: 'ラジカル', stars: 3, yen: 85 },
  { en: 'FLUORINE', jp: 'フッ素', stars: 4, yen: 95 },
  { en: 'INORGANIC', jp: '無機', stars: 5, yen: 105 },
];

export default function PricePage() {
  return (
    <>
      <div className="page-hero"><div className="wrap"><span className="eyebrow">明確な料金で</span><h1 className="mincho">料金プラン</h1><p>守りたい年数で選べる、明確な料金。シミュレーターでその場で概算も出せます。</p></div></div>
      <section>
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">塗料グレード</span><h2 className="mincho">守りたい年数で、選べる。</h2><p className="price-cond">※延床面積25坪・足場代込み・税抜価格／軒天井・破風板・樋・雨戸を含む／最長保証10年</p></div>
          <div className="ladder">
            {GRADES.map((g) => (
              <div key={g.en} className={`grade${g.stars === 5 ? ' top' : ''}`}>
                <span className="jp">{g.jp}</span>
                <span className="gstars">{'★'.repeat(g.stars)}<span className="off">{'★'.repeat(5 - g.stars)}</span></span>
                <span className="yen">{g.yen}<small>万円〜</small></span>
              </div>
            ))}
          </div>
          <div className="price-extra">
            <div className="extra-card"><h4 className="mincho">高圧洗浄だけでもOK</h4><p>外構・駐車場・カーポートの高圧洗浄（100㎡まで）<span className="tag"> 税込2万円</span>。塗装をご契約のお客様は無償で実施。</p></div>
            <div className="extra-card"><h4 className="mincho">火災保険の活用診断</h4><p>風災などによる外壁・屋根の被害は<span className="tag">風災補償</span>の対象になる場合があります。診断は無料です。</p></div>
          </div>
        </div>
      </section>
      <Simulator />
    </>
  );
}
