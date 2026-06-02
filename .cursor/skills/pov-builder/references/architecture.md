# Architecture Design & Decision

## Constraints

- For every component, identify the MongoDB Atlas product or service (Atlas Search, Stream Processing, Triggers, App Services, Charts, Vector Search, etc.).
- If a component requires non-MongoDB technology, call it out with rationale. NEVER silently introduce external dependencies.
- Default to Atlas services over external dependencies unless no equivalent exists.
- For embeddings, use VoyageAI models (MongoDB platform).
- Look for opportunities to consolidate onto Atlas.

## Required Outcomes

Diagrams (priority):

1. **P0: Mermaid** — REQUIRED in markdown.
2. **P1: Animated web-based** — RECOMMENDED when useful for the audience.

Both MUST label each component with the Atlas product/service used.

## Workflow

```
Architecture Decision Progress:
- [ ] Step 1: Confirm scope and prerequisites
- [ ] Step 2: Design Atlas-first component map
- [ ] Step 3: Evaluate external dependencies and trade-offs
- [ ] Step 4: Produce architecture artifacts
- [ ] Step 5: Validate and request architecture gate approval
- [ ] Step 6: Update compliance artifacts
- [ ] Step 7: Adherence self-check
```

### Step 1: Confirm scope and prerequisites

Confirm: use case, success criteria, workload shape, security/deployment constraints, timeline, demo audience. Ask if missing.

### Step 2: Design Atlas-first component map

Each component: responsibility, Atlas service, inputs/outputs, dependencies.

### Step 3: Evaluate external dependencies

For each non-MongoDB dependency: why needed, Atlas alternative if any, trade-off and decision.

### Step 4: Produce architecture artifacts

1. Architecture decision doc using `docs/architecture-decision-template.md`
2. Mermaid diagram (P0)
3. Optional animated plan (P1)

### Step 5: Validate and request gate approval

Present: component map, external dependencies, trade-offs, risks/mitigations.

**HARD GATE:** Request explicit approval for Architecture & Technology Selection.

### Step 6: Update compliance artifacts

Log approval in `docs/gates.md`. Update `docs/phase-status.md`.

### Step 7: Adherence self-check

List rules applied, gate log location, artifact paths in `docs/phase-status.md`.
