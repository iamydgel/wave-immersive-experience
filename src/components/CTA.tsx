'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Animation d'entrée au scroll de la section CTA
      gsap.fromTo('.cta-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[80vh] w-full flex-col justify-between overflow-hidden bg-deep-ocean pt-24"
      aria-label="Appel à l'action"
    >
      <div className="cta-content z-10 mx-auto max-w-4xl px-6 text-center flex flex-col items-center gap-6">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-aqua-light">Rejoignez-nous</span>
        <h2 className="font-display text-4xl font-black text-foam md:text-6xl leading-[1.05]">
          Prêt à faire circuler votre argent ?
        </h2>
        <p className="font-body text-base text-foam/75 md:text-lg max-w-xl">
          Rejoignez plus de 8 millions d'utilisateurs qui font confiance à Wave au quotidien. Téléchargez l'application dès maintenant et commencez à envoyer de l'argent avec seulement 0,5% de frais.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            className="rounded-full bg-foam px-8 py-4 font-body text-base font-bold text-deep-ocean shadow-lg hover:bg-foam/90 transition-all w-full sm:w-auto"
            data-cursor="cta"
            data-cursor-text="Google"
          >
            Télécharger sur Android
          </button>
          <button
            className="rounded-full border border-white/20 px-8 py-4 font-body text-base font-bold text-foam hover:bg-white/10 transition-all w-full sm:w-auto"
            data-cursor="cta"
            data-cursor-text="Apple"
          >
            Télécharger sur iOS
          </button>
        </div>
      </div>

      {/* Animated SVG Wave at the bottom */}
      <div className="w-full relative h-[120px] shrink-0 mt-16">
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 left-0 w-full h-[120px]"
          preserveAspectRatio="none"
        >
          <path
            className="wave-path"
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </section>
  );
}
