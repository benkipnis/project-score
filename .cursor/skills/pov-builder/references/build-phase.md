# Build Phase Execution

Repeat for each phase in `docs/build-plan.md`.

```
Build Phase [N]: [Phase Name]
- [ ] Step 1: Review phase requirements
- [ ] Step 2: Implement
- [ ] Step 3: Run phase tests
- [ ] Step 4: Present results and approval gate
- [ ] Step 5: Document and transition
- [ ] Step 6: Adherence self-check
```

### Step 1: Review Phase Requirements

Re-read the build plan entry:

- Prerequisites met?
- Components and expected outputs?
- Test/validation criteria from test plan?
- Compliance artifacts to update?

State these back to the user briefly.

### Step 2: Implement

Apply applicable chapters — NEVER silently skip:

- [build-guidelines.md](build-guidelines.md) — secrets, smoke tests
- [project-structure.md](project-structure.md) — file placement
- [ui-demo-build.md](ui-demo-build.md) + [ui-design.md](ui-design.md) — if UI work
- `atlas-connectivity-setup` skill — if connectivity/auth/network
- `generate-sample-data` skill — if data generation
- [benchmarking.md](benchmarking.md) — if performance work
- [handoff.md](handoff.md) — if handoff prep

Keep secrets in `.env`; placeholders only in `.env.example`.

### Step 3: Run Phase Tests

1. Run relevant smoke tests
2. Validate phase acceptance criteria
3. Capture passes and failures

Fix failures before presenting as done.

### Step 4: Present Results and Approval Gate

Present: what was built, test results, demo (if applicable), deviations.

**HARD GATE:** Wait for explicit approval. Record in `docs/gates.md`.

### Step 5: Document and Transition

- Mark phase complete in `docs/build-plan.md`
- Update `docs/phase-status.md` with test commands and results
- Identify next phase

### Step 6: Adherence Self-check

List chapters/skills applied, gate log, phase evidence, no secrets committed.
