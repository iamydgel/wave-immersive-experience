'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoPathRef = useRef<SVGPathElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const logoPath = logoPathRef.current;
    const counter = counterRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !logoPath || !counter || !progressBar) return;

    // Préparer le tracé SVG pour l'effet de tracé de ligne (stroke drawing)
    const pathLength = logoPath.getTotalLength();
    gsap.set(logoPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      opacity: 1,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl
      // Dessiner le logo SVG
      .to(logoPath, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power3.out', // = $ease-luxury
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
        {/* Logo Wave (Stylisé en SVG Wave path) */}
        <svg
          width="120"
          height="60"
          viewBox="0 0 120 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[120px] h-[60px]"
        >
          <path
            ref={logoPathRef}
            className="logo-path"
            d="M10,30 C30,10 50,50 70,30 C90,10 110,50 110,30"
            stroke="#0057FF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

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
