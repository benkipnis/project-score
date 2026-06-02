# Kickoff Workflow

Initialize compliance artifacts if missing (copy from `docs/` templates or `assets/`):

- `docs/gates.md`
- `docs/phase-status.md`
- `docs/definition-of-done.md`

```
POV Kickoff Progress:
- [ ] Phase 1: Requirements & success criteria
- [ ] Phase 2: Data model design
- [ ] Phase 3: Architecture & technology selection
- [ ] Phase 4: Build plan
- [ ] Phase 5: Test plan
- [ ] Phase 6: Scaffold and begin
- [ ] Phase 7: Adherence self-check
```

## Phase 1: Requirements & Success Criteria

Ask the user:
> "What are the success criteria for this POV? What specific outcomes need to be demonstrated to influence the deal?"

You MUST capture:

1. **Customer use case**
2. **Success criteria** — measurable outcomes
3. **Audience** — technical depth depends on this
4. **Timeline**
5. **Data requirements** — sample data or schemas available?
6. **UI scope** — ask: "Do you want a customer-facing demo UI?" **Default: yes.** Only skip UI if the user explicitly opts out (e.g., API-only, headless, no frontend). Record opt-out in `docs/phase-status.md`.

If UI is in scope, capture UI success criteria: tab narrative, live-activity expectations, primary value story.

If any item is unclear, flag it. NEVER proceed without defined success criteria.

**HARD GATE:** Present requirements back to the user and wait for confirmation. Record in `docs/gates.md`.

## Phase 2: Data Model Design

- Follow data modeling standards in `generate-sample-data` skill → [data-modeling.md](../../generate-sample-data/references/data-modeling.md).
- Evaluate patterns, flag anti-patterns, present trade-offs.
- If sample data is available, use the `generate-sample-data` skill for schema acquisition.
- Present schema with field types, relationships, array sizing, pattern justifications.

**HARD GATE:** Wait for explicit approval. Record in `docs/gates.md` using `docs/schema-review-template.md`.

## Phase 3: Architecture & Technology Selection

Load [architecture.md](architecture.md) and execute the architecture workflow.

**HARD GATE:** Present architecture and component map. Wait for explicit approval. Record in `docs/gates.md` using `docs/architecture-decision-template.md`.

## Phase 4: Build Plan

Follow [build-guidelines.md](build-guidelines.md). Produce `docs/build-plan.md`:

- Discrete phases with dependencies
- Parallel vs sequential work
- Map phases to architecture components
- **Include at least one UI build phase by default** unless user opted out in Phase 1

**HARD GATE:** Present build plan and wait for approval. Do NOT write application code until approved. Record in `docs/gates.md`.

## Phase 5: Test Plan

Produce `docs/test-plan.md`:

- Validation criteria per build phase
- Connectivity and end-to-end smoke tests (per build-guidelines)

Present for review. Adjust if needed.

## Phase 6: Scaffold and Begin

Follow [project-structure.md](project-structure.md):

1. Scaffold directories, `.env.example`, `.gitignore`
2. If UI in scope: scaffold `frontend/` and first informational tab per [ui-design.md](ui-design.md) and [ui-demo-build.md](ui-demo-build.md)
3. Implement connectivity smoke test
4. Present scaffold and confirm readiness for build Phase 1

From here, each build phase follows [build-phase.md](build-phase.md).

## Phase 7: Adherence Self-Check

List:

1. Which chapters/skills were used per phase
2. Kickoff gates logged in `docs/gates.md`
3. `docs/phase-status.md` kickoff readiness
4. No real credentials committed; `.env.example` ready
5. UI scope documented (included or explicit opt-out)
