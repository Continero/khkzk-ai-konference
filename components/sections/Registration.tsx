"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useRegistrationModal } from "@/components/RegistrationModal";
import { conferenceInfo } from "@/lib/data";

const perks = [
  "Celodenní program včetně obědu",
  "Přístup do demo zóny",
  "Networking s řečníky",
  "Konferenční materiály",
];

const { earlyBird, standard } = conferenceInfo.pricing;

export function Registration() {
  const { open } = useRegistrationModal();

  return (
    <section id="registrace" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ 05 // System_Authorization
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center holo-glow">
            Registrace
          </h2>
          <p className="text-text-secondary text-center mb-14 text-lg">
            Autorizace přístupu. Kapacita omezena.
          </p>
        </ScrollReveal>

        {/* Pricing table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
          {/* Early Bird */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="hud-panel rounded-lg overflow-hidden h-full flex flex-col shadow-[0_0_30px_rgba(0,212,255,0.06)]"
            >
              <div className="h-[2px] bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
              <div className="p-7 flex flex-col flex-1">
                <span className="inline-block self-start mb-3 font-mono text-[11px] px-2 py-0.5 rounded bg-accent-gold/10 text-accent-gold border border-accent-gold/20 tracking-widest uppercase">
                  Early Bird
                </span>
                <p className="font-mono text-xs text-text-muted mb-5">{earlyBird.period}</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Člen KHKZK</p>
                    <span className="text-4xl font-extrabold text-accent-gold">{earlyBird.member.price}</span>
                    <span className="font-mono text-xs text-text-muted ml-2">bez DPH</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Nečlen</p>
                    <span className="text-4xl font-extrabold">{earlyBird.nonMember.price}</span>
                    <span className="font-mono text-xs text-text-muted ml-2">bez DPH</span>
                  </div>
                </div>
                <button
                  onClick={open}
                  className="block w-full py-3 rounded text-center font-mono text-base font-bold tracking-wider uppercase transition-all bg-accent-cyan text-bg-deep shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.35)] mt-auto cursor-pointer"
                >
                  Registrovat_
                </button>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Standard */}
          <ScrollReveal delay={0.22}>
            <motion.div
              whileHover={{ y: -4 }}
              className="hud-panel rounded-lg overflow-hidden h-full flex flex-col"
            >
              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-mono text-base font-bold mb-1 tracking-wide uppercase">Standardní</h3>
                <p className="font-mono text-xs text-text-muted mb-5">{standard.period}</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Člen KHKZK</p>
                    <span className="text-4xl font-extrabold">{standard.member.price}</span>
                    <span className="font-mono text-xs text-text-muted ml-2">bez DPH</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Nečlen</p>
                    <span className="text-4xl font-extrabold">{standard.nonMember.price}</span>
                    <span className="font-mono text-xs text-text-muted ml-2">bez DPH</span>
                  </div>
                </div>
                <button
                  onClick={open}
                  className="block w-full py-3 rounded text-center font-mono text-base font-bold tracking-wider uppercase transition-all border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan/10 mt-auto cursor-pointer"
                >
                  Registrovat_
                </button>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Perks */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-base text-text-secondary">
                <span className="text-accent-gold font-mono text-xs">▸</span>
                {perk}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Storno podmínky */}
        <ScrollReveal delay={0.4}>
          <div className="max-w-3xl mx-auto mt-14 hud-panel rounded-lg p-6">
            <h3 className="font-mono text-xs text-accent-cyan/50 tracking-widest uppercase mb-4">
              // Storno podmínky
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary mb-3">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan font-mono text-xs mt-0.5">▸</span>
                21 a více dnů před termínem: 25 % z ceny bez DPH
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan font-mono text-xs mt-0.5">▸</span>
                20 až 11 dnů před termínem: 50 % z ceny bez DPH
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan font-mono text-xs mt-0.5">▸</span>
                10 a méně dnů před termínem: 100 % z ceny bez DPH
              </li>
            </ul>
            <p className="text-sm text-text-muted font-mono">
              Náhradník může být kdykoli vyslán bez poplatku.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
