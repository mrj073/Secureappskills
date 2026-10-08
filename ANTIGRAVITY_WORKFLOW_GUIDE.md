# Antigravity 3 Essential Skills Guide

This workspace is configured with the **3 Essential Skills workflow** combined with the **Replica Skill Pack**:

```
[PLAN] Get Shit Done (GSD) ➔ [BUILD] Ralph Loop / Replica ➔ [REVIEW] CodeRabbit
```

---

## 1. Get Shit Done (GSD)
**Goal:** Break large software goals into structured phases, tasks, and verification gates.

- **Files Installed:**
  - `.agent/workflows/` (Full Antigravity workflow commands: `/new-project`, `/discuss-phase`, `/plan`, `/execute`, `/verify`, `/debug`)
  - `.gsd/`, `adapters/`, `scripts/`, `docs/`
  - `PROJECT_RULES.md`, `GSD-STYLE.md`, `model_capabilities.yaml`
- **Recommended Workflow:**
  1. `/new-project` - Initialize project context, requirements, and tech stack.
  2. `/discuss-phase` - Discuss scope before generating code.
  3. `/plan` - Generate atomic task plans.
  4. `/execute` - Execute tasks step by step.
  5. `/verify` - Validate against acceptance criteria.

---

## 2. Ralph Loop
**Goal:** Run autonomous, iterative AI agent loops on a task list / PRD without losing context.

- **Repository:** [github.com/abhishekbhakat/ralph-loop-for-antigravity](https://github.com/abhishekbhakat/ralph-loop-for-antigravity)
- **Concept:**
  - Externalize memory into files (`PRD.md` / task file & `progress.txt`).
  - Fresh context per iteration to avoid context pollution.
- **Setup in VS Code / Antigravity IDE:**
  1. Install the extension from Marketplace / Open VSX (`abhishekbhakat.ralph-loop-for-antigravity`).
  2. Open the Ralph Loop panel from the Activity Bar.
  3. Select your task file, progress file, and model fallback chain.
  4. Start loop.

---

## 3. CodeRabbit
**Goal:** Automated AI code reviews, security scans, bug detection, and autofixing.

- **CLI Installed:** `v0.8.2` (located at `/Users/mayanksingh/.local/bin/coderabbit` or alias `cr`)
- **Skills Installed:**
  - `coderabbit-review` (`~/.gemini/config/skills/coderabbit-review` & `~/.claude/skills/coderabbit-review`)
  - `coderabbit-autofix` (`~/.gemini/config/skills/coderabbit-autofix` & `~/.claude/skills/coderabbit-autofix`)
- **Usage Commands:**
  ```bash
  # Login once when ready:
  coderabbit auth login

  # Review uncommitted changes:
  coderabbit review --agent --uncommitted

  # Review against main branch:
  coderabbit review --agent --base main
  ```
