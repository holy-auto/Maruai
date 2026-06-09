import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <div className="wrap foot-grid">
        <div>
          <div className="logo" style={{ color: '#fff', fontSize: '1.3rem' }}>
            丸愛装業<small style={{ color: '#C8B393' }}>MARUAI SOUGYO CO., LTD.</small>
          </div>
          <p style={{ fontSize: '.86rem', marginTop: 14, maxWidth: '34ch' }}>
            街の塗装屋さんから、知り合いの塗装屋さんへ。最高の仕上がりを、適正価格で。
          </p>
          <span className="badge">一般社団法人 全国優良リフォーム 会員</span>
        </div>
        <div>
          <h4>メニュー</h4>
          <div className="flink">
            <Link href="/services">サービス</Link>
            <Link href="/works">施工事例</Link>
            <Link href="/price">料金</Link>
            <Link href="/voice">お客様の声</Link>
            <Link href="/company">会社概要</Link>
            <Link href="/faq">よくある質問</Link>
          </div>
        </div>
        <div>
          <h4>お問い合わせ</h4>
          <dl>
            <dt>電話</dt>
            <dd>029-886-7913（平日 9:00〜18:00）</dd>
            <dt>所在地</dt>
            <dd>〒300-0325 茨城県稲敷郡阿見町上条888</dd>
            <dt>LINE / Instagram</dt>
            <dd>
              <a href="https://line.me/ti/p/UxXZqXMSWE" style={{ color: '#C8B393' }}>公式LINE</a> ／{' '}
              <a href="https://www.instagram.com/maruaisougyou" style={{ color: '#C8B393' }}>@maruaisougyou</a>
            </dd>
          </dl>
        </div>
      </div>
      <div className="wrap foot-bottom">© 2026 MARUAI SOUGYO CO., LTD. All rights reserved.</div>
    </footer>
  );
}
