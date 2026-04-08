"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { conferenceInfo } from "@/lib/data";

const perks = [
  "Celodenní program včetně obědu",
  "Přístup do demo zóny",
  "Networking s řečníky",
  "Konferenční materiály",
];

const { earlyBird, standard } = conferenceInfo.pricing;

interface Participant {
  name: string;
  position: string;
  email: string;
  phone: string;
}

const emptyParticipant = (): Participant => ({ name: "", position: "", email: "", phone: "" });

const inputClass =
  "w-full bg-bg-deep/80 border border-accent-cyan/15 rounded px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-cyan/40 focus:shadow-[0_0_8px_rgba(0,212,255,0.1)] transition-all font-mono";

const labelClass = "block text-xs text-text-secondary font-mono tracking-wider uppercase mb-1.5";

export function Registration() {
  const [participants, setParticipants] = useState<Participant[]>([emptyParticipant()]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const addParticipant = () => {
    setParticipants((prev) => [...prev, emptyParticipant()]);
  };

  const removeParticipant = (index: number) => {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Add participant arrays
    participants.forEach((p, i) => {
      formData.append(`ucastnik_${i + 1}_jmeno`, p.name);
      formData.append(`ucastnik_${i + 1}_pozice`, p.position);
      formData.append(`ucastnik_${i + 1}_email`, p.email);
      formData.append(`ucastnik_${i + 1}_telefon`, p.phone);
    });
    formData.append("pocet_ucastniku", String(participants.length));

    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      setSubmitted(true);
    } catch {
      // Fallback — try Netlify default
      e.currentTarget.submit();
    } finally {
      setSubmitting(false);
    }
  };

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
            Autorizace přístupu — kapacita omezena
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
              <div className="h-[2px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent" />
              <div className="p-7 flex flex-col flex-1">
                <span className="inline-block self-start mb-3 font-mono text-[11px] px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 tracking-widest uppercase">
                  Early Bird
                </span>
                <p className="font-mono text-xs text-text-muted mb-5">{earlyBird.period}</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Člen KHKZK</p>
                    <span className="text-4xl font-extrabold text-accent-cyan holo-glow-strong">{earlyBird.member.price}</span>
                    <span className="font-mono text-xs text-text-muted ml-2">bez DPH</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Nečlen</p>
                    <span className="text-4xl font-extrabold">{earlyBird.nonMember.price}</span>
                    <span className="font-mono text-xs text-text-muted ml-2">bez DPH</span>
                  </div>
                </div>
                <a
                  href="#prihlaska"
                  className="block w-full py-3 rounded text-center font-mono text-base font-bold tracking-wider uppercase transition-all bg-accent-cyan text-bg-deep shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.35)] mt-auto"
                >
                  Registrovat_
                </a>
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
                <a
                  href="#prihlaska"
                  className="block w-full py-3 rounded text-center font-mono text-base font-bold tracking-wider uppercase transition-all border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan/10 mt-auto"
                >
                  Registrovat_
                </a>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Perks */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-base text-text-secondary">
                <span className="text-accent-cyan font-mono text-xs">▸</span>
                {perk}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Registration Form */}
        <ScrollReveal delay={0.35}>
          <div id="prihlaska" className="max-w-3xl mx-auto mt-14 scroll-mt-24">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hud-panel rounded-lg p-10 text-center"
                >
                  <div className="text-4xl mb-4 text-accent-cyan">✓</div>
                  <h3 className="text-2xl font-bold mb-3 holo-glow">Přihláška odeslána</h3>
                  <p className="text-text-secondary text-lg mb-2">
                    Děkujeme za registraci na konferenci AI v praxi 2026.
                  </p>
                  <p className="text-text-muted text-sm font-mono">
                    Potvrzení obdržíte na zadaný e-mail.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hud-panel rounded-lg p-8"
                >
                  <h3 className="font-mono text-xs text-accent-cyan/50 tracking-widest uppercase mb-1">
                    // Závazná přihláška
                  </h3>
                  <p className="text-xl font-bold holo-glow mb-8">AI konference 2026</p>

                  <form
                    name="registrace-ai-konference"
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="form-name" value="registrace-ai-konference" />
                    <p className="hidden">
                      <label>
                        Nevyplňujte: <input name="bot-field" />
                      </label>
                    </p>

                    {/* Organization */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className={labelClass}>Název organizace *</label>
                        <input
                          type="text"
                          name="organizace"
                          required
                          className={inputClass}
                          placeholder="Název firmy"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>IČO *</label>
                        <input
                          type="text"
                          name="ico"
                          required
                          className={inputClass}
                          placeholder="12345678"
                        />
                      </div>
                    </div>

                    {/* Participants */}
                    {participants.map((p, i) => (
                      <div key={i} className="mb-6">
                        {participants.length > 1 && (
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-xs text-accent-cyan/40">
                              Účastník {i + 1}
                            </span>
                            {i > 0 && (
                              <button
                                type="button"
                                onClick={() => removeParticipant(i)}
                                className="font-mono text-xs text-red-400/60 hover:text-red-400 transition-colors"
                              >
                                ✕ Odebrat
                              </button>
                            )}
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>Jméno a příjmení *</label>
                            <input
                              type="text"
                              required
                              value={p.name}
                              onChange={(e) => updateParticipant(i, "name", e.target.value)}
                              className={inputClass}
                              placeholder="Jan Novák"
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Pozice ve firmě *</label>
                            <input
                              type="text"
                              required
                              value={p.position}
                              onChange={(e) => updateParticipant(i, "position", e.target.value)}
                              className={inputClass}
                              placeholder="CEO / CTO / ..."
                            />
                          </div>
                          <div>
                            <label className={labelClass}>E-mail *</label>
                            <input
                              type="email"
                              required
                              value={p.email}
                              onChange={(e) => updateParticipant(i, "email", e.target.value)}
                              className={inputClass}
                              placeholder="jan@firma.cz"
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Telefonní číslo *</label>
                            <input
                              type="tel"
                              required
                              value={p.phone}
                              onChange={(e) => updateParticipant(i, "phone", e.target.value)}
                              className={inputClass}
                              placeholder="+420 ..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add participant */}
                    <button
                      type="button"
                      onClick={addParticipant}
                      className="font-mono text-sm text-accent-cyan/60 hover:text-accent-cyan border border-accent-cyan/15 hover:border-accent-cyan/30 rounded px-4 py-2 transition-all mb-6"
                    >
                      + Přidat dalšího účastníka
                    </button>

                    {/* Note */}
                    <div className="mb-6">
                      <label className={labelClass}>Poznámka</label>
                      <textarea
                        name="poznamka"
                        rows={3}
                        className={`${inputClass} resize-y`}
                        placeholder="Máte speciální požadavky?"
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-8 py-3 rounded font-mono text-base font-bold tracking-wider uppercase bg-accent-cyan text-bg-deep shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.35)] transition-all disabled:opacity-50"
                      >
                        {submitting ? "Odesílám..." : "Odeslat přihlášku"}
                      </motion.button>
                    </div>

                    {/* GDPR */}
                    <p className="text-xs text-text-muted mt-5">
                      Vyplněním a odesláním přihlášky souhlasím se{" "}
                      <a
                        href="https://www.khkzk.cz/ochrana-osobnich-udaju-pro-vzdelavaci-akce-a-skoleni"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-cyan/60 hover:text-accent-cyan underline"
                      >
                        zpracováním osobních údajů
                      </a>{" "}
                      v nezbytném rozsahu.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Storno podmínky */}
        <ScrollReveal delay={0.4}>
          <div className="max-w-3xl mx-auto mt-10 hud-panel rounded-lg p-6">
            <h3 className="font-mono text-xs text-accent-cyan/50 tracking-widest uppercase mb-4">
              // Storno podmínky
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary mb-3">
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan font-mono text-xs mt-0.5">▸</span>
                21 a více dnů před termínem — 25 % z ceny bez DPH
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan font-mono text-xs mt-0.5">▸</span>
                20 až 11 dnů před termínem — 50 % z ceny bez DPH
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-cyan font-mono text-xs mt-0.5">▸</span>
                10 a méně dnů před termínem — 100 % z ceny bez DPH
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
