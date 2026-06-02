# Agent Instructions — SCoRe POV Toolkit

This repository is a **reusable Cursor agent toolkit** for MongoDB Solutions Architects building customer proofs of value (POV) or proof of concept (POC). It is not a runnable application.

## Primary entry point

Use the **`pov-builder`** skill (`.cursor/skills/pov-builder/`) for the full lifecycle. Load the chapter listed in its index for the current task.

## Always-on rule

**`mdb-orchestrator`** (`.cursor/rules/mdb-orchestrator.mdc`) — routing, P0 priorities, and hard gates only.

## Satellite skills

- **`atlas-connectivity-setup`** — connection strings, auth, network, health checks
- **`generate-sample-data`** — seed scripts and mock data (`scripts/data/**`)

## UI default

Every POV includes a customer-facing demo UI unless the user explicitly opts out. Record opt-out in `docs/phase-status.md`.

## Install modes

1. **Project-scoped:** Copy `.cursor/rules/` and `.cursor/skills/` into each POV repo.
2. **Personal:** Copy or symlink skills to `~/.cursor/skills/`; keep `mdb-orchestrator.mdc` in each POV repo.
3. **Plugin:** Point plugin metadata at the same skill names; avoid duplicating content.

## Templates

Canonical compliance templates live in `docs/`. Bootstrap copies are in `.cursor/skills/pov-builder/assets/`.
