"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

const partners: { name: string; logo: string | null; tier: "hlavni" | "partner" }[] = [
  { name: "Generali", logo: "/logo_partneri/generali.png", tier: "hlavni" },
  { name: "eD system / Microsoft", logo: "/logo_partneri/eD_microsoft.jpg", tier: "hlavni" },
  { name: "Aricoma", logo: "/logo_partneri/aricoma.png", tier: "partner" },
  { name: "Petrás Režek", logo: "/logo_partneri/petrasrezek-svetle-pozadi.png", tier: "partner" },
  { name: "Zlínský kraj", logo: "/logo_partneri/zlinskykraj.jpg", tier: "hlavni" },
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
              <div
                className={`rounded-lg px-6 py-4 flex items-center justify-center transition-all min-w-[180px] min-h-[80px] border border-white/10 hover:border-white/20 ${
                  partner.tier === "hlavni" ? "border-accent-cyan/20" : ""
                }`}
                style={{ background: "rgba(255,255,255,0.92)" }}
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-14 sm:h-16 max-w-[200px] object-contain transition-opacity"
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
