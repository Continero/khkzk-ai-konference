"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { RemotionInView } from "@/components/RemotionInView";
import { SectionActivation } from "@/components/remotion/SectionActivation";
import { program } from "@/lib/data";

const typeColors: Record<string, { dot: string; label: string }> = {
  talk: { dot: "bg-accent-cyan", label: "text-accent-cyan" },
  break: { dot: "bg-accent-gold", label: "text-accent-gold" },
  panel: { dot: "bg-green-400", label: "text-green-400" },
  "block-header": { dot: "bg-accent-cyan", label: "text-accent-cyan" },
};

export function Program() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.8", "end 0.6"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="program" className="relative py-28 px-6" ref={containerRef}>
      <div className="max-w-3xl mx-auto">
        <div className="h-[200px] mb-6">
          <RemotionInView
            component={SectionActivation}
            inputProps={{ sectionId: "04 // Mission_Briefing", title: "Program", subtitle: "Celodenní program 8:30 — 14:45" }}
            durationInFrames={90}
            width={800}
            height={200}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="relative">
          <div className="absolute left-[11px] top-0 bottom-0 w-[1px] bg-accent-cyan/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[11px] top-0 w-[1px] bg-accent-cyan/50 shadow-[0_0_6px_rgba(0,212,255,0.4)]"
          />

          <div className="space-y-4">
            {program.map((block, i) => {
              const colors = typeColors[block.type];

              if (block.type === "block-header") {
                return (
                  <ScrollReveal key={i} delay={0.04 + i * 0.06}>
                    <div className="flex gap-5 mt-6">
                      <div className="relative shrink-0 mt-3">
                        <div className="w-[9px] h-[9px] rounded-sm bg-accent-cyan shadow-[0_0_10px_rgba(0,212,255,0.6)] z-10 relative" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-mono text-sm tracking-wider text-accent-cyan/80 uppercase">
                          {block.title}
                        </h3>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              }

              return (
                <ScrollReveal key={i} delay={0.04 + i * 0.06}>
                  <div className="flex gap-5">
                    <div className="relative shrink-0 mt-4">
                      <div className={`w-[7px] h-[7px] rounded-full ${colors.dot} shadow-[0_0_8px_currentColor] z-10 relative`} />
                    </div>
                    <div className="flex-1 hud-panel rounded-lg p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-mono text-xs tracking-wider ${colors.label}`}>
                          {block.time}
                        </span>
                        {block.type === "panel" && (
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-green-400/10 text-green-400 border border-green-400/20">
                            PANEL
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg mb-1 holo-glow">{block.title}</h3>
                      <p className="text-text-secondary text-base leading-relaxed">{block.description}</p>
                      {block.speaker && (
                        <p className="font-mono text-xs text-accent-gold/60 mt-2">
                          ▸ {block.speaker}
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
