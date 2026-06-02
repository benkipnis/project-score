# UI Design Guidelines

## Constraints

- You MUST use MongoDB color palettes and iconography. Reference [mongodb.com](https://www.mongodb.com) for current colors and design direction.
- You MUST maintain a professional, polished look consistent with MongoDB brand identity throughout the entire UI.
- You MUST design the UI to surface activity as it happens — live-updating charts, scrolling event logs, progress indicators. Static screenshots of results are not acceptable for a demo.
- The audience is typically non-technical. You MUST prioritize **value and outcomes** over raw technical detail in the primary view.

## Required Outcomes

- You MUST include expandable side panels, drawers, or dropdowns that reveal key technical components (e.g., MQL query, aggregation pipeline, Atlas service invoked). Keep these accessible but secondary.
- You MUST use a **single-page, multi-tab** layout.
- The **first tab MUST be purely informational**: architecture, what is tested, value proposition.
- Subsequent tabs MUST map to distinct components or phases.
- NEVER build multi-page navigation. Everything lives within tabs on a single page.

## When to load

When editing files under `frontend/**`, load [ui-demo-build.md](ui-demo-build.md) for the implementation workflow.
