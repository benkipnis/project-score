# Schema Review Template

## Context

- Use case:
- Collections in scope:
- Access patterns:
- Success criteria impacted:

## Proposed Schema

### Collection: `<name>`

- Key fields and types:
- Embedded documents/arrays:
- Expected cardinalities:
- Example document:

## MongoDB Pattern Mapping

List all applicable patterns and rationale:

- Attribute:
- Bucket:
- Computed:
- Document Versioning:
- Extended Reference:
- Outlier:
- Polymorphic:
- Schema Versioning:
- Subset:
- Tree/Graph:

## Anti-Pattern Check

- Unbounded arrays risk:
- Excessive normalization risk:
- Large document (16MB) risk:

## Data Realism Check (P0)

Sample data must be plausible to a domain expert in the customer's vertical. Implausible data undermines every demo beat.

- Realistic value ranges and units:
- Realistic naming/identifiers for this vertical:
- Realistic distributions (not uniform random where the real world is skewed):
- Realistic time patterns (business hours, seasonality, bursts):
- Who validates realism:

## Demo Beat Support

- Beats from `docs/demo-narrative.md` this model must support:
- Any beat the model cannot support (and resolution):

## Open Decisions and Trade-Offs

- Option A:
- Option B:
- Recommendation:

## Hard Gate Approval (G3)

- Approval requested from:
- Approval response (exact words):
- Date:
- Logged in `docs/gates.md`: Yes / No
