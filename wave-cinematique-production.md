# Wave — Cinématique de Production
### Direction Artistique & Motion Design — Niveau Awwwards
**Stack : Next.js 15 · React 19 · TypeScript · Tailwind v4 · GSAP · Framer Motion · Three.js · Lenis**

---

## 1. Concept Narratif

**Idée centrale : "L'argent qui respire"**

Wave n'est pas une banque. Wave est un flux. L'expérience doit rendre visible quelque chose d'invisible : la fluidité de l'argent entre les mains des gens en Afrique de l'Ouest. Le registre n'est pas "tech froide" — c'est **chaleur humaine + précision liquide**.

**Ton :** Confiant, ancré, généreux. Pas de jargon fintech. Pas de skylines ou de globes 3D génériques.

**Émotion cible :** Soulagement → Confiance → Appartenance. L'utilisateur doit ressentir que Wave comprend sa réalité.

**Fil rouge visuel :** Une vague d'eau — pas une métaphore abstraite, une vraie eau — qui traverse chaque section comme un courant sous-jacent. Elle apparaît en WebGL dans le Hero, se transforme en ligne SVG dans les sections intermédiaires, devient texture de fond dans le Footer.

---

## 2. Design System — Tokens de Production

### Palette "Water & Earth"

```scss
// _tokens.scss
:root {
  // Primaires
  --c-wave-blue:     #0057FF;   // Bleu Wave pur — action, CTA
  --c-deep-ocean:    #001A4D;   // Nuit marine — fond hero, textes forts
  --c-aqua-light:    #5DADE2;   // Bleu ciel eau — accents secondaires
  --c-foam:          #EAF4FF;   // Quasi-blanc mousse — fonds clairs, cards

  // Neutres chauds
  --c-sand:          #F5EFE6;   // Sable — sections narratives
  --c-earth:         #3D2B1F;   // Terre foncée — texte sur fond clair

  // Feedback
  --c-success:       #2ECC71;
  --c-alert:         #E67E22;

  // Opacités utiles
  --c-wave-blue-10:  rgba(0, 87, 255, 0.10);
  --c-deep-ocean-80: rgba(0, 26, 77, 0.80);
}
```

### Typographie

```scss
// Rôles typographiques
// Display : Clash Display (Bold, 700) — grands titres, Hero
// Body    : Satoshi (Regular 400 / Medium 500) — paragraphes, labels
// Mono    : JetBrains Mono — chiffres, montants, données

--font-display: 'Clash Display', sans-serif;
--font-body:    'Satoshi', sans-serif;
--font-mono:    'JetBrains Mono', monospace;

// Scale (fluid, clamp)
--text-hero:    clamp(3.5rem, 8vw, 8rem);       // 56px → 128px
--text-h2:      clamp(2rem, 4vw, 4rem);          // 32px → 64px
--text-h3:      clamp(1.25rem, 2.5vw, 2rem);     // 20px → 32px
--text-body:    clamp(1rem, 1.5vw, 1.125rem);    // 16px → 18px
--text-caption: 0.75rem;                          // 12px fixe
```

### Spacing & Layout

```scss
--space-unit:  8px;
--space-xs:    calc(var(--space-unit) * 1);   // 8px
--space-sm:    calc(var(--space-unit) * 2);   // 16px
--space-md:    calc(var(--space-unit) * 3);   // 24px
--space-lg:    calc(var(--space-unit) * 5);   // 40px
--space-xl:    calc(var(--space-unit) * 8);   // 64px
--space-2xl:   calc(var(--space-unit) * 13);  // 104px

--grid-cols:   12;
--grid-gutter: clamp(16px, 3vw, 32px);
--max-width:   1440px;
```

### Motion Tokens

```scss
// Durées
--dur-instant:  80ms;
--dur-fast:     200ms;
--dur-normal:   480ms;
--dur-slow:     800ms;
--dur-cinematic: 1400ms;

// Courbes
--ease-luxury:  cubic-bezier(.22, .9, .35, 1);    // Entrée premium
--ease-pop:     cubic-bezier(.2, 1, .3, 1);        // Rebond doux
--ease-flow:    cubic-bezier(.4, 0, .2, 1);        // In/out fluide
--ease-sharp:   cubic-bezier(.4, 0, 1, 1);         // Sortie rapide
--ease-water:   cubic-bezier(.05, .9, .25, 1);     // Vague — spécifique Wave
```

---

## 3. Architecture des Sections

```
┌─────────────────────────────────────────────────────────┐
│  LOADER          100vh — Preloader chiffres animés      │
├─────────────────────────────────────────────────────────┤
│  HERO            100vh — WebGL vague + headline split    │
├─────────────────────────────────────────────────────────┤
│  STATS           60vh  — Compteurs flottants             │
├─────────────────────────────────────────────────────────┤
│  FEATURES        200vh — Scroll pinné, 3 features        │
├─────────────────────────────────────────────────────────┤
│  TRANSFER        100vh — UI démo animée (envoi d'argent) │
├─────────────────────────────────────────────────────────┤
│  TESTIMONIALS    100vh — Carrousel horizontal            │
├─────────────────────────────────────────────────────────┤
│  CTA FINAL       80vh  — Fond dégradé + vague SVG        │
├─────────────────────────────────────────────────────────┤
│  FOOTER          auto                                    │
└─────────────────────────────────────────────────────────┘
```

**CTA principal :** "Envoyer de l'argent" — primaire, toujours visible (sticky mobile).
**CTA secondaire :** "Voir les tarifs" — ancre vers section Stats.

---

## 4. Storyboard Complet — Timeline Single-Shot

### PHASE 0 — Preloader (0ms → 1800ms)

| t (ms) | Élément | Action | Paramètres |
|--------|---------|--------|------------|
| 0 | Background | Apparaît | `--c-deep-ocean`, instant |
| 0 | Logo Wave (SVG path) | Draw stroke | `stroke-dashoffset` 100→0, 600ms, `--ease-luxury` |
| 300 | Compteur % | Count up 0→100 | Incréments irréguliers, `--font-mono`, 900ms |
| 800 | Barre de progression | Expand width | 0→100%, 700ms, `--ease-water` |
| 1600 | Loader entier | Slide up exit | `translateY(0→-100%)`, 400ms, `--ease-sharp` |
| 1800 | Hero commence | — | — |

```ts
// Preloader GSAP Timeline
const loaderTl = gsap.timeline();

loaderTl
  .to('.logo-path', {
    strokeDashoffset: 0,
    duration: 0.6,
    ease: 'power3.out'
  })
  .to('.counter', {
    innerHTML: 100,
    snap: { innerHTML: 1 },
    duration: 0.9,
    ease: 'none'
  }, '-=0.3')
  .to('.progress-bar', {
    scaleX: 1,
    duration: 0.7,
    ease: 'power2.inOut',
    transformOrigin: 'left center'
  }, '-=0.9')
  .to('.loader-wrapper', {
    yPercent: -100,
    duration: 0.4,
    ease: 'power2.in',
    delay: 0.2
  });
```

---

### PHASE 1 — Hero (1800ms → 3600ms depuis page load)

**Composition :**
- Fond : `--c-deep-ocean`
- Canvas WebGL (Three.js) : vague fluide plein écran, en arrière-plan
- Headline en deux lignes : "L'argent qui / circule pour vous."
- Sous-titre : 1 ligne, 18px, `--c-aqua-light`
- CTA pill : "Envoyer maintenant →"
- Scroll hint : chevron animé, bas de page

#### Séquence d'entrée Hero

| t depuis loader exit (ms) | Élément | Animation | Paramètres précis |
|--------------------------|---------|-----------|-------------------|
| 0 | WebGL Wave canvas | Fade in + wave commence | opacity 0→1, 800ms, `--ease-luxury` ; amplitude wave : 0→0.8 en 1200ms |
| 100 | Headline L1 "L'argent qui" | Slide up + reveal | `translateY(40px→0)` + clip-path `inset(100% 0 0 0 → inset(0 0 0 0)`, 700ms, `--ease-luxury` |
| 300 | Headline L2 "circule pour vous." | Idem, décalé | mêmes params, delay +200ms |
| 600 | Sous-titre | Fade + slide | `opacity 0→1`, `y: 20→0`, 500ms, `--ease-flow` |
| 900 | CTA pill | Pop in | `scale 0.85→1`, `opacity 0→1`, 400ms, `--ease-pop` |
| 1200 | Scroll hint chevron | Pulse loop | `translateY` 0→8px→0, 1400ms, `ease-in-out`, `repeat: -1` |

```ts
// Hero entrance GSAP Timeline
const heroTl = gsap.timeline({ delay: 0.1 });

// Clip-path reveal pour les lignes du titre
heroTl
  .fromTo('.hero-line-1', 
    { yPercent: 110, clipPath: 'inset(0 0 100% 0)' },
    { yPercent: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.out' }
  )
  .fromTo('.hero-line-2',
    { yPercent: 110, clipPath: 'inset(0 0 100% 0)' },
    { yPercent: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.out' },
    '-=0.5'
  )
  .fromTo('.hero-sub',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    '-=0.3'
  )
  .fromTo('.cta-pill',
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' },
    '-=0.2'
  );

// Scroll hint loop indépendant
gsap.to('.scroll-hint', {
  y: 8,
  duration: 0.7,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1
});
```

#### WebGL Wave — Three.js

```ts
// WaveGeometry.ts — Shader distortion plane
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Double sinus pour effet eau réaliste
    pos.z += sin(pos.x * uFrequency + uTime * 0.8) * uAmplitude * 0.6;
    pos.z += sin(pos.y * uFrequency * 0.7 + uTime * 1.1) * uAmplitude * 0.4;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorDeep;
  uniform vec3 uColorLight;
  uniform float uTime;

  varying vec2 vUv;

  void main() {
    // Gradient vertical basé sur la hauteur UV
    float mixFactor = vUv.y + sin(vUv.x * 3.0 + uTime * 0.5) * 0.1;
    vec3 color = mix(uColorDeep, uColorLight, mixFactor);

    // Spéculaire simple simulé
    float specular = pow(max(0.0, vUv.y - 0.6), 3.0) * 0.4;
    color += specular;

    gl_FragColor = vec4(color, 0.85);
  }
`;

export function createWave(scene: THREE.Scene) {
  const geometry = new THREE.PlaneGeometry(20, 10, 128, 64);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime:       { value: 0 },
      uAmplitude:  { value: 0 },     // animé de 0→0.8 au hero enter
      uFrequency:  { value: 1.4 },
      uColorDeep:  { value: new THREE.Color('#001A4D') },
      uColorLight: { value: new THREE.Color('#0057FF') },
    },
    transparent: true,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2.8;
  mesh.position.y = -1.5;
  scene.add(mesh);

  return { mesh, material };
}

// RAF Update
export function updateWave(material: THREE.ShaderMaterial, delta: number) {
  material.uniforms.uTime.value += delta;
}
```

---

### PHASE 2 — Stats (scroll : 0% → 100% de la section)

**3 stats :** `+8M` utilisateurs · `0,5%` de frais · `180 secondes` de transfert

```ts
// ScrollTrigger + CountUp
gsap.utils.toArray('.stat-number').forEach((el: any) => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';

  ScrollTrigger.create({
    trigger: el,
    start: 'top 75%',
    onEnter: () => {
      gsap.fromTo(el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 1.8,
          ease: 'power2.out',
          snap: { innerText: target < 10 ? 0.1 : 1 },
          onUpdate() {
            el.textContent = parseFloat(el.innerText).toFixed(
              target < 10 ? 1 : 0
            ) + suffix;
          }
        }
      );
    }
  });
});
```

**Entrée des cards stat :** stagger `0.15s`, `y: 60→0`, `opacity 0→1`, `duration: 0.8`, `ease: power3.out`.

---

### PHASE 3 — Features (scroll pinné, 200vh)

**Mécanisme :** ScrollTrigger `pin: true` sur le container. 3 features se succèdent en fade-crossfade pendant que le visuel de droite (mockup Phone) se transforme via GSAP FLIP.

```ts
// Features ScrollTrigger pinné
const featuresTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.features-section',
    pin: true,
    scrub: 1.2,         // smoothing du scrub
    start: 'top top',
    end: '+=200%',
  }
});

featuresTl
  // Feature 1 → Feature 2
  .to('.feature-1', { opacity: 0, y: -30, duration: 0.3 })
  .from('.feature-2', { opacity: 0, y: 30, duration: 0.3 }, '<')
  .to('.phone-screen-1', { opacity: 0, scale: 0.95, duration: 0.3 }, '<')
  .from('.phone-screen-2', { opacity: 0, scale: 1.05, duration: 0.3 }, '<')
  // Feature 2 → Feature 3
  .to('.feature-2', { opacity: 0, y: -30, duration: 0.3 }, '+=0.3')
  .from('.feature-3', { opacity: 0, y: 30, duration: 0.3 }, '<')
  .to('.phone-screen-2', { opacity: 0, scale: 0.95, duration: 0.3 }, '<')
  .from('.phone-screen-3', { opacity: 0, scale: 1.05, duration: 0.3 }, '<');
```

---

### PHASE 4 — Transfer Demo (section interactive)

**Concept :** UI de l'app Wave animée en direct. L'utilisateur voit un envoi d'argent se dérouler : saisie du montant → confirmation → notification succès.

**Timeline auto-play au scroll enter :**

| t (ms) | UI Event | Animation |
|--------|----------|-----------|
| 0 | Champ montant focus | Border `--c-wave-blue` + scale 1.02, 200ms |
| 400 | Chiffres tapés | CountUp 0→15 000 avec police mono, delay 80ms/chiffre |
| 1200 | Bouton "Envoyer" | Pulse glow shadow `0 0 20px rgba(0,87,255,0.5)` |
| 1400 | Bouton press | Scale 0.96→1, 150ms, `ease-in` |
| 1600 | Loading spinner | Rotation 360°, 500ms |
| 2100 | Checkmark SVG | Draw stroke + `scale 0.8→1`, 400ms, `--ease-pop` |
| 2300 | Notification toast | Slide in depuis le bas, `y: 60→0`, 350ms |
| 2600 | Montant destinataire update | Flip number via GSAP FLIP |

```ts
// GSAP FLIP — montant qui change d'état
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(Flip);

function animateTransfer() {
  const state = Flip.getState('.transfer-amount');
  // Modifier le DOM
  document.querySelector('.transfer-amount')!.textContent = '15 000 FCFA';
  // Animer depuis l'ancien état
  Flip.from(state, {
    duration: 0.5,
    ease: 'power2.out',
    scale: true,
  });
}
```

---

### PHASE 5 — Testimonials (carrousel horizontal)

**Mécanisme Lenis + GSAP horizontal scroll :**

```ts
// Horizontal scroll dans un scroll vertical
ScrollTrigger.create({
  trigger: '.testimonials-track',
  start: 'top top',
  end: () => `+=${document.querySelector('.testimonials-track')!.scrollWidth}`,
  pin: true,
  scrub: 0.8,
  animation: gsap.to('.testimonials-inner', {
    x: () => -(document.querySelector('.testimonials-inner')!.scrollWidth - window.innerWidth),
    ease: 'none',
  }),
});
```

**Card testimonial :** `border: 1px solid rgba(255,255,255,0.08)`, `backdrop-filter: blur(12px)`, `background: rgba(0,87,255,0.06)`. Hover : border color `→ rgba(0,87,255,0.4)`, `transition: 300ms`.

---

### PHASE 6 — CTA Final (80vh)

**Vague SVG animée :**

```tsx
// WaveSVG.tsx — animée en CSS
export function WaveSVG() {
  return (
    <svg viewBox="0 0 1440 120" className="wave-svg" preserveAspectRatio="none">
      <path
        className="wave-path"
        d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
      />
    </svg>
  );
}
```

```css
.wave-path {
  fill: var(--c-wave-blue);
  animation: waveSVG 4s ease-in-out infinite alternate;
}

@keyframes waveSVG {
  from { d: path("M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"); }
  to   { d: path("M0,40 C240,0 480,100 720,40 C960,0 1200,100 1440,40 L1440,120 L0,120 Z"); }
}
```

---

## 5. Curseur Custom

**Spécification :** Cercle fluide 24px, fond `--c-wave-blue` à 80% opacité, bordure blanche 1px. Lag lerp : `lerp(cursor.x, mouse.x, 0.12)`. États :

| Contexte | État curseur | Transform |
|----------|-------------|-----------|
| Défaut | Cercle 24px | — |
| Hover lien texte | Expand 48px + mix-blend-mode `difference` | `scale(2)` 200ms |
| Hover CTA | Remplissage blanc + texte "Envoyer" inside | `scale(2.5)` + opacité texte |
| Hover card | Cercle 16px + border seulement | `scale(0.66)` |
| Click | Squeeze | `scale(0.7)` 80ms snap |

```ts
// Curseur RAF dual-lerp
const cursor = { x: 0, y: 0 };
const target = { x: 0, y: 0 };
const LERP = 0.12;

window.addEventListener('mousemove', (e) => {
  target.x = e.clientX;
  target.y = e.clientY;
});

function raf() {
  cursor.x += (target.x - cursor.x) * LERP;
  cursor.y += (target.y - cursor.y) * LERP;

  gsap.set('.cursor', {
    x: cursor.x - 12,
    y: cursor.y - 12,
  });

  requestAnimationFrame(raf);
}
raf();

// États via data-attribute
document.querySelectorAll('[data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () =>
    document.querySelector('.cursor')!.setAttribute('data-state', el.dataset.cursor!)
  );
  el.addEventListener('mouseleave', () =>
    document.querySelector('.cursor')!.removeAttribute('data-state')
  );
});
```

---

## 6. Transitions de Section

**Philosophie :** Pas de fade noir. Chaque transition est thématique — l'eau qui monte, le plan qui glisse.

| Transition | Type | Durée | Paramètre |
|-----------|------|-------|-----------|
| Loader → Hero | Slide up du loader | 400ms | `yPercent: -100`, `ease: power2.in` |
| Hero → Stats | Clip-path sweep horizontal | 600ms | `clipPath: inset(0 100% 0 0 → 0 0 0 0)` |
| Stats → Features | Fondu croisé sur scroll | scrub | opacity cross, scrub 1.2 |
| Features → Transfer | Zoom out du phone | 800ms | `scale: 0.6→1`, `opacity 0→1` |
| Transfer → Testimonials | Slide left | 500ms | `xPercent: 100→0`, `ease: power3.out` |
| Testimonials → CTA | Vague SVG remonte | 700ms | path animation + bg change |

---

## 7. Gestion Lenis + GSAP ScrollTrigger

```ts
// lenis-gsap-sync.ts
import Lenis from '@studio-freight/lenis';

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  // Sync Lenis → GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}
```

---

## 8. Fallbacks & Accessibilité

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Supprime toutes les transitions non-essentielles */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Remplace les reveal GSAP par état final statique */
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
  }

  /* Canvas WebGL : affiche image statique fallback */
  .wave-canvas { display: none; }
  .wave-fallback-img { display: block; }
}
```

### WebGL Fallback

```ts
// webgl-detect.ts
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Usage dans le composant Hero
if (!supportsWebGL()) {
  // Affiche gradient CSS statique à la place
  heroSection.classList.add('no-webgl');
}
```

```css
/* Gradient fallback si pas de WebGL */
.no-webgl .hero-bg {
  background: linear-gradient(
    160deg,
    var(--c-deep-ocean) 0%,
    var(--c-wave-blue) 60%,
    var(--c-aqua-light) 100%
  );
}
```

### Accessibilité ARIA

```tsx
// Hero — exemple de markup accessible
<section
  aria-label="Bienvenue sur Wave — Envoyez de l'argent rapidement"
  role="banner"
>
  <h1 className="hero-headline">
    {/* Visually hidden pour screen readers si split-text GSAP */}
    <span className="sr-only">L'argent qui circule pour vous.</span>
    <span aria-hidden="true">
      <span className="hero-line-1">L'argent qui</span>
      <span className="hero-line-2">circule pour vous.</span>
    </span>
  </h1>

  <canvas
    className="wave-canvas"
    role="img"
    aria-label="Animation décorative d'une vague bleue"
  />
</section>
```

---

## 9. Critères d'Acceptation

### Performance
- [ ] LCP < 2.5s (mesure PageSpeed Insights, réseau 4G simulé)
- [ ] CLS < 0.1 (pas de layout shift sur les fonts — utiliser `font-display: swap` + `size-adjust`)
- [ ] FID < 100ms
- [ ] 60 FPS constant — vérifier avec Chrome DevTools Performance panel, cibler < 16.7ms/frame
- [ ] Canvas WebGL : utiliser `requestAnimationFrame` avec delta time, ne jamais dépasser 60 updates/s

### Chargement
- [ ] Fonts préchargées : `<link rel="preload" as="font">` pour Clash Display Bold et Satoshi Regular
- [ ] GSAP importé en ESM, tree-shaken : `import { gsap } from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';`
- [ ] Canvas WebGL lazy-initialisé (pas dans le render initial SSR)
- [ ] Three.js importé dynamiquement : `const THREE = await import('three')`

### Accessibilité
- [ ] Contraste texte ≥ 4.5:1 (texte blanc sur `--c-wave-blue` : ratio 4.6:1 ✓)
- [ ] Navigation clavier complète : focus visible, tab order logique
- [ ] Tous les éléments interactifs ont un label ARIA
- [ ] `prefers-reduced-motion` respecté (testé avec DevTools override)
- [ ] Canvas a `role="img"` + `aria-label`

### Cross-Device
- [ ] Mobile (375px) : hero headline < 48px, CTA full-width, WebGL désactivé sur < 4GB RAM
- [ ] Tablet (768px) : layout ajusté, horizontal scroll testimonials → vertical
- [ ] Desktop (1440px) : rendu de référence

---

## 10. Handoff & Assets

### Assets à exporter

```
/assets
  /fonts
    ClashDisplay-Bold.woff2
    Satoshi-Regular.woff2
    Satoshi-Medium.woff2
    JetBrainsMono-Regular.woff2
  /images
    hero-bg-fallback.webp       (1440×900, < 80ko)
    wave-static.webp            (pour no-webgl)
    og-image.png                (1200×630)
  /icons
    logo.svg
    logo-white.svg
    arrow-right.svg
    checkmark.svg
  /3d
    (aucun fichier .glb — tout généré procéduralement en Three.js)
```

### Naming Convention

```
composant-état-variante.extension
ex : cta-pill-default.svg
     cta-pill-hover.svg
     card-feature-active.png
```

### Instructions Dev Front

1. Initialiser Lenis avant ScrollTrigger (ordre critique).
2. Three.js canvas : `position: absolute`, `z-index: 0`, pointer-events `none`.
3. GSAP `ScrollTrigger.refresh()` à appeler après tout changement de layout (resize, font load).
4. Toutes les animations GSAP dans des `useLayoutEffect` côté React pour éviter flash.
5. `gsap.context()` pour cleanup propre au unmount.

```ts
// Pattern React + GSAP propre
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Toutes vos animations ici — auto-scope au ref
      gsap.fromTo('.hero-line-1', { yPercent: 110 }, { yPercent: 0, duration: 0.7 });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup au unmount
  }, []);

  return <section ref={sectionRef}>...</section>;
}
```

---

## 11. Checklist Finale de Production

- [ ] Émotion cible atteinte : soulagement → confiance → appartenance
- [ ] Preloader 0→100 en < 1.8s, exit smooth
- [ ] Hero WebGL opérationnel (+ fallback gradient testé)
- [ ] Headline split-text avec clip-path propre sur Firefox/Safari
- [ ] Stats CountUp déclenché par IntersectionObserver
- [ ] Features scroll pinné : pas de jank sur scrub
- [ ] Transfer Demo : GSAP FLIP opérationnel, timing 2.6s total
- [ ] Testimonials : horizontal scroll fluide, fin propre
- [ ] Curseur custom : tous états fonctionnels, désactivé mobile
- [ ] Transitions de section : aucune coupure visible
- [ ] Vague SVG CTA : animation `d:` fonctionnelle (Firefox requiert SMIL ou JS pour `d:` animé en CSS)
- [ ] Lenis + ScrollTrigger sync sans drift
- [ ] `prefers-reduced-motion` : testé sur macOS et Windows
- [ ] WebGL fallback : testé sur Chrome avec `--disable-webgl`
- [ ] LCP < 2.5s : validé PageSpeed
- [ ] CLS < 0.1 : validé
- [ ] Keyboard nav : tab order testé jusqu'au footer
- [ ] Contrast ratio : validé tous textes
- [ ] Assets exportés : tous formats, nommage cohérent

---

*Document de production — Wave Immersive Experience*
*Stack : Next.js 15 · React 19 · TypeScript · Tailwind v4 · GSAP · Framer Motion · Three.js · Lenis*
*Format : Direction de production — valeurs décidées, paramètres prêts à implémenter*
