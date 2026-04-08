"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { RemotionInView } from "@/components/RemotionInView";
import { SectionActivation } from "@/components/remotion/SectionActivation";
import { program } from "@/lib/data";

export function Program() {
  // Only show block headers and talks (skip breaks)
  const talks = program.filter((b) => b.type === "talk" && b.speaker);
  const blocks = program.filter((b) => b.type === "block-header");

  // Group talks under their block headers
  const grouped: { header: string; items: typeof talks }[] = [];
  let currentBlock = "";
  for (const entry of program) {
    if (entry.type === "block-header") {
      currentBlock = entry.title;
      grouped.push({ header: currentBlock, items: [] });
    } else if (entry.type === "talk" && entry.speaker && grouped.length > 0) {
      grouped[grouped.length - 1].items.push(entry);
    }
  }

  return (
    <section id="program" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="h-[200px] mb-6">
          <RemotionInView
            component={SectionActivation}
            inputProps={{ sectionId: "04 // Mission_Briefing", title: "Program", subtitle: "Témata a řečníci konference" }}
            durationInFrames={90}
            width={800}
            height={200}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="space-y-8">
          {grouped.map((block, bi) => (
            <ScrollReveal key={bi} delay={0.05 + bi * 0.1}>
              <div>
                <h3 className="font-mono text-sm tracking-wider text-accent-cyan/80 uppercase mb-4">
                  {block.header}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {block.items.map((item, i) => (
                    <div key={i} className="hud-panel rounded-lg p-5">
                      <h4 className="font-bold text-lg mb-1 holo-glow">{item.title}</h4>
                      <p className="text-text-secondary text-base leading-relaxed mb-2">{item.description}</p>
                      <p className="font-mono text-xs text-accent-gold/70">
                        ▸ {item.speaker}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="text-center font-mono text-sm text-text-muted mt-10">
            Podrobný časový harmonogram bude upřesněn.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
