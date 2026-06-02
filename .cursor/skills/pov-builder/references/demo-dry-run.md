# Demo Dry Run

Run after all build phases are approved. Pair with [handoff.md](handoff.md) for delivery packaging.

## Workflow

```
Demo Dry Run:
- [ ] Step 1: Infrastructure health check
- [ ] Step 2: Data validation
- [ ] Step 3: Walk each tab end-to-end
- [ ] Step 4: Performance spot-check
- [ ] Step 5: Security and hygiene review
- [ ] Step 6: Narrative rehearsal
- [ ] Step 7: Adherence self-check
```

### Step 1: Infrastructure Health Check

Run connectivity smoke tests. Verify Atlas, APIs, external deps, credentials. Fix before proceeding.

### Step 2: Data Validation

Document counts, spot-check 3–5 docs, cross-collection relationships. Regenerate if stale or inconsistent.

### Step 3: Walk Each Tab End-to-End

If UI in scope: info tab accuracy, feature tabs, live updates, transparency panels, edge cases. Document and fix critical issues.

### Step 4: Performance Spot-Check

If performance is in scope: run benchmarks per [benchmarking.md](benchmarking.md) (at least 3 iterations). Verify displayed percentiles and documented cluster config.

### Step 5: Security and Hygiene Review

No secrets in UI/repo; `.env.example` present; flag `0.0.0.0/0` if open; README complete per [handoff.md](handoff.md); dependencies pinned.

### Step 6: Narrative Rehearsal

Present: opening, architecture, each demo segment, success criteria proof, anticipated Q&A. Update `docs/definition-of-done.md` and `docs/phase-status.md`.

### Step 7: Adherence Self-check

List chapters applied, residual risks, `docs/definition-of-done.md` status.
