"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { RemotionInView } from "@/components/RemotionInView";
import { RobotSchematic } from "@/components/remotion/RobotSchematic";

export function RobotAnalysis() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ Schematic_Analysis
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center holo-glow">
            Robotika na konferenci
          </h2>
          <p className="text-text-secondary text-center mb-8 text-sm">
            Kolaborativní rameno a interaktivní robot UTB. Naživo.
          </p>
        </ScrollReveal>

        {/* Robot schematic — full width Remotion composition */}
        <div className="h-[400px] sm:h-[500px] relative">
          <RemotionInView
            component={RobotSchematic}
            inputProps={{}}
            durationInFrames={600}
            width={800}
            height={500}
            loop
            style={{ width: "100%", height: "100%" }}
          />
          {/* Subtle vignette edges */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(6,10,20,0.8) 100%)",
          }} />
        </div>

        {/* Robot facts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {[
            { label: "BOTT-E", desc: "Interaktivní robot UTB" },
            { label: "FANUC", desc: "Kolaborativní rameno" },
            { label: "AI", desc: "Copilot a agenti naživo" },
            { label: "LIVE", desc: "Demo přímo na místě" },
          ].map((item, i) => (
            <ScrollReveal key={item.label} delay={0.1 + i * 0.08}>
              <div className="hud-panel rounded p-4 text-center">
                <div className="font-mono text-base font-bold text-accent-cyan holo-glow mb-1">
                  {item.label}
                </div>
                <div className="font-mono text-xs text-text-secondary tracking-wide">
                  {item.desc}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
