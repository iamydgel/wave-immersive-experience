'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  location: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Fatou Ndiaye',
    role: 'Commerçante',
    quote: 'Depuis que j\'utilise Wave, je n\'ai plus besoin de faire la queue pour envoyer de l\'argent à mes fournisseurs. C\'est instantané et sans tracas.',
    location: 'Dakar, Sénégal',
  },
  {
    id: '2',
    name: 'Amadou Diallo',
    role: 'Développeur Freelance',
    quote: 'Les frais de 0,5% ont totalement changé ma façon de gérer mes finances. Je peux envoyer de petits montants sans me soucier des frais fixes de transaction.',
    location: 'Bamako, Mali',
  },
  {
    id: '3',
    name: 'Koffi Mensah',
    role: 'Entrepreneur Agricole',
    quote: 'La simplicité de l\'application me permet de payer mes ouvriers agricoles directement sur le terrain, en toute sécurité et sans délai.',
    location: 'Abidjan, Côte d\'Ivoire',
  },
  {
    id: '4',
    name: 'Awa Cissé',
    role: 'Étudiante',
    quote: 'Mes parents m\'envoient mon argent de poche chaque mois en un clic. Wave est fluide et tellement pratique au quotidien.',
    location: 'Saint-Louis, Sénégal',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Défilement horizontal synchronisé sur le défilement vertical
      const scrollWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth - windowWidth + 200}`,
        pin: true,
        scrub: 0.8, // Valeur fluide
        animation: gsap.to(track, {
          x: () => -(scrollWidth - windowWidth + 100),
          ease: 'none',
        }),
        invalidateOnRefresh: true,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="testimonials-track relative h-screen w-full overflow-hidden bg-deep-ocean flex flex-col justify-center"
      aria-label="Témoignages des utilisateurs"
    >
      <div className="absolute top-16 left-6 md:left-16 z-10 flex flex-col gap-2 text-left">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-wave-blue">Témoignages</span>
        <h2 className="font-display text-4xl font-black text-foam md:text-5xl">Ils font confiance à Wave</h2>
      </div>

      <div
        ref={trackRef}
        className="testimonials-inner flex gap-8 px-6 md:px-16 mt-20 w-max items-center justify-start py-8"
        style={{ willChange: 'transform' }}
      >
        {testimonialsData.map((t) => (
          <div
            key={t.id}
            className="w-[300px] md:w-[400px] shrink-0 rounded-2xl border border-white/8 bg-wave-blue/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-wave-blue/40 hover:bg-wave-blue/10 flex flex-col justify-between h-[250px] md:h-[280px] text-left"
            data-cursor="card"
          >
            <p className="font-body text-base md:text-lg italic text-foam/90 leading-relaxed">
              “ {t.quote} ”
            </p>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
              <div>
                <h3 className="font-display text-sm md:text-base font-bold text-foam">{t.name}</h3>
                <p className="font-body text-xs text-foam/50">{t.role}</p>
              </div>
              <span className="font-body text-xs font-semibold text-wave-blue">{t.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
