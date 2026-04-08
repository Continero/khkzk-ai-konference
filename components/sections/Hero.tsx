"use client";

import { useState, useEffect, useMemo } from "react";
import { Player } from "@remotion/player";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroComposition } from "@/components/remotion/HeroComposition";

const bootLines = [
  { text: "JARVIS SYSTEM v4.2.6", delay: 500 },
  { text: "Neural network calibration", delay: 1200 },
  { text: "Conference database loaded", delay: 2000 },
  { text: "Biometric scan complete", delay: 2800 },
  { text: "All systems operational.", delay: 3500 },
];

function BootPanel() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => setPhase(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="hidden lg:flex flex-col gap-1.5 hud-panel rounded-lg p-4 min-w-[220px]"
    >
      <div className="font-mono text-[9px] text-accent-cyan/30 tracking-[0.2em] uppercase mb-1">
        System_Status
      </div>
      {bootLines.map((line, i) => {
        const done = phase > i;
        const isLast = i === bootLines.length - 1;
        return (
          <div
            key={i}
            className={`flex items-center gap-2 font-mono text-[11px] transition-opacity duration-300 ${
              done ? "opacity-100" : "opacity-20"
            }`}
          >
            <span className={
              done
                ? isLast ? "text-accent-cyan" : "text-green-400/60"
                : "text-text-muted/30"
            }>
              {done ? (isLast ? "▸" : "✓") : "○"}
            </span>
            <span className={
              done
                ? isLast ? "text-accent-cyan/70" : "text-text-secondary/70"
                : "text-text-muted/30"
            }>
              {line.text}
            </span>
          </div>
        );
      })}
      {/* Progress bar */}
      <div className="mt-2 h-[2px] bg-accent-cyan/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: phase >= bootLines.length ? "100%" : `${(phase / bootLines.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-accent-cyan/40"
        />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const inputProps = useMemo(() => ({}), []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Remotion Player — full hero */}
      <motion.div style={{ opacity, y }} className="absolute inset-0 flex items-center justify-center">
        {mounted && (
          <Player
            component={HeroComposition}
            inputProps={inputProps}
            durationInFrames={300}
            compositionWidth={1280}
            compositionHeight={720}
            fps={30}
            autoPlay
            loop
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
            controls={false}
          />
        )}
      </motion.div>

      {/* SEO H1 — visually hidden, title is rendered by Remotion */}
      <h1 className="sr-only">AI v praxi 2026 — Konference o umělé inteligenci a robotice, 20. května 2026, Interhotel Zlín</h1>

      {/* Real HTML overlay — info badges + clickable CTA */}
      <motion.div
        style={{ opacity }}
        className="absolute z-20 bottom-[18%] flex flex-col items-center gap-5"
      >
        {/* Info badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="flex gap-3"
        >
          <span className="font-mono text-sm font-bold text-accent-cyan px-5 py-2 hud-panel rounded border border-accent-cyan/30 shadow-[0_0_12px_rgba(0,212,255,0.15)]">
            20. května 2026
          </span>
          <span className="font-mono text-sm text-text-secondary px-5 py-2 hud-panel rounded">
            Interhotel Zlín
          </span>
        </motion.div>

        {/* Clickable CTA */}
        <motion.a
          href="#registrace"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-bg-deep bg-accent-cyan px-8 py-2.5 shadow-[0_0_25px_rgba(0,212,255,0.25)] hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-shadow cursor-pointer"
        >
          Registrace_
        </motion.a>
      </motion.div>

      {/* Boot panel — right side */}
      <motion.div style={{ opacity }} className="absolute right-6 top-1/2 -translate-y-1/2 z-10">
        <BootPanel />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[10px] text-text-muted tracking-[0.3em] uppercase">Scroll_down</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <svg className="w-4 h-4 text-accent-cyan/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
