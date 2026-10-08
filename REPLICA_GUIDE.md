# Replica Skill Pack: Complete Setup & Usage Guide

## Overview

The **Replica Skill Pack** consists of **11 specialized skills** designed to clone/rebuild any application clean-room style (rebuilding user experience and flows while creating original code, branding, and assets).

---

## 1. Installed Skills

The following 11 skills have been installed and configured:

| Step | Skill / Command | Purpose |
| :--- | :--- | :--- |
| 1 | `/replica-recon` | Reverse-engineers target app: screens, user flows, UI components, data models, and features. |
| 2 | `/replica-architect` | Selects optimal modern tech stack (frontend, DB, API, auth) and schema design. |
| 3 | `/replica-design` | Reconstructs design tokens (palette, typography, layout rhythm, spacing) with custom assets. |
| 4 | `/replica-build` | Generates clean-room frontend screens and flows step by step. |
| 5 | `/replica-backend` | Implements database schemas, authentication, payments, APIs, and business logic. |
| 6 | `/replica-test` | End-to-end user flow testing and bug tracking. |
| 7 | `/replica-diff` | Calculates parity score against the original app and identifies missing features. |
| 8 | `/replica-entrepreneur` | Analyzes real user reviews to find common pain points, complaints, and distinct value propositions. |
| 9 | `/replica-brand` | Creates unique branding, naming, identity, and sweeps codebase for legacy traces. |
| 10 | `/replica-launch` | Generates high-converting landing pages, pricing models, and app store listings. |
| 11 | `/replica-deploy` | Runs deployment preflight checks, DNS configurations, and production deployment. |

---

## 2. Execution Sequence

```
recon -> architect -> design -> build -> backend -> test -> diff -> entrepreneur -> brand -> launch -> deploy
```

> **Pro Tip**: You can also run `/replica-entrepreneur` first before writing any code to analyze market feasibility and see what users hate about an existing app.

---

## 3. Included Python Helper Tools

All 6 helper scripts require zero external pip dependencies and run natively on Python 3.8+:

1. **`imgdiff.py`** (`replica-diff/imgdiff.py`):
   Compares screenshot layout edge maps without penalizing custom colors/branding.
2. **`parity.py`** (`replica-diff/parity.py`):
   Calculates weighted feature completion score from `replica/features.csv`.
3. **`reviews.py`** (`replica-entrepreneur/reviews.py`):
   Clusters and ranks user feedback and complaints with verifiable source links.
4. **`contrast.py`** (`replica-design/contrast.py`):
   Validates WCAG 2.1 AA/AAA compliance on design tokens.
5. **`sweep.py`** (`replica-brand/sweep.py`):
   Scans codebase for target app brand traces or lingering references before release.
6. **`listing.py`** (`replica-launch/listing.py`):
   Checks App Store / Google Play character limits and keyword optimization.

---

## 4. How to Clone Your Target App

To replicate any app, provide its public website or store URL:
```bash
/replica-recon <URL_OF_APP>
```
All outputs will be saved sequentially under the `replica/` project directory.
