---
name: Stage Presence & Kinetic Rhythm
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e6bdb8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ac8884'
  outline-variant: '#5c403c'
  surface-tint: '#ffb4ab'
  primary: '#ffb4ab'
  on-primary: '#690005'
  primary-container: '#dc2626'
  on-primary-container: '#fff6f5'
  inverse-primary: '#bf0715'
  secondary: '#ffca45'
  on-secondary: '#3f2e00'
  secondary-container: '#e4ae00'
  on-secondary-container: '#5b4400'
  tertiary: '#ffb3ad'
  on-tertiary: '#68000a'
  tertiary-container: '#d63135'
  on-tertiary-container: '#fff6f5'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#ffdf9a'
  secondary-fixed-dim: '#f7be1d'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5a4300'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-hero:
    fontFamily: Syne
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 76px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Syne
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-caps:
    fontFamily: Syne
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.14em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system translates the kinetic energy, brass-heavy syncopation, and theatrical charisma of contemporary live salsa into a digital platform. Built around the persona of a cantautor, the interface mimics the atmosphere of an intimate concert hall turned explosive salsa stage: pitch-black shadows cut by direct spotlight reds, hyper-focused typography, and metallic golden accents reminiscent of brass horns and VIP laminates.

The target audience spans dedicated salsa dancers, global festival bookers, music streaming listeners, and live music enthusiasts. The interface must evoke:
- **Intimacy & Passion:** Deep stage blacks paired with intense crimson glow.
- **Velocity & Rhythm:** High typographic contrast, tight vertical metrics, and hard-driving compositional lines.
- **Stage Authority:** Polished media assets, high-impact performance frames, and razor-sharp structural framing that honors musical craft.

The design movement combines **Minimal High-Contrast** with **Stage Editorial**: dark canvas structures framed by subtle, precise metallic borders, oversized editorial typography, and focused atmospheric red illumination rather than flat decorative gradients.

## Colors

The palette operates in strict dark mode, anchored by deep stage blacks, rich charcoals, pure white typography, and focused crimson spotlights.

- **Primary (`#DC2626` / Crimson Stage Red):** Reserved for primary interactive anchors, live tour status tags, audio transport progress, and primary focal moments.
- **Secondary (`#EAB308` / Warm Brass Gold):** Used sparingly as an accent for awards, VIP packages, exclusive audio drops, and subtle metallic rim highlights.
- **Tertiary (`#EF4444` / Vibrant Scarlet):** Applied for high-visibility hover states, streaming playhead indicators, and urgent ticket notifications ("Sold Out" / "Few Tickets Left").
- **Neutral Surface Hierarchy:**
  - `Canvas Background`: `#0A0A0A` (Deep Stage Void)
  - `Surface Container Tier 1`: `#121212` (Card and panel background)
  - `Surface Container Tier 2`: `#1E1E1E` (Dropdowns, floating controls, audio dock)
  - `Surface Border / Rim`: `rgba(255, 255, 255, 0.08)` to `rgba(234, 179, 8, 0.2)`
  - `Text Primary`: `#FFFFFF`
  - `Text Muted`: `#A1A1AA`

## Typography

The type system creates an immediate dynamic tension between the structural Latin-jazz flair of **Syne** and the neutral, functional clarity of **Inter**.

- **Display & Headlines (Syne):** Sculptural, bold, and unapologetically expressive. Used for song titles, section banners, tour dates, and hero calls to action. In all-caps or heavy weights, Syne conveys percussive momentum.
- **Body & Data Tables (Inter):** Highly legible across dark surfaces. Used for tour venue logistics, lyrics, liner notes, and e-commerce interfaces.
- **Labels & Micro-Copy:** Styled in compact, tracked-out uppercase (`label-caps`) to invoke concert credentials, track counters, and festival program schedules.

## Layout & Spacing

The layout is built on a responsive 12-column grid designed for dramatic stage-level visuals, high-density tour lists, and sticky media playback bars.

- **Desktop (1024px+):** 12 columns with `1.5rem` gutters and a maximum content width of `1360px`. Sections leverage wide, full-bleed backgrounds with deliberate asymmetrical column spans (e.g., 7 columns for headline media, 5 columns for upcoming dates or featured singles).
- **Tablet (768px - 1023px):** 8 columns, `1.25rem` gutters, and `2rem` outer margins. Content collapses into balanced two-up modules.
- **Mobile (< 768px):** 4 columns, `1rem` gutters, and `1.25rem` outer margins. Dynamic media stacks vertically, prioritizing audio preview triggers and immediate ticket purchase CTAs above the fold.
- **Vertical Rhythm:** Generous spacing (`space-xl` and higher multiples) between distinct media movements (e.g., Hero → Tour Schedule → Music Player → Media Archive) allows imagery to breathe against the dark background.

## Elevation & Depth

Visual hierarchy uses tonal surface stacking complemented by controlled spotlight effects rather than traditional soft drop shadows.

- **Level 0 (Stage Canvas):** `#0A0A0A` base background.
- **Level 1 (Card & Module Shells):** `#121212` with a subtle 1px border `rgba(255, 255, 255, 0.08)`. Surfaces remain flat to maintain an architectural, editorial look.
- **Level 2 (Interactive Floating Controls):** Sticky audio wave bar, mobile bottom sheets, and modal ticket viewports use `#1E1E1E` enhanced with a stage glow: `0 8px 32px -4px rgba(220, 38, 38, 0.25)`.
- **Hover & Spotlight States:** When hovering over interactive tour cards or gallery tiles, the border transitions from neutral white to a warm brass or bright crimson line (`1px solid #DC2626`), accompanied by an ultra-diffused under-glow (`0 0 24px rgba(220, 38, 38, 0.35)`).
- **Glass Accents:** Sticky navigation and floating music players use `backdrop-filter: blur(16px)` over `rgba(18, 18, 18, 0.85)` to let live photography softly bleed through during scroll.

## Shapes

The design uses a **Soft** shape language (`roundedness: 1`), keeping corner radiuses tight and intentional (4px on default controls, 8px on larger cards, and 12px maximum on featured media containers). 

This architectural sharpness reflects modern gig posters, vinyl record sleeves, and stage rigging. Circular geometry is reserved strictly for media controls (Play/Pause triggers, disc vinyl rotators) to create an intentional focal contrast against angular layouts.

## Components

### Buttons & Interactive CTAs
- **Primary Stage CTA ("Get Tickets", "Listen Now"):** Solid `#DC2626` background, `#FFFFFF` text in `label-lg`, 4px border radius. Hover adds an intense crimson rim glow (`box-shadow: 0 0 20px rgba(220, 38, 38, 0.45)`) and slight upward translation (-1px).
- **Secondary / VIP Button ("VIP Passes", "Rider Info"):** Transparent background, 1px border in `rgba(234, 179, 8, 0.6)` (Brass Gold), text in `#EAB308`. Hover transitions to full brass fill with black text.
- **Ghost Action:** Pure white text with an animated 1px underline that expands from center on hover.

### Tour Date Rows & Badges
- **Tour List Module:** Horizontally segmented rows (`#121212`) separated by hairline dividers (`rgba(255, 255, 255, 0.06)`). Includes fixed-width date blocks in `Syne`, city/venue metadata in `Inter`, and a status badge.
- **Status Badges:** Compact pill chips (`rounded-full`) utilizing `label-caps`. 
  - *On Sale:* Emerald green dot with subdued green text.
  - *Selling Fast:* `#DC2626` background with white text.
  - *Sold Out:* Subdued gray with line-through effect.

### Audio Player & Soundwave Bar
- **Fixed Stage Player:** Docked at the viewport bottom. Charcoal `#1E1E1E` surface with a top border in `rgba(255, 255, 255, 0.08)`.
- **Waveform Visualization:** Dynamic SVG frequency bars rendered in `#DC2626` for played segments and `rgba(255, 255, 255, 0.2)` for unplayed buffers.
- **Controls:** Circular 48px play/pause button in vibrant crimson, centered or left-aligned with track title, cantautor songwriting credits, and direct streaming links (Spotify, Apple Music).

### Live Media & Video Showcase
- **Performance Gallery Cards:** 16:9 and 4:5 aspect ratio cards featuring high-grain live stage photography. Overlayed with a subtle linear gradient (`rgba(10, 10, 10, 0) 50%, rgba(10, 10, 10, 0.9) 100%`) ensuring title overlays remain legible. Hover activates a slow scale transform (1.03x) and a crimson edge accent.

### Input Fields & Newsletter Subscription
- **Form Controls:** Dark `#121212` backgrounds with crisp 1px borders in `rgba(255, 255, 255, 0.15)`. Focus shifts the border to `#DC2626` with no intrusive default outline. Floating labels and helper text styled with `body-sm` in `#A1A1AA`.