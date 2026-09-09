# Hard Gate Log Template

Use this file to record explicit approvals for each hard gate. A gate is complete only after approval is recorded here.

## Project

- Project name:
- Customer/account:
- Owner:
- Engagement size: Standard / Express
- UI scope: Included / Opted out (reason:)
- Last updated:

## Gate Entries

| Gate ID | Gate Name | Status | What was presented | Approval phrase (exact) | Approved by | Date | Evidence links |
|---|---|---|---|---|---|---|---|
| G1 | Requirements & Success Criteria | | | | | | |
| G2 | Demo Narrative | | | | | | |
| G3 | Data Model Review | | | | | | |
| G4 | Architecture & Technology Selection | | | | | | |
| G5 | Build Plan & Scope Budget | | | | | | |
| G6 | UI Wireframes (if UI in scope) | | | | | | |
| G7-P1 | Build Phase 1 Completion | | | | | | |
| G7-P2 | Build Phase 2 Completion | | | | | | |
| G7-P3 | Build Phase 3 Completion | | | | | | |

Status values: `PENDING`, `APPROVED`, `SUPERSEDED`.

## Change Log

Record every gate rejection or post-approval requirement change here.

| Date | Gate(s) affected | What changed | Requested by | Gates marked SUPERSEDED | Re-approved on |
|---|---|---|---|---|---|
| | | | | | |

## POV Registry

```
pov_id:
repo_url:
completed_at:
```

## Notes

- Add additional `G7-Pn` rows as needed for later phases.
- `G6` applies only when UI is in scope. Mark it `N/A` if the SA opted out.
- Evidence links should point to files such as `docs/demo-narrative.md`, `docs/schema-review.md`, `docs/architecture-decision.md`, `docs/build-plan.md`, `docs/wireframes.md`, or test outputs.
- A gate is complete only when explicit approval is received AND recorded in this table.
