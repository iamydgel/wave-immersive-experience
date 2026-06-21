'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, ArrowRightLeft, Lightbulb, Smartphone, Headphones, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureCard {
  id: string;
  title: string;
  icon: any;
  iconColor: string;
}

const featuresData: FeatureCard[] = [
  {
    id: 'deposit',
    title: 'Un compte sans frais de dépôt ou retrait',
    icon: Landmark,
    iconColor: '#0057FF',
  },
  {
    id: 'transfer',
    title: 'Des transferts d\'argent à seulement 0,5%',
    icon: ArrowRightLeft,
    iconColor: '#2ECC71',
  },
  {
    id: 'bills',
    title: 'Le paiement de factures sans frais',
    icon: Lightbulb,
    iconColor: '#E67E22',
  },
  {
    id: 'credit',
    title: 'L\'achat de crédit instantané tous réseaux',
    icon: Smartphone,
    iconColor: '#0057FF',
  },
  {
    id: 'contact',
    title: 'Un numéro de contact unique et gratuit',
    icon: Headphones,
    iconColor: '#2ECC71',
  },
  {
    id: 'security',
    title: 'Un système de sécurité aux standards internationaux',
    icon: Shield,
    iconColor: '#E67E22',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animation d'entrée pour le titre
      gsap.fromTo('.features-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Animation d'entrée pour la grille (staggered)
      gsap.fromTo('.feature-grid-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative flex min-h-screen w-full flex-col justify-center bg-foam px-6 py-24 md:px-16 text-earth overflow-hidden"
      aria-label="Pourquoi choisir Wave"
    >
      {/* Background painted curves simulation */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border-[24px] border-wave-blue/10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[24px] border-aqua-light/10 pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl z-10">
        {/* Title */}
        <div className="features-header text-center mb-16 flex flex-col gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-wave-blue">Avantages</span>
          <h2 className="font-display text-4xl font-black text-deep-ocean md:text-5xl">Wave c'est</h2>
        </div>

        {/* 2x3 Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="feature-grid-card group rounded-2xl bg-white border border-deep-ocean/5 p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:shadow-xl hover:shadow-deep-ocean/5 hover:-translate-y-1"
                data-cursor="card"
              >
                {/* Lucide animated icon container */}
                <div
                  className="h-16 w-16 rounded-xl flex items-center justify-center border transition-all duration-300"
                  style={{
                    backgroundColor: `${feature.iconColor}15`,
                    borderColor: `${feature.iconColor}30`,
                  }}
                >
                  <IconComponent
                    size={32}
                    style={{ color: feature.iconColor }}
                    className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-12"
                  />
                </div>

                <h3 className="font-display text-lg font-bold text-deep-ocean leading-snug mt-6">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
