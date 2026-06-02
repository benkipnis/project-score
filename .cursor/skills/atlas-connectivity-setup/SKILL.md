---
name: atlas-connectivity-setup
description: >-
  Configures Atlas connectivity, authentication, and network posture for MongoDB
  POV/POC demos. Use when setting connection strings, driver config, DB users,
  network access, health checks, troubleshooting connectivity failures, or
  editing backend/** and .env files.
---

# Atlas Connectivity Setup

Follow [references/atlas-connectivity.md](references/atlas-connectivity.md) and [references/build-guidelines.md](references/build-guidelines.md).

## Required Artifacts

- `.env.example`, `.gitignore`
- `docs/phase-status.md`
- `docs/gates.md` (when a gate is closed)

## Workflow

```
Connectivity Setup Progress:
- [ ] Step 1: Confirm scope and prerequisites
- [ ] Step 2: Configure connection and driver defaults
- [ ] Step 3: Configure auth and access controls
- [ ] Step 4: Validate network posture
- [ ] Step 5: Implement and run health checks
- [ ] Step 6: Update compliance artifacts
- [ ] Step 7: Adherence self-check
```

### Step 1: Confirm scope and prerequisites

Atlas target, runtime/driver versions, security constraints (IP, private endpoints, peering), demo load requirements.

### Step 2: Configure connection and driver defaults

`mongodb+srv://`, `retryWrites=true`, `w=majority`, justified pool config. Secrets in `.env` only.

### Step 3: Configure auth and access controls

Scoped users; document App Services/Triggers credentials if used.

### Step 4: Validate network access posture

Document access model; warn on `0.0.0.0/0` with lock-down checklist item.

### Step 5: Implement and run health checks

Verify connectivity, authentication, basic read/write. Runnable before demo.

### Step 6: Update compliance artifacts

Setup steps, credential scope (no secrets), network warnings. Log gates in `docs/gates.md` if applicable.

### Step 7: Adherence self-check

References applied, health-check path, security warnings documented.
