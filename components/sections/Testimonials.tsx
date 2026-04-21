"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ Feedback_Log
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center holo-glow">
            Co říkají účastníci
          </h2>
          <p className="text-text-secondary text-center mb-14 text-lg">
            Záznam zpětné vazby — ročník 2025
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                className="hud-panel rounded-lg p-7 h-full relative"
              >
                <div className="font-mono text-[11px] text-accent-cyan/30 tracking-widest mb-4">
                  LOG_{String(i + 1).padStart(3, "0")} // {t.year}
                </div>

                <p className="text-text-primary leading-relaxed mb-5 text-base italic holo-glow">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-accent-cyan/10 flex items-center justify-center font-mono text-xs text-accent-cyan font-bold">
                    {t.name.split(" ").filter(w => !w.endsWith(".")).map(w => w[0]).join("") || t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="font-mono text-xs text-text-muted">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
