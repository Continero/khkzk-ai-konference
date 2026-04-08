"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

const exhibitors: { name: string; logo: string | null }[] = [
  { name: "Mingleminds / Artima.ai", logo: "/logo_vystavovatele/artima-logo.svg" },
  { name: "Elixeum", logo: null },
  { name: "Microsoft", logo: null },
  { name: "EPRIN", logo: "/logo_vystavovatele/eprin.jpg" },
  { name: "UTB", logo: "/logo_vystavovatele/utb-bw-cz-full.svg" },
  { name: "Scheduling", logo: null },
];

export function Exhibitors() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ Demo_Zone
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-text-secondary holo-glow">
            Vystavovatelé
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {exhibitors.map((ex, i) => (
            <ScrollReveal key={ex.name} delay={0.05 + i * 0.08}>
              <div className="hud-panel rounded-lg px-8 py-5 flex items-center justify-center transition-all hover:bg-[rgba(0,160,255,0.06)] min-w-[140px]">
                {ex.logo ? (
                  <img
                    src={ex.logo}
                    alt={ex.name}
                    className={`h-10 sm:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity ${ex.name === "UTB" ? "brightness-0 invert" : ""}`}
                  />
                ) : (
                  <span className="font-mono text-sm text-text-secondary opacity-70">{ex.name}</span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
