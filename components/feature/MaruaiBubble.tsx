'use client';
import { motion } from "motion/react";
import { MARUAI_IMAGES } from "@/lib/maruai";

interface MaruaiBubbleProps {
  comment: string;
  image?: string;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg";
  bubbleColor?: "primary" | "accent" | "secondary" | "white";
  className?: string;
}

const sizeMap = {
  sm: { img: "w-16 h-20 md:w-20 md:h-24", text: "text-sm" },
  md: { img: "w-20 h-24 md:w-24 md:h-30", text: "text-base" },
  lg: { img: "w-24 h-28 md:w-28 md:h-34", text: "text-base md:text-lg" },
};

const bubbleColorMap = {
  primary: "bg-primary-50 border-primary-200",
  accent: "bg-accent-50 border-accent-200",
  secondary: "bg-secondary-50 border-secondary-200",
  white: "bg-background-50 border-background-200/70",
};

const triangleColorMap = {
  primary: "bg-primary-50 border-primary-200",
  accent: "bg-accent-50 border-accent-200",
  secondary: "bg-secondary-50 border-secondary-200",
  white: "bg-background-50 border-background-200/70",
};

export default function MaruaiBubble({
  comment,
  image = MARUAI_IMAGES.main,
  position = "left",
  size = "md",
  bubbleColor = "white",
  className = "",
}: MaruaiBubbleProps) {
  const s = sizeMap[size];
  const bubbleClass = bubbleColorMap[bubbleColor];
  const triClass = triangleColorMap[bubbleColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group flex items-end gap-2 md:gap-3 ${
        position === "right" ? "flex-row-reverse" : "flex-row"
      } ${className}`}
    >
      <motion.div
        className={`${s.img} shrink-0`}
        animate={{ y: [0, -5, 0] }}
        transition={{
          y: { repeat: Infinity, duration: 2.8, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.18 }}
      >
        <img
          src={image}
          alt="丸愛装業 イメージキャラクター まるあいくん"
          title="丸愛装業 まるあいくん"
          className="w-full h-full object-contain drop-shadow-sm group-hover:animate-maruai-wiggle"
          loading="lazy"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
        className={`relative rounded-xl px-3 py-2.5 md:px-4 md:py-3 border ${bubbleClass} max-w-[220px] md:max-w-[280px]`}
      >
        <p className={`${s.text} text-foreground-800 leading-relaxed font-medium`}>
          {comment}
        </p>
        <div
          className={`absolute bottom-4 w-3 h-3 rotate-45 border ${triClass} ${
            position === "right"
              ? "right-[-6px] border-r-0 border-t-0"
              : "left-[-6px] border-l-0 border-b-0"
          }`}
        />
      </motion.div>
    </motion.div>
  );
}