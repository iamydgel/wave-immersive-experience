# Wave — Motion Design Master Document
### Direction Motion Awwwards / FWA — Spécification de Production Complète
**Concept narratif : "L'argent qui respire" — Soulagement → Confiance → Appartenance**

---

## 1. Creative Direction

### Univers

Wave opère dans un monde où l'argent a longtemps été synonyme de friction, de file d'attente, d'incertitude. La proposition émotionnelle du site est de **rendre cette friction invisible** — de montrer que l'argent peut circuler aussi naturellement que l'eau.

L'univers visuel est celui de **l'eau profonde au crépuscule** : bleu marine intense, lumières qui traversent un liquide, reflets qui bougent sans qu'on comprenne exactement pourquoi. Ce n'est pas une interface. C'est un environnement.

Chaque section est un espace différent de cet environnement. On ne scrolle pas des sections — **on plonge**.

### Émotions recherchées par section

| Section | Émotion d'entrée | Émotion de sortie |
|---------|-----------------|-------------------|
| Loader | Anticipation | Impatience (positive) |
| Hero | Surprise → Souffle coupé | Confiance |
| Stats | Réassurance chiffrée | Légèreté |
| Features | Compréhension progressive | Évidence |
| Transfer Demo | Empathie → Identification | Soulagement |
| Testimonials | Reconnaissance (ce sont eux) | Appartenance |
| CTA Final | Élan | Décision |

### Rythme général

**Tempo dominant : lent → très lent.** L'impatience est l'ennemi. Le site prend son temps parce que Wave est sûr de lui. Les animations longues signalent la qualité, pas la lenteur. Les transitions rapides sont réservées aux micro-interactions et aux feedbacks immédiats.

**Ratio durées :** 70% des animations entre 600ms et 1200ms. Aucune animation critique en dessous de 300ms (trop mécanique). Aucune au-dessus de 2000ms sauf WebGL ambiant.

### Personnalité du site

Wave ne se présente pas. Wave **existe**. L'interface ne dit pas "Regardez comme nous sommes modernes." Elle dit "Vous êtes arrivé quelque part qui comprend ce dont vous avez besoin."

Conséquence motion : **pas d'animations d'entrée qui se font remarquer**. Les éléments apparaissent comme s'ils avaient toujours été là et qu'on les découvrait enfin. Clip-path reveals plutôt que fade-ins. Gravity reveals plutôt que slides. **La matière a du poids.**

---

## 2. Motion Language

### Philosophie du mouvement

L'eau a une physique. Elle ne rebondit pas. Elle ne slide pas proprement. Elle s'écoule, s'accélère dans les passages étroits, ralentit dans les espaces ouverts, garde une inertie après la force. Toute la motion language de Wave est construite sur cette physique.

**Inertie :** Les éléments continuent légèrement après la fin de l'input. Spring damping élevé, pas d'overshooting brutal.

**Poids :** Les grands éléments bougent plus lentement que les petits. Un titre de 128px prend 800ms. Une icône de 24px prend 200ms.

**Profondeur :** Les éléments au premier plan bougent plus vite au scroll que les éléments en fond (parallax naturel). Pas de 3D transform artificiel — la profondeur vient des vitesses différentielles.

**Respiration :** Les boucles ambiantes sont longues (3s+), subtiles (amplitude < 8px), asymétriques (entrée ≠ sortie). Jamais mécaniques.

---

### Motion Design System — Tokens Complets

#### Duration Tokens

```scss
// _motion-tokens.scss

// DURATION
$dur-xs:         80ms;    // Feedback immédiat (cursor, hover state toggle)
$dur-s:         200ms;    // Micro-transitions (border, color, opacity)
$dur-m:         480ms;    // UI transitions (cards, labels, sous-titres)
$dur-l:         800ms;    // Entrées majeures (sections, images, blocs)
$dur-xl:       1200ms;    // Cinématiques (hero headline, transitions scènes)
$dur-cinematic: 1800ms;   // Séquences d'ouverture, loader exit

// CSS Custom Properties équivalentes
:root {
  --dur-xs:        80ms;
  --dur-s:        200ms;
  --dur-m:        480ms;
  --dur-l:        800ms;
  --dur-xl:      1200ms;
  --dur-cinematic: 1800ms;
}
```

#### Delay Scale (Stagger)

```scss
// DELAY — utilisé exclusivement pour les staggers
$delay-unit:   60ms;    // Delta entre items adjacents (listes, grilles)
$delay-tight:  40ms;    // Stagger serré — items très liés (lettres d'un mot)
$delay-loose:  120ms;   // Stagger large — items indépendants (cards témoignages)
$delay-breath: 200ms;   // Respiration entre groupes (titre → sous-titre → CTA)

// Usage :
// .item-1 { animation-delay: 0 * $delay-unit; }         // 0ms
// .item-2 { animation-delay: 1 * $delay-unit; }         // 60ms
// .item-3 { animation-delay: 2 * $delay-unit; }         // 120ms
```

#### Bezier Presets

```scss
// EASINGS — nommés par comportement physique, pas par valeur
$ease-water:    cubic-bezier(.05, .9, .25, 1);    // Flux principal — tout ce qui est Wave
$ease-luxury:   cubic-bezier(.22, .9, .35, 1);    // Entrées premium — titres, reveals
$ease-flow:     cubic-bezier(.4,  .0, .2,  1);    // In/out symétrique — transitions scroll
$ease-gravity:  cubic-bezier(.4,  .0, 1,   1);    // Sortie rapide — exits, hovers off
$ease-emerge:   cubic-bezier(.2,  1,  .3,  1);    // Pop doux — CTA, badges, notifications
$ease-sharp:    cubic-bezier(.4,  .0, .6,  0);    // Mécanique — loader progress bar

:root {
  --ease-water:   cubic-bezier(.05, .9, .25, 1);
  --ease-luxury:  cubic-bezier(.22, .9, .35, 1);
  --ease-flow:    cubic-bezier(.4,  .0, .2,  1);
  --ease-gravity: cubic-bezier(.4,  .0, 1,   1);
  --ease-emerge:  cubic-bezier(.2,  1,  .3,  1);
  --ease-sharp:   cubic-bezier(.4,  .0, .6,  0);
}
```

**Justification des courbes :**
- `$ease-water` est l'ease signature. Démarrage très lent (0.05), accélération progressive, fin douce (0.25). Simule la résistance initiale de l'eau puis son écoulement naturel.
- `$ease-luxury` démarre plus vite (0.22) — pour les titres qui doivent s'imposer dès le premier frame.
- `$ease-gravity` en sortie uniquement : l'élément accélère en quittant l'écran, comme sous l'effet de la gravité.
- `$ease-emerge` pour tout ce qui émerge du fond (CTA, toasts) — légère overshoot contrôlée.

#### Spring Presets (Framer Motion)

```ts
// springs.ts — pour tous les composants Framer Motion

export const springs = {
  // HEAVY — grands blocs, cards, modales
  heavy: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 20,
    mass: 1.2,
  },

  // FLUID — mouvements principaux de l'interface
  fluid: {
    type: 'spring' as const,
    stiffness: 140,
    damping: 18,
    mass: 1.0,
  },

  // LIGHT — micro-interactions, curseur, hover
  light: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 22,
    mass: 0.6,
  },

  // SNAP — feedback immédiat, press states
  snap: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 30,
    mass: 0.4,
  },
} as const;

// Usage Framer Motion :
// <motion.div animate={{ y: 0 }} transition={springs.fluid} />
```

#### Opacity Presets

```scss
// OPACITY — états sémantiques, pas valeurs arbitraires
$opacity-hidden:   0;
$opacity-ghost:    0.08;   // Background hints, overlays transparents
$opacity-subtle:   0.24;   // Disabled states, décorations
$opacity-muted:    0.48;   // Éléments secondaires au repos
$opacity-partial:  0.72;   // Éléments actifs mais pas focus principal
$opacity-strong:   0.88;   // Near-full — légèreté intentionnelle
$opacity-full:     1;

// Pattern d'utilisation :
// Révélation d'élément : $opacity-hidden → $opacity-full
// Hover sur card inactive : $opacity-muted → $opacity-full
// Disabled CTA : $opacity-full → $opacity-subtle
```

#### Distance Presets (Translation)

```scss
// DISTANCE — amplitudes de déplacement intentionnelles
$dist-micro:   4px;    // Hover feedback, cursor stretch
$dist-xs:      8px;    // Breathing animations, scroll hint
$dist-s:       16px;   // Sous-titres, labels, captions
$dist-m:       32px;   // Corps de texte, images secondaires
$dist-l:       64px;   // Titres principaux, sections
$dist-xl:     120px;   // Transitions majeures, slide-ins
$dist-full:   100%;    // Exits complets, loader transition

// Règle : la distance est proportionnelle à la taille de l'élément
// Un H1 de 128px : $dist-l (64px = 50% de sa hauteur)
// Un caption de 12px : $dist-s (16px)
// Jamais plus de 50% de la hauteur propre de l'élément
```

#### Scale Presets

```scss
$scale-pressed:  0.94;   // Button press feedback
$scale-shrink:   0.96;   // Sortie douce d'éléments
$scale-rest:     1.00;   // État normal
$scale-hover:    1.02;   // Hover cards (subtil, pas de zoom brutal)
$scale-pop:      1.06;   // Apparition d'éléments avec légère overshoot
$scale-focus:    1.04;   // Focus visible sur éléments interactifs
```

#### Blur Presets

```scss
$blur-none:   0px;
$blur-xs:     2px;    // Profondeur légère, fond de cards
$blur-s:      4px;    // Glassmorphism léger — cards testimonials
$blur-m:      12px;   // Overlays, backdrop modales
$blur-l:      24px;   // Transitions entre sections (blur out avant reveal)
$blur-xl:     48px;   // Aura glow, soft shadows étendus

// Backdrop-filter utilisé uniquement pour :
// 1. Cards testimonials (backdrop-filter: blur(12px))
// 2. Navbar sticky au scroll (backdrop-filter: blur(8px))
// Ne jamais stacker plus de 2 backdrop-filter dans le DOM (perf GPU)
```

#### Rotation Presets

```scss
$rot-micro:   0.5deg;   // Breathing subtil — icônes ambiantes
$rot-tilt:    2deg;     // Hover cards (légère inclinaison perspective)
$rot-icon:    45deg;    // Flèches, toggles
$rot-spin:    360deg;   // Loader spinner
$rot-full:    180deg;   // Accordion chevron
```

---

## 3. Storyboard Section par Section

---

### SECTION 0 — LOADER

**Durée totale : 1800ms**

**Pourquoi un loader ?** Parce que Three.js, les fonts Clash Display et les shaders doivent charger. Le loader est une **promesse** : "Ce qui arrive en vaut la peine." Il utilise le suspense comme outil émotionnel.

#### Entrée (0ms → 200ms)
- **Background** : `#001A4D` apparaît instantané. Pas d'animation. La nuit marine est là d'emblée.
- **Pourquoi** : contraste immédiat avec le blanc du browser précédent. Choc visuel positif.

#### Vie du Loader (200ms → 1600ms)

| t (ms) | Élément | État initial → final | Durée | Easing | Justification |
|--------|---------|---------------------|-------|--------|---------------|
| 200 | Logo SVG path (stroke) | `stroke-dashoffset: 1` → `0` | 600ms | `$ease-luxury` | Le logo se dessine = Wave prend vie sous nos yeux |
| 300 | Counter "00" | `0` → `100` | 900ms | `linear` | Linéaire intentionnel — progression honnête, pas de magie |
| 500 | Barre de progression | `scaleX: 0` → `1` | 800ms | `$ease-water` | Suit le counter avec 200ms de lag — la barre *confirme* le chiffre |
| 1200 | Counter + Bar | `opacity: 1` → `0.4` | 200ms | `$ease-gravity` | S'effacent avant la sortie — laisser place au geste |

```ts
// loader.ts — Timeline GSAP complète
import { gsap } from 'gsap';

export function initLoader(onComplete: () => void) {
  // Préparer le path SVG pour le stroke animation
  const logoPath = document.querySelector<SVGPathElement>('.logo-path');
  if (logoPath) {
    const length = logoPath.getTotalLength();
    gsap.set(logoPath, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  }

  const tl = gsap.timeline({
    onComplete,
  });

  tl
    // Logo draw
    .to('.logo-path', {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: 'power3.out', // = $ease-luxury
    }, 0.2)

    // Counter — vitesse irrégulière simulée via snap
    .to('.loader-counter', {
      textContent: 100,
      duration: 0.9,
      ease: 'none',
      snap: { textContent: 1 },
      onUpdate() {
        // Formatage "07" au lieu de "7"
        const val = Math.round(gsap.getProperty(this.targets()[0], 'textContent') as number);
        (this.targets()[0] as HTMLElement).textContent = String(val).padStart(2, '0');
      },
    }, 0.3)

    // Progress bar — suit avec 200ms de lag
    .to('.loader-bar', {
      scaleX: 1,
      transformOrigin: 'left center',
      duration: 0.8,
      ease: 'power1.inOut', // = $ease-sharp
    }, 0.5)

    // Fade out counter + bar avant l'exit
    .to(['.loader-counter', '.loader-bar-wrapper'], {
      opacity: 0.4,
      duration: 0.2,
      ease: 'power2.in',
    }, 1.2);

  return tl;
}
```

#### Sortie (1600ms → 1800ms)
- **Mécanisme** : `translateY(0 → -100%)` sur le wrapper entier, 400ms, `$ease-sharp`.
- **Pourquoi sharp en sortie** : le loader doit partir vite. Il a rempli son rôle. La gravité l'emporte vers le haut, révélant le Hero d'un coup.
- **Simultané** : le Hero WebGL canvas commence son `opacity: 0→1` à -100ms avant la fin du loader exit. **Overlap intentionnel** : on ne voit jamais de vide entre les deux.

```ts
// Suite du loader — exit + trigger hero
tl
  .to('.loader-wrapper', {
    yPercent: -100,
    duration: 0.4,
    ease: 'power2.in',
  }, 1.5) // commence à 1500ms, termine à 1900ms
  .call(() => {
    // Trigger Hero entrance (overlap -100ms)
    import('./hero').then(({ initHero }) => initHero());
  }, [], 1.6); // déclenché à 1600ms
```

---

### SECTION 1 — HERO

**Durée totale de la séquence d'entrée : 1800ms après loader exit**

**Objectif émotionnel : le "souffle coupé".** L'utilisateur arrive sur une étendue sombre et vivante. Quelque chose bouge dessous. Puis des mots apparaissent comme s'ils s'imposaient naturellement.

#### Vie du Hero (état permanent, post-entrée)

**WebGL Wave — comportement ambiant :**
- Amplitude vague : `0.6` en état de repos
- Fréquence : `1.4` Hz
- Mouvement de caméra léger au scroll : camera Y `-0.002 * scrollY` (parallax 3D)
- **Mouse parallax** : position de la vague répond au curseur avec lag `0.04` LERP
  - Mouse X → `uOffset.x` : `± 0.15` en amplitude max
  - Mouse Y → hauteur de la caméra : `± 0.08` en amplitude max
- **Respiration** : `uAmplitude` oscille de `0.6` à `0.72` sur une sinusoïde de 3.2 secondes — jamais perçu consciemment, ressenti physiquement

```ts
// hero-webgl.ts — Boucle RAF avec mouse parallax + breathing
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
let breathPhase = 0;

window.addEventListener('mousemove', (e) => {
  targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 → 1
  targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function tick(delta: number) {
  // Lerp curseur → très lent pour effet liquide
  mouseX += (targetMouseX - mouseX) * 0.04;
  mouseY += (targetMouseY - mouseY) * 0.04;

  // Breathing
  breathPhase += delta * 0.314; // 2π / 3200ms ≈ 0.00196 rad/ms → 0.314 rad/s
  const breathAmp = 0.6 + Math.sin(breathPhase) * 0.06; // 0.54 → 0.66

  // Update uniforms
  waveMaterial.uniforms.uTime.value += delta;
  waveMaterial.uniforms.uAmplitude.value = breathAmp;
  waveMaterial.uniforms.uOffset.value.set(mouseX * 0.15, mouseY * 0.08);

  renderer.render(scene, camera);
  requestAnimationFrame((t) => tick(t / 1000));
}
```

**Headline — état permanent :**
- Aucune animation d'idle. Les mots sont là, stables, autoritaires.
- **Pourquoi** : les animations idle sur les titres principaux sentent l'agitation. Wave est calme.

**Scroll hint chevron :**
- `translateY: 0 → 8px → 0`, boucle 1400ms, `ease: sine.inOut`
- `opacity: 0.6` — jamais plein opaque. Discret mais visible.
- Disparaît après 20% de scroll du Hero : `opacity: 0`, 200ms

#### Séquence d'entrée Hero — Détail ms par ms

| t (ms) | Élément | De | Vers | Durée | Easing | Ordre & Pourquoi |
|--------|---------|----|----|-------|--------|-----------------|
| 0 | WebGL canvas | `opacity: 0` | `opacity: 1` | 800ms | `$ease-luxury` | En premier — le monde existe avant les mots |
| 0 | `uAmplitude` | `0` | `0.6` | 1200ms | `$ease-water` | La vague monte progressivement — montée des eaux |
| 200 | Headline L1 (clip-path) | `inset(0 0 100% 0)` `y: 100%` | `inset(0 0 0% 0)` `y: 0` | 700ms | `$ease-luxury` | Les mots émergent du sol — gravité inversée |
| 400 | Headline L2 (clip-path) | idem | idem | 700ms | `$ease-luxury` | 200ms après L1 — lecture naturelle haut→bas |
| 700 | Sous-titre | `opacity: 0` `y: 20px` | `opacity: 1` `y: 0` | 500ms | `$ease-flow` | Plus léger que le titre → durée et distance réduites |
| 900 | Navbar items | `opacity: 0` `y: -12px` | `opacity: 1` `y: 0` | 400ms | `$ease-emerge` | Stagger 60ms entre items. Vient d'en haut — "cadrage" |
| 1100 | CTA pill | `scale: 0.88` `opacity: 0` | `scale: 1` `opacity: 1` | 480ms | `$ease-emerge` | Le dernier à arriver = le plus important. Arrive avec légère overshoot |
| 1400 | Scroll hint | `opacity: 0` | `opacity: 0.6` | 300ms | `$ease-flow` | Quand tout est là, seulement alors on invite au scroll |

```ts
// hero-entrance.ts
import { gsap } from 'gsap';
import { springs } from './springs';

export function initHero() {
  const tl = gsap.timeline();

  // WebGL fade in + amplitude montée
  tl.to('.hero-canvas', {
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
  }, 0);

  // L1 — clip-path + translate simultanés
  tl.fromTo('.hero-line-1',
    {
      clipPath: 'inset(0 0 100% 0)',
      y: '100%',
    },
    {
      clipPath: 'inset(0 0 0% 0)',
      y: '0%',
      duration: 0.7,
      ease: 'power3.out',
    },
    0.2 // t=200ms
  );

  // L2 — identique, +200ms
  tl.fromTo('.hero-line-2',
    {
      clipPath: 'inset(0 0 100% 0)',
      y: '100%',
    },
    {
      clipPath: 'inset(0 0 0% 0)',
      y: '0%',
      duration: 0.7,
      ease: 'power3.out',
    },
    0.4 // t=400ms
  );

  // Sous-titre
  tl.fromTo('.hero-subtitle',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    0.7
  );

  // Navbar stagger (items individuels)
  tl.fromTo('.nav-item',
    { opacity: 0, y: -12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.06,
    },
    0.9
  );

  // CTA pill — back.out pour l'overshoot
  tl.fromTo('.cta-pill',
    { scale: 0.88, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.48, ease: 'back.out(1.7)' },
    1.1
  );

  // Scroll hint fade in
  tl.fromTo('.scroll-hint',
    { opacity: 0 },
    { opacity: 0.6, duration: 0.3, ease: 'power1.out' },
    1.4
  );

  // Scroll hint breathing loop (indépendant de la timeline)
  gsap.to('.scroll-hint', {
    y: 8,
    duration: 0.7,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1.7, // commence après fade in
  });

  return tl;
}
```

#### Sortie du Hero
**Mécanisme** : ScrollTrigger scrub. Quand l'utilisateur commence à scroller :
- Hero headline : `opacity: 1→0`, `y: 0→-40px`, début à 10% scroll, fin à 40%
- Sous-titre : `opacity: 1→0`, `y: 0→-20px`, début à 5%, fin à 30%
- Canvas WebGL : `opacity: 1→0.3`, reste partiel — **sa disparition complète se fait dans Stats**
- Transition vers Stats : clip-path sweep horizontal `inset(0 100% 0 0 → 0 0 0 0)`, 600ms, `$ease-water`

```ts
// hero-exit.ts — ScrollTrigger sur la sortie du Hero
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHeroExit() {
  // Parallax du contenu Hero au scroll
  gsap.to('.hero-content', {
    y: -80,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  // Canvas reste plus longtemps
  gsap.to('.hero-canvas', {
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: '30% top',
      end: 'bottom top',
      scrub: 2,
    },
  });
}
```

---

### SECTION 2 — STATS

**Objectif émotionnel : réassurance froide → légèreté.** Les chiffres ne mentent pas. Mais ils ne doivent pas être froids. Ils arrivent avec du poids, comptent, puis respirent.

#### Entrée

Les 3 cards stats entrent avec un stagger `$delay-loose` (120ms).

| Élément | De | Vers | Durée | Easing | t relatif |
|---------|----|----|-------|--------|-----------|
| Card 1 | `opacity: 0` `y: 60px` | `opacity: 1` `y: 0` | 800ms | `$ease-water` | 0ms |
| Card 2 | idem | idem | 800ms | `$ease-water` | 120ms |
| Card 3 | idem | idem | 800ms | `$ease-water` | 240ms |
| Chiffre card 1 | `0` | `8 000 000` | 1800ms | `power2.out` | 400ms après card enter |
| Chiffre card 2 | `0` | `0.5` | 1200ms | `power2.out` | 520ms |
| Chiffre card 3 | `0` | `180` | 900ms | `power2.out` | 640ms |

**Pourquoi des durées différentes pour les CountUp ?** Parce que les 3 doivent **finir en même temps** (t=2440ms depuis trigger). Les grands chiffres ont plus de chemin à parcourir, donc plus de temps. Les petits finissent avec le même accent final.

```ts
// stats-countup.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StatConfig {
  selector: string;
  target: number;
  decimals: number;
  suffix: string;
  duration: number; // calculé pour finir ensemble
  delay: number;
  prefix?: string;
}

const stats: StatConfig[] = [
  {
    selector: '.stat-users',
    target: 8_000_000,
    decimals: 0,
    suffix: '',
    prefix: '+',
    duration: 1.8,
    delay: 0.4,
  },
  {
    selector: '.stat-fee',
    target: 0.5,
    decimals: 1,
    suffix: '%',
    duration: 1.2,
    delay: 0.52,
  },
  {
    selector: '.stat-time',
    target: 180,
    decimals: 0,
    suffix: 's',
    duration: 0.9,
    delay: 0.64,
  },
];

export function initStats() {
  stats.forEach(({ selector, target, decimals, suffix, prefix = '', duration, delay }) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const proxy = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        // Card enter
        gsap.fromTo(el.closest('.stat-card'),
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );

        // CountUp
        gsap.to(proxy, {
          val: target,
          duration,
          delay,
          ease: 'power2.out',
          onUpdate() {
            const formatted = proxy.val.toFixed(decimals);
            const display = target >= 1_000_000
              ? (proxy.val / 1_000_000).toFixed(1) + 'M'
              : formatted;
            el.textContent = `${prefix}${display}${suffix}`;
          },
        });
      },
    });
  });
}
```

#### Vie de la Section Stats
- Cards ont un `box-shadow: 0 0 0 1px rgba(0,87,255,0.12)` au repos
- Au scroll (scrub léger) : très légère parallax vertical `y: 0→-16px` pour la card centrale vs `y: 0→-8px` pour les latérales — **profondeur de champ simulée**

#### Sortie
Fondu croisé scrub vers Features. `opacity: 0` commence à 60% de la section, finit à 100%.

---

### SECTION 3 — FEATURES (SCROLL PINNÉ)

**Durée de scroll : 200vh**
**Objectif émotionnel : compréhension progressive → évidence.**

L'interface ne liste pas des features. Elle les **révèle** une par une, comme si on les découvrait en avançant dans l'eau. Le phone à droite **morphe** — pas de fade brut entre les screens.

#### Architecture du Scroll Pinné

```
vh 0% : Feature 1 visible, Phone Screen 1
vh 33% : Transition 1→2 (cross-fade 600ms en scrub)
vh 50% : Feature 2 visible, Phone Screen 2
vh 66% : Transition 2→3
vh 100% : Feature 3 visible, Phone Screen 3
```

#### Entrée de chaque Feature (cross-fade dans le scrub)

| Feature out | De | Vers | Durée scrub | |
|------------|----|----|------------|---|
| Texte Feature N | `opacity: 1` `y: 0` | `opacity: 0` `y: -24px` | 16% scroll | Sort vers le haut |
| Texte Feature N+1 | `opacity: 0` `y: 24px` | `opacity: 1` `y: 0` | 16% scroll | Entre par le bas |
| Phone Screen N | `opacity: 1` `scale: 1` `blur: 0` | `opacity: 0` `scale: 0.96` `blur: 4px` | 16% scrub | S'efface avec micro-shrink |
| Phone Screen N+1 | `opacity: 0` `scale: 1.04` `blur: 4px` | `opacity: 1` `scale: 1` `blur: 0` | 16% scrub | Emerge avec micro-zoom out |

**Pourquoi blur sur le phone en transition ?** Le flou simule un rack focus photographique. On passe d'un plan à l'autre comme une caméra change de mise au point. Effacement mécanique = changement de slide. Blur = profondeur de champ.

```ts
// features-scroll.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initFeatures() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.features-section',
      pin: true,
      scrub: 1.5,       // Smoothing — valeur haute pour fluidité maximale
      start: 'top top',
      end: '+=200%',
      anticipatePin: 1, // Réduit le jank au moment du pin
    },
  });

  // ——— Transition Feature 1 → 2 (commence à 25% de la timeline) ———
  tl
    // Texte out
    .to('.feature-text-1', {
      opacity: 0, y: -24,
      duration: 0.16,
    }, 0.25)
    // Phone out
    .to('.phone-screen-1', {
      opacity: 0, scale: 0.96,
      filter: 'blur(4px)',
      duration: 0.16,
    }, '<')
    // Texte in
    .fromTo('.feature-text-2',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.16 },
      '<'
    )
    // Phone in
    .fromTo('.phone-screen-2',
      { opacity: 0, scale: 1.04, filter: 'blur(4px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.16 },
      '<'
    )

    // ——— Transition Feature 2 → 3 (à 58%) ———
    .to('.feature-text-2', {
      opacity: 0, y: -24,
      duration: 0.16,
    }, 0.58)
    .to('.phone-screen-2', {
      opacity: 0, scale: 0.96,
      filter: 'blur(4px)',
      duration: 0.16,
    }, '<')
    .fromTo('.feature-text-3',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.16 },
      '<'
    )
    .fromTo('.phone-screen-3',
      { opacity: 0, scale: 1.04, filter: 'blur(4px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.16 },
      '<'
    );

  // Progress indicator — pill qui avance (optionnel)
  gsap.to('.features-progress-fill', {
    scaleX: 1,
    transformOrigin: 'left center',
    ease: 'none',
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top top',
      end: '+=200%',
      scrub: true,
    },
  });
}
```

#### Vie de la Section Features
- **Indicator de progression** : 3 dots en haut. Dot actif pulse légèrement (`scale: 1→1.3→1`, 600ms loop) et change de couleur `→ --c-wave-blue`.
- **Phone** : très légère rotation 3D au mouse (`rotateY: ±4deg`, `rotateX: ±2deg`), perspective `1000px`. Simule un objet physique tenu en main.

```ts
// phone-3d-tilt.ts
const phone = document.querySelector('.phone-mockup');
if (phone) {
  window.addEventListener('mousemove', (e) => {
    const rx = (e.clientY / window.innerHeight - 0.5) * -4;
    const ry = (e.clientX / window.innerWidth - 0.5) * 8;
    gsap.to(phone, {
      rotateX: rx,
      rotateY: ry,
      duration: 1.2,
      ease: 'power1.out',
      transformPerspective: 1000,
    });
  });
}
```

#### Sortie Features → Transfer
**Zoom out du phone** : le phone se réduit de `scale: 1` → `scale: 0.6` + `opacity: 0` pendant que la section Transfer entre par le bas.

---

### SECTION 4 — TRANSFER DEMO

**Objectif émotionnel : identification → soulagement.** L'utilisateur voit exactement ce que c'est d'envoyer de l'argent avec Wave. La démo se joue automatiquement une fois. Pas de replay automatique — respecte l'attention.

#### Entrée
- Section entre depuis le bas, `y: 80px → 0`, `opacity: 0→1`, 800ms, `$ease-water`
- La démo ne démarre PAS à l'entrée. Elle démarre quand l'élément atteint `top: 40%` de l'écran.

#### Timeline de la démo (auto-play, once)

| t (ms) | Élément UI | État | Animation | Justification UX |
|--------|-----------|------|-----------|-----------------|
| 0 | Input "Montant" | Focus visuel | Border `→ --c-wave-blue`, `scale: 1.02` | Le champ attend |
| 300 | Cursor clignotant | Apparaît | `opacity: 1→0`, loop 530ms | Simuler une vraie saisie |
| 400 | Chiffres | Tapés | CountUp `0→15 000`, 80ms/digit mono | Chaque chiffre = frappe |
| 1300 | Input | Valide | Border `→ --c-success`, checkmark icon fade in | Montant accepté |
| 1500 | Bénéficiaire "Aminata D." | Highlight | `background: --c-wave-blue-10`, 200ms | Focus se déplace |
| 1800 | Bouton "Envoyer" | Actif | Glow `box-shadow: 0 0 24px rgba(0,87,255,0.45)`, pulse 600ms | Invitation à l'action |
| 2000 | Bouton "Envoyer" | Press simulé | `scale: 0.94`, 80ms, snap | Feedback physique |
| 2080 | Bouton | Loading | Scale back `1.0`, spinner remplace texte | Processing |
| 2600 | Spinner | Checkmark | Stroke draw checkmark SVG, 400ms `$ease-emerge` | Succès |
| 2800 | Montant destinataire | Update | GSAP FLIP `0 → +15 000 FCFA` | L'argent est arrivé |
| 3000 | Toast notification | Slide in | `y: 60→0`, `opacity: 0→1`, 350ms `$ease-emerge` | Confirmation externe |
| 3400 | État final | Respiration | Légère pulse `scale: 1.0→1.01→1.0`, 2s loop | "C'est fait. Respirez." |

```ts
// transfer-demo.ts
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(Flip);

export function initTransferDemo() {
  let played = false;

  ScrollTrigger.create({
    trigger: '.transfer-demo',
    start: 'top 40%',
    once: true,
    onEnter: () => {
      if (played) return;
      played = true;
      playTransferSequence();
    },
  });
}

function playTransferSequence() {
  const tl = gsap.timeline();

  // Focus input
  tl.to('.transfer-input', {
    borderColor: 'var(--c-wave-blue)',
    scale: 1.02,
    transformOrigin: 'center',
    duration: 0.2,
    ease: 'power2.out',
  }, 0);

  // CountUp montant — 80ms par chiffre simulé
  const proxy = { val: 0 };
  const amountEl = document.querySelector<HTMLElement>('.transfer-amount-input');
  tl.to(proxy, {
    val: 15000,
    duration: 0.9,
    delay: 0.4,
    ease: 'none',
    onUpdate() {
      if (amountEl) {
        amountEl.textContent = Math.round(proxy.val).toLocaleString('fr-FR');
      }
    },
  });

  // Validation input
  tl.to('.transfer-input', {
    borderColor: 'var(--c-success)',
    duration: 0.2,
    ease: 'power2.out',
  }, 1.3);

  // Highlight bénéficiaire
  tl.to('.beneficiary-row', {
    backgroundColor: 'var(--c-wave-blue-10)',
    duration: 0.2,
    ease: 'power1.out',
  }, 1.5);

  // Bouton glow
  tl.to('.send-button', {
    boxShadow: '0 0 24px rgba(0,87,255,0.45)',
    duration: 0.3,
    ease: 'power2.out',
  }, 1.8);

  // Press
  tl.to('.send-button', {
    scale: 0.94,
    duration: 0.08,
    ease: 'power2.in',
  }, 2.0);

  tl.to('.send-button', {
    scale: 1.0,
    duration: 0.15,
    ease: 'power2.out',
  }, 2.08);

  // Loading state
  tl.call(() => {
    document.querySelector('.send-button-text')?.classList.add('hidden');
    document.querySelector('.send-button-spinner')?.classList.remove('hidden');
  }, [], 2.1);

  // Checkmark SVG draw
  tl.to('.send-button-spinner', { opacity: 0, duration: 0.15 }, 2.5);
  tl.fromTo('.send-button-check path',
    { strokeDashoffset: 100 },
    {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: 'power2.out',
    },
    2.6
  );

  // FLIP — montant destinataire
  tl.call(() => {
    const state = Flip.getState('.recipient-balance');
    const el = document.querySelector('.recipient-balance');
    if (el) el.textContent = '+15 000 FCFA';
    Flip.from(state, {
      duration: 0.5,
      ease: 'power2.out',
      scale: true,
    });
  }, [], 2.8);

  // Toast
  tl.fromTo('.toast-notification',
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' },
    3.0
  );

  // Respiration finale sur le bouton success
  tl.to('.send-button', {
    scale: 1.01,
    duration: 1.0,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  }, 3.4);
}
```

---

### SECTION 5 — TESTIMONIALS

**Objectif émotionnel : "Ce sont des gens comme moi."**

#### Entrée
Cards entrent en cascade depuis la droite hors-écran :
- Card 1 : `x: 120px → 0`, `opacity: 0→1`, 700ms, `$ease-water`, delay 0ms
- Card 2 : idem, delay 120ms
- Card 3 : idem, delay 240ms

#### Scroll Horizontal

Lenis gère le scroll vertical. GSAP ScrollTrigger pin la section et translate horizontalement.

```ts
// testimonials-horizontal.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initTestimonials() {
  const track = document.querySelector<HTMLElement>('.testimonials-track');
  const inner = document.querySelector<HTMLElement>('.testimonials-inner');
  if (!track || !inner) return;

  const scrollWidth = inner.scrollWidth - window.innerWidth + 64; // 64px padding

  gsap.to(inner, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: track,
      pin: true,
      scrub: 1.2,
      start: 'top top',
      end: () => `+=${scrollWidth}`,
      invalidateOnRefresh: true,
    },
  });
}
```

#### Hover sur Card Testimonial

| Propriété | Repos | Hover | Durée | Easing |
|-----------|-------|-------|-------|--------|
| `border-color` | `rgba(255,255,255,0.08)` | `rgba(0,87,255,0.40)` | 300ms | `$ease-flow` |
| `transform` | `scale(1)` | `scale(1.02)` | 300ms | `$ease-flow` |
| `box-shadow` | `none` | `0 8px 32px rgba(0,87,255,0.15)` | 300ms | `$ease-flow` |
| Avatar | `filter: grayscale(30%)` | `filter: grayscale(0%)` | 300ms | `$ease-flow` |
| Quote mark (") | `opacity: 0.3` | `opacity: 1` `color: --c-wave-blue` | 200ms | `$ease-flow` |

```css
.testimonial-card {
  transition:
    transform var(--dur-s) var(--ease-flow),
    border-color var(--dur-s) var(--ease-flow),
    box-shadow var(--dur-s) var(--ease-flow);
  will-change: transform;
}

.testimonial-card:hover {
  transform: scale(1.02);
  border-color: rgba(0, 87, 255, 0.40);
  box-shadow: 0 8px 32px rgba(0, 87, 255, 0.15);
}

.testimonial-avatar {
  filter: grayscale(30%);
  transition: filter var(--dur-s) var(--ease-flow);
}
.testimonial-card:hover .testimonial-avatar {
  filter: grayscale(0%);
}
```

---

### SECTION 6 — CTA FINAL

**Objectif émotionnel : élan → décision.**

#### Entrée
Fond qui monte : clip-path `inset(100% 0 0 0 → 0)`, 800ms, `$ease-water`. La section émerge du bas comme une vague.

#### Vie de la section
- Vague SVG animée en bas de la section (voir cinématique)
- Fond : `linear-gradient(160deg, --c-deep-ocean 0%, --c-wave-blue 100%)` avec très légère animation `background-position`, 8s loop

#### CTA button (état full focus)

```css
.cta-final-button {
  /* État repos */
  background: var(--c-foam);
  color: var(--c-deep-ocean);
  padding: 20px 48px;
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 1.125rem;
  letter-spacing: -0.01em;
  transition:
    transform var(--dur-s) var(--ease-flow),
    box-shadow var(--dur-s) var(--ease-flow),
    background var(--dur-s) var(--ease-flow);
  will-change: transform, box-shadow;
}

.cta-final-button:hover {
  transform: scale(1.04);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.3),
    0 8px 40px rgba(0,87,255,0.4);
}

.cta-final-button:active {
  transform: scale(0.96);
  transition-duration: 80ms;
}
```

---

## 4. Transitions de Section — Chorégraphie Complète

### Philosophie de la caméra virtuelle

L'expérience Wave est un **plan-séquence**. Pas un montage. La caméra ne coupe jamais — elle voyage. Chaque transition prolonge le mouvement de la section précédente plutôt que de le contredire.

### Loader → Hero
**Type : Curtain Reveal**
Le loader glisse vers le haut comme un rideau. La scène était déjà en place dessous.
- Loader : `yPercent: 0 → -100`, 400ms, `$ease-sharp` (accélère en montant)
- Hero canvas déjà rendu : commence `opacity: 0 → 1` à t-100ms avant la fin du curtain
- **Overlap 100ms** : évite le vide noir entre les deux

### Hero → Stats
**Type : Clip-path Horizontal Sweep**
Le contenu Hero s'efface vers le haut (scroll naturel). Les Stats sont révélées par un clip-path qui balaie de gauche à droite.
- Déclencheur : scroll atteint 100% du Hero
- Stats wrapper : `clipPath: inset(0 100% 0 0 → 0 0% 0 0)`, 600ms, `$ease-water`
- **Justification** : le balayage horizontal est le geste naturel de l'eau qui avance

### Stats → Features
**Type : Scrub opacity + pin**
Pas de transition "événement". Transition continue par le scroll. Stats s'effacent progressivement pendant que le pin des Features s'enclenche.
- Stats : `opacity: 1 → 0` sur les derniers 30% du scroll de Stats, scrub 1.2
- Features arrivent avec `opacity: 0 → 1` sur les premiers 20% de leur scroll

### Features → Transfer
**Type : Zoom out + dépin**
Quand le scroll dépin Features, le phone se réduit `scale: 1 → 0.7` `opacity: 1 → 0`. La Transfer Demo entre par le bas `y: 80px → 0`.
- Durée : 800ms post-dépin, `$ease-water`
- **Justification** : le phone "rétrécit" pour entrer dans l'app réelle. On passe de la démonstration à l'outil.

### Transfer → Testimonials
**Type : Slide Left horizontal**
La démo glisse à gauche `xPercent: 0 → -15` + `opacity: 1 → 0` pendant que les Testimonials entrent de la droite.
- Transfer out : `xPercent: 0 → -15`, `opacity: 1 → 0`, 500ms, `$ease-gravity`
- Testimonials in : cards depuis `x: 120px → 0`, stagger 120ms, `$ease-water`

### Testimonials → CTA Final
**Type : Wave Curtain Up**
La section CTA monte depuis le bas, recouvrant les Testimonials. Clip-path vertical `inset(100% 0 0 0 → 0)`. **La vague SVG en tête de section amplifie l'effet** — c'est visuellement comme une vague qui monte.
- Durée : 800ms, `$ease-water`
- En simultané : background color du body `--c-foam → --c-deep-ocean`, 600ms

```ts
// section-transitions.ts — Registre complet des transitions
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSectionTransitions() {

  // Hero → Stats : clip-path sweep
  ScrollTrigger.create({
    trigger: '.stats-section',
    start: 'top bottom',
    onEnter: () => {
      gsap.fromTo('.stats-section',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.6,
          ease: 'power3.out', // ≈ $ease-water
        }
      );
    },
    once: true,
  });

  // Transfer → Testimonials
  ScrollTrigger.create({
    trigger: '.testimonials-section',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('.transfer-section', {
        xPercent: -15,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      });
    },
    once: true,
  });

  // Testimonials → CTA : wave curtain
  ScrollTrigger.create({
    trigger: '.cta-section',
    start: 'top bottom',
    onEnter: () => {
      gsap.fromTo('.cta-section',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    },
    once: true,
  });
}
```

---

## 5. Animations par Composant

### NAVBAR

| État | Animation | Paramètres |
|------|-----------|------------|
| Apparition (hero enter) | `y: -12 → 0`, stagger items 60ms | 400ms, `$ease-emerge` |
| Scroll > 80px | `backdrop-filter: blur(8px)`, `background: --c-deep-ocean-80` | 300ms, `$ease-flow` |
| Logo hover | `scale: 1.04` | 200ms, `$ease-flow` |
| Nav item hover | `opacity: 0.7 → 1` + underline `width: 0 → 100%` | 200ms, `$ease-flow` |
| Nav item active | Underline permanente, `--c-wave-blue` | — |
| CTA nav hover | `background: --c-wave-blue → #0047D4`, `scale: 1.02` | 200ms, `$ease-flow` |

### BUTTONS (États Complets)

```css
/* Button — tous les états */

/* Default */
.btn-primary {
  background: var(--c-wave-blue);
  color: white;
  border-radius: 100px;
  padding: 14px 32px;
  font-family: var(--font-display);
  transition:
    background var(--dur-s) var(--ease-flow),
    transform var(--dur-s) var(--ease-flow),
    box-shadow var(--dur-s) var(--ease-flow),
    opacity var(--dur-s) var(--ease-flow);
  will-change: transform;
  position: relative;
  overflow: hidden;
}

/* Hover */
.btn-primary:hover {
  background: #0047D4;
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 87, 255, 0.35);
}

/* Focus visible */
.btn-primary:focus-visible {
  outline: 2px solid var(--c-aqua-light);
  outline-offset: 3px;
  transform: scale(1.02);
}

/* Active / Pressed */
.btn-primary:active {
  transform: scale(0.96);
  transition-duration: var(--dur-xs);
  box-shadow: none;
}

/* Loading */
.btn-primary[data-loading='true'] {
  pointer-events: none;
  opacity: 0.8;
}

/* Disabled */
.btn-primary:disabled {
  opacity: var(--opacity-subtle);
  pointer-events: none;
  transform: none;
}

/* Ripple effect au click */
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.2);
  border-radius: inherit;
  transform: scale(0);
  opacity: 1;
  transition: transform 0.4s var(--ease-emerge), opacity 0.3s;
}
.btn-primary:active::after {
  transform: scale(2);
  opacity: 0;
}
```

### CARDS (Feature + Testimonial)

```ts
// card-hover.ts — Tilt 3D léger au mouse
import { gsap } from 'gsap';

export function initCardHover(selector: string) {
  document.querySelectorAll<HTMLElement>(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateX: y * -6,       // ±3 deg
        rotateY: x * 8,        // ±4 deg
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      });
    });
  });
}
```

### TITRES (Split-Text Pattern)

Tous les titres H1 et H2 utilisent le même pattern clip-path reveal. **Jamais de fade simple sur un titre** — la matière doit avoir du poids.

```ts
// text-reveal.ts — Réutilisable sur tous les titres
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText'; // Club GSAP ou implémentation custom
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText);

export function initTextReveal(selector: string, options: {
  splitBy: 'lines' | 'words';
  stagger: number;
  delay?: number;
} = { splitBy: 'lines', stagger: 0.1 }) {

  document.querySelectorAll<HTMLElement>(selector).forEach(el => {
    // Wrapper pour préserver le layout
    const split = new SplitText(el, { type: options.splitBy });
    const items = options.splitBy === 'lines' ? split.lines : split.words;

    // État initial
    gsap.set(items, {
      yPercent: 110,
      clipPath: 'inset(0 0 100% 0)',
    });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          yPercent: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.7,
          ease: 'power3.out',
          stagger: options.stagger,
          delay: options.delay ?? 0,
        });
      },
    });
  });
}

// Usage :
// initTextReveal('h2', { splitBy: 'words', stagger: 0.06 });
// initTextReveal('.feature-title', { splitBy: 'lines', stagger: 0.1 });
```

### IMAGES

```ts
// image-reveal.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initImageReveal(selector: string) {
  document.querySelectorAll(selector).forEach(img => {
    // Wrapper div requis dans le markup
    const wrapper = img.parentElement;
    if (!wrapper) return;

    // Le wrapper est le mask, l'image translate à l'intérieur
    gsap.set(wrapper, { overflow: 'hidden' });
    gsap.set(img, { scale: 1.1 });    // Léger zoom initial pour la révélation

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        // Mask qui se retire
        tl.fromTo(wrapper,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out' }
        );
        // Image dezoom simultané
        tl.to(img, {
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
        }, '<');
      },
    });
  });
}
```

---

## 6. Micro-interactions

### Hover CTA principal

**Intention :** Signifier que le bouton est vivant. Qu'il attend d'être cliqué. Pas une animation décorative — une affordance physique.

**Déclencheur :** `mouseenter`
**Animation :**
1. `scale: 1 → 1.03`, 200ms, `$ease-emerge`
2. `box-shadow: 0 6px 28px rgba(0,87,255,0.4)`, 200ms
3. Arrow icon `→` : `translateX: 0 → 4px`, 200ms, `$ease-flow`
**Feedback :** visuel immédiat, pas de delay
**Sortie :** inverse, 300ms, `$ease-flow` (plus lent en sortie = plus naturel)

### Click / Tap button

**Déclencheur :** `mousedown` / `touchstart`
**Animation :** `scale: 1 → 0.94`, 80ms, `$ease-sharp`
**Feedback :** immédiat, synchrone
**Durée :** 80ms — en dessous du seuil de perception consciente. Ressenti physiquement, pas analysé visuellement.

### Input Focus

**Déclencheur :** `focus`
**Animation :**
- Border : `rgba(255,255,255,0.12) → --c-wave-blue`, 200ms
- `scale: 1 → 1.01`, 200ms, `$ease-emerge` — le champ se "lève" légèrement
- Label float up : `y: 0 → -20px`, `font-size: 16px → 11px`, 200ms

### Input Error

**Déclencheur :** validation failed
**Animation :**
1. Border `→ #E53E3E`, 100ms
2. Shake horizontal : `x: 0→6→-6→4→-4→2→-2→0`, 400ms, `power2.inOut`
3. Message erreur : `y: -8→0`, `opacity: 0→1`, 200ms, `$ease-emerge`

```ts
// input-error-shake.ts
export function shakeInput(selector: string) {
  gsap.to(selector, {
    keyframes: {
      x: [0, 6, -6, 4, -4, 2, -2, 0],
      ease: 'power2.inOut',
    },
    duration: 0.4,
    onStart() {
      gsap.set(selector, { borderColor: '#E53E3E' });
    },
  });
}
```

### Success Toast

**Déclencheur :** après envoi réussi
**Animation :**
- `y: 60→0`, `opacity: 0→1`, 350ms, `$ease-emerge`
- Checkmark icon : stroke draw 300ms après apparition du toast
- Auto-dismiss : après 3000ms, `y: 0→16`, `opacity: 1→0`, 250ms, `$ease-gravity`

### Scroll Indicator

**Déclencheur :** présent 1400ms post hero enter
**Animation :** `y: 0→8→0`, 700ms, `sine.inOut`, loop infinie
**Disparition :** quand scroll > 15% du hero, `opacity: 1→0`, 200ms

---

## 7. Scroll Experience

### Décisions par section

| Section | Outil | Raison |
|---------|-------|--------|
| Global | **Lenis** | Scroll fluide sur tout le site — fondation |
| Hero exit | **ScrollTrigger scrub** | Contrôle précis du parallax de contenu |
| Stats CountUp | **ScrollTrigger + IntersectionObserver** | Déclenché once, pas de scrub |
| Features | **ScrollTrigger pin + scrub 1.5** | Scroll pinné avec transition fluide |
| Transfer | **ScrollTrigger once** | Trigger unique, démo auto-play |
| Testimonials | **ScrollTrigger pin** | Scroll horizontal dans scroll vertical |
| CTA | **IntersectionObserver** | Simple reveal, pas besoin de scrub |

**Justification Lenis vs Locomotive :** Lenis est léger (3kb), compatible React Server Components, et se sync avec GSAP en une ligne. Locomotive est plus lourd et a des conflits connus avec ScrollTrigger. Lenis est le choix Wave.

### Paramètres Lenis définitifs

```ts
const lenis = new Lenis({
  duration: 1.4,            // Durée de friction — plus long = plus "huilé"
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                            // Exponentielle — rapide au début, très lente à la fin
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,     // Ne pas augmenter — altère la perception de qualité
  touchMultiplier: 2.0,     // Mobile : légèrement amplifié pour fluidité tactile
  infinite: false,
});
```

### Scrub Values — Décisions

| Contexte | Scrub | Justification |
|----------|-------|---------------|
| Features pin | `1.5` | Très fluide — la lenteur est voulue |
| Hero parallax | `1.2` | Légèrement plus réactif que features |
| Testimonials horizontal | `1.2` | idem |
| Stats fade | `1.0` | Plus direct — les chiffres doivent être lisibles |
| Transitions clipPath | `false` + trigger | Les clipPath en scrub peuvent jank sur Firefox |

---

## 8. Cursor Experience

### Design du curseur

**Forme :** Cercle 20px, rempli `--c-wave-blue` à `85%` opacité. Bordure : aucune en état repos (plus propre qu'une ring).

**Spring curseur :** `stiffness: 300`, `damping: 22` — réactif mais pas sec.

**Lag tracking :** LERP `0.12` — perceptible, élégant. Trop lent (0.05) = curseur "à la traîne". Trop rapide (0.3) = perd le caractère.

### Catalogue des États

| État | Déclencheur | Taille | Forme | Blend | Contenu | Durée transition |
|------|------------|--------|-------|-------|---------|-----------------|
| `default` | — | 20px | Cercle | normal | — | — |
| `hover-link` | `<a>`, `.nav-item` | 40px | Cercle | `difference` | — | 200ms |
| `hover-cta` | `.btn-primary` | 64px | Cercle | normal | "Envoyer" (12px, blanc) | 300ms |
| `hover-card` | `.feature-card`, `.testimonial-card` | 12px | Cercle | normal | — | 150ms |
| `hover-phone` | `.phone-mockup` | 48px | Cercle | normal | "Explorer" | 250ms |
| `drag` | `mousedown` sur carousel | 56px | Ellipse `56×40` | normal | "←  →" | 100ms |
| `text-select` | Sur paragraphes | 4px | Barre verticale | normal | — | 100ms |
| `loading` | Pendant fetch | 32px | Spinner | normal | — | 150ms |

```ts
// cursor.ts — Implémentation complète
import { gsap } from 'gsap';

class WaveCursor {
  private el: HTMLElement;
  private dot: HTMLElement;
  private pos = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private state: string = 'default';
  private rafId: number = 0;
  private readonly LERP = 0.12;

  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'wave-cursor';
    this.dot = document.createElement('div');
    this.dot.className = 'wave-cursor-dot';
    this.el.appendChild(this.dot);
    document.body.appendChild(this.el);

    this.bindEvents();
    this.raf();
  }

  private bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.target.x = e.clientX;
      this.target.y = e.clientY;
    });

    // États
    const stateMap: Record<string, string> = {
      'A, .nav-item': 'hover-link',
      '.btn-primary': 'hover-cta',
      '.feature-card, .testimonial-card': 'hover-card',
      '.phone-mockup': 'hover-phone',
      '.testimonials-inner': 'drag',
      'p, .hero-subtitle': 'text-select',
    };

    Object.entries(stateMap).forEach(([selector, state]) => {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => this.setState(state));
        el.addEventListener('mouseleave', () => this.setState('default'));
      });
    });

    // Press
    window.addEventListener('mousedown', () => {
      gsap.to(this.el, { scale: 0.7, duration: 0.08, ease: 'power2.in' });
    });
    window.addEventListener('mouseup', () => {
      gsap.to(this.el, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
    });
  }

  private setState(state: string) {
    if (this.state === state) return;
    this.state = state;
    this.el.setAttribute('data-state', state);
  }

  private raf() {
    this.pos.x += (this.target.x - this.pos.x) * this.LERP;
    this.pos.y += (this.target.y - this.pos.y) * this.LERP;

    gsap.set(this.el, {
      x: this.pos.x,
      y: this.pos.y,
      xPercent: -50,
      yPercent: -50,
    });

    this.rafId = requestAnimationFrame(() => this.raf());
  }

  public destroy() {
    cancelAnimationFrame(this.rafId);
    this.el.remove();
  }
}

// CSS associé
const cursorStyles = `
  .wave-cursor {
    position: fixed;
    top: 0; left: 0;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: rgba(0, 87, 255, 0.85);
    pointer-events: none;
    z-index: 9999;
    transition:
      width 200ms var(--ease-flow),
      height 200ms var(--ease-flow),
      background 200ms var(--ease-flow),
      mix-blend-mode 200ms,
      border-radius 150ms var(--ease-flow);
    will-change: transform;
  }

  .wave-cursor[data-state='hover-link'] {
    width: 40px; height: 40px;
    mix-blend-mode: difference;
    background: white;
  }

  .wave-cursor[data-state='hover-cta'] {
    width: 64px; height: 64px;
  }

  .wave-cursor[data-state='hover-card'] {
    width: 12px; height: 12px;
  }

  .wave-cursor[data-state='drag'] {
    width: 56px; height: 40px;
    border-radius: 28px;
  }

  .wave-cursor[data-state='text-select'] {
    width: 2px; height: 20px;
    border-radius: 1px;
    background: var(--c-wave-blue);
  }

  @media (hover: none) {
    .wave-cursor { display: none; }
  }
`;
```

---

## 9. Lighting System

### Aura Glow — Hero

**Rôle :** La vague WebGL génère naturellement de la lumière via le shader. Mais on ajoute une couche CSS pour renforcer la sensation de profondeur lumineuse.

```css
/* Aura radial gradient — layer au-dessus du canvas, pointer-events: none */
.hero-aura {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse 60% 40% at 30% 70%,
      rgba(0, 87, 255, 0.18) 0%,
      transparent 70%
    ),
    radial-gradient(
      ellipse 40% 60% at 70% 30%,
      rgba(93, 173, 226, 0.10) 0%,
      transparent 60%
    );
  pointer-events: none;
  mix-blend-mode: screen;
  animation: auraBreath 6s ease-in-out infinite alternate;
}

@keyframes auraBreath {
  from {
    opacity: 0.7;
    transform: scale(1);
  }
  to {
    opacity: 1;
    transform: scale(1.05);
  }
}
```

### Pointer Light — Section Features

La lumière suit le curseur dans la section Features, renforçant l'effet 3D du phone.

```ts
// pointer-light.ts
document.querySelector('.features-section')?.addEventListener('mousemove', (e: MouseEvent) => {
  const section = e.currentTarget as HTMLElement;
  const rect = section.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  gsap.to(section, {
    '--light-x': `${x}%`,
    '--light-y': `${y}%`,
    duration: 0.8,
    ease: 'power1.out',
  });
});
```

```css
.features-section {
  --light-x: 50%;
  --light-y: 50%;
  background:
    radial-gradient(
      ellipse 40% 40% at var(--light-x) var(--light-y),
      rgba(0, 87, 255, 0.08) 0%,
      transparent 60%
    ),
    var(--c-deep-ocean);
}
```

### Vignette Globale

```css
/* Vignette CSS sur le body — profondeur globale */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 100% 100% at 50% 50%,
    transparent 50%,
    rgba(0, 0, 0, 0.25) 100%
  );
  z-index: 0;
}
```

### Grain — Texture subtile

```css
/* Grain CSS — donne du corps aux aplats */
.hero-section::before,
.cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG grain 200x200 */
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

---

## 10. WebGL — Spécifications Complètes

### Où utiliser Three.js

| Section | Élément WebGL | Justification |
|---------|--------------|---------------|
| Hero | Vague shader plane | Signature visuelle — element principal |
| Features | Particules légères derrière le phone | Profondeur, non critique |
| CTA | Aucun — SVG animé suffisant | Perf first |

### Post-processing (optionnel, desktop uniquement)

```ts
// Utiliser @react-three/postprocessing si R3F
// Uniquement si GPU capable détecté

import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Bloom léger sur la vague
<EffectComposer>
  <Bloom
    intensity={0.4}        // Très subtil
    luminanceThreshold={0.8}
    luminanceSmoothing={0.9}
    mipmapBlur
  />
</EffectComposer>
```

**Condition d'activation du post-processing :**
```ts
const highPerf = navigator.hardwareConcurrency >= 8
  && !navigator.userAgent.includes('Mobile')
  && window.devicePixelRatio <= 2;
```

### Fallbacks Three.js

```ts
// Stratégie dégradée
// Tier 1 : Three.js + post-processing (desktop, GPU puissant)
// Tier 2 : Three.js sans post-processing (desktop standard, mobile haut de gamme)
// Tier 3 : CSS gradient + vague SVG animée (mobile, WebGL indisponible)

export function detectPerformanceTier(): 1 | 2 | 3 {
  if (!supportsWebGL()) return 3;
  if (navigator.userAgent.includes('Mobile') && window.devicePixelRatio > 2) return 2;
  if (navigator.hardwareConcurrency < 4) return 2;
  return 1;
}
```

---

## 11. Design System Motion — Naming Convention

```ts
// motion-system.ts — export central de tous les tokens

export const motion = {
  // Durées (en secondes pour GSAP, ms pour CSS)
  duration: {
    xs: 0.08,      // 80ms
    s:  0.20,      // 200ms
    m:  0.48,      // 480ms
    l:  0.80,      // 800ms
    xl: 1.20,      // 1200ms
    cinematic: 1.80, // 1800ms
  },

  // Easings GSAP string
  ease: {
    water:   'power3.out',      // approx $ease-water
    luxury:  'power3.out',      // approx $ease-luxury
    flow:    'power2.inOut',    // approx $ease-flow
    gravity: 'power2.in',      // approx $ease-gravity
    emerge:  'back.out(1.7)',   // approx $ease-emerge
    sharp:   'power2.in',      // approx $ease-sharp
  },

  // Springs Framer Motion
  spring: {
    heavy:  { type: 'spring', stiffness: 80,  damping: 20, mass: 1.2 },
    fluid:  { type: 'spring', stiffness: 140, damping: 18, mass: 1.0 },
    light:  { type: 'spring', stiffness: 300, damping: 22, mass: 0.6 },
    snap:   { type: 'spring', stiffness: 500, damping: 30, mass: 0.4 },
  },

  // Stagger
  stagger: {
    tight:  0.04,
    normal: 0.06,
    loose:  0.12,
    breath: 0.20,
  },

  // Distances (px)
  distance: {
    micro:  4,
    xs:     8,
    s:      16,
    m:      32,
    l:      64,
    xl:     120,
  },
} as const;
```

---

## 12. Performance & GPU

```ts
// performance-guards.ts — Production

// 1. will-change uniquement pendant l'animation
export function animateSafe(
  target: Element,
  vars: gsap.TweenVars,
  willChangeProps = 'transform, opacity'
) {
  gsap.set(target, { willChange: willChangeProps });
  return gsap.to(target, {
    ...vars,
    onComplete() {
      gsap.set(target, { willChange: 'auto' });
      if (vars.onComplete) (vars.onComplete as () => void)();
    },
  });
}

// 2. Réduire DPR sur mobile pour WebGL
const dpr = Math.min(window.devicePixelRatio, 2); // Jamais > 2
renderer.setPixelRatio(dpr);

// 3. Pause animations hors viewport (onglet caché)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
    lenis.stop();
  } else {
    gsap.globalTimeline.resume();
    lenis.start();
  }
});

// 4. Killswitch mobile pour effets lourds
const isMobile = window.innerWidth < 768;
if (isMobile) {
  // Désactiver tilt 3D cards
  // Désactiver post-processing
  // Réduire particules à 0
  // Curseur custom désactivé (hover: none)
}
```

---

## 13. Accessibilité — Reduced Motion Complet

```ts
// reduced-motion.ts
export const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Appliquer avant tout init
if (prefersReducedMotion) {
  // Override des motion tokens
  Object.entries({
    '--dur-xs': '0ms',
    '--dur-s':  '0ms',
    '--dur-m':  '0ms',
    '--dur-l':  '0ms',
    '--dur-xl': '0ms',
  }).forEach(([key, val]) =>
    document.documentElement.style.setProperty(key, val)
  );

  // Désactiver Lenis
  lenis.destroy();

  // Désactiver WebGL
  document.querySelector('.hero-canvas')?.remove();
  document.querySelector('.hero-fallback')?.removeAttribute('hidden');

  // GSAP : toutes les animations en durée 0
  gsap.globalTimeline.timeScale(100);
}
```

---

## 14. QA Checklist — Cross-Platform

### Desktop
- [ ] Chrome 120+ : WebGL + post-processing actifs, curseur custom, scroll lenis
- [ ] Firefox 120+ : clip-path `inset()` sur titres ✓, `d:` CSS animé sur vague SVG → fallback SMIL
- [ ] Safari 17+ : `backdrop-filter` ✓, `mix-blend-mode: difference` ✓, Spring Framer Motion ✓
- [ ] Edge 120+ : identique Chrome

### Trackpad (macOS)
- [ ] Momentum scroll de Lenis ne conflict pas avec trackpad inertia
- [ ] `wheelMultiplier: 1.0` — ne pas modifier
- [ ] ScrollTrigger scrub fluide sans saut

### Tablet (768px — 1024px)
- [ ] Testimonials horizontal → stacked vertical
- [ ] Phone 3D tilt désactivé (touch uniquement)
- [ ] Features pin : vérifié que la hauteur est correcte en landscape

### Mobile (375px — 767px)
- [ ] Hero WebGL : désactivé si RAM < 4GB → gradient CSS
- [ ] Curseur : désactivé (`@media (hover: none)`)
- [ ] Testimonials : scroll snapping CSS natif
- [ ] CTA sticky en bas d'écran
- [ ] Touch events : swipe horizontal testimonials, tap buttons

### iOS (Safari mobile)
- [ ] `100vh` → `100dvh` pour éviter le décalage avec la barre Safari
- [ ] Lenis `touchMultiplier: 2.0` ✓
- [ ] `position: fixed` sur curseur absent
- [ ] Aucun `backdrop-filter` stacké (limité à 1 par stacking context)

### Android (Chrome mobile)
- [ ] DPR capped à 2 pour WebGL
- [ ] Animations GPU-only : `transform` + `opacity` uniquement

---

*Wave Motion Design Master Document*
*Direction de production — chaque valeur est décidée, chaque justification est donnée*
*Stack : Next.js 15 · React 19 · TypeScript · Tailwind v4 · GSAP · Framer Motion · Three.js · Lenis*
