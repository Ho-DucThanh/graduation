import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";

type RevealVariant = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
  variant?: RevealVariant;
}>;

/**
 * Wrapper animation when the section scrolls into view.
 * Uses Framer Motion viewport trigger (no extra IntersectionObserver code needed).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  amount = 0.22,
  variant = "fadeUp",
}: RevealProps) {
  const variants: Record<
    RevealVariant,
    { initial: TargetAndTransition; inView: TargetAndTransition }
  > = {
    fadeUp: {
      initial: { opacity: 0, y: 18 },
      inView: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      inView: { opacity: 1 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 22 },
      inView: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -22 },
      inView: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.98, y: 10 },
      inView: { opacity: 1, scale: 1, y: 0 },
    },
  };

  return (
    <motion.div
      className={className}
      initial={variants[variant].initial}
      whileInView={variants[variant].inView}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
