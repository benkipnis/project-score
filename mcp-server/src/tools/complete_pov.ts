import { z } from "zod";
import { getPovCollection } from "../db.js";
import { embed, buildSummaryText } from "../embeddings.js";

export const completePovSchema = z.object({
  pov_id: z.string().uuid(),
  summary: z.string().min(50, "Summary must be at least 50 characters"),
  repo_url: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});

export type CompletePovInput = z.infer<typeof completePovSchema>;

export async function completePov(input: CompletePovInput): Promise<{ completed: boolean }> {
  const collection = await getPovCollection();

  const existing = await collection.findOne({ pov_id: input.pov_id });
  if (!existing) throw new Error(`POV not found: ${input.pov_id}`);

  const textForEmbedding = buildSummaryText({
    use_case: existing.use_case,
    customer: existing.customer,
    success_criteria: existing.success_criteria,
    tech_stack: existing.tech_stack,
    summary: input.summary,
  });

  const embedding = await embed(textForEmbedding);
  const now = new Date();

  const result = await collection.updateOne(
    { pov_id: input.pov_id },
    {
      $set: {
        status: "completed",
        summary: input.summary,
        embedding,
        ...(input.repo_url && { repo_url: input.repo_url }),
        ...(input.tags && { tags: input.tags }),
        updated_at: now,
        completed_at: now,
      },
    }
  );

  return { completed: result.matchedCount > 0 };
}
