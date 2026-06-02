# Definition of Done Template

Complete this checklist before customer handoff or demo.

## P0 (Non-Negotiable)

- [ ] Success criteria are explicitly documented and mapped to demo flows.
- [ ] All hard gates are approved and logged in `docs/gates.md`.
- [ ] `docs/build-plan.md` and `docs/test-plan.md` are complete and current.
- [ ] `docs/phase-status.md` includes test commands and results for each phase.
- [ ] Connectivity and e2e smoke tests run with single commands and pass.
- [ ] No secrets are committed; `.env.example` is present and accurate.
- [ ] Data model review includes pattern mapping and anti-pattern checks.

## P1 (Strongly Recommended)

- [ ] Architecture includes Atlas service mapping per component.
- [ ] Benchmark evidence includes p50/p95/p99 and 3+ runs when performance is in scope.
- [ ] README includes setup, run steps, architecture summary, and expected outcomes.
- [ ] `docs/runbook.md` includes reset/reseed/troubleshooting instructions.
- [ ] Non-MongoDB dependencies are explicitly justified.

## P2 (Optional Enhancements)

- [ ] Animated architecture view is available for less technical audiences.
- [ ] Additional synthetic data scenarios are prepared for Q&A.
- [ ] Backup demo path prepared for partial outage scenarios.

## Sign-Off

- Final reviewer:
- Date:
- Residual risks accepted:
