import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { getPovCollection } from "../db.js";

export const registerPovSchema = z.object({
  sa_name: z.string().min(1),
  sa_email: z.string().email(),
  customer_name: z.string().min(1),
  customer_vertical: z.string().min(1),
  customer_region: z.string().min(1),
  use_case: z.string().min(1),
  success_criteria: z.array(z.string()).min(1),
  languages: z.array(z.string()).default([]),
  frameworks: z.array(z.string()).default([]),
  atlas_features: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

export type RegisterPovInput = z.infer<typeof registerPovSchema>;

export async function registerPov(input: RegisterPovInput): Promise<{ pov_id: string }> {
  const collection = await getPovCollection();
  const pov_id = uuidv4();
  const now = new Date();

  await collection.insertOne({
    pov_id,
    sa_name: input.sa_name,
    sa_email: input.sa_email,
    customer: {
      name: input.customer_name,
      vertical: input.customer_vertical,
      region: input.customer_region,
    },
    use_case: input.use_case,
    success_criteria: input.success_criteria,
    tech_stack: {
      languages: input.languages,
      frameworks: input.frameworks,
      atlas_features: input.atlas_features,
    },
    status: "active",
    phases_completed: [],
    tags: input.tags,
    created_at: now,
    updated_at: now,
  });

  return { pov_id };
}
