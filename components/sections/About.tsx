"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { RemotionInView } from "@/components/RemotionInView";
import { DataReadout } from "@/components/remotion/DataReadout";
import { SectionActivation } from "@/components/remotion/SectionActivation";

const stats = [
  { value: "100+", label: "ÚČASTNÍKŮ", gauge: 0.85 },
  { value: "6+", label: "PŘEDNÁŠEK", gauge: 0.6 },
  { value: "1", label: "DEN PLNÝ AI", gauge: 1.0 },
  { value: "20.5.", label: "KVĚTEN 2026", gauge: 0.42 },
];

const modules = [
  { id: "MOD_01", title: "Case Studies", desc: "Firmy ukazují reálné výsledky nasazení AI a robotů v číslech.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "MOD_02", title: "Live Demo", desc: "Humanoidní robot BOTT-E, kolaborativní ramena FANUC a další.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { id: "MOD_03", title: "Networking", desc: "Celý den s lidmi, kteří AI reálně používají. Oběd a káva v ceně.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
];

export function About() {
  return (
    <section id="o-konferenci" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Remotion section header */}
        <div className="h-[200px] mb-6">
          <RemotionInView
            component={SectionActivation}
            inputProps={{ sectionId: "01 // System_Intel", title: "AI opravdu používat", subtitle: "Konference pro ty, kdo chtějí vědět jak na to" }}
            durationInFrames={90}
            width={800}
            height={200}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <ScrollReveal delay={0.1}>
          <p className="text-lg text-text-secondary text-center max-w-3xl mx-auto mb-14 leading-relaxed">
            Žádné buzzwordy. Reálné příběhy firem, které AI nasadily a měří výsledky.
            Pro majitele a management firem Zlínského kraje.
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

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modules.map((m, i) => (
            <ScrollReveal key={m.id} delay={0.1 + i * 0.1}>
              <div className="hud-panel rounded-lg p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded bg-accent-cyan/10 flex items-center justify-center">
                    <svg className="w-4.5 h-4.5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path d={m.icon} />
                    </svg>
                  </div>
                  <span className="font-mono text-xs text-accent-cyan/40 tracking-widest">{m.id}</span>
                </div>
                <h3 className="font-bold text-xl mb-2 holo-glow">{m.title}</h3>
                <p className="text-text-secondary text-base leading-relaxed">{m.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
