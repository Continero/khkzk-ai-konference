"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { RemotionInView } from "@/components/RemotionInView";
import { BiometricScan } from "@/components/remotion/BiometricScan";
import { SectionActivation } from "@/components/remotion/SectionActivation";
import { speakers } from "@/lib/data";

export function Speakers() {
  return (
    <section id="recnici" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Remotion section header */}
        <div className="h-[200px] mb-6">
          <RemotionInView
            component={SectionActivation}
            inputProps={{ sectionId: "03 // Personnel_Database", title: "Řečníci", subtitle: "Identifikovaní experti s ověřenými výsledky" }}
            durationInFrames={90}
            width={800}
            height={200}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

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
                      className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-all duration-500 contrast-[1.1] brightness-[1.05]"
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
                      durationInFrames={90}
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
            // Další personnel budou postupně deklasifikováni
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
