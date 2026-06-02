# Project Structure

## Constraints

You MUST use the following directory structure for every POC/POV. NEVER place files outside of this structure without explicit user approval.

```
<poc-name>/
├── frontend/              # ALL UI and frontend code
│   ├── src/
│   └── public/
├── backend/               # ALL backend, API, and server code
│   ├── src/
│   └── config/
├── scripts/
│   ├── data/              # Data generation scripts and sample schemas
│   └── benchmarks/        # Performance benchmark scripts
├── tests/
│   ├── connectivity/      # Connectivity smoke tests
│   └── e2e/               # End-to-end smoke tests
├── docs/                  # Build plan, test plan, runbook, architecture
│   ├── build-plan.md
│   ├── test-plan.md
│   └── runbook.md
├── .env.example           # Environment config template (NEVER .env itself)
├── .gitignore
└── README.md
```

- **Frontend code** — ALWAYS in `frontend/`.
- **Backend code** — ALWAYS in `backend/`.
- **Data generation** — ALWAYS in `scripts/data/`.
- **Benchmarks** — ALWAYS in `scripts/benchmarks/`.
- **Tests** — ALWAYS in `tests/`. Connectivity in `tests/connectivity/`, e2e in `tests/e2e/`.
- **Documentation** — ALWAYS in `docs/`.
- **Root-level files** — Only `.env.example`, `.gitignore`, `README.md`, `package.json` (or equivalent), and project config files.

## Required Outcomes

- Frontend, backend, scripts, tests, and docs remain in their required directories.
- Root-level files are limited to approved top-level artifacts.
- No mixed frontend/backend directories, no root-level scripts, and no documentation outside `docs/`.
