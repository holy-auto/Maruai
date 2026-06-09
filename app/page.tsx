import Link from 'next/link';
import { SERVICE_LIST } from '@/lib/services';
import { getRecentWorks } from '@/lib/content';

const LINE = 'https://line.me/ti/p/UxXZqXMSWE';

export const revalidate = 3600;

export default async function Home() {
  const works = await getRecentWorks(3).catch(() => []);

  return (
    <>
      {/* ヒーロー */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">完全自社施工・茨城県阿見町</span>
            <h1>塗るのは、<br /><span className="brush accent">この職人</span>です。</h1>
            <p className="lead">会社に頼むのではなく、人に頼む。あなたの家を見て、見積もり、塗り上げる。最初から最後まで、顔の見える同じ職人がこの手で仕上げます。</p>
            <div className="hero-cta">
              <Link className="btn btn-ember" href="/contact">無料で見積もりをとる</Link>
              <Link className="btn btn-ghost" href="/company">職人を見る</Link>
            </div>
            <p className="hero-note">完全自社施工／下請けには出しません。<br />最長10年保証・茨城県阿見町を拠点に。</p>
          </div>
          <div className="hero-visual">
            <div className="photo-note">［ 職人の写真 ］<br />刷毛を握る手元、または<br />現場に立つ横顔を</div>
            <div className="hero-badge"><strong>この手が、</strong>お家を守ります。</div>
          </div>
        </div>
      </section>

      {/* 選ばれる理由 */}
      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">彼らに頼む理由</span><h2 className="mincho">どの会社か、ではなく。<br />どの<span className="brush">職人</span>か、で選ぶ。</h2><p>塗装の良し悪しは、最後はその手で決まります。だから選ぶ基準は、会社の大きさではありません。</p></div>
          <div className="reason-grid">
            <div className="reason"><div className="pn">REASON 01</div><h3 className="mincho">顔が、見える</h3><p>工事の前に、担当する職人と顔を合わせられます。社員証の提示もいつでもどうぞ。「誰が来るか分からない」不安はありません。</p></div>
            <div className="reason"><div className="pn">REASON 02</div><h3 className="mincho">最初から最後まで、同じ手</h3><p>受付は別の人、施工は下請け——そんなことはしません。あなたの家を見て見積もった職人が、そのまま塗り上げます。</p></div>
            <div className="reason"><div className="pn">REASON 03</div><h3 className="mincho">下請けに、出さない</h3><p>受注して下請けに流すのが、最も手抜きにつながります。塗るのは丸愛装業の職人だけ。だから中間マージンも乗りません。</p></div>
          </div>
        </div>
      </section>

      {/* サービス概要 */}
      <section>
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">サービス</span><h2 className="mincho">お住まいを守る、4つの工事。</h2></div>
          <div className="svc-grid">
            {SERVICE_LIST.map((s) => (
              <Link key={s.slug} className="svc" href={`/services/${s.slug}`}>
                <div className="pic">［ 施工写真 ］</div>
                <div className="body"><h3 className="mincho">{s.name}</h3><p>{s.lead}</p><div className="price-from">{s.priceFrom}</div></div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 28 }}><Link className="btn btn-ghost" href="/services">サービス詳細を見る →</Link></div>
        </div>
      </section>

      {/* 代表メッセージ */}
      <section className="ink-sec">
        <div className="wrap msg-grid">
          <div className="msg-photo">［ 代表・小林力也の写真 ］</div>
          <div>
            <span className="eyebrow">代表より</span>
            <p className="pull mincho">高い金額を払ったのに、<br />仕事が伴わない。<br /><span className="accent">その塗装を、なくしたい。</span></p>
            <div className="msg-body">
              <p>営業会社が請けた工事では、職人に渡る材料費や工賃が削られ、どう頑張っても良い仕事ができない。その悔しさが、独立の原点です。</p>
              <p>小さな会社です。だからこそ、一件一件に真心を込めて。お家を守る大切な工事、全力でお手伝いします。</p>
            </div>
            <p className="msg-sign">株式会社 丸愛装業　代表取締役<b className="mincho">小林 力也</b></p>
          </div>
        </div>
      </section>

      {/* 施工事例ティザー */}
      <section>
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">施工事例</span><h2 className="mincho">塗り替えた、お家たち。</h2></div>
          {works.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)' }}>施工事例は準備中です。</p>
          ) : (
            <div className="work-grid">
              {works.map((w) => (
                <Link key={w.id} className="work" href={`/works/${w.id}`}>
                  <div className="ba"><div className="b">BEFORE</div><div className="a">AFTER</div></div>
                  <div className="meta"><span className="tag">{w.service}</span><h3 className="mincho">{w.title}</h3><p>{[w.paint, w.built_years ? `築${w.built_years}年` : null].filter(Boolean).join('・')}</p></div>
                </Link>
              ))}
            </div>
          )}
          <div style={{ marginTop: 28 }}><Link className="btn btn-ghost" href="/works">施工事例をもっと見る →</Link></div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap">
          <h2 className="mincho">もう一社、お見積りを取りませんか。</h2>
          <p>比べていただいて構いません。診断もお見積りも無料です。</p>
          <div className="cta-row">
            <a className="btn btn-line" href={LINE}>LINEで相談する</a>
            <Link className="btn btn-white" href="/contact">お問い合わせへ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
