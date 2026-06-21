import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-wave-blue px-6 py-12 md:px-16 text-white border-t border-white/10">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left branding */}
        <div className="flex items-center gap-2">
          {/* Wave Logo PNG */}
          <Image
            src="/logo.png"
            alt="Wave Logo"
            width={40}
            height={20}
            className="h-5 w-auto object-contain brightness-0 invert"
          />
          <span className="font-display text-lg font-bold tracking-wider">Wave</span>
        </div>

        {/* Center links */}
        <div className="flex gap-6 text-sm font-body font-medium text-white/80">
          <a href="#stats" className="hover:text-white" data-cursor="link">Tarifs</a>
          <a href="#features" className="hover:text-white" data-cursor="link">Fonctionnalités</a>
          <a href="#transfer" className="hover:text-white" data-cursor="link">Démonstration</a>
          <a href="#testimonials" className="hover:text-white" data-cursor="link">Avis</a>
        </div>

        {/* Right copy */}
        <div className="font-mono text-xs text-white/60">
          © {new Date().getFullYear()} Wave Immersive Experience. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
