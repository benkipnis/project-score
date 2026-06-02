# UI Demo Build

**Default:** Every POV includes a demo UI unless the user explicitly opted out (recorded in `docs/phase-status.md`).

## When to load

- During kickoff scaffold (informational first tab)
- During any build phase with UI work
- **When editing `frontend/**`** — load this chapter and [ui-design.md](ui-design.md)

## Required Artifacts

- UI under `frontend/`
- Updates to `docs/phase-status.md`
- `docs/gates.md` when UI closes a phase gate

## Workflow

```
UI Demo Build Progress:
- [ ] Step 1: Confirm scope and audience narrative
- [ ] Step 2: Define tab layout and flow
- [ ] Step 3: Implement value-first primary views
- [ ] Step 4: Implement technical transparency panels
- [ ] Step 5: Add live activity signals
- [ ] Step 6: Validate UX and update compliance artifacts
- [ ] Step 7: Adherence self-check
```

### Step 1: Confirm scope and audience narrative

Confirm: audience mix, value outcomes, critical demo interactions.

### Step 2: Define tab layout and flow

Per [ui-design.md](ui-design.md): single-page multi-tab; first tab informational; subsequent tabs map to components/phases.

### Step 3: Implement value-first primary views

Business outcomes in primary viewport; MongoDB-aligned branding.

### Step 4: Implement technical transparency panels

Expandable panels for MQL/aggregation, Atlas services, request/response details — secondary to value narrative.

### Step 5: Add live activity signals

Activity logs, progress indicators, streaming charts/metrics — not static-only for demo-critical flows.

### Step 6: Validate UX and update compliance artifacts

Validate tab flow, transparency panels, live updates, empty/error states. Update `docs/phase-status.md`.

### Step 7: Adherence self-check

List ui-design constraints applied, value narrative location, transparency panel locations.
