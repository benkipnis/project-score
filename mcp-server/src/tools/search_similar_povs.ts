import { z } from "zod";
import { getPovCollection } from "../db.js";
import { embed } from "../embeddings.js";

export const searchSimilarPovsSchema = z.object({
  query: z.string().min(5, "Provide a meaningful description of the use case or customer need"),
  limit: z.number().int().min(1).max(10).default(5),
  filter_vertical: z.string().optional(),
  filter_atlas_features: z.array(z.string()).optional(),
});

export type SearchSimilarPovsInput = z.infer<typeof searchSimilarPovsSchema>;

export interface PovSearchResult {
  pov_id: string;
  sa_name: string;
  sa_email: string;
  customer_vertical: string;
  customer_region: string;
  use_case: string;
  summary: string;
  repo_url?: string;
  atlas_features: string[];
  tags: string[];
  completed_at?: Date;
  score: number;
}

export async function searchSimilarPovs(input: SearchSimilarPovsInput): Promise<PovSearchResult[]> {
  const collection = await getPovCollection();
  const queryEmbedding = await embed(input.query);

  // Build pre-filter for the vector search
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const preFilter: Record<string, any> = { status: { $eq: "completed" } };
  if (input.filter_vertical) preFilter["customer.vertical"] = { $eq: input.filter_vertical };
  if (input.filter_atlas_features?.length) {
    preFilter["tech_stack.atlas_features"] = { $in: input.filter_atlas_features };
  }

  const pipeline = [
    {
      $vectorSearch: {
        index: "pov_embedding_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: input.limit * 10,
        limit: input.limit,
        filter: preFilter,
      },
    },
    {
      $project: {
        _id: 0,
        pov_id: 1,
        sa_name: 1,
        sa_email: 1,
        customer_vertical: "$customer.vertical",
        customer_region: "$customer.region",
        use_case: 1,
        summary: 1,
        repo_url: 1,
        atlas_features: "$tech_stack.atlas_features",
        tags: 1,
        completed_at: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ];

  const results = await collection.aggregate<PovSearchResult>(pipeline).toArray();
  return results;
}
