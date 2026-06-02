# Atlas Connectivity & Security

## Constraints

- Use **SRV connection strings** (`mongodb+srv://`) for Atlas. NEVER legacy `mongodb://` for Atlas.
- Set `retryWrites=true` and `w=majority` unless explicitly testing alternatives.
- Configure connection pool sizes for load/concurrency demos — do not leave defaults unexamined.
- Use **scoped database users** (e.g., `readWrite` on specific DBs), not `atlasAdmin` for demo apps.
- Document App Services / Triggers service accounts and API keys in setup instructions.
- Document IP access lists, VPC peering, or private endpoints as required.
- If using `0.0.0.0/0` during development: prominent README warning and lock-down checklist before customer sessions. NEVER present without acknowledging risk.

## Required Outcomes

- Lightweight health-check endpoint or script validating connectivity, auth, and basic read/write — runnable before demo start.
