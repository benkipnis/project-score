> **This is a Cursor agent toolkit — not a runnable application.**
> Copy `.cursor/` into your POV project repo. Do not run this repo directly.
> Your POV project should have its own `README.md` at its root.

# SCoRe — MongoDB POV Builder Toolkit

Reusable **Cursor skills and rules** that help MongoDB Solutions Architects deliver customer proofs of value (POV) faster, with consistent quality gates and MongoDB best practices.

## What's included

| Component | Purpose |
|-----------|---------|
| `pov-builder` skill | Full lifecycle: kickoff → build → UI → benchmark → dry-run → handoff |
| `atlas-connectivity-setup` skill | Atlas connection, auth, network, health checks |
| `generate-sample-data` skill | Realistic, consistent demo data generation |
| `mdb-orchestrator` rule | Always-on routing, P0 priorities, and hard gates |
| `docs/` templates | `gates.md`, build/test plans, schema and architecture reviews |
| `pov-registry` MCP server | Central registry: tracks POVs built, embeds summaries for semantic reuse search |

## Quick start

1. Copy `.cursor/` into your POV project (or install skills to `~/.cursor/skills/`).
2. Ensure `mdb-orchestrator.mdc` is active (always-on).
3. Configure the `pov-registry` MCP server once — see [POV Registry setup](#pov-registry-setup) below.
4. Start the agent with: *"Let's start a new POV for [customer use case]."*
5. The agent will use `pov-builder` and walk through gated phases.

## UI default

POVs include a demo UI unless you explicitly say otherwise (e.g., API-only). Say *"no frontend"* to opt out.

## Install options

- **Per-project:** Copy `.cursor/rules/` + `.cursor/skills/` into the POV repo.
- **Personal:** Symlink skills to `~/.cursor/skills/`; add the orchestrator rule to each project.
- **Team plugin:** Publish as a Cursor plugin pointing at these skill paths.

See [AGENTS.md](AGENTS.md) for agent-facing instructions.

## Hard gates

Explicit approval required (logged in `docs/gates.md`) before:

- Requirements, data model, architecture, build plan
- Each build phase completion

## Contributing

When changing workflows, update the numbered workflow in `pov-builder/SKILL.md` (or the relevant `pov-builder/references/*.md` depth file) and keep gate IDs and language consistent across `SKILL.md`, `mdb-orchestrator.mdc`, `assets/gates.md`, and `docs/SCORE-GUIDE.md`.

---

## POV Registry setup

The POV Registry is a central MongoDB database that tracks every POV built with the SCoRe toolkit. Setup is a **one-time personal configuration** — it lives in your Cursor profile, not in any POV project repo.

### Prerequisites

- Cursor IDE with MCP support enabled
- An API key issued by the SA team (contact your manager or the toolkit maintainer)

### Step 1: Add the MCP server to your Cursor config

Edit `~/.cursor/mcp.json` (create it if it doesn't exist):

```json
{
  "mcpServers": {
    "pov-registry": {
      "url": "https://pov-registry.mongodb-sa.internal/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      }
    }
  }
}
```

Replace `YOUR_API_KEY_HERE` with the key you received. If you already have other MCP servers configured, add `pov-registry` as a new entry inside the existing `mcpServers` object.

### Step 2: Verify the connection

Open a Cursor chat and ask:

> "Can you search the POV registry for any past real-time fraud detection POVs?"

The agent should call `search_similar_povs` and return results (or an empty list if the registry is new). If the tool is reported as unavailable, recheck your `mcp.json` syntax and restart Cursor.

### What gets stored

The registry stores only non-sensitive metadata: SA name and email, customer company name/vertical/region, use case, success criteria, tech stack, repo URL (optional), and an LLM-generated prose summary. No customer data, credentials, or code is ever stored.

---

## POV Registry — operator guide

> For whoever deploys and maintains the central `pov-registry` server. Skip this section if you are an SA using the toolkit.

### Atlas cluster

Create (or designate) an Atlas cluster. An M10 or M20 is sufficient for most SA team sizes.

- Database: `pov_registry`
- Collection: `pov_registry`

### Vector Search index

In the Atlas UI go to **Atlas Search → Create Search Index → JSON editor** and paste:

```json
{
  "name": "pov_embedding_index",
  "type": "vectorSearch",
  "fields": [
    { "type": "vector", "path": "embedding", "numDimensions": 1536, "similarity": "cosine" },
    { "type": "filter", "path": "status" },
    { "type": "filter", "path": "customer.vertical" },
    { "type": "filter", "path": "tech_stack.atlas_features" }
  ]
}
```

`numDimensions: 1536` matches `text-embedding-3-small`. Update if you change models.

### Recommended standard indexes

```json
{ "pov_id": 1 }
{ "status": 1, "customer.vertical": 1, "updated_at": -1 }
{ "sa_email": 1, "updated_at": -1 }
```

### Deploy the server

From `mcp-server/` in this repo:

```bash
npm install
npm run build
npm start
```

Copy `mcp-server/.env.example` to `mcp-server/.env` and fill in:

| Variable | Description |
|---|---|
| `MONGODB_URI` | Atlas connection string for the `pov_registry` database |
| `OPENAI_API_KEY` | API key for embedding generation (`text-embedding-3-small`) |
| `API_KEYS` | Comma-separated list of SA Bearer keys |
| `PORT` | Port to listen on (default `3000`) |

Deploy behind a TLS-terminating reverse proxy (nginx, Caddy, or a cloud load balancer) so it serves over HTTPS. The exposed URL goes into each SA's `mcp.json`.

### Issue API keys

Generate a key per SA:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add each key to `API_KEYS` (comma-separated) and restart the server. Distribute keys over a secure channel.
