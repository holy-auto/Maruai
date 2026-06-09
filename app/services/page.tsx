import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_LIST } from '@/lib/services';

export const metadata: Metadata = {
  title: 'サービス・施工内容',
  description: '外壁塗装・屋根塗装・コーキング・防水工事。茨城県阿見町の完全自社施工。塗装工事をお考えなら、もう一社お見積もりを。',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <div className="page-hero"><div className="wrap"><span className="eyebrow">施工メニュー</span><h1 className="mincho">サービス・施工内容</h1><p>外壁塗装・屋根塗装・コーキング・防水工事。塗装工事をお考えなら、もう一社お見積もりを取りませんか。</p></div></div>
      <section>
        <div className="wrap">
          <div className="svc-grid">
            {SERVICE_LIST.map((s) => (
              <article key={s.slug} className="svc">
                <div className="pic">［ {s.name}の写真 ］</div>
                <div className="body">
                  <h3 className="mincho">{s.name}</h3>
                  <p>{s.lead}</p>
                  <ul>{s.symptoms.map((sym) => <li key={sym}>{sym}</li>)}</ul>
                  <div className="price-from">{s.priceFrom}</div>
                  <div style={{ marginTop: 14 }}><Link className="btn btn-ghost" href={`/services/${s.slug}`}>詳しく見る →</Link></div>
                </div>
              </article>
            ))}
          </div>
          <div className="price-extra">
            <div className="extra-card"><h4 className="mincho">高圧洗浄だけでもOK</h4><p>外構・駐車場・カーポートの高圧洗浄（100㎡まで）<span className="tag"> 税込2万円</span>。塗装をご契約のお客様は無償で実施します。</p></div>
            <div className="extra-card"><h4 className="mincho">火災保険の活用診断</h4><p>風・雨・雪・雹などによる外壁・屋根の被害は、火災保険の<span className="tag">風災補償</span>の対象になる場合があります。診断は無料です。</p></div>
          </div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">ご相談からの流れ</span><h2 className="mincho">無理な営業は、一切しません。</h2></div>
          <div className="flow">
            <div className="step"><h4 className="mincho">ご相談</h4><p>LINE・電話・フォームからお気軽に。</p></div>
            <div className="step"><h4 className="mincho">現地診断</h4><p>代表が直接、外壁・屋根を点検します。</p></div>
            <div className="step"><h4 className="mincho">お見積り</h4><p>内訳の明確な、適正価格をご提示。</p></div>
            <div className="step"><h4 className="mincho">施工</h4><p>自社の職人が、丁寧に塗り上げます。</p></div>
            <div className="step"><h4 className="mincho">アフター</h4><p>最長10年保証で、その後も安心。</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
