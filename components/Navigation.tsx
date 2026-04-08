"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#o-konferenci", label: "Informace" },
  { href: "#temata", label: "Témata" },
  { href: "#recnici", label: "Řečníci" },
  { href: "#program", label: "Program" },
  { href: "#registrace", label: "Registrace" },
];

const bootLines = [
  { text: "JARVIS v4.2.6", delay: 0.5 },
  { text: "Neural network", delay: 1.0 },
  { text: "Database loaded", delay: 1.8 },
  { text: "Systems OK", delay: 2.5 },
];

function BootStrip() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => setPhase(i + 1), line.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-3 h-[14px]">
      {bootLines.map((line, i) => {
        const visible = phase > i;
        const isLast = i === bootLines.length - 1;
        return (
          <span
            key={i}
            className={`inline-flex items-center gap-1 font-mono text-[10px] leading-none transition-opacity duration-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className={visible ? (isLast ? "text-accent-cyan/50" : "text-green-400/40") : ""}>
              {visible ? (isLast ? "▸" : "✓") : "○"}
            </span>
            <span className={visible ? (isLast ? "text-accent-cyan/40" : "text-text-muted/60") : ""}>
              {line.text}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg-deep/80 backdrop-blur-xl border-b border-accent-cyan/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <a href="#hero" className="flex items-center gap-3">
            <img src="/khkzk-logo.svg" alt="Krajská hospodářská komora Zlínského kraje — logo" className="h-11 brightness-0 invert opacity-70" />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-base font-bold tracking-wide">AI v praxi <span className="text-accent-cyan">2026</span></span>
              <span className="text-[10px] text-text-muted tracking-wider uppercase">Konference · 20. května · Zlín</span>
            </span>
          </a>

          {/* Right side: nav links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm text-text-secondary hover:text-accent-cyan px-3 py-1.5 rounded hover:bg-accent-cyan/5 transition-all tracking-wider uppercase"
              >
                <span className="text-text-muted mr-1">0{i + 1}</span>
                {link.label}
              </a>
            ))}
            <a
              href="#registrace"
              className="ml-3 font-mono text-sm font-bold px-4 py-1.5 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 hover:bg-accent-cyan/20 transition-colors tracking-wider uppercase"
            >
              Register_
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-secondary"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-deep/95 backdrop-blur-xl pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4 py-8">
              {links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-lg text-text-primary hover:text-accent-cyan transition-colors"
                >
                  <span className="text-accent-cyan/40 mr-2">0{i + 1}.</span>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
