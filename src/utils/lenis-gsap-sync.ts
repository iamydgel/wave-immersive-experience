import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialise le défilement fluide Lenis et le synchronise avec GSAP ScrollTrigger.
 */
export function initLenis() {
  if (typeof window === 'undefined') return null;

  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  // Synchronisation de Lenis → GSAP ScrollTrigger
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Synchronisation du ticker de GSAP avec la boucle RAF de Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Désactiver le lag smoothing pour éviter la désynchronisation
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
