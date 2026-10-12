## Brand & Style

This design system establishes an unapologetically democratic, nightlife-inspired social experience where human connection is never gated by paywalls or microtransactions. The visual narrative subverts predatory subscription tropes with an atmosphere that feels luxurious, high-voltage, and intimate.

The target audience spans digital-native Gen Z and Millennial singles tired of tiered monetization models, seeking authentic chemistry in an interface that mirrors late-night rooftop conversations, glowing neon skylines, and spontaneous city energy. The UI evokes curiosity, magnetic attraction, and liberation—framing every feature as universally accessible.

The aesthetic fuses modern **Glassmorphism** with **Radiant Midnight Luminescence**:
- Ultra-deep, atmospheric canvas tones create negative space where profile photography and dynamic content float seamlessly.
- Vibrant, dual-spectrum ambient gradients—spanning Electric Violet through Sunset Rose—radiate through semi-translucent glass membranes.
- Soft, organic pebble contours eliminate aggressive corners, inviting warm touch interactions.
- Micro-delights through physical tactile states, fluid floating controls, and soft bioluminescent status accents communicate a premium lifestyle standard without financial exclusion.

## Layout & Spacing

The layout embraces a mobile-first fluid shell designed for one-handed thumb interaction, fluid edge-to-edge content, and floating system docks.

### Grid & Breakpoints
- **Mobile (<640px):** Single-column dynamic viewport (`100dvh`). Canvas margin is `1rem` (16px), with inner module gutters fixed at `1rem`. Profile decks occupy the maximum vertical bounding space, flanked by edge padding.
- **Tablet (640px - 1024px):** 6-column fluid structure with `1.5rem` margins and gutters. Centered interaction lane capped at `540px` for discovery feeds; split-pane structure for concurrent chat lists and conversations.
- **Desktop (>1024px):** 12-column layout with `3rem` outer margins. Content is pinned inside a maximum content bounding box of `1200px`, providing an intentional mobile-app simulation canvas centered within a responsive ambient backdrop.

### Spacing Cadence
Layout measurements strictly honor multiples of `0.25rem` (4px). Card stacks maintain a minimal `space-md` separation from navigation boundaries to avoid accidental dismissals and ensure clean reachability zones.

## Elevation & Depth

Visual hierarchy does not use physical drop shadows or opaque skeuomorphism. Instead, depth is rendered through light refraction, frosted glass filtration, and spectral luminescence:

- **Level 0 (Canvas):** Pure ambient midnight base (`#090D16`), occasionally diffused with soft, non-interactive radial background blobs (`rgba(124, 58, 237, 0.15)` and `rgba(244, 63, 94, 0.12)`).
- **Level 1 (Profile & Information Surfaces):** Semi-opaque background (`rgba(18, 24, 38, 0.75)`) backed by a `backdrop-filter: blur(16px)`. Bordered by a `1px` subtle rim stroke (`rgba(248, 250, 252, 0.08)`).
- **Level 2 (Modals, Overlays & Action Sheets):** Higher opacity glass (`rgba(22, 30, 48, 0.85)`) with `backdrop-filter: blur(24px)`. Rim highlight: `1px` solid `rgba(248, 250, 252, 0.16)`. Ambient bottom glow: `0px 20px 40px -10px rgba(0, 0, 0, 0.6)`.
- **Level 3 (Floating Action Docks & Control Pods):** Ultra-refined pill vessels (`rgba(255, 255, 255, 0.08)`) with `backdrop-filter: blur(32px)`. Outlined with a top-lit gradient stroke transitioning from `rgba(248, 250, 252, 0.25)` to `rgba(248, 250, 252, 0.02)`.
- **Luminescent Accent Glows:** Active primary buttons and positive match triggers radiate a concentrated chromatic shadow: `0px 8px 28px -4px rgba(124, 58, 237, 0.45)`, deepening to `rgba(244, 63, 94, 0.40)` for romantic engagement vectors.

## Components

### Buttons
- **Primary Action (Match / Super Intent):** Full pill silhouette (`rounded-full`), rendered with a vibrant gradient from `#7C3AED` to `#F43F5E` (135° angle). Typography is `label-lg` in `#F8FAFC`. Features a chromatic bloom shadow (`rgba(244, 63, 94, 0.35)`). Active pressed state contracts to `scale(0.96)`.
- **Secondary (Neutral Touch / Close):** Glass pill composed of `rgba(248, 250, 252, 0.08)` surface with a `1px` edge highlight (`rgba(248, 250, 252, 0.12)`). Text is `#F8FAFC`. On hover/touch, background intensifies to `rgba(248, 250, 252, 0.14)`.
- **Tactile Floating Triggers (Deck Controls):** Circular floating pods (56px to 68px diameter) with frosted glass centers, carrying dual-toned neon iconography (Pass: Soft Slate / Like: Sunset Rose / Spark: Electric Violet). Includes a subtle spring transition upon release.

### Chips & Badges
- **Status Pills (Online & Verified):** Ultra-compact pill (`py-1`, `px-3`), semi-translucent background (`rgba(16, 185, 129, 0.15)`), `1px` stroke (`rgba(16, 185, 129, 0.30)`), paired with a glowing emerald dot (`#10B981`) and `label-sm` text in `#10B981`.
- **Interest / Lifestyle Chips:** Capsule pills in `rgba(255, 255, 255, 0.05)` with `label-md` in `#94A3B8`. Selected state shifts boundary to a 1px `#7C3AED` stroke and text to `#F8FAFC`.

### Cards & Deck Containers
- **Discovery Card:** Pebble frame (`28px` radius) with edge-to-edge visual media. Underneath the imagery lies an integral dark gradient scrim (`from-transparent via-black/40 to-[#090D16]`) protecting overlaid personal bios and nameplates.
- **Profile Detail Modal:** Extends from bottom sheet with `backdrop-filter: blur(28px)`. Integrated modular glass tiles separate bio, music badges, and verified traits.

### Lists & Chat Rows
- **Conversation Row:** Flat container with bottom division line (`1px` border using `rgba(255, 255, 255, 0.04)`). Avatars feature circular profile framing with an optional outer ring pulsing `#10B981` if active. Unread messages show an unread dot tinted in `#F43F5E`.

### Form & Input Fields
- **Search & Text Inputs:** Rounded pill container with `16px` vertical centering. Background set to `rgba(248, 250, 252, 0.04)` with a `1px` resting border (`rgba(248, 250, 252, 0.10)`). Focus elevates the border to a gradient-tinted stroke (`#7C3AED`) and soft glow. Text sits at `body-md` in `#F8FAFC`, with placeholder text settled at `#94A3B8`.

### Selection Controls
- **Radio & Checkboxes:** Circular selectors (`20px`). Unchecked state presents a delicate outline (`rgba(148, 163, 184, 0.4)`). Checked state fills with a solid radial gradient of `#7C3AED` to `#F43F5E`, housing a crisp white icon.

### Floating Dock
- **Navigation Dock:** Bottom-docked glass pill hovering `1.5rem` above the screen edge. Accommodates 4–5 core navigation icons over `rgba(18, 24, 38, 0.85)` glass with `backdrop-filter: blur(24px)`. Active destinations glow in `#F43F5E` with an animated ambient dot underneath.