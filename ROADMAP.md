# ROADMAP.md — Aura Development Roadmap

## Phase Overview & GSD Track

### Phase 1: Project Inspection & Stitch Tooling Setup (DONE)
- [x] Workspace structure verified
- [x] Stitch MCP confirmed and connected
- [x] Dedicated Stitch Project initialized: `projects/5044269452507604275` ("Aura - Pure Free Dating")
- [x] Architecture & Rules locked down

### Phase 2: System Architecture & Specifications (DONE)
- [x] `ARCHITECTURE.md` created
- [x] `DESIGN.md` created (brand tokens, color palettes, typography)
- [x] `FIREBASE_SETUP.md` created (Firestore schema & security rules)
- [x] `ROADMAP.md` created
- [x] Anti-tamper 25-daily swipe mechanics specified
- [x] Pluggable RewardedAdService architecture designed

### Phase 3: Stitch Design System & Core Screen Generation (NEXT)
- [ ] Stitch Design System generation & CSS token export
- [ ] Generate Core Screen Batch A:
  - Screen 01: Splash Screen
  - Screen 02: Welcome / Free Dating Value Proposition
  - Screen 08: Discover / Main Swipe Stack with Daily Pill
  - Screen 10: Swipe Limit Reached Screen
  - Screen 11: Rewarded Ad Unlock Modal
  - Screen 12: Match Celebration Screen
- [ ] Generate Batch B:
  - Screens 03-07: Auth, Profile Setup, Photos, Preferences
  - Screens 13-14: Matches Ribbon & Realtime Chat
  - Screens 15-21: Profile View, Edit, Settings, Safety & FAQ

### Phase 4: Clean-Room Frontend Implementation (Next.js + Tailwind + Framer Motion)
- [ ] Initialize Next.js project with mobile-responsive wrapper
- [ ] Implement Stitch Design Tokens in `tailwind.config.js`
- [ ] Build reusable UI primitives: `AuraButton`, `CardStack`, `SwipeActionDock`, `SwipeCounterPill`
- [ ] Implement swipe gesture engine using spring physics & touch drag
- [ ] Integrate mock profile deck for seamless UI preview

### Phase 5: Rewarded Ad Engine & Swipe Limit System
- [ ] Create `RewardedAdService` abstraction with event hooks
- [ ] Build `MockRewardedAdProvider` with simulated 5-second video modal & reward verification
- [ ] Implement daily 25-swipe tracking state machine with local storage fallback and server sync
- [ ] Verify limit gate: 25th swipe allowed, 26th swipe triggers rewarded ad modal
- [ ] Verify ad completion reward grant (`REWARDED_AD_SWIPES = 5`)
- [ ] Verify skip/fail edge cases (reward NOT granted)

### Phase 6: Firebase Backend Integration
- [ ] Initialize Firebase Client SDK & Auth configuration
- [ ] Firestore Collections setup: `users`, `profiles`, `likes`, `passes`, `matches`, `messages`, `swipeUsage`
- [ ] Implement atomic transaction for `recordSwipe` and mutual match detection
- [ ] Implement Firestore Security Rules & validation
- [ ] Realtime chat listeners on active match threads

### Phase 7: Safety, Privacy & Profile Management
- [ ] Photo upload to Firebase Storage with compression
- [ ] Block & Report user workflows with instant discovery exclusion
- [ ] Profile editing and preview

### Phase 8: Verification, Automated Testing & Deployment Preflight
- [ ] End-to-end swipe flow test (25 swipes -> limit -> ad -> +5 swipes)
- [ ] Mutual matching verification
- [ ] Chat realtime test
- [ ] Security rules audit (zero client privilege escalation)
- [ ] Production build and preflight deployment check
