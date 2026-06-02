# SCoRe — MongoDB POV Builder Toolkit

Reusable **Cursor skills and rules** that help MongoDB Solutions Architects deliver customer proofs of value (POV) faster, with consistent quality gates and MongoDB best practices.

## What's included

| Component | Purpose |
|-----------|---------|
| `pov-builder` skill | Full lifecycle: kickoff → build → UI → benchmark → dry-run → handoff |
| `atlas-connectivity-setup` skill | Atlas connection, auth, network, health checks |
| `generate-sample-data` skill | Realistic, consistent demo data generation |
| `mdb-orchestrator` rule | Always-on routing, P0 priorities, hard gates |
| `docs/` templates | `gates.md`, build/test plans, schema and architecture reviews |

## Quick start

1. Copy `.cursor/` into your POV project (or install skills to `~/.cursor/skills/`).
2. Ensure `mdb-orchestrator.mdc` is active (always-on).
3. Start the agent with: *"Let's start a new POV for [customer use case]."*
4. The agent will use `pov-builder` and walk through gated phases.

## UI default

POVs include a demo UI unless you explicitly say otherwise (e.g., API-only). Say *"no frontend"* to opt out.

## Install options

- **Per-project:** Copy `.cursor/rules/` + `.cursor/skills/` into the POV repo.
- **Personal:** Symlink skills to `~/.cursor/skills/`; add the orchestrator rule to each project.
- **Team plugin:** Publish as a Cursor plugin pointing at these skill paths.

See [AGENTS.md](AGENTS.md) for agent-facing instructions.

## Hard gates

Explicit approval required (logged in `docs/gates.md`) before:

- Requirements, data model, architecture, build plan
- Each build phase completion

## Contributing

When changing workflows, update the relevant `pov-builder/references/*.md` chapter and keep gate language consistent with `mdb-orchestrator`.
