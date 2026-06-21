'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  id: string;
  label: string;
  target: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  duration: number;
  delay: number;
}

const statsData: StatItem[] = [
  {
    id: 'users',
    label: 'utilisateurs actifs',
    target: 8000000,
    decimals: 0,
    prefix: '+',
    suffix: '',
    duration: 1.8,
    delay: 0.4,
  },
  {
    id: 'fee',
    label: 'de frais d\'envoi',
    target: 0.5,
    decimals: 1,
    prefix: '',
    suffix: '%',
    duration: 1.2,
    delay: 0.52,
  },
  {
    id: 'time',
    label: 'secondes de transfert',
    target: 180,
    decimals: 0,
    prefix: '',
    suffix: 's',
    duration: 0.9,
    delay: 0.64,
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Entrée des cartes de stats
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out', // = $ease-luxury
          stagger: 0.12, // = $delay-loose
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // 2. CountUp des chiffres
      statsData.forEach(({ id, target, decimals, prefix = '', suffix = '', duration, delay }) => {
        const numberEl = document.querySelector(`.stat-number-${id}`);
        if (!numberEl) return;

        const proxy = { val: 0 };

        ScrollTrigger.create({
          trigger: numberEl,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(proxy, {
              val: target,
              duration,
              delay,
              ease: 'power2.out',
              onUpdate() {
                let display = '';
                if (target >= 1000000) {
                  display = (proxy.val / 1000000).toFixed(1) + 'M';
                } else {
                  display = proxy.val.toFixed(decimals);
                }
                numberEl.textContent = `${prefix}${display}${suffix}`;
              },
            });
          },
        });
      });

      // 3. Parallaxe de profondeur au scroll
      gsap.to('.stat-card-left, .stat-card-right', {
        y: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.stat-card-center', {
        y: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // 4. Fondu de sortie vers la section Features
      gsap.to(section, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '80% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative flex min-h-[60vh] w-full flex-col justify-center bg-deep-ocean px-6 py-24 md:px-16"
      aria-label="Statistiques clés Wave"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {statsData.map((stat, index) => {
            const positionClass =
              index === 0
                ? 'stat-card-left'
                : index === 1
                ? 'stat-card-center'
                : 'stat-card-right';
            return (
              <div
                key={stat.id}
                className={`stat-card ${positionClass} rounded-2xl border border-white/8 bg-white/4 p-8 text-center backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(0,87,255,0.15)]`}
                data-cursor="card"
              >
                <div
                  className={`stat-number-${stat.id} font-mono text-5xl font-black tracking-tight text-wave-blue md:text-6xl lg:text-7xl`}
                >
                  {stat.prefix}0{stat.suffix}
                </div>
                <div className="mt-4 font-body text-sm font-semibold uppercase tracking-wider text-foam/60">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
