"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { topics } from "@/lib/data";

const icons: Record<string, React.ReactNode> = {
  brain: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z" />
      <path d="M9 21h6M10 17v4M14 17v4" />
    </svg>
  ),
  robot: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 8V4M9 4h6" />
      <circle cx="9" cy="13" r="1.5" fill="currentColor" />
      <circle cx="15" cy="13" r="1.5" fill="currentColor" />
      <path d="M10 17h4" />
    </svg>
  ),
  code: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
};

const formats = [
  { label: "Case Studies", desc: "Reálné výsledky firem v číslech" },
  { label: "Live Demo", desc: "Roboti a AI naživo" },
  { label: "Networking", desc: "Celý den s AI praktiky, oběd v ceně" },
];

export function Topics() {
  return (
    <section id="temata" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ Core_Modules
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center holo-glow">
            Co vás na konferenci čeká
          </h2>
          <p className="text-text-secondary text-center mb-14 text-lg">
            Tři pilíře programu zaměřené na praxi
          </p>
        </ScrollReveal>

        {/* Theme cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {topics.map((topic, i) => (
            <ScrollReveal key={topic.title} delay={0.1 + i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group h-full"
              >
                <div className="hud-panel rounded-lg p-7 h-full relative overflow-hidden">
                  <div className="text-accent-gold mb-4 group-hover:drop-shadow-[0_0_8px_rgba(255,159,28,0.4)] transition-all">
                    {icons[topic.icon]}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 holo-glow">{topic.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-base">{topic.description}</p>

                  {/* Status bar */}
                  <div className="mt-5 flex items-center gap-2">
                    <div className="h-[2px] flex-1 bg-accent-cyan/10 rounded overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                        className="h-full bg-accent-cyan/40"
                      />
                    </div>
                    <span className="font-mono text-[11px] text-accent-cyan/40">LOADED</span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Format strip */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {formats.map((f, i) => (
              <div key={f.label} className="flex items-center gap-3 rounded-lg border border-accent-cyan/10 px-5 py-4 bg-accent-cyan/[0.03]">
                <span className="font-mono text-accent-gold text-sm font-bold shrink-0">▸</span>
                <div>
                  <p className="font-bold text-sm holo-glow">{f.label}</p>
                  <p className="text-text-secondary text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
