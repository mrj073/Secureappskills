# COMPONENT_INVENTORY.md — Aura Dating App Component Catalog

This document defines the 25 core UI components for **Aura**, ensuring modularity, accessibility, and strict adherence to the **"Midnight Radiant"** design system created in Google Stitch.

---

| # | Component Name | Description | Key Props / Tokens | Accessibility / Interaction |
|---|---|---|---|---|
| **1** | `AppShell` | Mobile-first viewport wrapper (`max-w-md` centered on desktop, ambient backdrop glow). | `children`, `showNav?` | Dynamic `100dvh`, handles safe-area insets. |
| **2** | `TopBar` | Header bar with glowing Aura wordmark, daily swipe pill, and action triggers. | `title?`, `showBack?`, `showCounter?` | Accessible label for swipe balance. |
| **3** | `BottomNavigation` | Frosted glass pill dock floating 1.5rem above bottom screen edge. | `activeTab`, `onTabChange` | Tablist role, aria-selected, tactile feedback. |
| **4** | `PrimaryButton` | Full-pill gradient button (`#7C3AED` -> `#F43F5E`) with chromatic shadow. | `label`, `onClick`, `disabled`, `icon?` | Touch target min 48px, active scale 0.96. |
| **5** | `SecondaryButton` | Frosted glass pill (`rgba(248,250,252,0.08)` border `1px`). | `label`, `onClick`, `variant?` | High contrast text `#F8FAFC`. |
| **6** | `IconButton` | Circular tactile trigger with frosted glass center. | `icon`, `onClick`, `size (sm\|md\|lg)`, `glowColor?` | `aria-label` required, spring release. |
| **7** | `TextInput` | Rounded pill input container with subtle rim stroke. | `value`, `onChange`, `placeholder`, `type`, `error?` | Focus ring with Electric Violet glow. |
| **8** | `SelectInput` | Dropdown selector with bottom-sheet picker on mobile. | `options`, `value`, `onChange`, `label` | Full keyboard and screen reader support. |
| **9** | `ProfileCard` | 28px pebble-radius discovery card with 3:4 aspect ratio & bottom gradient. | `profile`, `isFront`, `dragHandlers` | Supports gesture & visible buttons. |
| **10** | `ProfilePhoto` | High-res image slot with smooth aspect ratio and fallback shimmer. | `src`, `alt`, `rounded?`, `badge?` | Alt text with user name. |
| **11** | `InterestChip` | Capsule pill for passion tags ('Coffee', 'Indie Rock', 'Ceramics'). | `label`, `selected?`, `icon?`, `onClick?` | Active border `#7C3AED`, `#F8FAFC` text. |
| **12** | `SwipeActionBar` | Floating action dock with Rewind, Pass (X), and Like (Heart) buttons. | `onPass`, `onLike`, `onRewind`, `disabled` | Large touch targets (60-64px), high contrast. |
| **13** | `SwipeCounterPill` | Calm emerald pill: "⚡ 18 free swipes left today" with reset tooltip. | `swipesRemaining`, `dailyLimit (25)` | Tooltip explains 24h reset & zero fees. |
| **14** | `MatchCard` | Grid/list card in matches ribbon showing photo, name, and unread dot. | `match`, `onClick`, `isNew?` | Pulsing emerald dot for online users. |
| **15** | `ChatBubble` | 1-on-1 message bubble with timestamps and delivery status. | `message`, `isSender`, `timestamp`, `status` | Contrast >= 4.5:1, aria-live for new messages. |
| **16** | `MessageInput` | Text input dock with send button and auto-expanding textarea. | `onSend`, `placeholder` | Enter to send, clear button. |
| **17** | `Modal` | Frosted glass modal sheet (`backdrop-filter: blur(24px)`). | `isOpen`, `onClose`, `title`, `children` | Focus trap, ESC key dismiss, backdrop tap. |
| **18** | `ConfirmationDialog` | Alert dialog for destructive actions (e.g., Block, Delete). | `title`, `description`, `confirmLabel`, `onConfirm` | Alertdialog role, auto-focus cancel. |
| **19** | `EmptyState` | Illustrated empty screen with positive friendly message. | `illustration`, `title`, `description`, `action?` | Welcoming, pressure-free copy. |
| **20** | `LoadingState` | Ambient glowing pulse placeholder / skeleton. | `type (card\|list\|screen)` | `aria-busy="true"`. |
| **21** | `ErrorState` | Clean error card with retry button. | `message`, `onRetry` | Non-blocking inline and full-screen variants. |
| **22** | `Toast` | Transient notification pill at top/bottom. | `message`, `type (info\|success\|warning)`, `duration` | `role="status"`, auto-dismiss with swipe. |
| **23** | `RewardedAdModal` | Transparent sponsor video dialog unlocking extra swipes. | `isOpen`, `onWatchAd`, `onClose`, `extraSwipes (5)` | Honest copy: "Watch 30s ad for 5 free swipes". |
| **24** | `SwipeLimitCard` | Friendly sheet shown at 25/25 limit with "Keep Discovering Free". | `onWatchAdClick`, `hoursUntilReset` | **Strictly ZERO paywall / buy buttons.** |
| **25** | `MatchCelebration` | Full-screen celebration with two glowing avatars & ripple. | `userProfile`, `matchedProfile`, `onChat`, `onKeepSwiping` | Confetti ripple, keyboard accessible CTAs. |
