"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { galleryPhotos } from "@/lib/data";

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DISPLAY_COUNT = 12;

export function Gallery() {
  // Stable order for SSR + first client render to avoid hydration mismatch.
  // Shuffle only after mount on the client.
  const [photos, setPhotos] = useState(() => galleryPhotos.slice(0, DISPLAY_COUNT));

  useEffect(() => {
    setPhotos(shuffle(galleryPhotos).slice(0, DISPLAY_COUNT));
  }, []);

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] text-accent-cyan/50 tracking-[0.3em] uppercase mb-3 text-center">
            ▸ Surveillance_Feed
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center holo-glow">
            Z minulých ročníků
          </h2>
          <p className="text-text-secondary text-center mb-14 text-lg">
            Archiv vizuálních záznamů z konference 2025
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <ScrollReveal key={photo.src} delay={0.05 + i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group rounded-lg overflow-hidden hud-panel p-0 aspect-[4/3]"
                style={{ border: "none" }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                {/* HUD overlay on hover — just CAM id + corners, no description */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-2 left-2 font-mono text-[11px] text-accent-cyan/70 bg-bg-deep/60 px-2 py-0.5 rounded">
                    CAM_{String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-accent-cyan/40" />
                  <div className="absolute top-1 right-1 w-4 h-4 border-t border-r border-accent-cyan/40" />
                  <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l border-accent-cyan/40" />
                  <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-accent-cyan/40" />
                </div>
                {/* Cyan tint */}
                <div className="absolute inset-0 bg-accent-cyan/5 pointer-events-none rounded-lg" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
