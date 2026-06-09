import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '会社概要',
  description: '株式会社 丸愛装業の会社概要・代表挨拶。茨城県稲敷郡阿見町。完全自社施工で外壁塗装・屋根塗装を行います。',
  alternates: { canonical: '/company' },
};

export default function CompanyPage() {
  return (
    <>
      <div className="page-hero"><div className="wrap"><span className="eyebrow">丸愛装業について</span><h1 className="mincho">会社概要</h1><p>街の塗装屋さんから、知り合いの塗装屋さんへ。最高の仕上がりを、適正価格で。</p></div></div>

      <section className="ink-sec">
        <div className="wrap msg-grid">
          <div className="msg-photo">［ 代表・小林力也の写真 ］</div>
          <div>
            <span className="eyebrow">代表挨拶</span>
            <p className="pull mincho">「期待しているよ」<br />その言葉に、<br /><span className="accent">真っ直ぐ応えたくて。</span></p>
            <div className="msg-body">
              <p>100万円を貯めるのに、3年、5年とかかる方も少なくありません。その大切なお金で行う外壁塗装が、本当に信頼できる業者に任せられているか——。私はそこを一番に考えています。</p>
              <p>営業会社が請けた工事では、職人に渡る材料費や工賃が削られ、どう頑張っても良い仕事ができない。その悔しさが、独立の原点です。小さな会社だからこそ、一件一件に真心を込めて対応します。</p>
            </div>
            <p className="msg-sign">株式会社 丸愛装業　代表取締役<b className="mincho">小林 力也</b></p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap artisans">
          <div className="sec-head"><span className="eyebrow">職人紹介</span><h2 className="mincho">塗るのは、<span className="brush">この人</span>たち。</h2><p>仕上がりも安心も、最後は手を動かす職人で決まります。工事の前に、どうぞ会いに来てください。</p></div>
          <div className="lead-card">
            <div className="lead-photo"><span className="ptag">代表 兼 職人</span>［ 代表・小林力也の写真 ］</div>
            <div className="lead-info">
              <div className="nm mincho">小林 力也</div>
              <p className="lead-quote mincho">この手で塗りたい。<br /><span className="accent">その想いで、独立した。</span></p>
              <p className="bio">ご相談から仕上げ、アフターまで、最後まで私が責任を持ちます。</p>
              <div className="specs"><span>職人歴 <b>［　］</b>年</span><span>担当：外壁・屋根・コーキング</span><span>保有資格 <b>［　　］</b></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">会社情報</span><h2 className="mincho">会社概要</h2></div>
          <div className="corp">
            <dl>
              <dt>社名</dt><dd>株式会社 丸愛装業</dd>
              <dt>代表者</dt><dd>代表取締役　小林 力也</dd>
              <dt>所在地</dt><dd>〒300-0325　茨城県稲敷郡阿見町上条888</dd>
              <dt>電話 / FAX</dt><dd>029-886-7913 ／ FAX 029-886-5499</dd>
              <dt>受付時間</dt><dd>平日 9:00〜18:00</dd>
              <dt>施工内容</dt><dd>外壁塗装・屋根塗装・コーキング・防水工事</dd>
              <dt>対応エリア</dt><dd>阿見町・牛久市・土浦市・つくば市・取手市・龍ケ崎市（60分圏内）</dd>
              <dt>所属</dt><dd>一般社団法人 全国優良リフォーム 会員</dd>
              <dt>公式SNS</dt><dd><a href="https://line.me/ti/p/UxXZqXMSWE">公式LINE</a> ／ <a href="https://www.instagram.com/maruaisougyou">Instagram @maruaisougyou</a></dd>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
