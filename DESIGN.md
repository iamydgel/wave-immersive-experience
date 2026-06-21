# DESIGN SYSTEM — Wave Immersive Experience

## 1. Visual Identity & Concept
* **Core Concept**: "L'argent qui respire" (Money that breathes) - moving from friction and uncertainty to fluid movement like water.
* **Aesthetics**: Dark deep ocean theme, smooth water-like motion, organic springs, premium typography, custom components only.

---

## 2. Color Palette (Water & Earth)

| Token | Hex Value | Role |
| :--- | :--- | :--- |
| `--c-wave-blue` | `#0057FF` | Primary Wave Blue — actions, CTAs |
| `--c-deep-ocean` | `#001A4D` | Night Marine — hero background, headings |
| `--c-aqua-light` | `#5DADE2` | Aqua Sky — secondary accents |
| `--c-foam` | `#EAF4FF` | White Foam — light backgrounds, card bases |
| `--c-sand` | `#F5EFE6` | Warm Sand — narrative background sections |
| `--c-earth` | `#3D2B1F` | Dark Earth — body text on light backgrounds |
| `--c-success` | `#2ECC71` | Success feedback |
| `--c-alert` | `#E67E22` | Alert/warning feedback |
| `--c-wave-blue-10` | `rgba(0, 87, 255, 0.10)` | Transparent accent backgrounds |
| `--c-deep-ocean-80` | `rgba(0, 26, 77, 0.80)` | Hero overlays |

---

## 3. Typography

* **Display Font**: `Clash Display` (Bold, 700) — Main large titles, Hero
* **Body Font**: `Satoshi` (Regular 400 / Medium 500) — Paragraphs, labels
* **Mono Font**: `JetBrains Mono` — Numbers, amounts, structured data

### Fluid Typography Scales
* `--text-hero`: `clamp(3.5rem, 8vw, 8rem)` (56px → 128px)
* `--text-h2`: `clamp(2rem, 4vw, 4rem)` (32px → 64px)
* `--text-h3`: `clamp(1.25rem, 2.5vw, 2rem)` (20px → 32px)
* `--text-body`: `clamp(1rem, 1.5vw, 1.125rem)` (16px → 18px)
* `--text-caption`: `0.75rem` (12px fixed)

---

## 4. Spacing & Layout

* `--space-unit`: `8px`
* `--space-xs`: `8px` (`var(--space-unit) * 1`)
* `--space-sm`: `16px` (`var(--space-unit) * 2`)
* `--space-md`: `24px` (`var(--space-unit) * 3`)
* `--space-lg`: `40px` (`var(--space-unit) * 5`)
* `--space-xl`: `64px` (`var(--space-unit) * 8`)
* `--space-2xl`: `104px` (`var(--space-unit) * 13`)
* `--grid-cols`: `12`
* `--grid-gutter`: `clamp(16px, 3vw, 32px)`
* `--max-width`: `1440px`

---

## 5. Motion Tokens

### Durations
* `--dur-xs` / `$dur-xs`: `80ms` (Instant feedback - cursor, hover toggles)
* `--dur-s` / `$dur-s`: `200ms` (Micro-transitions - border, color, opacity)
* `--dur-m` / `$dur-m`: `480ms` (UI transitions - cards, labels, subtitles)
* `--dur-l` / `$dur-l`: `800ms` (Major entrances - sections, images, blocks)
* `--dur-xl` / `$dur-xl`: `1200ms` (Cinematic elements - hero headline, scene transitions)
* `--dur-cinematic` / `$dur-cinematic`: `1800ms` (Opening sequences, loader exit)

### Easings
* `$ease-water` (`--ease-water`): `cubic-bezier(.05, .9, .25, 1)` (Signature water flow easing)
* `$ease-luxury` (`--ease-luxury`): `cubic-bezier(.22, .9, .35, 1)` (Premium entrance reveals)
* `$ease-flow` (`--ease-flow`): `cubic-bezier(.4, 0, .2, 1)` (Symmetric scroll transitions)
* `$ease-gravity` (`--ease-gravity`): `cubic-bezier(.4, 0, 1, 1)` (Fast exits & hovers off)
* `$ease-emerge` (`--ease-emerge`): `cubic-bezier(.2, 1, .3, 1)` (Pop dynamics with minor overshoot)
* `$ease-sharp` (`--ease-sharp`): `cubic-bezier(.4, 0, .6, 0)` (Mechanical loader bar)

### Framer Motion Springs
```ts
export const springs = {
  heavy: { type: 'spring', stiffness: 80, damping: 20, mass: 1.2 },
  fluid: { type: 'spring', stiffness: 140, damping: 18, mass: 1.0 },
  light: { type: 'spring', stiffness: 300, damping: 22, mass: 0.6 },
  snap: { type: 'spring', stiffness: 500, damping: 30, mass: 0.4 },
};
```

### Scale & Blur Presets
* `$scale-pressed`: `0.94` | `$scale-shrink`: `0.96` | `$scale-rest`: `1.00` | `$scale-hover`: `1.02` | `$scale-pop`: `1.06` | `$scale-focus`: `1.04`
* `$blur-none`: `0px` | `$blur-xs`: `2px` | `$blur-s`: `4px` | `$blur-m`: `12px` | `$blur-l`: `24px` | `$blur-xl`: `48px`

---

## 6. Target Performance & Quality Standards
* **60 FPS** constantly verified using DevTools.
* **LCP** < 2.5s (4G simulated).
* **CLS** < 0.1 (Font fallback stabilization).
* **Accessibilité**: Contraste ≥ 4.5:1 (Texte blanc sur bleu Wave : 4.6:1).
* **Reduced Motion**: Respect de `prefers-reduced-motion` avec styles statiques fallbacks.
