import { PHOTO_CREDITS } from '@/lib/photoCredits';
// フッター：朱の問い合わせ帯と、紺の地に会社情報・メニュー・写真の出典
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
    <>
      {/* 問い合わせの帯：朱の面に、電話と見積もりの2つの入口 */}
      <section aria-label="お問い合わせ" className="bg-accent text-accent-ink">
        <div className="container py-[var(--space-2xl)] grid grid-cols-1 xl:grid-cols-12 gap-x-8 gap-y-8 items-center">
          <div className="xl:col-span-6">
            <p className="text-sm font-bold tracking-[0.24em] opacity-90">CONTACT</p>
            <p className="mt-3 font-display font-bold text-[clamp(1.5rem,2.2vw+0.75rem,2.25rem)] leading-snug [&>span]:inline-block">
              <span>お見積もり・現地診断は</span><span>無料です。</span>
            </p>
            <p className="mt-2 text-base opacity-90">ご相談はどのような事でもお気軽にどうぞ。</p>
          </div>
          <div className="xl:col-span-6 flex flex-col sm:flex-row gap-4 xl:justify-end">
            <a
              href="tel:029-886-7913"
              className="flex items-center gap-4 rounded-card bg-plate text-ink no-underline px-6 py-4 shadow-card"
            >
              <i className="ri-phone-fill text-3xl text-accent" aria-hidden="true"></i>
              <span className="leading-tight">
                <span className="block font-figure font-bold text-[1.5rem] sm:text-[1.75rem] tracking-[0.04em] tabular-nums whitespace-nowrap">029-886-7913</span>
                <span className="block text-[0.8125rem] text-ink-2 whitespace-nowrap">平日 9:00〜18:00</span>
              </span>
            </a>
            <a href="/#contact" className="btn btn--on-ink min-h-[72px] px-8 text-base">
              <i className="ri-mail-line text-xl" aria-hidden="true"></i>
              メールで問い合わせる
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-ink text-plate-ink">
        <div className="container py-[var(--space-3xl)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
            <div className="lg:col-span-5">
              <p className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid place-items-center w-11 h-11 rounded-full bg-plate-ink text-ink font-display font-bold text-xl leading-none"
                >
                  丸
                </span>
                <span className="flex flex-col leading-none">
                  <span className="font-display font-bold text-[1.625rem] tracking-[0.08em]">株式会社 丸愛装業</span>
                  <span className="mt-1.5 text-[0.6875rem] font-bold tracking-[0.22em] opacity-70">MARUAI SOUGYO CO., LTD.</span>
                </span>
              </p>
              {/* 文節ごとに inline-block にして「へ。」だけが次の行に落ちないようにする */}
              <p className="mt-8 font-display font-bold text-[1.375rem] leading-relaxed [&>span]:inline-block">
                <span>街の塗装屋さんから、</span><span>知り合いの塗装屋さんへ。</span>
              </p>
              <p className="mt-3 text-sm opacity-80">
                阿見町の外壁・屋根塗装専門店　代表取締役 小林 力也
              </p>
            </div>

            <address className="lg:col-span-3 not-italic text-[0.9375rem] leading-relaxed opacity-90">
              <p className="text-xs font-bold tracking-[0.2em] text-gold">ACCESS</p>
              <p className="mt-3">〒300-0325<br />茨城県稲敷郡阿見町上条888</p>
              <dl className="mt-3 grid grid-cols-[3em_1fr] gap-y-1">
                <dt>TEL</dt>
                <dd><a href="tel:029-886-7913" className="no-underline hover:underline font-figure tabular-nums">029-886-7913</a></dd>
                <dt>FAX</dt>
                <dd className="font-figure tabular-nums">029-886-5499</dd>
              </dl>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                <li>
                  <a href="https://line.me/ti/p/UxXZqXMSWE" target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-1.5 no-underline hover:underline">
                    <i className="ri-line-fill text-lg" aria-hidden="true"></i>公式LINE
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/maruaisougyou" target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-1.5 no-underline hover:underline">
                    <i className="ri-instagram-line text-lg" aria-hidden="true"></i>Instagram
                  </a>
                </li>
              </ul>
            </address>

            <nav aria-label="フッター" className="lg:col-span-4">
              <p className="text-xs font-bold tracking-[0.2em] text-gold">MENU</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2.5 text-[0.875rem] sm:text-[0.9375rem]">
                {SITE_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="inline-flex items-center gap-1 no-underline opacity-90 hover:opacity-100 hover:underline whitespace-nowrap">
                      <i className="ri-arrow-right-s-line opacity-60" aria-hidden="true"></i>
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/privacy" className="inline-flex items-center gap-1 no-underline opacity-90 hover:opacity-100 hover:underline">
                    <i className="ri-arrow-right-s-line opacity-60" aria-hidden="true"></i>
                    プライバシーポリシー
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-16 pt-6 border-t border-[color-mix(in_oklab,var(--color-plate-ink)_18%,transparent)] text-xs leading-relaxed opacity-70">
            <p>
              イメージ写真：
              {PHOTO_CREDITS.map((c, i) => (
                <span key={c.src}>
                  {i > 0 && '、'}
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline">{c.author}</a>
                  （<a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline">{c.license}</a>）
                </span>
              ))}
              ／Wikimedia Commons より。枠に合わせてトリミングしています。
            </p>
            <p className="mt-2">© 2026 株式会社 丸愛装業</p>
          </div>
        </div>
      </footer>
    </>
  );
}
