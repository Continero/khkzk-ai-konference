"use client";

import { conferenceInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative py-14 px-6 border-t border-accent-cyan/8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="font-mono text-xs text-accent-cyan/50 tracking-widest uppercase mb-3">
              // Organizátor
            </h3>
            <img src="/khkzk-logo.svg" alt="KHKZK — organizátor konference AI v praxi" className="h-10 brightness-0 invert opacity-60 mb-2" />
            <p className="text-text-secondary text-base">{conferenceInfo.organizer}</p>
            <div className="flex items-center gap-3 mt-3">
              <a href="https://www.khkzk.cz" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-cyan transition-colors" aria-label="Web">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/khkzk/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-cyan transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://cs-cz.facebook.com/HospodarskaKomoraZlinskehoKraje/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-cyan transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.youtube.com/@krajskahospodarskakomorazl4903" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-cyan transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-mono text-xs text-accent-cyan/50 tracking-widest uppercase mb-3">
              // Lokace
            </h3>
            <p className="text-text-secondary text-base">{conferenceInfo.venue}</p>
            <p className="text-text-muted text-sm font-mono mt-1">{conferenceInfo.address}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs text-accent-cyan/50 tracking-widest uppercase mb-3">
              // Kontakt
            </h3>
            <p className="text-text-secondary text-base">Renata Brázdilová</p>
            <a href="mailto:brazdilova@khkzk.cz" className="text-accent-cyan text-sm font-mono hover:underline">
              brazdilova@khkzk.cz
            </a>
            <p className="text-text-muted text-sm font-mono mt-1">+420 735 746 862</p>
          </div>
        </div>

        <div className="pt-6 border-t border-accent-cyan/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-text-muted">
            &copy; 2026 {conferenceInfo.organizer} // All systems nominal
          </p>
          <p className="font-mono text-xs text-text-muted/40">
            Web: Continero Corp
          </p>
        </div>
      </div>
    </footer>
  );
}
