# Build Guidelines (Connectivity)

- **NEVER commit secrets.** Use `.env` for secrets; `.env.example` for placeholders only.
- Add secret files to `.gitignore` immediately.
- Connectivity smoke tests under `tests/connectivity/` — single command to run.
