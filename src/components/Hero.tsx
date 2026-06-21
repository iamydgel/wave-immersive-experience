'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
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

      // App Badges reveal
      tl.fromTo('.app-badge-btn',
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.48, ease: 'back.out(1.7)', stagger: 0.1 },
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
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-deep-ocean px-6 pb-8 pt-20 md:px-16 md:pt-24"
      aria-label="Bienvenue sur Wave — Envoyez de l'argent rapidement"
      role="banner"
    >
      {/* Banner orange tout en haut */}
      <div className="absolute top-0 left-0 z-20 w-full bg-alert py-2.5 px-6 text-center text-xs md:text-sm font-body font-semibold text-white">
        Vous voulez rejoindre Wave ? <a href="#careers" className="underline hover:text-white/80" data-cursor="link">Consultez nos postes ouverts ici ➔</a>
      </div>

      {/* Wave WebGL Background */}
      {isLoaded && <WebGLWave />}

      {/* Navigation Header */}
      <header ref={containerRef} className="z-10 flex w-full items-center justify-between">
        <div className="nav-item flex items-center gap-2">
          {/* Wave Logo PNG */}
          <Image
            src="/logo.png"
            alt="Wave Logo"
            width={180}
            height={90}
            className="h-28 w-auto object-contain"
          />
          <span className="font-display text-xl font-bold tracking-wider text-foam">Wave</span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="nav-item font-body text-sm font-semibold text-foam hover:text-foam/80" data-cursor="link">Personal</a>
          <a href="#" className="nav-item font-body text-sm font-semibold text-foam/60 hover:text-foam" data-cursor="link">Business</a>
          <a href="#about" className="nav-item font-body text-sm font-medium text-foam/60 hover:text-foam" data-cursor="link">À Propos</a>
          <a href="#careers" className="nav-item font-body text-sm font-medium text-foam/60 hover:text-foam" data-cursor="link">Carrières</a>
          <a href="#blog" className="nav-item font-body text-sm font-medium text-foam/60 hover:text-foam" data-cursor="link">Blog</a>
        </nav>
        <button
          className="nav-item rounded-full bg-wave-blue px-6 py-2.5 font-body text-sm font-bold text-white transition-all hover:bg-wave-blue/90 md:block"
          data-cursor="cta"
          data-cursor-text="Télécharger"
        >
          Télécharger l'app
        </button>
      </header>

      {/* Main Content */}
      <div className="hero-content z-10 flex flex-1 flex-col items-center justify-center text-center mt-8">
        <h1 className="hero-headline max-w-4xl font-display text-[clamp(2.2rem,8vw,5.5rem)] font-bold leading-[0.95] text-foam">
          <span className="sr-only">Votre allié mobile money</span>
          <span aria-hidden="true" className="block overflow-hidden py-1">
            <span className="hero-line-1 block">Votre allié</span>
          </span>
          <span aria-hidden="true" className="block overflow-hidden py-1 text-aqua-light">
            <span className="hero-line-2 block">mobile money.</span>
          </span>
        </h1>
        <p className="hero-subtitle mt-6 max-w-xl font-body text-sm font-medium text-foam/75 opacity-0 md:text-base">
          Déposez et retirez gratuitement. Payez vos factures sans frais. Transférez de l'argent pour seulement 0,5%.
        </p>

        {/* Badges de téléchargement premium */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {/* App Store */}
          <a
            href="#"
            className="app-badge-btn flex items-center gap-3 rounded-xl bg-black px-5 py-2.5 border border-white/10 hover:border-white/30 transition-all select-none opacity-0"
            data-cursor="cta"
            data-cursor-text="Apple"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white h-6 w-auto">
              <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,22c-1.28,0-1.69-.78-3.15-.78s-1.92.76-3.15.78C8,22,7.09,20.72,6.26,19.5,4.56,17,3.26,12.37,5,9.39A4.7,4.7,0,0,1,8.91,7.21c1.23,0,2.38.85,3.13.85s2-.9,3.42-.75a4.41,4.41,0,0,1,3.47,2.44,4.24,4.24,0,0,0-2.55,3.87,4.19,4.19,0,0,0,1.57,3.27A10.82,10.82,0,0,1,18.71,19.5M15.9,4.86a4.2,4.2,0,0,0,1-3,4.23,4.23,0,0,0-2.73,1.4,3.92,3.92,0,0,0-1,2.94A3.59,3.59,0,0,0,15.9,4.86Z"/>
            </svg>
            <div className="text-left leading-none">
              <div className="text-[10px] text-white/60">Télécharger dans</div>
              <div className="text-sm font-bold text-white font-body mt-0.5">l'App Store</div>
            </div>
          </a>

          {/* Google Play */}
          <a
            href="#"
            className="app-badge-btn flex items-center gap-3 rounded-xl bg-black px-5 py-2.5 border border-white/10 hover:border-white/30 transition-all select-none opacity-0"
            data-cursor="cta"
            data-cursor-text="Google"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white h-6 w-auto">
              <path d="M5.00003 3.00003C4.54228 3.00003 4.14815 3.32431 4.02539 3.76611L12.5 12.2408L20.9747 3.76611C20.8519 3.32431 20.4578 3.00003 20 3.00003H5.00003ZM4.00003 5.17065V19.3108C4.00003 19.5932 4.08103 19.8631 4.22559 20.0934L11.5 12.8189L4.00003 5.17065ZM20 20.0934C20.1446 19.8631 20.2256 19.5932 20.2256 19.3108V5.17065L12.7256 12.8189L20 20.0934ZM11.5 14.2333L4.22559 21.5078C4.44432 21.8219 4.80803 22 5.00003 22H20C20.192 22 20.5557 21.8219 20.7744 21.5078L13.5 14.2333L12.5 13.2333L11.5 14.2333Z"/>
            </svg>
            <div className="text-left leading-none">
              <div className="text-[10px] text-white/60">DISPONIBLE SUR</div>
              <div className="text-sm font-bold text-white font-body mt-0.5">Google Play</div>
            </div>
          </a>
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
