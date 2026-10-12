# DESIGN: IndiNiger BizHub — Design System Specification

## Color Palette Tokens
| Token | Hex | Role |
|-------|-----|------|
| `indiniger-black` | `#08090C` | Deep Obsidian background, headers, high-contrast dark sections |
| `indiniger-gold` | `#F5B82E` | Premium gold accents, brand badge, primary CTA highlight, borders |
| `indiniger-gold-dark` | `#D69E20` | Hover states, active borders |
| `indiniger-blue` | `#1457B8` | Royal blue for international trust, secondary accents, links |
| `indiniger-cyan` | `#18BCE5` | Bright cyan for tech, innovation, and global network connectivity |
| `indiniger-green` | `#16A56A` | Emerald green for growth, trade, and verified status |
| `indiniger-light` | `#F5F7FB` | Clean light background for high-readability sections |
| `indiniger-card` | `#FFFFFF` | Pure white cards with subtle gold-tinged elevation shadows |

## Typography
- Primary Headings: Inter / Plus Jakarta Sans / system-ui, semibold/bold with tracking-tight
- Accent Titles: Gold gradient text (`linear-gradient(135deg, #F5B82E 0%, #FDE047 100%)`)
- Body: 15px - 16px font-normal, high contrast `#334155` on light and `#E2E8F0` on dark.

## Elevation & Glassmorphism
- Dark Glass: `background: rgba(8, 9, 12, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(245, 184, 46, 0.15)`
- Light Card: `background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0 10px 25px -5px rgba(8, 9, 12, 0.05)`
- Gold Glow: `box-shadow: 0 0 24px rgba(245, 184, 46, 0.25)`

## Card & Component Rhythm
- Announcement Bar: 36px height, deep black background with gold text accents
- Header: Sticky 76px, logo with stylized globe & gold compass, navigation pills, Join Network button
- Hero: Split desktop layout (Left: High-converting copy & dual CTAs; Right: Multi-industry international collage with interactive metric counters)
- Category Cards: 17+ starter categories with distinctive colorful badges, iconography, hover lift
- Interactive Features: BUY, SELL, TRADE, CONNECT, GROW (5 tabs/cards with interactive preview modals)
- Modals: Animated backdrop, clear fields, keyboard Esc handling, responsive mobile sheets
