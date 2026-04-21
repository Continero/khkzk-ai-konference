"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

type ExhibitorDetails = {
  focus: string;
  showcase: string;
  whyVisit: string;
};

type Exhibitor = {
  name: string;
  logo: string | null;
  lightBg?: boolean;
  url?: string;
  details?: ExhibitorDetails;
};

const exhibitors: Exhibitor[] = [
  {
    name: "Artima.ai",
    logo: "/logo_vystavovatele/artima-logo.svg",
    url: "https://artima.ai",
    details: {
      focus:
        "Artima je AI platforma pro správu sociálních sítí, určená pro malé a střední firmy, tvůrce obsahu a agentury. Naučí se váš brand voice z existujícího obsahu a spravuje Facebook, Instagram, LinkedIn, TikTok, YouTube i Threads z jednoho dashboardu, od tvorby postů přes plánování a publikaci až po odpovědi na komentáře a zprávy.",
      showcase:
        "Na stánku poběží live demo Artimy. Ukážeme, jak AI z pár ukázek obsahu pozná váš styl a vygeneruje hotové příspěvky pro jednotlivé sítě, jak funguje Video Studio (postavené na Remotion) pro tvorbu Reels a TikToků a jak vypadá plánovací kalendář s detekcí optimálních časů publikace. Vše napříč Facebookem, Instagramem, LinkedInem, TikTokem, YouTube i Threads, v reálném čase nad testovacím brandem.",
      whyVisit:
        "Ukážeme konkrétně, jak ušetřit 10+ hodin týdně strávených na sociálních sítích a co AI zvládne dobře a co ne. Hodí se majitelům e-shopů, kaváren, fitness studií, servisních firem nebo marketérům, kteří zvažují alternativu k agentuře za 15 000 Kč měsíčně. Návštěvníci si přímo na stánku můžou spustit 7denní trial bez platební karty a odnést si i přístup ke zvýhodněné ceně pro účastníky konference.",
    },
  },
  {
    name: "Elixeum",
    logo: "/logo_vystavovatele/elixeum-logo.svg",
    url: "https://www.elixeum.ai",
    details: {
      focus:
        "Elixeum dodává ERP systém nové generace, který staví na AI agentech. Neimplementujeme jen software, se zákazníky aktivně hledáme konkrétní místa, kde má AI reálný dopad na výkon firmy (výroba, obchod, plánování) a dává smysl z pohledu návratnosti investice.",
      showcase:
        "Na stánku poběží live demo našeho ERP s AI agenty v akci. Ukážeme například, jak agent automaticky zpracuje přijatou objednávku nebo poptávku, navrhne obchodní postup, naplánuje výrobu a upozorní na rizika, to vše v reálném čase nad daty firmy. Návštěvníci si budou moci scénáře sami vyzkoušet na připraveném rozhraní.",
      whyVisit:
        "Ukážeme konkrétní příklady, kde AI reálně šetří čas a peníze – zrychlení zpracování objednávek nebo poptávek o desítky procent, lepší využití výrobních kapacit nebo rychlejší rozhodování v obchodu. Návštěvníci si od nás odnesou inspiraci, kde má AI v jejich firmě skutečný ROI a kde naopak ne.",
    },
  },
  {
    name: "Microsoft",
    logo: "/logo_vystavovatele/Microsoft_logo_(2012).svg",
    lightBg: true,
  },
  {
    name: "EPRIN",
    logo: "/logo_vystavovatele/EPRIN_spol-_s_r-o-_idXfsqy1PU_1.png",
    lightBg: true,
    url: "https://www.eprin.cz",
    details: {
      focus:
        "EPRIN se zaměřuje na automatizaci a digitalizaci logistiky a výroby. Pomáháme firmám zavádět robotizaci, jednoúčelové aplikace, systémy automatické identifikace (čárové kódy, RFID, lokalizaci) a řízení skladů (WMS), které přinášejí zisk, zrychlují procesy a snižují chybovost.",
      showcase:
        "Na stánku představíme ukázku mobilní robotické aplikace pick & place a náš robot si s účastníky konference zahraje piškvorky. Součástí budou také ukázky nových spotřebních materiálů (etiket) a tištěné inspirativní případové studie z oboru robotizace výroby.",
      whyVisit:
        "Pobavíme se o konkrétních příkladech, jak lze ve výrobě a logistice eliminovat manuální práci a chyby. Návštěvníci si od nás odnesou praktické tipy, jak zrychlit skladové procesy až o desítky procent a připravit svůj provoz na další rozvoj automatizace, a také informace o doprovodných technologiích jako RFID, lokalizace nebo čárové kódy.",
    },
  },
  {
    name: "FAI UTB",
    logo: "/logo_vystavovatele/fai-utb.svg",
  },
  {
    name: "Scheduling",
    logo: "/logo_vystavovatele/schedule_logo.png",
    url: "https://www.scheduling.cz/en/",
    details: {
      focus:
        "Scheduling je poradenská firma zaměřená na Enterprise Performance Management (EPM), plánování a reporting. Pomáháme firmám řídit finanční i provozní výkonnost pomocí moderních cloudových nástrojů a AI. Zaměřujeme se na automatizaci plánování, konsolidaci dat a tvorbu pokročilých scénářů, které podporují rychlé a informované rozhodování managementu.",
      showcase:
        "Na našem stánku si budete moci vyzkoušet live demo EPM řešení (např. Jedox), které propojuje finanční plánování, reporting a analýzu v jednom prostředí. Ukážeme tvorbu rozpočtů a forecastů v reálném čase, propojení finančních a operativních dat, scénářové modelování (what-if analýzy) i využití AI pro predikce a plánování. Demo poběží na reálných business casech a datech – dostupné na mobilu i počítači.",
      whyVisit:
        "Ukážeme vám, jak zrychlit plánovací procesy o desítky procent, získat jednotný pohled na data napříč firmou, nahradit Excel robustním EPM řešením a využít AI pro přesnější forecasting a lepší rozhodování.",
    },
  },
];

const detailedExhibitors = exhibitors.filter((e) => e.details);

export function Exhibitors() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ Demo_Zone
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-text-secondary holo-glow">
            Co uvidíte v naší demo zóně: AI a robotizace v praxi
          </h2>
        </ScrollReveal>

        {/* Logo wall */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
          {exhibitors.map((ex, i) => (
            <ScrollReveal key={ex.name} delay={0.05 + i * 0.08}>
              <div
                className={`rounded-lg px-8 py-5 flex items-center justify-center transition-all min-w-[140px] ${ex.lightBg ? "" : "hud-panel hover:bg-[rgba(0,160,255,0.06)]"}`}
                style={ex.lightBg ? { background: "rgba(255,255,255,0.92)" } : undefined}
              >
                {ex.logo ? (
                  <img
                    src={ex.logo}
                    alt={ex.name}
                    className="h-10 sm:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="font-mono text-sm text-text-secondary opacity-70">{ex.name}</span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Detail cards */}
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ Booth_Intel
          </p>
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center text-text-secondary">
            Co představí na stáncích
          </h3>
        </ScrollReveal>

        <div className="space-y-3">
          {detailedExhibitors.map((ex, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={ex.name} delay={0.05 + i * 0.08}>
                <div className="hud-panel rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[rgba(0,160,255,0.04)] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div
                      className={`flex items-center justify-center rounded w-20 h-12 shrink-0 ${ex.lightBg ? "" : ""}`}
                      style={ex.lightBg ? { background: "rgba(255,255,255,0.92)" } : undefined}
                    >
                      {ex.logo && (
                        <img
                          src={ex.logo}
                          alt={ex.name}
                          className="max-h-10 max-w-full object-contain"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-text-primary">{ex.name}</div>
                      <div className="font-mono text-[10px] text-accent-cyan/60 tracking-[0.2em] uppercase mt-0.5">
                        {isOpen ? "▾ Sbalit" : "▸ Rozbalit detail"}
                      </div>
                    </div>
                    {ex.url && (
                      <a
                        href={ex.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono text-[11px] text-accent-cyan/70 hover:text-accent-cyan underline underline-offset-4 shrink-0 hidden sm:inline"
                      >
                        web ↗
                      </a>
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && ex.details && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 grid gap-5 md:grid-cols-3 border-t border-accent-cyan/10">
                          <DetailBlock label="Čím se zabývají" text={ex.details.focus} />
                          <DetailBlock label="Co vystaví" text={ex.details.showcase} />
                          <DetailBlock label="Proč se zastavit" text={ex.details.whyVisit} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] text-accent-cyan/70 tracking-[0.25em] uppercase mb-2">
        ▸ {label}
      </p>
      <p className="text-sm text-text-secondary leading-relaxed">{text}</p>
    </div>
  );
}
