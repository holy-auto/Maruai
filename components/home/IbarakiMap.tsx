'use client';
import { useEffect, useRef, useState } from "react";

export default function IbarakiMap() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-center bg-[#e8f0d8] transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="relative w-full h-full flex items-center justify-center p-2">
        <div className="relative inline-block w-full">
          <img
            src="https://storage.readdy-site.link/project_files/bcb26e33-f31c-418d-b038-452e5aafb71b/9bde2923-d9a1-4890-923f-a763ceaead28_ChatGPT-Image-2026611-22_55_02.png"
            alt="茨城県施工エリアマップ - 阿見町・牛久市・土浦市・つくば市・取手市・龍ヶ崎市"
            title="茨城県 外壁塗装・屋根塗装 施工エリアマップ 丸愛装業"
            className="w-full h-auto object-contain block"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}