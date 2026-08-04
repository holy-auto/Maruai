'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScrollSection } from "@/hooks/useScrollSection";
import { useSimulationEstimate } from "@/hooks/useSimulationEstimate";
import { MARUAI_IMAGES, MARUAI_FLOATING_TIPS, MARUAI_FLOATING_SIM_COMMENTS } from "@/lib/maruai";

function pickRandomTip(
  tips: { comment: string; pose: keyof typeof MARUAI_IMAGES }[],
  excludeIndex?: number
): { tip: { comment: string; pose: keyof typeof MARUAI_IMAGES }; index: number } {
  if (tips.length === 0) return { tip: { comment: "", pose: "main" as keyof typeof MARUAI_IMAGES }, index: 0 };
  if (tips.length === 1) return { tip: tips[0], index: 0 };

  let idx: number;
  do {
    idx = Math.floor(Math.random() * tips.length);
  } while (idx === excludeIndex && tips.length > 1);

  return { tip: tips[idx], index: idx };
}

export function FloatingMaruai() {
  const activeSection = useScrollSection();
  const simulationEstimate = useSimulationEstimate();
  const [visible, setVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [commentKey, setCommentKey] = useState(0);
  const prevSectionRef = useRef<string | null>(null);
  const currentTipIndexRef = useRef<number>(0);
  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const simulationDynamicData = useMemo(() => {
    const match = MARUAI_FLOATING_SIM_COMMENTS.find((r) => simulationEstimate <= r.max);
    return match ?? MARUAI_FLOATING_SIM_COMMENTS[MARUAI_FLOATING_SIM_COMMENTS.length - 1];
  }, [simulationEstimate]);

  const isInSimulation = activeSection === "simulation";

  const tipsForSection = useMemo(() => {
    if (!activeSection) return null;
    return MARUAI_FLOATING_TIPS[activeSection] ?? null;
  }, [activeSection]);

  const [displayData, setDisplayData] = useState<{ comment: string; pose: keyof typeof MARUAI_IMAGES } | null>(null);

  const cycleToNextTip = useCallback(() => {
    if (!tipsForSection || isInSimulation) return;
    const { tip, index } = pickRandomTip(tipsForSection, currentTipIndexRef.current);
    currentTipIndexRef.current = index;
    setDisplayData(tip);
    setCommentKey((prev) => prev + 1);
  }, [tipsForSection, isInSimulation]);

  const resetAutoHideTimer = useCallback(() => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
    }
    setBubbleVisible(true);
    autoHideTimerRef.current = setTimeout(() => {
      setBubbleVisible(false);
    }, 6000);
  }, []);

  const handleMaruaiTap = useCallback(() => {
    if (bubbleVisible) {
      setBubbleVisible(false);
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
        autoHideTimerRef.current = null;
      }
    } else {
      resetAutoHideTimer();
    }
  }, [bubbleVisible, resetAutoHideTimer]);

  useEffect(() => {
    if (isInSimulation) {
      setDisplayData({
        comment: simulationDynamicData.comment,
        pose: simulationDynamicData.pose,
      });
      return;
    }

    if (!tipsForSection) {
      setDisplayData(null);
      return;
    }

    const { tip, index } = pickRandomTip(tipsForSection);
    currentTipIndexRef.current = index;
    setDisplayData(tip);
  }, [activeSection, isInSimulation, simulationDynamicData, tipsForSection]);

  useEffect(() => {
    if (activeSection && activeSection !== prevSectionRef.current) {
      if (prevSectionRef.current !== null && activeSection !== "top") {
        setCommentKey((prev) => prev + 1);
      }
      prevSectionRef.current = activeSection;
    }
  }, [activeSection]);

  useEffect(() => {
    if (isInSimulation && prevSectionRef.current === "simulation") {
      setCommentKey((prev) => prev + 1);
    }
  }, [simulationDynamicData.comment, isInSimulation]);

  useEffect(() => {
    if (cycleTimerRef.current) {
      clearInterval(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }

    if (!isInSimulation && tipsForSection && tipsForSection.length > 1 && visible) {
      cycleTimerRef.current = setInterval(() => {
        cycleToNextTip();
      }, 10000);
    }

    return () => {
      if (cycleTimerRef.current) {
        clearInterval(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    };
  }, [isInSimulation, tipsForSection, visible, cycleToNextTip]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY < windowH * 0.4) {
        setVisible(false);
      } else if (scrollY + windowH > docHeight - 200) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (displayData) {
      resetAutoHideTimer();
    }
  }, [displayData, resetAutoHideTimer]);

  const shouldShow = visible && displayData != null && activeSection !== "top";

  if (!displayData) return null;

  const imageSrc = MARUAI_IMAGES[displayData.pose] ?? MARUAI_IMAGES.main;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="floating-maruai"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="block fixed bottom-20 right-2 md:bottom-6 md:right-4 lg:right-6 z-40"
        >
          <div className="flex items-end gap-2 md:gap-3 flex-row-reverse">
            <motion.div
              className="w-12 h-14 md:w-20 md:h-24 lg:w-24 lg:h-28 shrink-0 cursor-pointer"
              animate={{ y: [0, -6, 0] }}
              transition={{
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.15, rotate: [-3, 3, -3, 0] }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMaruaiTap}
              role="button"
              aria-label="まるあいくんをタップしてヒントを表示"
            >
              <img
                src={imageSrc}
                alt="丸愛装業 まるあいくん"
                title="丸愛装業 イメージキャラクター まるあいくん"
                className="w-full h-full object-contain drop-shadow-md"
                loading="lazy"
              />
            </motion.div>

            <AnimatePresence mode="wait">
              {bubbleVisible && (
                <motion.div
                  key={commentKey}
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative rounded-xl px-2 py-1.5 md:px-4 md:py-3 bg-background-50 border border-background-200/70 max-w-[110px] md:max-w-[240px] lg:max-w-[280px] shadow-sm"
                >
                  <p className="text-[10px] leading-snug md:text-sm lg:text-base text-foreground-800 font-medium">
                    {displayData.comment}
                  </p>
                  <div className="absolute bottom-4 right-[-6px] w-3 h-3 rotate-45 bg-background-50 border-r-0 border-t-0 border border-background-200/70" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}