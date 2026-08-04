'use client';
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Parallax effect
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (imgRef.current) {
          const scrollY = window.scrollY;
          imgRef.current.style.transform = `translateY(${scrollY * 0.25}px)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector("#simulation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative w-full h-[500px] sm:h-[600px] md:h-[720px] lg:h-[780px] overflow-hidden"
    >
      <style>{`
        @keyframes cta-pulse {
          0%, 100% {
            box-shadow: 0 0 25px rgba(var(--accent-500), 0.3), 0 0 0 0 rgba(var(--accent-500), 0.5);
          }
          50% {
            box-shadow: 0 0 35px rgba(var(--accent-500), 0.5), 0 0 0 12px rgba(var(--accent-500), 0);
          }
        }
        @keyframes icon-bounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        .cta-pulse-anim {
          animation: cta-pulse 2.5s ease-in-out infinite;
        }
        .cta-pulse-anim:hover {
          animation: none;
        }
        .cta-pulse-anim:hover .cta-icon {
          animation: icon-bounce 0.5s ease-in-out;
        }
        .cta-glow-ring {
          position: absolute;
          inset: -4px;
          border-radius: 9999px;
          background: linear-gradient(135deg, oklch(var(--accent-500) / 0.6), oklch(var(--accent-400) / 0.6), oklch(var(--accent-500) / 0.6));
          filter: blur(8px);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        .cta-wrapper:hover .cta-glow-ring {
          opacity: 1;
        }
        .scroll-indicator {
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        .hero-text-shadow {
          text-shadow: 0 2px 12px rgba(0,0,0,0.5), 0 4px 24px rgba(0,0,0,0.3);
        }
        .hero-accent-glow {
          text-shadow: 0 0 20px rgba(var(--accent-400), 0.4), 0 2px 12px rgba(0,0,0,0.5);
        }
        .hero-tagline-shadow {
          text-shadow: 0 1px 8px rgba(0,0,0,0.4), 0 2px 16px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* Background with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="https://readdy.ai/api/search-image?query=Beautiful%20modern%20Japanese%20house%20exterior%20with%20fresh%20paint%20after%20renovation%2C%20warm%20sunlight%2C%20clean%20blue%20sky%2C%20well-maintained%20residential%20street%20in%20Japan%2C%20professional%20photography%2C%20high%20quality%2C%20serene%20atmosphere%2C%20green%20garden%20and%20trees&width=1600&height=900&seq=maruai-hero-01&orientation=landscape"
          alt="茨城県阿見町 外壁塗装・屋根塗装の施工事例 きれいに塗装された戸建て住宅"
          title="阿見町の外壁塗装・屋根塗装専門店 丸愛装業"
          className="w-full h-[120%] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content - Centered vertically and horizontally */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full text-center px-4 sm:px-6 md:px-8 py-16 sm:py-24 md:py-32">
        {/* Main headline */}
        <h2
          className={`hero-text-shadow font-heading text-[1.25rem] sm:text-[2rem] md:text-5xl lg:text-7xl font-bold text-background-50 leading-snug sm:leading-tight mb-3 sm:mb-4 md:mb-6 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="block whitespace-nowrap mb-0.5 sm:mb-2 md:mb-3">街の塗装屋さんから、</span>
          <span className="block whitespace-nowrap">
            <span className="hero-accent-glow text-accent-400">知り合いの塗装屋さん</span>を目指して。
          </span>
        </h2>

        {/* Tagline */}
        <p
          className={`hero-tagline-shadow text-background-100/80 text-[13px] sm:text-base md:text-lg font-medium tracking-wide mb-6 sm:mb-8 md:mb-10 transition-all duration-700 delay-150 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="block whitespace-nowrap">まずは、あなたの街の塗装屋さんとして。</span>
          <span className="block whitespace-nowrap">
            いつでも気軽に相談できる、
            <strong className="text-background-50">知り合いの塗装屋さん</strong>へ。
          </span>
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="cta-wrapper relative">
            <div className="cta-glow-ring"></div>
            <a
              href="#simulation"
              onClick={handleCtaClick}
              className="cta-pulse-anim relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-5 rounded-full bg-accent-500 text-background-50 font-bold text-sm sm:text-lg md:text-xl hover:bg-accent-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span className="cta-icon inline-flex items-center">
                <i className="ri-calculator-line text-lg md:text-2xl"></i>
              </span>
              <span>概算料金をシミュレーション</span>
              <span className="cta-icon inline-flex items-center hidden sm:inline">
                <i className="ri-arrow-right-line text-lg md:text-xl"></i>
              </span>
            </a>
          </div>
          <a
            href="tel:029-886-7913"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/10 backdrop-blur-sm text-background-50 font-medium text-sm sm:text-lg md:text-xl border border-white/25 hover:bg-white/20 transition-all whitespace-nowrap"
          >
            <i className="ri-phone-line"></i>
            <span className="font-bold tracking-wide">029-886-7913</span>
            <span className="hidden md:inline text-background-100/70 font-normal whitespace-nowrap">お気軽にどうぞ</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`flex flex-col items-center gap-1 transition-all duration-700 delay-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-[10px] md:text-xs text-background-100/60 tracking-widest uppercase font-medium">
            Scroll
          </span>
          <div className="scroll-indicator">
            <i className="ri-arrow-down-line text-background-100/60 text-lg md:text-xl"></i>
          </div>
        </div>
      </div>
    </section>
  );
}