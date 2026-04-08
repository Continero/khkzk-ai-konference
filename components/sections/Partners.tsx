"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

const partners: { name: string; logo: string | null; tier: "hlavni" | "partner"; lightBg?: boolean }[] = [
  { name: "Zlínský kraj", logo: "/logo_partneri/zlinskykraj.jpg", tier: "hlavni" },
  { name: "Generali", logo: "/logo_partneri/generali.png", tier: "hlavni", lightBg: true },
  { name: "eD system a.s.", logo: null, tier: "hlavni" },
  { name: "Aricoma", logo: "/logo_partneri/aricoma.png", tier: "partner" },
  { name: "Petrás Režek", logo: "/logo_partneri/petrasrezek.png", tier: "partner", lightBg: true },
];

export function Partners() {
  return (
    <section id="partneri" className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ Allied_Systems
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-text-secondary holo-glow">
            Hlavní partneři
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {partners.map((partner, i) => (
            <ScrollReveal key={partner.name} delay={0.05 + i * 0.08}>
              <div className={`hud-panel rounded-lg px-8 py-5 flex items-center justify-center transition-all hover:bg-[rgba(0,160,255,0.06)] min-w-[140px] ${
                partner.tier === "hlavni" ? "border-accent-cyan/20" : ""
              } ${partner.lightBg ? "bg-white/90 hover:bg-white" : ""}`}>
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`h-10 sm:h-12 object-contain ${partner.lightBg ? "opacity-100" : "opacity-80 hover:opacity-100"} transition-opacity`}
                  />
                ) : (
                  <span className="font-mono text-sm text-text-secondary opacity-70">{partner.name}</span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
