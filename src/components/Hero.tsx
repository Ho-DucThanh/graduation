import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, GraduationCap } from "lucide-react";
import { invitationDetails } from "../lib/details";

type HeroProps = {
  onViewInvitation: () => void;
};

/**
 * Hero with subtle parallax: we compute a small offset based on scroll position
 * and feed it to Framer Motion `animate` (no inline style).
 */
export function Hero({ onViewInvitation }: HeroProps) {
  const [parallaxY, setParallaxY] = useState(0);

  const maxOffset = 24;

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const next = Math.max(
          -maxOffset,
          Math.min(maxOffset, -window.scrollY * 0.12),
        );
        setParallaxY(next);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const subtitle = useMemo(() => {
    return `${invitationDetails.studentName} • ${invitationDetails.university} •`;
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Soft background lights */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gold-100/60 blur-3xl" />
        <div className="absolute top-16 right-[-120px] h-80 w-80 rounded-full bg-navy-800/10 blur-3xl" />
        <div className="absolute bottom-[-140px] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-50/70 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-ivory-50 to-ivory-50" />
      </div>

      <div className="container-page relative py-20 sm:py-24 lg:py-28">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white/70 px-4 py-2 text-xs font-semibold text-navy-900 shadow-soft backdrop-blur">
            <GraduationCap className="h-4 w-4 text-navy-900/80" />
            <span className="tracking-wide">
              Academic Ceremony • Formal Invitation
            </span>
          </div>

          <motion.h1
            className="font-serif text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl"
            animate={{ y: parallaxY }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            {invitationDetails.title}
          </motion.h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-navy-900/70 sm:text-base">
            {subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="btn-primary" onClick={onViewInvitation}>
              Xem Thư Mời
              <ArrowDown className="h-4 w-4" />
            </button>

            <a
              className="btn-ghost"
              href="#timeline"
              aria-label="Xem lịch trình"
            >
              Xem Lịch Trình
            </a>
          </div>

          <motion.div
            className="mt-10 inline-flex items-center gap-2 text-xs text-navy-900/55"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          >
            <span>Kéo xuống để xem nội dung chi tiết</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
