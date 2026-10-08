# Workspace Agent & Skill Autopilot Protocol

## Persistent Operating Mode:
Har bar jab bhi koi user is folder (`Replica App Builder`) me koi naya app banane ya clone karne bole, user ko manually skills call karne ki zaroorat nahi hai. Niche diye gaye 4-pillar system ko **automatically by default apply** karna hai:

---

### Pillar 1: Autonomous Replica Engine (11 Skills in Strict Sequence)
Jab bhi kisi app ka clone/rebuild request aaye:
1. **`/replica-recon`** -> Target app ki screens, components, user flows, and data model inspect karo.
2. **`/replica-architect`** -> Modern tech stack (Next.js/React, Tailwind, PostgreSQL/Prisma, Supabase, APIs) plan karo.
3. **`/replica-design`** -> Design system reconstruct karo (tokens, typography, colors, layout).
4. **`/replica-build`** -> Screen by screen clean-room code build karo.
5. **`/replica-backend`** -> Database, Auth, APIs, integrations link karo.
6. **`/replica-test`** -> Flows verify karke bugs fix karo.
7. **`/replica-diff`** -> Parity score check karo aur missing features identify karo.
8. **`/replica-entrepreneur`** -> Real user complaints aur gap analysis nikaal kar value proposition improve karo.
9. **`/replica-brand`** -> Naya brand, unique identity do aur original brand traces sweep karo.
10. **`/replica-launch`** -> High-converting landing page aur listing design karo.
11. **`/replica-deploy`** -> Preflight check and deployment.

---

### Pillar 2: Get Shit Done (GSD Methodology)
Har development task me context management aur phase execution autopilot rahega:
- Phase plan aur specification hamesha lock rahegi (`SPEC.md`, `ROADMAP.md`).
- Multi-wave execution follow hogi bina context lose kiye.

---

### Pillar 3: Ralph Loop Iterative Pattern
- Complex builds ke dauran tasks ko discrete, external memory files (`PRD.md`, `progress.txt`) me break karke step-by-step iterate karo.

---

### Pillar 4: CodeRabbit Code Reviewer & Autofix
- Har screen aur feature build hone ke baad automatic review and lint check apply karo:
  `coderabbit review --agent --uncommitted` / autofix.

---

### Frontend Engine: Google Stitch Integration
- Frontend ke premium visual designs aur tokens Google Stitch MCP ke through connect aur fetch honge.
