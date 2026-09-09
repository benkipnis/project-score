# Test Plan Template

Validation strategy for the POV. Every demo beat needs test evidence so the dry run produces facts, not opinions.

## Scope

- Success criteria under test:
- Out of scope (and why):

## Tiered Smoke Tests

Both tiers MUST be runnable with a single command.

| Tier | Command | What it validates | Pass condition |
|---|---|---|---|
| Connectivity | `npm run test:connectivity` | Atlas cluster, APIs, external deps reachable and authenticated | |
| End-to-end | `npm run test:e2e` | Core functionality through the critical path | |

## Validation Criteria per Build Phase

| Phase | Validation criteria | Test command | Pass threshold |
|---|---|---|---|
| Phase 1 | | | |
| Phase 2 | | | |
| Phase 3 | | | |

## Beat Coverage

Each beat from `docs/demo-narrative.md` needs something that proves it works.

| Beat # | Beat | Test or validation method | Evidence location |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

## Numeric Success Criteria

Any success criterion with a number needs a measured result, not an estimate.

| Criterion | Target | Measurement method | Measured result |
|---|---|---|---|
| | | | |

If any row is performance-related, benchmarks are **P0** — report p50/p95/p99 across at least 3 runs.

## Data Validation

- Expected document counts per collection:
- Cross-collection relationship checks:
- **Realism check** — who validates the data is plausible for this vertical:

## Known Gaps and Risks

- Untested area:
- Risk if it fails during the demo:
- Mitigation:
