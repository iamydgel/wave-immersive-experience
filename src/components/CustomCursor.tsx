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

    const mouse = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };
    const LERP = 0.12;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Boucle d'animation avec Lerp
    let animationFrameId: number;
    const updateCursor = () => {
      cursor.x += (mouse.x - cursor.x) * LERP;
      cursor.y += (mouse.y - cursor.y) * LERP;

      gsap.set(cursorEl, {
        x: cursor.x - 12,
        y: cursor.y - 12,
      });

      animationFrameId = requestAnimationFrame(updateCursor);
    };
    updateCursor();

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

    // Attacher des écouteurs globaux pour le clic
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Fonction pour attacher/détacher les écouteurs sur les éléments data-cursor
    const setupListeners = () => {
      const elements = document.querySelectorAll('[data-cursor]');
      elements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    setupListeners();

    // Observer pour gérer le contenu dynamique ajouté après coup
    const observer = new MutationObserver(() => {
      setupListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor pointer-events-none fixed top-0 left-0 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-wave-blue/80 transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: 'translate3d(0px, 0px, 0px) scale(1)',
        }}
      >
        <span
          ref={textRef}
          className="pointer-events-none font-body text-[8px] font-bold text-deep-ocean opacity-0 transition-opacity duration-200"
        />
      </div>


    </>
  );
}
