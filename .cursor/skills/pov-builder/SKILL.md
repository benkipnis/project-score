---
name: pov-builder
description: >-
  End-to-end MongoDB POV/POC lifecycle: kickoff, data model, architecture,
  build phases, demo UI (default), benchmarks, dry-run, and handoff. Use when
  starting a new proof of value, gathering requirements, designing architecture,
  executing build phases, building frontend/demo UI (including when editing
  frontend/**), running demo dry-runs, benchmarking, or packaging customer
  handoff. UI is included unless the user explicitly opts out (API-only,
  headless, no frontend).
---

# POV Builder

Primary skill for MongoDB Solutions Architect proof-of-value engagements. Load the chapter that matches the current task; do not invent procedures in this file.

## Default scope

- **UI included** unless the user explicitly opts out. Record opt-out in `docs/phase-status.md`.
- Ask about UI in kickoff; include a UI phase in `docs/build-plan.md` by default.

## Hard gates

See [references/gates.md](references/gates.md). Policy and routing: `mdb-orchestrator` rule.

## Lifecycle

```
Kickoff → Build phases (repeat) → Demo dry-run → Handoff
         ↳ UI, benchmarks, data, Atlas connectivity as needed
```

## Chapter index

| Situation | Chapter |
|-----------|---------|
| New POV, requirements, scaffold | [references/kickoff.md](references/kickoff.md) |
| Architecture & technology selection | [references/architecture.md](references/architecture.md) |
| Execute a build plan phase | [references/build-phase.md](references/build-phase.md) |
| Demo UI (`frontend/**`) | [references/ui-demo-build.md](references/ui-demo-build.md) + [references/ui-design.md](references/ui-design.md) |
| Performance benchmarks | [references/benchmarking.md](references/benchmarking.md) |
| Pre-presentation rehearsal | [references/demo-dry-run.md](references/demo-dry-run.md) |
| Customer handoff / README / runbook | [references/handoff.md](references/handoff.md) |
| Directory layout | [references/project-structure.md](references/project-structure.md) |
| Secrets, smoke tests | [references/build-guidelines.md](references/build-guidelines.md) |

## Satellite skills

| Situation | Skill |
|-----------|-------|
| Atlas connection strings, auth, network, health checks | `atlas-connectivity-setup` |
| Seed data, generators, mock documents | `generate-sample-data` |

## Compliance templates

Bootstrap from repo `docs/` (canonical) or copy from `assets/`:

- `docs/gates.md`, `docs/phase-status.md`, `docs/definition-of-done.md`
- `docs/schema-review-template.md`, `docs/architecture-decision-template.md`
- `docs/build-plan-template.md`, `docs/phase-completion-template.md`

## Priority tiers

- **P0:** hard gates, security/secrets, test evidence, compliance artifacts
- **P1:** best-practice enhancements (UI default, benchmarks methodology); document rationale when deferred
- **P2:** polish and demo enhancements

Build educational, fact-based, Atlas-first POVs aligned to customer success criteria. Ask clarifying questions when unclear. Call out non-MongoDB dependencies with rationale.
