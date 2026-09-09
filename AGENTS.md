# Agent Instructions — SCoRe POV Toolkit

> **TOOLKIT ONLY — NOT A RUNNABLE APPLICATION.**
> This repository contains Cursor skills and rules. Do not attempt to run it.
> Each POV you build should be a separate project with its own `README.md`.

This repository is a **reusable Cursor agent toolkit** for MongoDB Solutions Architects building customer proofs of value (POV) or proof of concept (POC).

## Primary entry point

Use the **`pov-builder`** skill (`.cursor/skills/pov-builder/`) for the full lifecycle. It contains a numbered Step 0–11 workflow; always run the Step 0 entry protocol first to detect the current phase and verify the prior gate before doing any work.

## Always-on rule

**`mdb-orchestrator`** (`.cursor/rules/mdb-orchestrator.mdc`) — routing, P0 priorities, and hard gates only.

## Satellite skills

- **`atlas-connectivity-setup`** — connection strings, auth, network, health checks
- **`generate-sample-data`** — seed scripts and mock data (`scripts/data/**`)

## POV Registry MCP server

The `pov-registry` MCP server (`plugin-pov-registry` or configured as `pov-registry` in `~/.cursor/mcp.json`) provides:

- `search_similar_povs` — semantic search over past POVs, run after the requirements gate (`G1`) and before design begins
- `register_pov` — create registry record, immediately after the reuse search
- `update_pov` — update record at each subsequent hard gate
- `complete_pov` — finalize summary + embedding at handoff

If the server is not configured, skip writeback steps and note it in the adherence self-check. Setup instructions are in [SCoRE-README.md](SCoRE-README.md#pov-registry-setup).

## UI default

Every POV includes a customer-facing demo UI unless the user explicitly opts out. Record opt-out in `docs/phase-status.md`.

## Install modes

1. **Project-scoped:** Copy `.cursor/rules/` and `.cursor/skills/` into each POV repo.
2. **Personal:** Copy or symlink skills to `~/.cursor/skills/`; keep `mdb-orchestrator.mdc` in each POV repo.
3. **Plugin:** Point plugin metadata at the same skill names; avoid duplicating content.

## Templates

Canonical compliance templates live in `docs/`. Bootstrap copies are in `.cursor/skills/pov-builder/assets/`.

See [SCoRE-README.md](SCoRE-README.md) for human-facing toolkit documentation.
