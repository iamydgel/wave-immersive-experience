'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Timeline principale de Scroll et Pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.5, // Fort lissage pour un effet liquide
          start: 'top top',
          end: '+=200%',
          anticipatePin: 1,
        },
      });

      // Transition Feature 1 → Feature 2 (à 25%)
      tl
        // Textes
        .to('.feature-text-1', { opacity: 0, y: -24, duration: 0.2 }, 0.25)
        .fromTo('.feature-text-2', 
          { opacity: 0, y: 24 }, 
          { opacity: 1, y: 0, duration: 0.2 }, 
          0.25
        )
        // Écrans téléphone (avec rack focus / blur)
        .to('.phone-screen-1', { opacity: 0, scale: 0.96, filter: 'blur(4px)', duration: 0.2 }, 0.25)
        .fromTo('.phone-screen-2',
          { opacity: 0, scale: 1.04, filter: 'blur(4px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.2 },
          0.25
        )
        // Indicateurs dots
        .to('.progress-dot-1', { backgroundColor: 'rgba(255,255,255,0.2)', scale: 1, duration: 0.1 }, 0.25)
        .to('.progress-dot-2', { backgroundColor: '#0057FF', scale: 1.3, duration: 0.1 }, 0.25);

      // Transition Feature 2 → Feature 3 (à 58%)
      tl
        // Textes
        .to('.feature-text-2', { opacity: 0, y: -24, duration: 0.2 }, 0.58)
        .fromTo('.feature-text-3', 
          { opacity: 0, y: 24 }, 
          { opacity: 1, y: 0, duration: 0.2 }, 
          0.58
        )
        // Écrans téléphone
        .to('.phone-screen-2', { opacity: 0, scale: 0.96, filter: 'blur(4px)', duration: 0.2 }, 0.58)
        .fromTo('.phone-screen-3',
          { opacity: 0, scale: 1.04, filter: 'blur(4px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.2 },
          0.58
        )
        // Indicateurs dots
        .to('.progress-dot-2', { backgroundColor: 'rgba(255,255,255,0.2)', scale: 1, duration: 0.1 }, 0.58)
        .to('.progress-dot-3', { backgroundColor: '#0057FF', scale: 1.3, duration: 0.1 }, 0.58);

      // 2. Barre de progression globale
      gsap.fromTo('.features-progress-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=200%',
            scrub: true,
          },
        }
      );

      // 3. Effet d'inclinaison 3D du téléphone au mouvement de la souris (Tilt)
      if (phone) {
        const onMouseMove = (e: MouseEvent) => {
          const rx = (e.clientY / window.innerHeight - 0.5) * -8;
          const ry = (e.clientX / window.innerWidth - 0.5) * 12;
          gsap.to(phone, {
            rotateX: rx,
            rotateY: ry,
            duration: 1.2,
            ease: 'power1.out',
            transformPerspective: 1000,
          });
        };
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="features-section relative flex h-screen w-full flex-col justify-center overflow-hidden bg-deep-ocean px-6 md:px-16"
      aria-label="Fonctionnalités de Wave"
    >
      {/* Top Indicators & Bar */}
      <div className="absolute top-12 left-1/2 z-10 w-full max-w-xs -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="flex gap-6">
          <div className="progress-dot-1 h-3.5 w-3.5 rounded-full bg-wave-blue scale-130 transition-all duration-300" />
          <div className="progress-dot-2 h-3.5 w-3.5 rounded-full bg-white/20 transition-all duration-300" />
          <div className="progress-dot-3 h-3.5 w-3.5 rounded-full bg-white/20 transition-all duration-300" />
        </div>
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <div className="features-progress-fill h-full w-full bg-wave-blue scale-x-0" />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Left Side: Story / Text */}
        <div className="relative h-64 md:h-80 flex items-center">
          {/* Feature 1 */}
          <div className="feature-text-1 absolute w-full flex flex-col gap-4 text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-wave-blue">Étape 01</span>
            <h2 className="font-display text-4xl font-black text-foam md:text-5xl">Sécurité de niveau bancaire</h2>
            <p className="font-body text-base text-foam/75 md:text-lg max-w-md">
              Chaque transaction est protégée par un chiffrement de bout en bout avancé. Wave assure une conformité réglementaire totale pour votre paix d'esprit.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-text-2 absolute w-full flex flex-col gap-4 text-left opacity-0 translate-y-6">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-wave-blue">Étape 02</span>
            <h2 className="font-display text-4xl font-black text-foam md:text-5xl">Tarifs honnêtes et transparents</h2>
            <p className="font-body text-base text-foam/75 md:text-lg max-w-md">
              Fini les frais cachés. Seulement 0,5% de frais d'envoi. Les dépôts et retraits restent totalement gratuits et sans mauvaise surprise.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-text-3 absolute w-full flex flex-col gap-4 text-left opacity-0 translate-y-6">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-wave-blue">Étape 03</span>
            <h2 className="font-display text-4xl font-black text-foam md:text-5xl">Simplicité d'utilisation</h2>
            <p className="font-body text-base text-foam/75 md:text-lg max-w-md">
              Une interface épurée conçue pour les utilisateurs. Envoyez de l'argent à vos proches en quelques secondes, peu importe où ils se trouvent.
            </p>
          </div>
        </div>

        {/* Right Side: 3D phone mockup */}
        <div className="flex justify-center md:justify-end">
          <div
            ref={phoneRef}
            className="phone-mockup relative h-[420px] w-[210px] md:h-[500px] md:w-[250px] rounded-[36px] border-[6px] border-white/10 bg-black/60 shadow-2xl backdrop-blur-md will-change-transform flex items-center justify-center overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Phone notch */}
            <div className="absolute top-3 z-30 h-4 w-28 rounded-full bg-black" />

            {/* Screen 1 */}
            <div className="phone-screen-1 absolute inset-0 z-10 flex flex-col justify-between p-6 bg-gradient-to-b from-[#001030] to-[#002050]">
              <div className="mt-8 flex flex-col items-center text-center gap-4">
                <div className="h-14 w-14 rounded-full bg-wave-blue/20 flex items-center justify-center border border-wave-blue/40">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0057FF" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold text-foam">Coffre Fort</h3>
                <p className="font-body text-xs text-foam/60">Chiffrement AES-256 activé et sécurisé.</p>
              </div>
              <div className="w-full h-8 rounded-lg bg-wave-blue flex items-center justify-center font-body text-xs font-bold text-white shadow-md">
                Données Sécurisées
              </div>
            </div>

            {/* Screen 2 */}
            <div className="phone-screen-2 absolute inset-0 z-10 flex flex-col justify-between p-6 bg-gradient-to-b from-[#001030] to-[#002050] opacity-0 scale-104 filter blur-[4px]">
              <div className="mt-8 flex flex-col items-center text-center gap-4">
                <div className="h-14 w-14 rounded-full bg-[#2ECC71]/20 flex items-center justify-center border border-[#2ECC71]/40">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold text-foam">Frais Réduits</h3>
                <p className="font-body text-xs text-foam/60">Seulement 0.5% prélevés sur vos envois.</p>
              </div>
              <div className="w-full h-8 rounded-lg bg-[#2ECC71] flex items-center justify-center font-body text-xs font-bold text-white shadow-md">
                Économies Garanties
              </div>
            </div>

            {/* Screen 3 */}
            <div className="phone-screen-3 absolute inset-0 z-10 flex flex-col justify-between p-6 bg-gradient-to-b from-[#001030] to-[#002050] opacity-0 scale-104 filter blur-[4px]">
              <div className="mt-8 flex flex-col items-center text-center gap-4">
                <div className="h-14 w-14 rounded-full bg-wave-blue/20 flex items-center justify-center border border-wave-blue/40">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0057FF" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold text-foam">Transfert Rapide</h3>
                <p className="font-body text-xs text-foam/60">Envoyez de l'argent instantanément.</p>
              </div>
              <div className="w-full h-8 rounded-lg bg-wave-blue flex items-center justify-center font-body text-xs font-bold text-white shadow-md">
                Envoyer maintenant
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
