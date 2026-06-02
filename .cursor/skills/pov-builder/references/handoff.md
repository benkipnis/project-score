# Handoff Packaging

## Constraints

README MUST cover:

1. What this demonstrates (customer use case)
2. Architecture overview (link to diagram)
3. Prerequisites (Atlas tier, services, local tooling)
4. Setup instructions (clone to running)
5. How to run the demo

NEVER leave README as a stub.

## Required Outcomes

`docs/runbook.md` with: reset steps, reseed/regeneration, known limitations, troubleshooting.

Before handoff:

- Remove dead code, experiments, debug logging
- `.gitignore` covers secrets, artifacts, OS files
- Pin dependency versions
- Complete `docs/definition-of-done.md`

## Workflow

```
Handoff Packaging Progress:
- [ ] Step 1: Confirm scope and handoff audience
- [ ] Step 2: Complete README
- [ ] Step 3: Complete runbook
- [ ] Step 4: Perform repo hygiene sweep
- [ ] Step 5: Validate definition-of-done and phase status
- [ ] Step 6: Present handoff summary
- [ ] Step 7: Adherence self-check
```

### Step 1: Confirm scope and audience

Customer-facing, internal, or both.

### Step 2: Complete README

All five sections above.

### Step 3: Complete runbook

Reset, reseed, limitations, troubleshooting.

### Step 4: Repo hygiene sweep

Dead code, `.gitignore`, pinned dependencies.

### Step 5: Validate artifacts

Complete `docs/definition-of-done.md` and `docs/phase-status.md`.

### Step 6: Present handoff summary

What's included, limitations, how to run/reset.

### Step 7: Adherence self-check

Artifact paths, outstanding risks, accepted trade-offs.
