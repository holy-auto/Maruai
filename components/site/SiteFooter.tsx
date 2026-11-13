// footer: letter close（代表の結びの言葉と署名、その下に住所・連絡先とページへのリンク）
const SITE_LINKS = [
  { label: "HOME", href: "/" },
  { label: "サービス", href: "/services" },
  { label: "料金", href: "/price" },
  { label: "施工事例", href: "/works" },
  { label: "お客様の声", href: "/voice" },
  { label: "よくある質問", href: "/faq" },
  { label: "コラム", href: "/blog" },
  { label: "会社概要", href: "/company" },
  { label: "お問い合わせ", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-paper-2 border-t-bar border-ink">
      <div className="container py-[var(--space-3xl)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          <div className="md:col-span-7">
            {/* 文節ごとに inline-block にして「へ。」だけが次の行に落ちないようにする */}
            <p className="font-display font-bold text-display-s text-ink max-w-[16em] [&>span]:inline-block">
              <span>街の塗装屋さんから、</span>
              <br />
              <span>知り合いの</span><span>塗装屋さんへ。</span>
            </p>
            <p className="mt-6 text-base text-ink-2">
              阿見町の外壁・屋根塗装専門店
              <br />
              株式会社 丸愛装業　代表取締役 <span className="font-bold text-ink">小林 力也</span>
            </p>
          </div>

          <address className="md:col-span-4 md:col-start-9 not-italic text-base text-ink-2 leading-relaxed">
            〒300-0325
            <br />
            茨城県稲敷郡阿見町上条888
            <dl className="mt-4 grid grid-cols-[3.5em_1fr] gap-y-1">
              <dt className="label">TEL</dt>
              <dd>
                <a href="tel:029-886-7913" className="link font-figure text-lg">029-886-7913</a>
              </dd>
              <dt className="label">FAX</dt>
              <dd className="font-figure text-lg">029-886-5499</dd>
            </dl>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a
                  href="https://line.me/ti/p/UxXZqXMSWE"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="link inline-flex items-center gap-1.5"
                >
                  <i className="ri-line-fill text-lg text-ink" aria-hidden="true"></i>
                  公式LINE
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/maruaisougyou"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="link inline-flex items-center gap-1.5"
                >
                  <i className="ri-instagram-line text-lg text-ink" aria-hidden="true"></i>
                  Instagram
                </a>
              </li>
            </ul>
          </address>
        </div>

        <nav aria-label="フッター" className="mt-16 pt-6 border-t-hair border-paper-3">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {SITE_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link text-[0.9375rem] no-underline hover:underline whitespace-nowrap">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/privacy" className="link text-[0.9375rem] no-underline hover:underline whitespace-nowrap">
                プライバシーポリシー
              </a>
            </li>
          </ul>
          <p className="mt-6 label">© 2026 株式会社 丸愛装業</p>
        </nav>
      </div>
    </footer>
  );
}
