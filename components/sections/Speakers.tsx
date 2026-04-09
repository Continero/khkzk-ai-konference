"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { RemotionInView } from "@/components/RemotionInView";
import { BiometricScan } from "@/components/remotion/BiometricScan";
import { speakers } from "@/lib/data";

export function Speakers() {
  return (
    <section id="recnici" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ Personnel_Database
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center holo-glow">
            Řečníci
          </h2>
          <p className="text-text-secondary text-center mb-14 text-lg">
            Identifikovaní experti s ověřenými výsledky
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {speakers.map((speaker, i) => (
            <ScrollReveal key={speaker.name} delay={0.05 + i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group hud-panel rounded-lg overflow-hidden h-full"
              >
                {/* Photo with Remotion biometric scan overlay */}
                <div className="relative aspect-square overflow-hidden">
                  {speaker.photo ? (
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-500 contrast-[1.2] brightness-[1.15]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-bg-deep">
                      <span className="font-mono text-5xl text-accent-cyan/30">{speaker.initials}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/5 to-bg-deep/90" />

                  {/* Remotion biometric scan */}
                  <div className="absolute inset-0">
                    <RemotionInView
                      component={BiometricScan}
                      inputProps={{ status: speaker.status, speakerId: `SPK_${String(i + 1).padStart(2, "0")}` }}
                      durationInFrames={600}
                      width={400}
                      height={220}
                      loop
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-0.5 holo-glow">{speaker.name}</h3>
                  <p className="text-accent-cyan/60 text-sm font-mono mb-2">{speaker.company}</p>
                  <p className="text-accent-gold text-base font-medium mb-2">&ldquo;{speaker.talk}&rdquo;</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{speaker.bio}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="text-center font-mono text-sm text-text-muted mt-10">
            // Další řečníci budou postupně oznámeni
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
