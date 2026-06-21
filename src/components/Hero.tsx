'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import WebGLWave from './WebGLWave';

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // L1 - clip-path reveal
      tl.fromTo('.hero-line-1',
        {
          clipPath: 'inset(0 0 100% 0)',
          yPercent: 110,
        },
        {
          clipPath: 'inset(0 0 0% 0)',
          yPercent: 0,
          duration: 0.7,
          ease: 'power3.out', // = $ease-luxury
        },
        0.2
      );

      // L2 - clip-path reveal (staggered +200ms)
      tl.fromTo('.hero-line-2',
        {
          clipPath: 'inset(0 0 100% 0)',
          yPercent: 110,
        },
        {
          clipPath: 'inset(0 0 0% 0)',
          yPercent: 0,
          duration: 0.7,
          ease: 'power3.out',
        },
        0.4
      );

      // Subtitle reveal
      tl.fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.7
      );

      // Navbar items reveal
      tl.fromTo('.nav-item',
        { opacity: 0, y: -12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.06,
        },
        0.9
      );

      // CTA Pill
      tl.fromTo('.cta-pill',
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.48, ease: 'back.out(1.7)' },
        1.1
      );

      // Scroll hint chevron reveal
      tl.fromTo('.scroll-hint',
        { opacity: 0 },
        { opacity: 0.6, duration: 0.3, ease: 'power1.out' },
        1.4
      );

      // Scroll hint breathing loop
      gsap.to('.scroll-hint-chevron', {
        y: 8,
        duration: 0.7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Exit/Scroll animation using ScrollTrigger
      gsap.to('.hero-content', {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Wave canvas dims slightly on scroll
      gsap.to('.wave-canvas', {
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '30% top',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Scroll hint disappears
      gsap.to('.scroll-hint', {
        opacity: 0,
        duration: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '10% top',
          end: '20% top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-deep-ocean px-6 py-8 md:px-16"
      aria-label="Bienvenue sur Wave — Envoyez de l'argent rapidement"
      role="banner"
    >
      {/* Wave WebGL Background */}
      {isLoaded && <WebGLWave />}

      {/* Navigation Header */}
      <header ref={containerRef} className="z-10 flex w-full items-center justify-between">
        <div className="nav-item flex items-center gap-2">
          {/* Wave Logo */}
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="h-6 w-auto">
            <path d="M4,12 C10,4 18,20 24,12 C30,4 36,20 36,12" stroke="#0057FF" strokeWidth="4" strokeLinecap="round"/>
          </svg>
          <span className="font-display text-xl font-bold tracking-wider text-foam">Wave</span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#stats" className="nav-item font-body text-sm font-medium text-foam/85 hover:text-foam" data-cursor="link">Tarifs</a>
          <a href="#features" className="nav-item font-body text-sm font-medium text-foam/85 hover:text-foam" data-cursor="link">Fonctionnalités</a>
          <a href="#transfer" className="nav-item font-body text-sm font-medium text-foam/85 hover:text-foam" data-cursor="link">Démonstration</a>
          <a href="#testimonials" className="nav-item font-body text-sm font-medium text-foam/85 hover:text-foam" data-cursor="link">Avis</a>
        </nav>
        <button
          className="nav-item rounded-full bg-wave-blue px-6 py-2.5 font-body text-sm font-bold text-white transition-all hover:bg-wave-blue/90 md:block"
          data-cursor="cta"
          data-cursor-text="Envoyer"
        >
          Télécharger l'app
        </button>
      </header>

      {/* Main Content */}
      <div className="hero-content z-10 flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="hero-headline max-w-4xl font-display text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.95] text-foam">
          <span className="sr-only">L'argent qui circule pour vous.</span>
          <span aria-hidden="true" className="block overflow-hidden py-2">
            <span className="hero-line-1 block">L'argent qui</span>
          </span>
          <span aria-hidden="true" className="block overflow-hidden py-2 text-aqua-light">
            <span className="hero-line-2 block">circule pour vous.</span>
          </span>
        </h1>
        <p className="hero-subtitle mt-6 max-w-lg font-body text-base font-medium text-foam/75 opacity-0 md:text-lg">
          Envoyez de l'argent instantanément, sans frais excessifs. La fluidité financière enfin à portée de main.
        </p>
        <div className="mt-10">
          <button
            className="cta-pill rounded-full bg-wave-blue px-8 py-4 font-body text-base font-bold text-white opacity-0 shadow-lg shadow-wave-blue/20 transition-all hover:bg-wave-blue/95 hover:shadow-wave-blue/40"
            data-cursor="cta"
            data-cursor-text="Débuter"
          >
            Envoyer de l'argent maintenant →
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="scroll-hint z-10 flex flex-col items-center justify-center opacity-0">
        <span className="font-body text-xs font-semibold uppercase tracking-widest text-foam/60">Faire défiler</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="scroll-hint-chevron mt-2 h-5 w-5 text-foam/60"
        >
          <path d="M12,5 L12,19 M5,12 L12,19 L19,12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
