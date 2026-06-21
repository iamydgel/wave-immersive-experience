'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

export default function TransferDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const successIconRef = useRef<HTMLDivElement>(null);
  const checkPathRef = useRef<SVGPathElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const recipientAmountRef = useRef<HTMLDivElement>(null);

  const [amount, setAmount] = useState('0');
  const [recipientAmount, setRecipientAmount] = useState('45 000 FCFA');
  const [status, setStatus] = useState<'idle' | 'typing' | 'sending' | 'success'>('idle');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          runDemoTimeline();
        },
      });
    }, container);

    const runDemoTimeline = () => {
      const tl = gsap.timeline();

      // 1. Focus sur le champ montant
      tl.to('.amount-field-container', {
        borderColor: '#0057FF',
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
        onStart: () => setStatus('typing'),
      })
      
      // 2. Saisie animée du montant (incrément jusqu'à 15000)
      .to({ val: 0 }, {
        val: 15000,
        duration: 1.0,
        ease: 'power1.inOut',
        onUpdate() {
          const val = Math.round(gsap.getProperty(this.targets()[0], 'val') as number);
          setAmount(val.toLocaleString('fr-FR') + ' FCFA');
        },
      }, '+=0.2')

      // Rétablissement du champ montant (focus lost)
      .to('.amount-field-container', {
        borderColor: 'rgba(255,255,255,0.1)',
        scale: 1.0,
        duration: 0.2,
      })

      // 3. Bouton "Envoyer" s'illumine (glow shadow)
      .to(buttonRef.current, {
        boxShadow: '0 0 20px rgba(0,87,255,0.6)',
        duration: 0.3,
      })

      // 4. Clic sur le bouton (scale press feedback)
      .to(buttonRef.current, {
        scale: 0.94,
        duration: 0.1,
        ease: 'power1.in',
        onComplete: () => setStatus('sending'),
      })
      .to(buttonRef.current, {
        scale: 1.0,
        duration: 0.1,
        ease: 'power1.out',
      })

      // 5. Rotation du spinner de chargement
      .to(spinnerRef.current, {
        rotate: 360,
        duration: 0.6,
        ease: 'none',
      }, '+=0.2')

      // 6. Transition vers succès
      .call(() => {
        setStatus('success');
      })

      // 7. Coche de succès s'affiche avec draw stroke
      .fromTo('.check-path',
        { strokeDasharray: 40, strokeDashoffset: 40 },
        { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' },
        '+=0.1'
      )
      .fromTo(successIconRef.current,
        { scale: 0.8 },
        { scale: 1.0, duration: 0.4, ease: 'back.out(1.7)' },
        '<'
      )

      // 8. Notification Toast coulisse depuis le bas
      .fromTo(toastRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' },
        '+=0.2'
      )

      // 9. Mise à jour du solde destinataire avec GSAP Flip
      .call(() => {
        // Enregistrer l'état initial pour le Flip
        const state = Flip.getState('.recipient-amount');
        
        // Mettre à jour la valeur (45 000 + 15 000 = 60 000 FCFA)
        setRecipientAmount('60 000 FCFA');

        // Animer depuis l'état initial
        setTimeout(() => {
          Flip.from(state, {
            duration: 0.5,
            ease: 'power2.out',
            scale: true,
          });
        }, 50);
      });
    };

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="transfer"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col justify-center bg-deep-ocean px-6 py-24 md:px-16"
      aria-label="Démonstration de transfert Wave"
    >
      <div className="mx-auto w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left column: Text info */}
        <div className="flex flex-col gap-6 text-left">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-wave-blue">Démonstration en direct</span>
          <h2 className="font-display text-4xl font-black text-foam md:text-5xl leading-tight">
            Envoyer de l'argent n'a jamais été aussi simple
          </h2>
          <p className="font-body text-base text-foam/75 md:text-lg">
            Observez comment s'effectue un envoi standard sur notre réseau. Pas de friction, pas d'attente, un coût minimal de 0,5% et un destinataire crédité de façon instantanée.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-10 w-10 rounded-full bg-wave-blue/10 flex items-center justify-center border border-wave-blue/30 text-wave-blue font-mono text-sm font-bold">✓</div>
            <span className="font-body text-sm font-semibold text-foam/85">Notification instantanée pour l'expéditeur et le destinataire.</span>
          </div>
        </div>

        {/* Right column: Interactive demo device */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[320px] rounded-[40px] border-[8px] border-white/8 bg-black/40 p-6 shadow-2xl backdrop-blur-md overflow-hidden">
            {/* App Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-body text-xs font-semibold text-foam/60">Wave App</span>
              </div>
              <span className="font-mono text-xs text-foam/40">v2.10</span>
            </div>

            {/* Transfer form container */}
            <div className="flex flex-col gap-5">
              {/* Recipient info card */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-wave-blue flex items-center justify-center font-display text-sm font-bold text-white">
                  M
                </div>
                <div className="text-left">
                  <div className="font-body text-sm font-bold text-foam">Marie Diouf</div>
                  <div className="font-mono text-xs text-foam/50">+221 77 123 45 67</div>
                </div>
              </div>

              {/* Amount input field mockup */}
              <div className="amount-field-container rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col gap-1 transition-colors duration-300">
                <span className="font-body text-[10px] uppercase font-semibold text-foam/40 text-left">Montant à envoyer</span>
                <div className="font-mono text-xl font-bold text-foam text-left select-none">
                  {amount}
                </div>
              </div>

              {/* Submit button */}
              <button
                ref={buttonRef}
                className="w-full rounded-xl bg-wave-blue py-3.5 font-body text-sm font-bold text-white transition-all shadow-md relative overflow-hidden flex items-center justify-center"
                data-cursor="cta"
                data-cursor-text="Valider"
              >
                {status === 'idle' && 'Entrer le montant...'}
                {status === 'typing' && 'Prêt à envoyer'}
                {status === 'sending' && (
                  <div ref={spinnerRef} className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                )}
                {status === 'success' && 'Envoyé avec succès'}
              </button>
            </div>

            {/* Recipient Live Balance (GSAP Flip target) */}
            <div className="mt-8 pt-6 border-t border-white/10 text-left flex flex-col gap-2">
              <span className="font-body text-[10px] uppercase font-semibold text-foam/40">Solde de Marie après transfert</span>
              <div
                ref={recipientAmountRef}
                className="recipient-amount inline-block font-mono text-xl font-extrabold text-[#2ECC71]"
              >
                {recipientAmount}
              </div>
            </div>

            {/* Notification Toast */}
            <div
              ref={toastRef}
              className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-3 shadow-xl flex items-center gap-3 border border-white/20 opacity-0 translate-y-12 pointer-events-none z-20"
            >
              <div
                ref={successIconRef}
                className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 scale-75"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path ref={checkPathRef} className="check-path" d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-body text-xs font-bold text-black">Transfert Réussi</div>
                <div className="font-body text-[10px] text-black/60">15 000 FCFA envoyés à Marie.</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
