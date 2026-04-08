"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Context so any component can open the modal ---
const ModalContext = createContext<{ open: () => void }>({ open: () => {} });
export const useRegistrationModal = () => useContext(ModalContext);

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

export function RegistrationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([emptyParticipant()]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    setSubmitted(false);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const addParticipant = () => setParticipants((prev) => [...prev, emptyParticipant()]);

  const removeParticipant = (index: number) =>
    setParticipants((prev) => prev.filter((_, i) => i !== index));

  const updateParticipant = (index: number, field: keyof Participant, value: string) =>
    setParticipants((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
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
      e.currentTarget.submit();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalContext.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-bg-deep/85 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-10 px-4"
            >
              <div
                className="relative w-full max-w-2xl hud-panel rounded-lg p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 font-mono text-lg text-text-muted hover:text-accent-cyan transition-colors"
                  aria-label="Zavřít"
                >
                  ✕
                </button>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-10"
                    >
                      <div className="text-5xl mb-4 text-accent-cyan">✓</div>
                      <h3 className="text-2xl font-bold mb-3 holo-glow">Přihláška odeslána</h3>
                      <p className="text-text-secondary text-lg mb-2">
                        Děkujeme za registraci na konferenci AI v praxi 2026.
                      </p>
                      <p className="text-text-muted text-sm font-mono mb-6">
                        Potvrzení obdržíte na zadaný e-mail.
                      </p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="font-mono text-sm text-accent-cyan border border-accent-cyan/20 rounded px-6 py-2 hover:bg-accent-cyan/10 transition-colors"
                      >
                        Zavřít
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                          <label>Nevyplňujte: <input name="bot-field" /></label>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label className={labelClass}>Název organizace *</label>
                            <input type="text" name="organizace" required className={inputClass} placeholder="Název firmy" />
                          </div>
                          <div>
                            <label className={labelClass}>IČO *</label>
                            <input type="text" name="ico" required className={inputClass} placeholder="12345678" />
                          </div>
                        </div>

                        {participants.map((p, i) => (
                          <div key={i} className="mb-6">
                            {participants.length > 1 && (
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-mono text-xs text-accent-cyan/40">Účastník {i + 1}</span>
                                {i > 0 && (
                                  <button type="button" onClick={() => removeParticipant(i)} className="font-mono text-xs text-red-400/60 hover:text-red-400 transition-colors">
                                    ✕ Odebrat
                                  </button>
                                )}
                              </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className={labelClass}>Jméno a příjmení *</label>
                                <input type="text" required value={p.name} onChange={(e) => updateParticipant(i, "name", e.target.value)} className={inputClass} placeholder="Jan Novák" />
                              </div>
                              <div>
                                <label className={labelClass}>Pozice ve firmě *</label>
                                <input type="text" required value={p.position} onChange={(e) => updateParticipant(i, "position", e.target.value)} className={inputClass} placeholder="CEO / CTO / ..." />
                              </div>
                              <div>
                                <label className={labelClass}>E-mail *</label>
                                <input type="email" required value={p.email} onChange={(e) => updateParticipant(i, "email", e.target.value)} className={inputClass} placeholder="jan@firma.cz" />
                              </div>
                              <div>
                                <label className={labelClass}>Telefonní číslo *</label>
                                <input type="tel" required value={p.phone} onChange={(e) => updateParticipant(i, "phone", e.target.value)} className={inputClass} placeholder="+420 ..." />
                              </div>
                            </div>
                          </div>
                        ))}

                        <button type="button" onClick={addParticipant} className="font-mono text-sm text-accent-cyan/60 hover:text-accent-cyan border border-accent-cyan/15 hover:border-accent-cyan/30 rounded px-4 py-2 transition-all mb-6">
                          + Přidat dalšího účastníka
                        </button>

                        <div className="mb-6">
                          <label className={labelClass}>Poznámka</label>
                          <textarea name="poznamka" rows={3} className={`${inputClass} resize-y`} placeholder="Máte speciální požadavky?" />
                        </div>

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
                          <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="font-mono text-sm text-text-muted hover:text-text-secondary transition-colors"
                          >
                            Zrušit přihlášku
                          </button>
                        </div>

                        <p className="text-xs text-text-muted mt-5">
                          Vyplněním a odesláním přihlášky souhlasím se{" "}
                          <a href="https://www.khkzk.cz/ochrana-osobnich-udaju-pro-vzdelavaci-akce-a-skoleni" target="_blank" rel="noopener noreferrer" className="text-accent-cyan/60 hover:text-accent-cyan underline">
                            zpracováním osobních údajů
                          </a>{" "}
                          v nezbytném rozsahu.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
