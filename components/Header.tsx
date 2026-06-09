'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/services', label: 'サービス' },
  { href: '/works', label: '施工事例' },
  { href: '/price', label: '料金' },
  { href: '/voice', label: 'お客様の声' },
  { href: '/company', label: '会社概要' },
  { href: '/faq', label: 'よくある質問' },
];
const TEL = 'tel:0298867913';
const LINE = 'https://line.me/ti/p/UxXZqXMSWE';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <header>
        <div className="wrap nav">
          <Link className="logo" href="/">
            丸愛装業<small>MARUAI SOUGYO</small>
          </Link>
          <nav className="nav-links">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={isActive(n.href) ? 'active' : ''}>
                {n.label}
              </Link>
            ))}
            <Link className="btn btn-ember" href="/contact">無料相談</Link>
          </nav>
          <a className="nav-tel" href={TEL} aria-label="電話する">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="tnum">029-886-7913</span>
          </a>
          <button className="menu-toggle" aria-label="メニューを開く" onClick={() => setOpen(true)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#23303A" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>
      </header>

      <div className={`mnav${open ? ' open' : ''}`}>
        <div className="mhead">
          <span className="logo">丸愛装業<small>MARUAI SOUGYO</small></span>
          <button className="mclose" aria-label="閉じる" onClick={() => setOpen(false)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={() => setOpen(false)}>ホーム</Link>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={isActive(n.href) ? 'active' : ''} onClick={() => setOpen(false)}>
            {n.label}
          </Link>
        ))}
        <div className="mcta">
          <a className="btn btn-line" href={LINE}>LINEで相談</a>
          <a className="btn btn-ember" href={TEL}>029-886-7913 に電話</a>
        </div>
      </div>
    </>
  );
}
