import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: 'center', padding: '80px 0' }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>404</p>
        <h1 className="mincho" style={{ fontSize: '2rem', margin: '.5em 0 1em' }}>ページが見つかりませんでした</h1>
        <Link className="btn btn-ember" href="/">トップへ戻る</Link>
      </div>
    </section>
  );
}
