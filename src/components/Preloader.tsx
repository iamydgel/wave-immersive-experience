'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const counter = counterRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !logo || !counter || !progressBar) return;

    // Masquer le logo au départ pour l'animation d'entrée
    gsap.set(logo, { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl
      // Faire apparaître le logo PNG avec rebond
      .to(logo, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)', // = $ease-luxury
      }, 0.2)

      // Compteur de progression de 00 à 100 avec incréments irréguliers
      .to(counter, {
        textContent: 100,
        duration: 0.9,
        ease: 'none',
        snap: { textContent: 1 },
        onUpdate() {
          const val = Math.round(parseFloat(counter.textContent || '0'));
          counter.textContent = String(val).padStart(2, '0');
        },
      }, 0.3)

      // Barre de progression qui suit avec un léger décalage (lag)
      .to(progressBar, {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 0.8,
        ease: 'power1.inOut', // = $ease-sharp
      }, 0.5)

      // Fondu partiel avant la sortie
      .to([counter, progressBar.parentElement], {
        opacity: 0.4,
        duration: 0.2,
        ease: 'power2.in',
      }, 1.2)

      // Glissement (slide up) de tout le preloader vers le haut
      .to(container, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power2.in', // = $ease-sharp en sortie
      }, 1.4);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="loader-wrapper fixed inset-0 z-50 flex flex-col items-center justify-center bg-deep-ocean select-none"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Nouveau Logo PNG Wave */}
        <div ref={logoRef} className="relative w-32 h-16 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Wave Logo"
            width={128}
            height={64}
            className="object-contain w-auto h-12"
            priority
          />
        </div>

        {/* Compteur % */}
        <div
          ref={counterRef}
          className="loader-counter font-mono text-4xl font-bold text-foam tracking-widest"
        >
          00
        </div>

        {/* Barre de progression */}
        <div className="loader-bar-wrapper w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="loader-bar w-full h-full bg-wave-blue origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
}
