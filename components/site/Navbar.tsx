'use client';
import { useState, useEffect } from "react";
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
      window.scrollTo(0, 0);
    }
  };

  const isHomeTop = pathname === "/" && !scrolled;
  const navBgTransparent = isHomeTop;
  const textColorClass = navBgTransparent ? "text-background-50" : "text-foreground-900";
  const linkColorClass = navBgTransparent
    ? "text-background-100 hover:text-background-50 hover:bg-white/10"
    : "text-foreground-700 hover:text-primary-600 hover:bg-primary-50";
  const hamburgerColorClass = navBgTransparent ? "text-background-50" : "text-foreground-800";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navBgTransparent
          ? "bg-transparent"
          : "bg-background-50/95 backdrop-blur-md border-b border-background-200/70"
      }`}
    >
    <nav>
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-primary-600 rounded-md">
              <i className="ri-home-smile-line text-background-50 text-lg"></i>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span
                className={`font-heading font-bold text-xl md:text-2xl tracking-wide transition-colors ${textColorClass}`}
              >
                丸愛装業
              </span>
              <span
                className={`text-[10px] md:text-xs font-medium tracking-wider mt-0.5 transition-colors ${navBgTransparent ? "text-background-100/80" : "text-foreground-500"}`}
              >
                阿見町の外壁・屋根塗装専門店
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors whitespace-nowrap ${linkColorClass}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="ml-3 px-5 py-2.5 rounded-full bg-primary-500 text-background-50 text-base font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              無料見積もり
            </a>
          </div>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="メニュー"
          >
            <i
              className={`text-2xl ${hamburgerColorClass} ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}
            ></i>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background-50/98 backdrop-blur-md border-b border-background-200/70">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-3 py-3 rounded-md text-base font-medium text-foreground-700 hover:text-primary-600 hover:bg-primary-50"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="block mt-2 px-5 py-3 rounded-full bg-primary-500 text-background-50 text-base font-semibold text-center"
            >
              無料見積もり
            </a>
          </div>
        </div>
      )}
    </nav>
    </header>
  );
}
