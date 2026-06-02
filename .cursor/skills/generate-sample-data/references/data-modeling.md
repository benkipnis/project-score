# Data Modeling

## Constraints

Evaluate every data model against MongoDB patterns and anti-patterns before presenting.

Reference: [Building with Patterns — A Summary](https://www.mongodb.com/company/blog/building-with-patterns-a-summary)

Explicitly state which patterns apply:

- Attribute, Bucket, Computed, Document Versioning, Extended Reference, Outlier, Polymorphic, Schema Versioning, Subset, Tree/Graph

Flag immediately when identified:

- **Unbounded arrays** — critical anti-pattern; performance and 16 MB limit risk
- **Excessive normalization** — discuss embed vs reference
- **Large documents** — approaching 16 MB BSON limit; recommend restructuring

## Required Outcomes

If multiple valid approaches exist and the best choice depends on access patterns you do not have, present options with trade-offs. NEVER pick based on assumed workload.
