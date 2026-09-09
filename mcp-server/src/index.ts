import "node:process";
import Fastify from "fastify";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { validateApiKey } from "./auth.js";
import { registerPov, registerPovSchema } from "./tools/register_pov.js";
import { updatePov, updatePovSchema } from "./tools/update_pov.js";
import { completePov, completePovSchema } from "./tools/complete_pov.js";
import { searchSimilarPovs, searchSimilarPovsSchema } from "./tools/search_similar_povs.js";
import { closeDb } from "./db.js";

const PORT = parseInt(process.env.PORT ?? "3000", 10);

function buildMcpServer(): McpServer {
  const server = new McpServer({
    name: "pov-registry",
    version: "1.0.0",
  });

  server.tool(
    "search_similar_povs",
    "Search the POV registry for semantically similar past engagements. Call this at the start of every kickoff to surface reusable patterns and relevant prior art.",
    searchSimilarPovsSchema.shape,
    async (args) => {
      const input = searchSimilarPovsSchema.parse(args);
      const results = await searchSimilarPovs(input);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    "register_pov",
    "Register a new POV in the central registry. Call immediately after the kickoff Phase 1 hard gate is approved.",
    registerPovSchema.shape,
    async (args) => {
      const input = registerPovSchema.parse(args);
      const result = await registerPov(input);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      };
    }
  );

  server.tool(
    "update_pov",
    "Update an existing POV record. Call at each hard gate (data model, architecture, build plan) to record phase completion and tech stack refinements.",
    updatePovSchema.shape,
    async (args) => {
      const input = updatePovSchema.parse(args);
      const result = await updatePov(input);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      };
    }
  );

  server.tool(
    "complete_pov",
    "Mark a POV as complete, store the final prose summary, and generate + persist the vector embedding for future semantic search. Call during handoff Step 6.",
    completePovSchema.shape,
    async (args) => {
      const input = completePovSchema.parse(args);
      const result = await completePov(input);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      };
    }
  );

  return server;
}

async function main() {
  const fastify = Fastify({ logger: true });

  fastify.addHook("onRequest", async (request, reply) => {
    if (!validateApiKey(request.headers.authorization)) {
      await reply.status(401).send({ error: "Unauthorized" });
    }
  });

  fastify.all("/mcp", async (request, reply) => {
    const mcpServer = buildMcpServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    await mcpServer.connect(transport);

    reply.raw.on("close", () => {
      void transport.close();
      void mcpServer.close();
    });

    await transport.handleRequest(request.raw, reply.raw, request.body);
  });

  fastify.get("/health", async () => ({ status: "ok" }));

  await fastify.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`POV Registry MCP server listening on port ${PORT}`);
}

process.on("SIGTERM", async () => {
  await closeDb();
  process.exit(0);
});

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
