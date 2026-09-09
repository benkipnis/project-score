# UI Demo Build

**Default:** Every POV includes a demo UI unless the user explicitly opted out (recorded in `docs/phase-status.md`).

## Design Constraints

- You MUST use MongoDB color palettes and iconography. Reference [mongodb.com](https://www.mongodb.com) for current colors and design direction.
- You MUST maintain a professional, polished look consistent with MongoDB brand identity throughout the entire UI.
- You MUST design the UI to surface activity as it happens — live-updating charts, scrolling event logs, progress indicators. Static screenshots of results are not acceptable for a demo.
- The audience is typically non-technical. You MUST prioritize **value and outcomes** over raw technical detail in the primary view.
- You MUST include expandable side panels, drawers, or dropdowns that reveal key technical components (e.g., MQL query, aggregation pipeline, Atlas service invoked). Keep these accessible but secondary.
- You MUST use a **single-page, multi-tab** layout.
- The **first tab MUST be purely informational**: architecture, what is tested, value proposition.
- Subsequent tabs MUST map to distinct components or phases.
- NEVER build multi-page navigation. Everything lives within tabs on a single page.

## When to load

- During Step 8 scaffold (wireframes + informational first tab)
- During any build phase with UI work (Step 9)
- **When editing `frontend/**`**

## Inputs

The UI implements `docs/demo-narrative.md`. Before starting, read it — the beat sheet determines the tabs, the "aha" moment determines the primary view, and the technical depth ladder determines what goes behind transparency panels. Do not design the UI independently of the narrative.

## Required Artifacts

- `docs/wireframes.md` — all options presented plus the approved one, with `G6` approval logged in `docs/gates.md` before any `frontend/` code is written
- UI under `frontend/`
- Updates to `docs/phase-status.md`
- `docs/gates.md` entries for `G6` and for any build phase gate the UI closes

## Workflow

```
UI Demo Build Progress:
- [ ] Step 1: Confirm scope and audience narrative
- [ ] Step 2: Define tab layout and flow
- [ ] Step 3: Generate wireframes ← HARD GATE (G6)
- [ ] Step 4: Implement value-first primary views
- [ ] Step 5: Implement technical transparency panels
- [ ] Step 6: Add live activity signals
- [ ] Step 7: Validate UX and update compliance artifacts
- [ ] Step 8: Adherence self-check
```

### Step 1: Confirm scope and audience narrative

Confirm against `docs/demo-narrative.md`: audience mix, value outcomes, the "aha" moment, and the critical demo interactions per beat.

### Step 2: Define tab layout and flow

Single-page multi-tab; first tab informational; subsequent tabs map to demo beats or components. See Design Constraints above.

### Step 3: Generate wireframes ← HARD GATE (G6)

Before writing any UI code, generate **at least 3 wireframe options** for the SA to review. Do not proceed to implementation until one is approved. (Express engagements may present one option — see the engagement size policy in `SKILL.md` — but approval is still required.)

Produce wireframes as Mermaid diagrams or ASCII mockups (or both) — one per major layout/flow variation. Each wireframe must show:

1. **Tab bar** — tab names, order, and the informational first tab
2. **Primary viewport** — what value content occupies the main area of each tab
3. **Technical transparency panels** — where expandable panels or drawers appear
4. **Live activity areas** — where streaming charts, logs, or indicators sit
5. **Key interactive elements** — buttons, filters, or drill-downs that drive the demo narrative
6. **Beat mapping** — which demo beat from `docs/demo-narrative.md` each tab serves, and where the "aha" moment lands

Present all wireframes together with a brief rationale for each variation (e.g., "Option A emphasizes real-time feed; Option B leads with aggregate metrics"). Ask the SA to select one, request modifications, or approve a hybrid.

**HARD GATE (G6):** Wait for explicit wireframe approval before writing any `frontend/` code. Save all options and the approved choice to `docs/wireframes.md`. Log approval as `G6` in `docs/gates.md`. Update `docs/phase-status.md`.

### Step 4: Implement value-first primary views

Business outcomes in primary viewport; MongoDB-aligned branding. Build to the approved wireframe from Step 3.

### Step 5: Implement technical transparency panels

Expandable panels for MQL/aggregation, Atlas services, request/response details — secondary to value narrative.

### Step 6: Add live activity signals

Activity logs, progress indicators, streaming charts/metrics — not static-only for demo-critical flows.

### Step 7: Validate UX and update compliance artifacts

Validate tab flow, transparency panels, live updates, empty/error states. Confirm the build matches the approved `G6` wireframe and that every beat it serves is demonstrable. Update `docs/phase-status.md`.

### Step 8: Adherence self-check

List design constraints applied, `G6` approval logged, beats served by each tab, value narrative location, transparency panel locations.
