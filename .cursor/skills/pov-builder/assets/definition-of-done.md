# Definition of Done Template

Complete this checklist before customer handoff or demo.

## P0 (Non-Negotiable)

- [ ] Success criteria are explicitly documented and every one maps to a demo beat in `docs/demo-narrative.md`.
- [ ] All hard gates (`G1`–`G7-Pn`) are approved and logged in `docs/gates.md`.
- [ ] No gate is left in `SUPERSEDED` status.
- [ ] `docs/demo-narrative.md` is complete, with a named "aha" moment and the coverage table filled in.
- [ ] Every beat in the narrative has been rehearsed end-to-end and works in the built demo.
- [ ] `docs/build-plan.md` and `docs/test-plan.md` are complete and current.
- [ ] `docs/phase-status.md` includes test commands and results for each phase.
- [ ] Connectivity and e2e smoke tests run with single commands and pass.
- [ ] No secrets are committed; `.env.example` is present and accurate.
- [ ] Data model review includes pattern mapping and anti-pattern checks.
- [ ] Sample data passes the realism bar — plausible to a domain expert in the customer's vertical.
- [ ] Benchmarks report p50/p95/p99 across 3+ runs for any performance-related success criterion.
- [ ] If UI is in scope: wireframes were approved (`G6`) and the built UI matches the approved option.

## P1 (Strongly Recommended)

- [ ] Architecture includes Atlas service mapping per component.
- [ ] Atlas tier, region, and estimated POV cost are recorded, with teardown owner and target date.
- [ ] README includes setup, run steps, architecture summary, expected outcomes, and a link to the demo narrative.
- [ ] `docs/runbook.md` includes reset/reseed/troubleshooting instructions.
- [ ] Non-MongoDB dependencies are explicitly justified.
- [ ] Demo environment verified for screen share: readable fonts, sensible window size, no dev tooling visible.
- [ ] Fallback path prepared for slow network or Atlas latency during the live demo.

## P2 (Optional Enhancements)

- [ ] Animated architecture view is available for less technical audiences.
- [ ] Additional synthetic data scenarios are prepared for Q&A.
- [ ] Backup demo path prepared for partial outage scenarios.

## Sign-Off

- Final reviewer:
- Date:
- Success criteria not demonstrated (and SA acceptance):
- Residual risks accepted:
- Teardown owner / date:
