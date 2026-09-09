import { MongoClient, Collection, Db } from "mongodb";

export interface PovDocument {
  pov_id: string;
  sa_name: string;
  sa_email: string;
  customer: {
    name: string;
    vertical: string;
    region: string;
  };
  use_case: string;
  success_criteria: string[];
  tech_stack: {
    languages: string[];
    frameworks: string[];
    atlas_features: string[];
  };
  repo_url?: string;
  status: "active" | "completed" | "paused";
  summary?: string;
  embedding?: number[];
  phases_completed: string[];
  tags: string[];
  created_at: Date;
  updated_at: Date;
  completed_at?: Date;
}

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI environment variable is required");

  client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  db = client.db("pov_registry");
  return db;
}

export async function getPovCollection(): Promise<Collection<PovDocument>> {
  const database = await getDb();
  return database.collection<PovDocument>("pov_registry");
}

export async function closeDb(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
