# Sample Data Generation Standards

## Constraints

- Ask for sample JSON documents or schemas before generating data.
- If none available, draft schemas from public domain knowledge and get approval first. NEVER generate against an unapproved schema.
- Maximize variety — no repetitive placeholders.
- Vary embedded array sizes; ask for average, min, max if not obvious.
- Maintain cross-collection consistency; ask about cardinality — NEVER guess.

## Required Outcomes

Generators MUST be configurable:

- Field mappings easy to update
- Document count as runtime parameter
- Seed/randomization controls for reproducibility
