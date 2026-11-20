'use client';
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "施工内容", href: "/#service" },
  { label: "料金シミュレーション", href: "/#simulation" },
  { label: "施工事例", href: "/works" },
  { label: "代表挨拶", href: "/#message" },
  { label: "会社概要", href: "/company" },
  { label: "お問い合わせ", href: "/#contact" },
];

// ヘッダー：左にロゴ、中央にリンク、右に電話番号と見積もりボタン。上部に固定
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // ハッシュ対象が描画されるまで数回リトライしてからスクロール（クライアント遷移の速度差に依存しないため）
  const scrollToHash = (hash: string, attempts = 0) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (attempts < 25) {
      setTimeout(() => scrollToHash(hash, attempts + 1), 100);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (href === "/") {
      router.push("/");
      window.scrollTo(0, 0);
    } else if (href.startsWith("/#")) {
      const hash = href.substring(1); // "#xxx"
      if (pathname !== "/") {
        router.push("/");
        scrollToHash(hash);
      } else {
        scrollToHash(hash);
      }
    } else {
      router.push(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className="sticky top-0 z-[var(--z-sticky-nav)] bg-[color-mix(in_oklab,var(--color-paper)_94%,transparent)] backdrop-blur border-b border-paper-3">
      <div className="container">
        <div className="flex items-center justify-between gap-6 min-h-[68px] lg:min-h-[84px]">
          {/* ロゴ：社名（明朝）と、小さく英字・業種 */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            aria-label="株式会社 丸愛装業 トップへ"
            className="flex items-center gap-2.5 sm:gap-3 no-underline text-ink min-w-0 sm:shrink-0"
          >
            <span
              aria-hidden="true"
              className="shrink-0 grid place-items-center w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-ink text-plate-ink font-display font-bold text-lg lg:text-xl leading-none"
            >
              丸
            </span>
            <span className="flex flex-col leading-none min-w-0">
              <span className="font-display font-bold text-[1.25rem] sm:text-[1.375rem] lg:text-[1.625rem] tracking-[0.08em] whitespace-nowrap">丸愛装業</span>
              <span className="mt-1.5 text-[0.5625rem] sm:text-[0.625rem] lg:text-[0.6875rem] font-bold tracking-[0.12em] sm:tracking-[0.22em] text-muted whitespace-nowrap truncate">
                MARUAI SOUGYO · 外壁・屋根塗装
              </span>
            </span>
          </a>

          <nav aria-label="サイト内" className="hidden xl:block">
            <ul className="flex items-center gap-x-7 xl:gap-x-9">
              {navLinks.slice(1, -1).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={link.href === pathname ? "page" : undefined}
                    className="relative text-[0.9375rem] font-medium text-ink no-underline whitespace-nowrap py-2 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4 xl:gap-6 shrink-0">
            <a href="tel:029-886-7913" className="hidden min-[1380px]:flex flex-col items-end no-underline text-ink leading-none whitespace-nowrap">
              <span className="flex items-center gap-1.5 font-figure font-bold text-[1.375rem] tracking-[0.04em] tabular-nums">
                <i className="ri-phone-fill text-accent text-lg" aria-hidden="true"></i>
                029-886-7913
              </span>
              <span className="mt-1.5 text-[0.6875rem] text-muted tracking-[0.06em]">平日 9:00〜18:00</span>
            </a>
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="btn btn--primary hidden sm:inline-flex min-h-[46px] px-5 text-[0.9375rem]"
            >
              <i className="ri-mail-line" aria-hidden="true"></i>
              無料見積もり
            </a>
            <button
              type="button"
              className="xl:hidden inline-flex items-center justify-center w-12 h-12 rounded-control border border-paper-3 bg-plate text-ink"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="メニュー"
              aria-expanded={mobileOpen}
              aria-controls="site-menu"
            >
              <i className={`text-2xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav id="site-menu" aria-label="サイト内（モバイル）" className="xl:hidden border-t border-paper-3 bg-paper">
          <div className="container pb-6">
            <ul className="divide-y divide-paper-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between min-h-[54px] text-base font-medium text-ink no-underline"
                  >
                    {link.label}
                    <i className="ri-arrow-right-s-line text-muted" aria-hidden="true"></i>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3">
              <a
                href="/#contact"
                onClick={(e) => handleNavClick(e, "/#contact")}
                className="btn btn--primary w-full"
              >
                <i className="ri-mail-line" aria-hidden="true"></i>
                無料見積もり
              </a>
              <a href="tel:029-886-7913" className="btn btn--secondary w-full font-figure">
                <i className="ri-phone-fill" aria-hidden="true"></i>
                029-886-7913
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
