'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  location: string;
  image: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Fatou Ndiaye',
    role: 'Commerçante',
    quote: 'Depuis que j\'utilise Wave, je n\'ai plus besoin de faire la queue pour envoyer de l\'argent à mes fournisseurs. C\'est instantané et sans tracas.',
    location: 'Dakar, Sénégal',
    image: '/client_portrait_fatou.png',
  },
  {
    id: '2',
    name: 'Amadou Diallo',
    role: 'Freelance',
    quote: 'Les frais de 0,5% ont totalement changé ma façon de gérer mes finances. Je peux envoyer de petits montants sans me soucier des frais de transaction.',
    location: 'Bamako, Mali',
    image: '/client_portrait_amadou.png',
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
      const scrollWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth - windowWidth + 200}`,
        pin: true,
        scrub: 0.8,
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
      className="testimonials-track relative h-screen w-full overflow-hidden bg-[#7B3F00] flex flex-col justify-center"
      aria-label="Témoignages des utilisateurs"
    >
      {/* Terracotta/Brown header banner */}
      <div className="absolute top-0 left-0 w-full h-[35%] bg-[#8B4513] z-0 flex flex-col justify-end pb-8 px-6 md:px-16 text-left">
        <h2 className="font-display text-3xl font-black text-white md:text-5xl">Témoignages de nos clients</h2>
      </div>

      {/* Hand-drawn yellow stripes simulation in background */}
      <div className="absolute right-10 top-1/4 h-2/3 w-[300px] pointer-events-none opacity-20 z-0">
        <svg viewBox="0 0 200 400" className="w-full h-full text-yellow-500 fill-current">
          <path d="M10,10 Q40,90 20,180 T10,350" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M40,20 Q70,100 50,190 T40,360" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M70,30 Q100,110 80,200 T70,370" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M100,40 Q130,120 110,210 T100,380" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      <div
        ref={trackRef}
        className="testimonials-inner flex gap-12 px-6 md:px-16 mt-28 w-max items-center justify-start py-8 z-10"
        style={{ willChange: 'transform' }}
      >
        {testimonialsData.map((t) => (
          <div
            key={t.id}
            className="w-[450px] md:w-[600px] shrink-0 rounded-3xl bg-[#F5EFE6] border border-deep-ocean/5 p-8 shadow-xl flex flex-col md:flex-row gap-6 items-center justify-between text-earth hover:shadow-2xl transition-all duration-300"
            data-cursor="card"
          >
            {/* Customer Photo */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shrink-0 border-4 border-white shadow-md">
              <Image
                src={t.image}
                alt={t.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Testimonial Quote */}
            <div className="flex flex-col justify-between flex-1 text-left h-full">
              <span className="text-4xl font-serif text-[#8B4513]/40 leading-none">“</span>
              <p className="font-body text-sm md:text-base italic text-[#3D2B1F]/90 leading-relaxed -mt-2">
                {t.quote}
              </p>
              <div className="border-t border-earth/10 pt-3 mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm md:text-base font-bold text-deep-ocean">{t.name}</h3>
                  <p className="font-body text-[10px] uppercase font-semibold text-[#8B4513]">{t.role}</p>
                </div>
                <span className="font-body text-xs font-semibold text-wave-blue">{t.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
