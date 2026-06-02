# Build Guidelines

## Constraints

- **NEVER commit secrets.** Store all secrets and environment-specific configuration in separate, protected files (e.g., `.env`).
- You MUST generate `.env.example` (or equivalent) with placeholder values.
- You MUST add secret/config files to `.gitignore` immediately upon creating them.

## Required Outcomes

You MUST generate user-runnable smoke tests in at least two tiers:

1. **Connectivity tests** — validate Atlas cluster, APIs, and external dependencies are reachable and authenticated.
2. **End-to-end tests** — exercise core application functionality through the critical path.

These MUST be runnable with a single command each (e.g., `npm run test:connectivity`, `npm run test:e2e`).
