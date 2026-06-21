'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Ne pas activer le curseur sur mobile
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isMobile) return;

    const cursorEl = cursorRef.current;
    const textEl = textRef.current;
    if (!cursorEl) return;

    // Masquer le curseur système par défaut sur le document
    document.documentElement.style.cursor = 'none';

    // Position initiale hors de l'écran pour éviter le flash en haut à gauche
    gsap.set(cursorEl, { x: -100, y: -100 });

    // Initialisation de quickTo pour un déplacement ultra-performant et fluide (lerp matériel)
    const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.15, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      // Ajustement pour centrer le curseur (12px = rayon du curseur)
      xTo(e.clientX - 12);
      yTo(e.clientY - 12);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Gestion des états survolés via data-cursor
    const onMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const state = target.getAttribute('data-cursor');
      if (state) {
        cursorEl.setAttribute('data-state', state);
        if (state === 'cta' && textEl) {
          textEl.textContent = target.getAttribute('data-cursor-text') || 'Envoyer';
        }
      }
    };

    const onMouseLeave = () => {
      cursorEl.removeAttribute('data-state');
      if (textEl) textEl.textContent = '';
    };

    const onMouseDown = () => {
      cursorEl.classList.add('clicking');
    };

    const onMouseUp = () => {
      cursorEl.classList.remove('clicking');
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Attacher les écouteurs d'événements
    const setupListeners = () => {
      const elements = document.querySelectorAll('[data-cursor]');
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    setupListeners();

    // Observer pour les éléments ajoutés dynamiquement au DOM
    const observer = new MutationObserver(() => {
      setupListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.style.cursor = 'auto';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor pointer-events-none fixed top-0 left-0 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-wave-blue/80 scale-100 will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0px)',
      }}
    >
      <span
        ref={textRef}
        className="pointer-events-none font-body text-[8px] font-bold text-deep-ocean opacity-0 transition-opacity duration-200"
      />
    </div>
  );
}
