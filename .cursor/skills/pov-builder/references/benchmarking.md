# Performance Benchmarking

## Priority

Benchmarks are **P1 by default, but P0 whenever performance appears in a customer success criterion.** When P0, benchmark evidence is the proof for that criterion's gate — it cannot be deferred, and the numbers must be measured rather than estimated. Check `docs/demo-narrative.md` for any beat whose "Proves" column names a performance criterion.

## Constraints

- Measure **warm** performance unless cold-start is explicitly in scope.
- Record **p50, p95, p99**. NEVER report only averages.
- Run benchmarks multiple times; report ranges. NEVER present single-run results.
- Check scripts into `scripts/benchmarks/`; single-command execution.
- Document cluster tier, region, indexes, dataset size for reproducibility.

## Required Outcomes

- Present results against customer success criteria, not abstract benchmarks.
- Fair comparisons only (same hardware, dataset, query semantics); state limitations explicitly.
- NEVER cherry-pick. Surface weak spots and optimization paths.

## Workflow

```
Benchmark Progress:
- [ ] Step 1: Confirm scope and success criteria
- [ ] Step 2: Define benchmark methodology
- [ ] Step 3: Implement or validate benchmark scripts
- [ ] Step 4: Execute runs and collect evidence
- [ ] Step 5: Analyze and frame results
- [ ] Step 6: Update compliance artifacts
- [ ] Step 7: Adherence self-check
```

### Step 1: Confirm scope

Confirm: performance targets, workload set, comparison expectations. Do not benchmark without criteria. If a numeric target exists in `docs/test-plan.md`, benchmark against that exact threshold.

### Step 2: Define methodology

Warm measurements; p50/p95/p99; at least 3 runs; same hardware/dataset/semantics for comparisons.

### Step 3: Implement or validate scripts

Under `scripts/benchmarks/`; single-command; output includes metadata and percentiles.

### Step 4: Execute runs

At least 3 runs; capture all runs including outliers.

### Step 5: Analyze and frame

Present: vs success criteria, percentile ranges, weak spots, fairness caveats.

### Step 6: Update compliance artifacts

Document tier, region, dataset, indexes, commands, config. Update `docs/phase-status.md` and `docs/gates.md` if closing a phase.

### Step 7: Adherence self-check

List constraints applied, run count, reproducibility fields captured.
