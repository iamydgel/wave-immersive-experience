'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import TransferDemo from '@/components/TransferDemo';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { initLenis } from '@/utils/lenis-gsap-sync';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialiser Lenis une fois que le preloader a terminé et que le composant est monté
    let lenis: any = null;
    if (isLoaded) {
      lenis = initLenis();
    }
    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [isLoaded]);

  return (
    <div className="relative min-h-screen w-full bg-deep-ocean selection:bg-wave-blue selection:text-white">
      {/* Curseur personnalisé */}
      <CustomCursor />

      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Pages / Sections */}
      <main className="w-full">
        <Hero isLoaded={isLoaded} />
        <Stats />
        <Features />
        <TransferDemo />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
