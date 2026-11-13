'use client';
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "施工内容", href: "/#service" },
  { label: "料金シミュレーション", href: "/#simulation" },
  { label: "施工事例", href: "/works" },
  { label: "代表挨拶", href: "/#message" },
  { label: "会社概要", href: "/#company" },
  { label: "お問い合わせ", href: "/#contact" },
];

// nav: masthead（社名を中央に大きく、太い墨の線の下にリンクの列）
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
    <header className="bg-paper">
      <div className="container">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 min-h-[64px] md:min-h-[72px]">
          <p className="label hidden md:block">阿見町の外壁・屋根塗装</p>
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            aria-label="丸愛装業 トップへ"
            className="col-start-1 md:col-start-2 justify-self-start md:justify-self-center font-display font-bold text-[1.75rem] md:text-[2.25rem] leading-none tracking-normal text-ink no-underline whitespace-nowrap"
          >
            丸愛装業
          </a>
          <div className="col-start-3 flex items-center justify-end gap-6">
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="link hidden md:inline text-[0.9375rem] font-medium whitespace-nowrap"
            >
              無料見積もり
            </a>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-12 h-12 border-2 border-ink bg-paper-2 text-ink"
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

      <nav aria-label="サイト内" className="border-t-bar border-ink">
        <div className="container hidden md:block">
          <ul className="flex items-center justify-center gap-x-8 lg:gap-x-10 min-h-[44px]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={link.href === pathname ? "page" : undefined}
                  className="link text-[0.9375rem] font-medium no-underline hover:underline whitespace-nowrap aria-[current=page]:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {mobileOpen && (
          <div id="site-menu" className="md:hidden container pb-6">
            <ul className="divide-y divide-paper-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center min-h-[52px] text-base font-medium text-ink no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3">
              <a
                href="/#contact"
                onClick={(e) => handleNavClick(e, "/#contact")}
                className="btn btn--secondary w-full"
              >
                無料見積もり
              </a>
              <a href="tel:029-886-7913" className="btn btn--secondary w-full font-figure">
                029-886-7913
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
