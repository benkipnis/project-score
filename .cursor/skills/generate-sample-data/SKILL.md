---
name: generate-sample-data
description: >-
  Step-by-step workflow for generating sample data for MongoDB POV/POC demos.
  Use when creating test data, seed scripts, mock documents, populating
  collections, or editing scripts/data/**.
---

# Generate Sample Data

Read and follow existing MongoDB Schema Design skills available to the harness and explicitly document the tool use and resulting schema; bad schemas lead to poor demo data.

## Required Artifacts

- Generator scripts under `scripts/data/`

## Workflow

```
Data Generation Progress:
- [ ] Step 1: Acquire or generate schema
- [ ] Step 2: Schema review and approval gate
- [ ] Step 3: Generate 5 sample records
- [ ] Step 4: Sample review and approval gate
- [ ] Step 5: Build configurable generator
- [ ] Step 6: Full data generation
- [ ] Step 7: Adherence self-check
```

### Step 1: Acquire or Generate Schema

Ask the user:
> "Do you have sample JSON documents or a schema for this collection? If so, please share them. If not, I will generate a schema based on publicly available information about your domain."

- **If sample provided:** Use as basis; identify types, arrays, relationships.
- **If none:** Explicitly clarify domain with user and research domain; draft realistic schema.

NEVER skip this step. NEVER invent a schema without sourcing attempt first.

### Step 2: Schema Review and Approval Gate

Present: document structure, field types/constraints, array sizing (avg/min/max), relationships/cardinality, modeling patterns, flagged concerns.

**HARD GATE:** Do NOT proceed until explicit approval from user after presenting recommendations; prior approvals to proceed do not count here. Record in `docs/gates.md`.

### Step 3: Generate 5 Sample Records

Exactly 5 documents: field diversity, array size variation, cross-collection consistency, valid BSON (no TBD/TODO placeholders).

### Step 4: Sample Review and Approval Gate

Ask if records look realistic. 

**HARD GATE:** Do NOT proceed until explicit approval from user after presenting recommendations; prior approvals to proceed do not count here. Record in `docs/gates.md`.

### Step 5: Build Configurable Generator

Runtime document count, configurable field mappings, seed controls, array size variation, cross-collection consistency. Save under `scripts/data/`.

### Step 6: Full Data Generation

Run at target volume; verify counts and spot-check. Update `docs/phase-status.md` when part of an active phase.

### Step 7: Adherence Self-check

List references applied, gates logged in `docs/gates.md`.
Update `readme.md` to include information about the data shape, makeup, and generation process including all optional parameters
