import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SECTION_IDS = ["top", "service", "moneyflow", "simulation", "reason", "message", "company", "contact"];

export function useScrollSection(): string | null {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // ルート変更時に監視対象を貼り直す（セクションを持たないページから戻ったときも再検知するため）
    setActiveSection(null);
    const visibilityMap = new Map<string, number>();
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibilityMap.set(id, entry.intersectionRatio);

          if (entry.intersectionRatio > 0) {
            let maxRatio = 0;
            let maxSection: string | null = null;
            visibilityMap.forEach((ratio, section) => {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                maxSection = section;
              }
            });
            setActiveSection(maxSection);
          }
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname]);

  return activeSection;
}