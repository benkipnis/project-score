import { z } from "zod";
import { getPovCollection } from "../db.js";

export const updatePovSchema = z.object({
  pov_id: z.string().uuid(),
  phase_completed: z.string().optional(),
  tech_stack: z
    .object({
      languages: z.array(z.string()).optional(),
      frameworks: z.array(z.string()).optional(),
      atlas_features: z.array(z.string()).optional(),
    })
    .optional(),
  repo_url: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["active", "paused"]).optional(),
});

export type UpdatePovInput = z.infer<typeof updatePovSchema>;

export async function updatePov(input: UpdatePovInput): Promise<{ updated: boolean }> {
  const collection = await getPovCollection();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setFields: Record<string, any> = { updated_at: new Date() };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateOp: Record<string, any> = { $set: setFields };

  if (input.repo_url) setFields.repo_url = input.repo_url;
  if (input.status) setFields.status = input.status;
  if (input.tags) setFields.tags = input.tags;

  if (input.tech_stack) {
    for (const [key, val] of Object.entries(input.tech_stack)) {
      if (val !== undefined) setFields[`tech_stack.${key}`] = val;
    }
  }

  if (input.phase_completed) {
    updateOp.$addToSet = { phases_completed: input.phase_completed };
  }

  const result = await collection.updateOne({ pov_id: input.pov_id }, updateOp);
  return { updated: result.matchedCount > 0 };
}
