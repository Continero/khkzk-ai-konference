"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { conferenceInfo } from "@/lib/data";

export function Venue() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ Location_Intel
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center holo-glow">
            Místo konání
          </h2>
          <p className="text-text-secondary text-center mb-14 text-lg">
            {conferenceInfo.venue} — target coordinates locked
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollReveal direction="left">
            <motion.div whileHover={{ scale: 1.01 }} className="relative rounded-lg overflow-hidden aspect-[4/3] hud-panel p-0" style={{ border: "none" }}>
              <img
                src="/venue/DSC00444-HDR-1-scaled.jpg"
                alt="Interhotel Zlín"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/30 to-accent-cyan/5" />
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-accent-cyan/40" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-accent-cyan/40" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-accent-cyan/40" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-accent-cyan/40" />
              {/* Location data */}
              <div className="absolute bottom-5 left-5">
                <p className="font-bold text-base holo-glow">{conferenceInfo.venue}</p>
                <p className="font-mono text-xs text-accent-cyan/50 mt-1">
                  49.2167°N, 17.6667°E // {conferenceInfo.address}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-xl font-bold mb-5 holo-glow">Facility_Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conferenceInfo.venueFeatures.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-2.5 hud-panel rounded p-3"
                  >
                    <span className="text-accent-cyan font-mono text-xs mt-0.5">▸</span>
                    <span className="text-base text-text-secondary">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href="https://maps.google.com/?q=Interhotel+Zlin"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded font-mono text-sm text-accent-cyan border border-accent-cyan/20 hover:bg-accent-cyan/10 transition-colors w-fit tracking-wider uppercase"
              >
                ▸ Navigate_to_target
              </motion.a>
            </div>
          </ScrollReveal>
        </div>

        {/* Venue gallery */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
          {[
            { src: "/venue/IMG_6229-copy.jpg", alt: "Konferenční sál — uspořádání" },
            { src: "/venue/IMG_6289-copy.jpg", alt: "Konferenční sál — pohled zezadu" },
            { src: "/venue/IMG_9210-copy.jpg", alt: "Sál — galavečer" },
            { src: "/venue/IMG_9216-copy.jpg", alt: "Sál — banketové uspořádání" },
            { src: "/venue/IMG_9120-copy.jpg", alt: "Detail — prostření" },
          ].map((photo, i) => (
            <ScrollReveal key={photo.src} delay={0.05 + i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative group rounded-lg overflow-hidden aspect-[4/3]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-accent-cyan/5 pointer-events-none" />
                <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-accent-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-accent-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-accent-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-accent-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
