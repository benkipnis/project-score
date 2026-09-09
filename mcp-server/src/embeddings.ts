import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY environment variable is required");
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

export async function embed(text: string): Promise<number[]> {
  const openai = getOpenAI();
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

export function buildSummaryText(doc: {
  use_case: string;
  customer: { vertical: string; region: string };
  success_criteria: string[];
  tech_stack: { languages: string[]; frameworks: string[]; atlas_features: string[] };
  summary?: string;
}): string {
  const parts = [
    `Use case: ${doc.use_case}`,
    `Vertical: ${doc.customer.vertical}`,
    `Region: ${doc.customer.region}`,
    `Success criteria: ${doc.success_criteria.join("; ")}`,
    `Tech stack: ${[
      ...doc.tech_stack.languages,
      ...doc.tech_stack.frameworks,
      ...doc.tech_stack.atlas_features,
    ].join(", ")}`,
  ];
  if (doc.summary) parts.push(`Summary: ${doc.summary}`);
  return parts.join("\n");
}
