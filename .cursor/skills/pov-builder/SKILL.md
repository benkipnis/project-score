---
name: pov-builder
description: >-
  End-to-end MongoDB POV/POC lifecycle: kickoff, demo narrative, data model,
  architecture, build phases, demo UI (default), benchmarks, dry-run, and
  handoff. Use when starting a new proof of value, gathering requirements,
  designing the demo narrative or architecture, executing build phases,
  building frontend/demo UI (including when editing frontend/**), running demo
  dry-runs, benchmarking, or packaging customer handoff. UI is included unless
  the user explicitly opts out (API-only, headless, no frontend).
---

# POV Builder

Primary skill for MongoDB Solutions Architect proof-of-value engagements.

The deliverable is a demo that lands with the customer — not just a repo that passes checks. Every gate protects either the demo narrative or the evidence behind it.

## Default scope

- **UI included** unless the user explicitly opts out. Record opt-out in `docs/phase-status.md`.
- Policy and routing: `mdb-orchestrator` rule. Hard gates are marked inline throughout this workflow.

## Priority tiers

Apply these when work must be cut or deferred:

- **P0 — never cut:** hard gates, security/secrets, test evidence, compliance artifacts, and any capability named in a customer success criterion.
- **P1 — cut only with logged rationale:** demo UI, benchmarks (P0 when performance is a success criterion), animated diagrams.
- **P2 — cut freely:** polish, extra tabs, cosmetic enhancements.

Record every P1/P2 cut and its rationale in `docs/phase-status.md`. Never cut P0.

Build educational, fact-based, Atlas-first POVs aligned to customer success criteria. Ask clarifying questions when unclear. Call out non-MongoDB dependencies with rationale.

## Hard gate index

| Gate | Step | Log as |
|---|---|---|
| Requirements & success criteria | Step 1 | `G1` |
| Demo narrative | Step 3 | `G2` |
| Data model review | Step 4 | `G3` |
| Architecture & technology selection | Step 5 | `G4` |
| Build plan & scope budget | Step 6 | `G5` |
| UI wireframes (if UI in scope) | Step 8 or first UI build phase | `G6` |
| Each build phase completion | Step 9 | `G7-Pn` |

A gate is complete only when explicit approval is received **and** logged in `docs/gates.md`.

## Engagement size

Choose a path at Step 1 and record it in `docs/phase-status.md`:

- **Standard (default)** — full workflow, each gate presented separately.
- **Express** — for engagements under roughly 3 working days. `G1`–`G5` may be combined into a single approval session, and `G2`/`G6` may present one option instead of three. Every gate still requires explicit approval and a log entry. Never skip P0 items or test evidence.

If the SA has not stated a timeline, ask before choosing a path.

## Change control

If a gate is rejected, or requirements change after a gate was approved:

1. **Stop.** Do not keep building against a superseded decision.
2. **Log the change** in `docs/gates.md`: which gate is affected, what changed, who requested it, and the date.
3. **Mark the affected gate and all downstream gates `SUPERSEDED`** in `docs/gates.md`.
4. **Re-run the earliest affected step** and re-obtain approval. Downstream gates must be re-approved in order.
5. **Update `docs/phase-status.md`** with rework scope and the impact on the Step 6 scope budget.

Never silently adapt to a changed requirement. A superseded gate that has not been re-approved is an unlogged gate.

---

## Workflow

### Step 0 — Skill Entry (always run first)

Before doing anything else, orient to the current state of the engagement:

1. **Detect phase** — Does `docs/gates.md` exist?
   - No → this is a new POV. Start at Step 1. Do not skip ahead.
   - Yes → read it, identify which gates are approved, and resume from the next incomplete step.

2. **Verify prior gate** — The gate immediately preceding the requested work must be logged as approved in `docs/gates.md` (see the Hard gate index above). If it is not, surface the gap to the user and offer to resume from the incomplete step. Do not silently proceed.

3. **Assert required artifacts** — Before any build phase begins, ALL of the following must exist:
   - `docs/gates.md`, `docs/phase-status.md`, `docs/definition-of-done.md`
   - `docs/demo-narrative.md`, `docs/build-plan.md`, `README.md` (stub at minimum)

4. **Check for superseded gates** — If any gate is marked `SUPERSEDED`, follow Change control above before continuing.

5. **Confirm with the user** before proceeding if this is a resumed engagement. State the current step, last approved gate, and what comes next.

---

### Step 1 — Requirements & Success Criteria ← HARD GATE (G1)

Capture everything needed before any design begins. These are the customer's facts — elicit them before looking at prior POVs, so reuse opportunities do not shape what the customer is asking for.

Ask the SA:
> "What are the success criteria for this POV? What specific outcomes need to be demonstrated to influence the deal?"

Capture:
1. **Customer use case**
2. **Success criteria** — measurable outcomes. These drive Step 3 beats and the Step 6 scope budget.
3. **Audience** — technical mix and seniority. This sets the depth ladder in Step 3 and the transparency-panel balance in the UI.
4. **Timeline** — available working days and the demo date. This sets the engagement size above and the Step 6 scope budget.
5. **Data requirements** — sample data or schemas available? Any domain experts who will scrutinize the data?
6. **Customer vertical and region** — needed to filter the Step 2 registry search and to register the POV.
7. **UI scope** — default yes; only skip if the user explicitly opts out (API-only, headless). Record opt-out in `docs/phase-status.md`.

If UI is in scope, also capture: tab narrative, live-activity expectations, primary value story.

If the SA is working in an unfamiliar vertical and is unsure what to ask, you may run an exploratory `search_similar_povs` call to surface *questions worth asking* — but do not present prior architectures or success criteria as suggestions at this stage. Substantive reuse analysis belongs in Step 2.

**Expected outputs:**
- `docs/gates.md` initialized (copy from `assets/gates.md`)
- `docs/phase-status.md` initialized (copy from `assets/phase-status.md`), including engagement size and UI scope
- `docs/definition-of-done.md` initialized (copy from `assets/definition-of-done.md`)
- Requirements logged in `docs/gates.md`

**HARD GATE (G1):** Present requirements back to the user. Wait for explicit approval before proceeding. Log approval in `docs/gates.md`.

---

### Step 2 — Registry Reuse Search

Now that the requirements are approved, search for prior POVs — the approved use case, success criteria, and vertical make a far better query than a pre-requirements guess. This is the last step before design begins, so prior art can shape the narrative, data model, and architecture rather than arriving too late to use.

- Build the `query` from the approved use case and success criteria. Use `filter_vertical` with the customer vertical from Step 1, and `filter_atlas_features` if candidate features are already known.
- Call `search_similar_povs` via the `pov-registry` MCP server.
- Present results as brief cards and ask which, if any, to factor into the design.
- **Record useful prior patterns in `docs/gates.md`** under the `G1` requirements entry, so they stay visible at every downstream gate. (`docs/gates.md` exists by now — it was initialized in Step 1.)
- Note explicitly which prior beats, schemas, or architectures are candidates for reuse in Steps 3–5.
- If the `pov-registry` MCP server is not available, skip the search and note it in the Step 11 adherence check.

Then call `register_pov` and store the returned `pov_id` in `docs/gates.md` under `## POV Registry`. Registering after the search lets you reflect any decision to extend a prior POV in the tags and use-case description.

→ See **POV Registry Reference** at the end of this file for `search_similar_povs` and `register_pov` parameters.

---

### Step 3 — Demo Narrative Design ← HARD GATE (G2)

Design the story before designing the system. The build plan in Step 6 derives from this narrative.

Using the use case, success criteria, audience, and timeline from Step 1 — and any reusable beats surfaced in Step 2 — produce `docs/demo-narrative.md` from `assets/demo-narrative-template.md`:

1. **Demo length** — target runtime in minutes, derived from the audience and their meeting slot.
2. **Opening hook** — the first 60 seconds. What does the customer see that makes them care?
3. **Beat sheet** — an ordered list of demo segments. Each beat states what the SA shows, what the customer should conclude, and **which Step 1 success criterion it proves**.
4. **The "aha" moment** — the single beat that carries the deal. Name it explicitly.
5. **Technical depth ladder** — per beat, what stays in the primary view versus what lives behind a transparency panel. Calibrate to the Step 1 audience.
6. **Anticipated objections** — the three hardest questions this audience will ask, and which beat answers each.

**Coverage rule:** every success criterion from Step 1 MUST be proved by at least one beat. If a criterion has no beat, either add one or flag it as undemonstrable and get the SA to accept that explicitly in the gate.

If UI is in scope, this narrative drives the wireframes (`G6` — see [references/ui-demo-build.md](references/ui-demo-build.md)).

**Expected outputs:**
- `docs/demo-narrative.md` completed
- Success criteria → beat coverage table with no unexplained gaps

**HARD GATE (G2):** Present the beat sheet, the named "aha" moment, and the coverage table. Wait for explicit approval. Log in `docs/gates.md`.

After approval, call `update_pov` with `phase_completed: "demo-narrative"`.

---

### Step 4 — Data Model Design ← HARD GATE (G3)

Design the document model before writing any application code.

- Follow data modeling standards: `generate-sample-data` skill → [data-modeling.md](../../generate-sample-data/references/data-modeling.md).
- Evaluate schema patterns, flag anti-patterns, present trade-offs.
- If sample data is available, use the `generate-sample-data` skill for schema acquisition.
- Present schema with field types, relationships, array sizing, and pattern justifications.
- **Data realism (P0):** the model and its sample data MUST be plausible to a domain expert in the customer's vertical — realistic value ranges, naming, distributions, and time patterns. Implausible data undermines every beat in Step 3. Name who will validate realism.
- Confirm the model supports every beat in `docs/demo-narrative.md`.

**Expected outputs:**
- `docs/schema-review.md` completed (from `assets/schema-review-template.md`)
- Schema logged in `docs/gates.md`

**HARD GATE (G3):** Wait for explicit approval. Log approval and schema decision in `docs/gates.md`.

After approval, call `update_pov` with `phase_completed: "data-model"` and any refined tech stack fields.

---

### Step 5 — Architecture & Technology Selection ← HARD GATE (G4)

Design the Atlas-first system architecture.

- For every component, identify the MongoDB Atlas product or service.
- If a component requires non-MongoDB technology, call it out with rationale. Never silently introduce external dependencies.
- Default to Atlas services over external dependencies unless no equivalent exists.
- For embeddings, use VoyageAI models (MongoDB platform).
- **Atlas tier, cost, and teardown:** state the required cluster tier, region, and estimated cost for the POV window. Flag any tier above M30 for explicit SA confirmation. Record who owns teardown and the target teardown date — this carries into Step 11.

Produce:
1. Architecture decision doc using `assets/architecture-decision-template.md`
2. **Mermaid diagram (P0 — required)** in markdown, labeling each component with its Atlas product/service
3. Optional animated diagram (P1 — recommended for non-technical audiences)

> Detail: [references/architecture.md](references/architecture.md)

**Expected outputs:**
- `docs/architecture-decision.md` completed, including tier/cost/teardown
- Mermaid diagram committed
- Architecture logged in `docs/gates.md`

**HARD GATE (G4):** Present component map, external dependencies, tier and cost, trade-offs, and risks. Wait for explicit approval. Log in `docs/gates.md`.

After approval, call `update_pov` with `phase_completed: "architecture"`, finalized `tech_stack`, and `repo_url` if the git remote is established.

---

### Step 6 — Build Plan & Scope Budget ← HARD GATE (G5)

Produce `docs/build-plan.md` using `assets/build-plan-template.md`:

- Discrete phases with dependencies
- Parallel vs. sequential work
- Each phase mapped to architecture components **and to the demo beats from Step 3**
- **Include at least one UI build phase** unless the user opted out in Step 1

**Scope budget (required):**

1. State the Step 1 timeline as available working days.
2. Assign estimated effort to each phase.
3. If total effort exceeds available days, cut or defer P1/P2 work until it fits — never P0, and never anything proving a success criterion. Record each cut and its rationale in `docs/phase-status.md`.
4. State the resulting demo-ready date and name any success criterion that will not be met by it.

Do not write any application code until this gate is approved.

**Expected outputs:**
- `docs/build-plan.md` including the scope budget and beat mapping

**HARD GATE (G5):** Present the build plan, scope budget, and demo-ready date. Wait for explicit approval. Log in `docs/gates.md`.

After approval, call `update_pov` with `phase_completed: "build-plan"`.

---

### Step 7 — Test Plan

Produce `docs/test-plan.md` using `assets/test-plan-template.md`:

- Validation criteria per build phase
- **Each Step 3 beat needs a test** that proves it works, so the dry run in Step 10 has evidence rather than opinion
- Connectivity smoke tests and end-to-end smoke tests — both runnable with a single command (e.g., `npm run test:connectivity`, `npm run test:e2e`)
- Pass thresholds for any success criterion with a numeric target

**Expected outputs:**
- `docs/test-plan.md`

Present for review; adjust if needed before scaffolding.

---

### Step 8 — Scaffold & Begin

Stand up the project skeleton before writing feature code.

Follow the required directory structure — **NEVER place files outside of this structure without explicit user approval:**

```
<poc-name>/
├── frontend/          # ALL UI code (if UI in scope) — ALWAYS here
├── backend/           # ALL backend/API code — ALWAYS here
├── scripts/
│   ├── data/          # Data generation scripts — ALWAYS here
│   └── benchmarks/    # Benchmark scripts — ALWAYS here
├── tests/
│   ├── connectivity/  # Connectivity smoke tests — ALWAYS here
│   └── e2e/           # End-to-end smoke tests — ALWAYS here
├── docs/              # ALL documentation — ALWAYS here
├── .env.example       # Placeholder values only — never .env
├── .gitignore
└── README.md
```

Root-level files: only `.env.example`, `.gitignore`, `README.md`, `package.json` (or equivalent), and project config files. No root-level scripts, no docs outside `docs/`, no mixed frontend/backend directories.

Steps:
1. Scaffold directories, `.env.example`, `.gitignore`, `README.md` stub
2. **Initialize version control** — `git init` if needed, commit the scaffold, and establish the remote. Ask the SA where the remote should live if it is not obvious. Record `repo_url` in `docs/gates.md` under `## POV Registry` and pass it to the next `update_pov` call.
3. If UI is in scope: produce wireframes and obtain **`G6`** approval, then scaffold `frontend/` and the first informational tab — see [references/ui-demo-build.md](references/ui-demo-build.md)
4. Implement connectivity smoke test
5. Present scaffold and confirm readiness for Build Phase 1

**Security rules (P0, non-negotiable):**
- Never commit secrets; `.env` always in `.gitignore`
- `.env.example` must have placeholder values for every required variable
- Verify `.gitignore` covers secrets before the first commit, not after

---

### Step 9 — Build Phase Execution (repeat per phase) ← HARD GATE per phase (G7-Pn)

Repeat this step for each phase in `docs/build-plan.md`.

```
Build Phase [N]: [Phase Name]
- [ ] 9a: Review phase requirements
- [ ] 9b: Implement
- [ ] 9c: Run phase tests
- [ ] 9d: Present results and gate
- [ ] 9e: Document and transition
- [ ] 9f: Adherence self-check
```

**9a. Review phase requirements** — Re-read the build plan entry: prerequisites met? Expected outputs? Which demo beats does this phase serve? Test criteria from `docs/test-plan.md`? Compliance artifacts to update? State these back to the user briefly.

**9b. Implement** — Apply as applicable — NEVER silently skip:
- Secrets and smoke tests: see Step 8 security rules
- File placement: see Step 8 directory structure
- UI work: [references/ui-demo-build.md](references/ui-demo-build.md) — requires `G6` wireframe approval before any `frontend/` code
- Atlas connectivity/auth/network: `atlas-connectivity-setup` skill
- Data generation: `generate-sample-data` skill — data must pass the Step 4 realism bar
- Performance work: [references/benchmarking.md](references/benchmarking.md) — **P0 when performance is a success criterion**

**9c. Run phase tests** — Run smoke tests. Validate phase acceptance criteria. Capture passes and failures. Fix failures before presenting as done.

**9d. Present results and gate** — Present: what was built, which beats it now supports, test results, demo (if applicable), deviations from plan.

**HARD GATE (G7-Pn):** Wait for explicit approval. Log in `docs/gates.md` using `assets/phase-completion-template.md`. Update `docs/phase-status.md`.

After approval, call `update_pov` with `phase_completed: "build-phase-N"` and any updated tech stack fields.

**9e. Document and transition** — Mark phase complete in `docs/build-plan.md`. Update `docs/phase-status.md` with test commands and results. Re-check the scope budget against remaining days. Identify the next phase.

**9f. Adherence self-check** — List references/skills applied, gate logged, phase evidence captured, no secrets committed.

---

### Step 10 — Demo Dry Run

Run after all build phases are approved.

```
Demo Dry Run:
- [ ] 10.1: Infrastructure health check
- [ ] 10.2: Data validation and realism
- [ ] 10.3: Walk each tab end-to-end
- [ ] 10.4: Performance spot-check
- [ ] 10.5: Security and hygiene review
- [ ] 10.6: Narrative rehearsal against the beat sheet
- [ ] 10.7: Demo environment readiness
- [ ] 10.8: Update compliance artifacts
```

**10.1 Infrastructure health check** — Run connectivity smoke tests. Verify Atlas, APIs, external deps, and credentials. Fix before proceeding.

**10.2 Data validation and realism** — Check document counts, spot-check 3–5 docs, validate cross-collection relationships. Re-apply the Step 4 realism bar: would a domain expert find this data plausible? Regenerate if stale, inconsistent, or obviously synthetic.

**10.3 Walk each tab end-to-end** (if UI in scope) — Info tab accuracy, feature tabs, live updates, transparency panels, edge cases. Confirm the built UI matches the approved `G6` wireframe. Document and fix critical issues.

**10.4 Performance spot-check** (if performance in scope) — Run [references/benchmarking.md](references/benchmarking.md) benchmarks (at least 3 iterations). Verify displayed percentiles and documented cluster config against the success criterion thresholds.

**10.5 Security and hygiene** — No secrets in UI or repo; `.env.example` present; flag `0.0.0.0/0` if network access is open; README complete; dependencies pinned.

**10.6 Narrative rehearsal against the beat sheet** — Walk `docs/demo-narrative.md` beat by beat and confirm each one actually works in the built demo. For each beat: does it land in the intended time, does it prove its success criterion, and does the "aha" moment hold? Rehearse the opening hook and the three anticipated objections. Fix or re-cut any beat that does not land.

**10.7 Demo environment readiness** — Verify the demo is presentable on the actual delivery setup: readable font sizes at screen-share resolution, sensible window size and browser zoom, no dev tooling visible. Confirm what happens if the network or Atlas is slow mid-demo, and prepare a fallback (cached data, recorded segment, or a documented "skip this beat" path).

**10.8 Update compliance artifacts** — Update `docs/definition-of-done.md` and `docs/phase-status.md`. List residual risks.

---

### Step 11 — Handoff

Package the POV for customer delivery and write the final registry entry.

```
Handoff Progress:
- [ ] 11a: Complete README
- [ ] 11b: Complete runbook
- [ ] 11c: Repo hygiene sweep
- [ ] 11d: Validate artifacts
- [ ] 11e: Confirm teardown ownership
- [ ] 11f: Present handoff summary
- [ ] 11g: Write POV to registry
- [ ] 11h: Adherence self-check
```

**11a. Complete README** — must cover:
1. What this demonstrates (customer use case)
2. Architecture overview (link to diagram)
3. Prerequisites (Atlas tier, services, local tooling)
4. Setup instructions (clone to running)
5. How to run the demo — link to `docs/demo-narrative.md` for the intended beat order

**11b. Complete runbook** (`docs/runbook.md`) — reset steps, reseed/regeneration, known limitations, troubleshooting.

**11c. Repo hygiene sweep** — remove dead code, debug logging, experiments; pin dependency versions; verify `.gitignore`.

**11d. Validate artifacts** — complete `docs/definition-of-done.md` and `docs/phase-status.md`. Confirm every row in the Master Artifact Manifest below is present and no gate is left `SUPERSEDED`.

**11e. Confirm teardown ownership** — restate the Atlas tier, who owns teardown, and the target teardown date from Step 5. If the cluster should stay up past the demo, record until when and why in `docs/runbook.md`.

**11f. Present handoff summary** — what's included, limitations, how to run/reset, teardown plan.

**11g. Write POV to registry** — after the SA acknowledges the handoff summary:
- Generate a 200–400 word prose summary from `docs/gates.md`, `docs/demo-narrative.md`, `docs/build-plan.md`, and `docs/definition-of-done.md`
- Present draft to the SA for quick review
- Call `complete_pov` with `pov_id` from `docs/gates.md`
- If `pov_id` is missing (registry was unavailable at kickoff), call `register_pov` first, then `complete_pov`

→ See **POV Registry Reference** at the end of this file for `complete_pov` parameters.

**11h. Adherence self-check** — list references applied per phase, residual risks, accepted trade-offs, and any success criterion not demonstrated. Confirm `pov_id` and `completed_at` are written in `docs/gates.md` under `## POV Registry`.

---

## Master Artifact Manifest

Use this table to self-check at any phase boundary. If an artifact is missing when required, stop and create it before continuing.

| Artifact | Created at | Required before |
|---|---|---|
| `docs/gates.md` | Step 1 | Any build phase |
| `docs/phase-status.md` | Step 1 | Any build phase |
| `docs/definition-of-done.md` | Step 1 | Any build phase |
| `docs/demo-narrative.md` | Step 3 | Data model gate (`G3`) |
| `docs/schema-review.md` | Step 4 | Architecture gate (`G4`) |
| `docs/architecture-decision.md` | Step 5 | Build plan gate (`G5`) |
| `docs/build-plan.md` (incl. scope budget) | Step 6 | Any build phase |
| `docs/test-plan.md` | Step 7 | Build Phase 1 |
| `README.md` (stub) | Step 8 scaffold | Build Phase 1 |
| `.env.example` | Step 8 scaffold | Build Phase 1 |
| `.gitignore` | Step 8 scaffold | First commit |
| Git remote established | Step 8 scaffold | `update_pov` with `repo_url` |
| `docs/wireframes.md` (approved option) | Step 8 or first UI phase | Any `frontend/` code |
| `docs/runbook.md` | Step 11 | Customer delivery |
| `README.md` (complete) | Step 11 | Customer delivery |

## Compliance templates

Bootstrap from repo `docs/` (canonical) or copy from `assets/`:

- `assets/gates.md`, `assets/phase-status.md`, `assets/definition-of-done.md`
- `assets/demo-narrative-template.md`, `assets/schema-review-template.md`, `assets/architecture-decision-template.md`
- `assets/build-plan-template.md`, `assets/test-plan-template.md`, `assets/phase-completion-template.md`

---

## POV Registry Reference

The POV Registry is a central MongoDB database that tracks every POV built with the SCoRe toolkit. It enables reuse discovery (semantic search), institutional memory, and pattern recognition across engagements.

Accessed via the `pov-registry` MCP server. All calls are optional — if the server is not configured, skip registry steps and note the gap in the Step 11 adherence check.

**Before using:** Verify the `pov-registry` MCP server is reachable by checking whether `search_similar_povs` is listed in available MCP tools. If not available, skip all registry steps for this session.

**Data privacy:** Never include real customer PII beyond company name and vertical, credentials, connection strings, or verbatim confidential customer data in any registry call.

### `search_similar_povs` — Step 2 (after `G1`)

Surface relevant prior POVs after requirements are approved, before design begins.

- `query` — prose description built from the approved use case and success criteria (e.g., `"real-time fraud detection with scoring and alerting"`)
- `limit` — number of results (default 5, max 10)
- `filter_vertical` — customer vertical from Step 1 (e.g., `"Financial Services"`)
- `filter_atlas_features` — optional list of Atlas features to filter by

Present results as brief cards: customer vertical, use case, SA name, repo URL, similarity score. Ask: "Do any of these look relevant?" Record useful patterns in `docs/gates.md` under the `G1` requirements entry.

### `register_pov` — Step 2 (after the reuse search)

Create the registry record so the POV is tracked from the start. Store the returned `pov_id` in `docs/gates.md` under `## POV Registry`:

```
## POV Registry
pov_id: <uuid returned by register_pov>
repo_url: <set once the git remote exists, Step 8>
```

Required parameters: `sa_name`, `sa_email`, `customer_name`, `customer_vertical`, `customer_region`, `use_case` (one sentence), `success_criteria` (array), `languages`, `frameworks`, `atlas_features`, `tags`.

Because this runs after the reuse search, `success_criteria` come from the approved `G1` gate rather than a guess, and `tags` can record any decision to extend or adapt a prior POV surfaced in the search.

### `update_pov` — Steps 3, 4, 5, 6, 9 (after each hard gate)

Keep the registry record current as the tech stack solidifies.

- `pov_id` — read from `docs/gates.md`
- `phase_completed` — gate/phase name (e.g., `"demo-narrative"`, `"data-model"`, `"architecture"`, `"build-plan"`, `"build-phase-1"`)
- `tech_stack` — partial update: only send fields that changed (`languages`, `frameworks`, `atlas_features`)
- `repo_url` — add once the git remote is established in Step 8
- `tags` — add new tags if scope has evolved

### `complete_pov` — Step 11g (after handoff summary)

Mark the POV complete and generate its vector embedding (makes it discoverable by future SAs).

- `pov_id` — read from `docs/gates.md`
- `summary` — 200–400 word prose generated from `docs/gates.md`, `docs/demo-narrative.md`, `docs/build-plan.md`, and `docs/definition-of-done.md`; cover: what was demonstrated, Atlas features used and why, architecture highlights, outcome vs. success criteria, reuse-worthy patterns. **Generate this yourself — do not ask the SA to write it.** Present for quick review before calling.
- `repo_url` — final git remote URL if available
- `tags` — final tag list

### Error handling

| Situation | Action |
|---|---|
| MCP server not configured | Skip all registry steps; note in Step 11h adherence check |
| `register_pov` fails | Log error in `docs/gates.md`, continue kickoff normally |
| `pov_id` not found in `docs/gates.md` | Prompt SA to re-register or skip `update_pov` for this session |
| `complete_pov` embedding fails | Retry once; if still failing, store summary without embedding and note it |
