"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { RemotionInView } from "@/components/RemotionInView";
import { DataReadout } from "@/components/remotion/DataReadout";

const stats = [
  { value: "118", label: "RESPONDENTŮ", gauge: 0.85 },
  { value: "6+", label: "PŘEDNÁŠEK", gauge: 0.6 },
  { value: "1", label: "DEN PLNÝ AI", gauge: 1.0 },
  { value: "20.5.", label: "KVĚTEN 2026", gauge: 0.42 },
];

const surveyHighlights = [
  { pct: "79%", text: "AI jako neviditelný pomocník — automatizace administrativy, faktur a plánování" },
  { pct: "68%", text: "Řešení pro malé a střední firmy, nejen velké korporace" },
  { pct: "61%", text: "Jak nové technologie mění řízení týmu a firemní kulturu" },
  { pct: "60%", text: "Jak zaměstnance naučit pracovat s novými technologiemi" },
  { pct: "57%", text: "Jak najít nové zákazníky a trhy pomocí technologií" },
  { pct: "51%", text: "Praktické ukázky nasazení AI přímo ve firmách" },
];


export function About() {
  return (
    <section id="o-konferenci" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ System_Intel
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center holo-glow">
            AI v praxi — ne v teorii
          </h2>
          <p className="text-text-secondary text-center mb-14 text-lg max-w-3xl mx-auto leading-relaxed">
            Program konference jsme postavili na datech z průzkumu mezi 118 firmami Zlínského kraje.
            Žádné buzzwordy — reálné příběhy firem, které AI nasadily a měří výsledky.
          </p>
        </ScrollReveal>

        {/* Remotion stats with gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.1 + i * 0.05}>
              <div className="h-[160px] hud-panel rounded">
                <RemotionInView
                  component={DataReadout}
                  inputProps={{ value: stat.value, label: stat.label, gaugeProgress: stat.gauge }}
                  durationInFrames={600}
                  width={160}
                  height={140}
                  loop
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Survey insights */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-6 text-center">
              ▸ Survey_Data // 118 respondentů
            </p>
            <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center holo-glow">
              Co firmy ve Zlínském kraji skutečně řeší
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {surveyHighlights.map((item, i) => (
                <ScrollReveal key={i} delay={0.05 + i * 0.06}>
                  <div className="hud-panel rounded-lg p-5 flex items-start gap-4 h-full">
                    <span className={`font-mono text-2xl font-bold shrink-0 ${i % 2 === 0 ? "text-accent-gold" : "text-accent-cyan holo-glow-strong"}`}>{item.pct}</span>
                    <p className="text-text-secondary text-base leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <p className="font-mono text-xs text-text-muted text-center mt-4">
              Průzkum KHKZK, březen 2026 · 53 % firem nad 50 zaměstnanců · 31 % firem 11–50 zaměstnanců
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
