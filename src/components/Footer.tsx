'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Footer() {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('Français');

  const toggleLang = () => setLangOpen(!langOpen);
  const selectLang = (lang: string) => {
    setCurrentLang(lang);
    setLangOpen(false);
  };

  return (
    <footer className="w-full bg-deep-ocean px-6 py-20 md:px-16 text-foam border-t border-white/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full border-[12px] border-wave-blue/5 pointer-events-none" />

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-12 items-start z-10 relative">
        {/* Column 1: Branding & Language */}
        <div className="flex flex-col gap-6 items-start text-left">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Wave Logo"
              width={96}
              height={48}
              className="h-10 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="font-display text-xl font-bold tracking-wider">Wave</span>
          </div>

          {/* Interactive Language Selector */}
          <div className="relative">
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-all select-none"
              data-cursor="link"
            >
              <span>{currentLang}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`h-4 w-4 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-32 rounded-xl border border-white/10 bg-deep-ocean p-2 shadow-2xl z-20 flex flex-col gap-1">
                <button onClick={() => selectLang('Français')} className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-white/5">Français</button>
                <button onClick={() => selectLang('English')} className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-white/5">English</button>
                <button onClick={() => selectLang('Wolof')} className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-white/5">Wolof</button>
              </div>
            )}
          </div>

          <div className="text-[11px] text-foam/40 font-mono">
            © {new Date().getFullYear()} Wave Mobile Money Inc.
          </div>
        </div>

        {/* Column 2: L'entreprise */}
        <div className="flex flex-col gap-4 items-start text-left">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-aqua-light">L'entreprise</h3>
          <ul className="flex flex-col gap-2.5 text-sm font-body text-foam/70">
            <li><a href="#about" className="hover:text-foam" data-cursor="link">À Propos</a></li>
            <li><a href="#careers" className="hover:text-foam" data-cursor="link">Carrières</a></li>
            <li><a href="#blog" className="hover:text-foam" data-cursor="link">Blog</a></li>
          </ul>
        </div>

        {/* Column 3: Legal Info */}
        <div className="flex flex-col gap-4 items-start text-left md:col-span-2 lg:col-span-1">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-aqua-light">Informations Légales</h3>
          <ul className="flex flex-col gap-2.5 text-sm font-body text-foam/70">
            <li><a href="#" className="hover:text-foam" data-cursor="link">Conditions Générales</a></li>
            <li><a href="#" className="hover:text-foam" data-cursor="link">Responsible Disclosure</a></li>
            <li><a href="#" className="hover:text-foam" data-cursor="link">Wave Digital Finance</a></li>
            <li><a href="#" className="hover:text-foam" data-cursor="link">Avis de Confidentialité</a></li>
            <li><a href="#" className="hover:text-foam" data-cursor="link">Politique de réclamations</a></li>
          </ul>
        </div>

        {/* Column 4: App Badges */}
        <div className="flex flex-col gap-4 items-start md:items-end text-left md:text-right">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-aqua-light">Téléchargements</h3>
          <div className="flex flex-col gap-3">
            {/* App Store */}
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl bg-black/40 px-4 py-2 border border-white/10 hover:border-white/30 transition-all select-none"
              data-cursor="cta"
              data-cursor-text="Apple"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white h-5 w-auto" style={{ filter: 'brightness(0) invert(1)' }}>
                <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,22c-1.28,0-1.69-.78-3.15-.78s-1.92.76-3.15.78C8,22,7.09,20.72,6.26,19.5,4.56,17,3.26,12.37,5,9.39A4.7,4.7,0,0,1,8.91,7.21c1.23,0,2.38.85,3.13.85s2-.9,3.42-.75a4.41,4.41,0,0,1,3.47,2.44,4.24,4.24,0,0,0-2.55,3.87,4.19,4.19,0,0,0,1.57,3.27A10.82,10.82,0,0,1,18.71,19.5M15.9,4.86a4.2,4.2,0,0,0,1-3,4.23,4.23,0,0,0-2.73,1.4,3.92,3.92,0,0,0-1,2.94A3.59,3.59,0,0,0,15.9,4.86Z"/>
              </svg>
              <div className="text-left leading-none">
                <div className="text-[8px] text-white/50">Télécharger dans</div>
                <div className="text-xs font-bold text-white font-body mt-0.5">l'App Store</div>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl bg-black/40 px-4 py-2 border border-white/10 hover:border-white/30 transition-all select-none"
              data-cursor="cta"
              data-cursor-text="Google"
            >
              <svg width="20" height="20" viewBox="0 0 466 512" fill="currentColor" className="text-white h-5 w-auto" style={{ filter: 'brightness(0) invert(1)' }}>
                <g fillRule="nonzero">
                  <path d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z"/>
                  <path d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z"/>
                  <path d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z"/>
                  <path d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z"/>
                </g>
              </svg>
              <div className="text-left leading-none">
                <div className="text-[8px] text-white/50">DISPONIBLE SUR</div>
                <div className="text-xs font-bold text-white font-body mt-0.5">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
