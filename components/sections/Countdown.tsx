"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { conferenceInfo } from "@/lib/data";

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

function getTimeLeft(): TimeLeft {
  const diff = conferenceInfo.eventDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const labels = { days: "DNY", hours: "HOD", minutes: "MIN", seconds: "SEC" };

export function Countdown() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-accent-cyan/40 tracking-[0.3em] uppercase mb-8"
        >
          ▸ Time_to_launch
        </motion.p>
        <div className="flex items-center justify-center gap-2 sm:gap-8">
          {(Object.keys(labels) as (keyof TimeLeft)[]).map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center flex-1 sm:flex-none"
            >
              <div className="relative w-full sm:w-32 h-20 sm:h-32 flex items-center justify-center hud-panel rounded-lg">
                <span className="font-mono text-4xl sm:text-7xl font-bold text-accent-cyan holo-glow-strong tabular-nums">
                  {String(time[key]).padStart(2, "0")}
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-text-muted mt-2 sm:mt-3 tracking-[0.2em]">
                {labels[key]}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
