export function validateApiKey(authHeader: string | undefined): boolean {
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7).trim();

  const validKeys = (process.env.API_KEYS ?? "").split(",").map((k) => k.trim()).filter(Boolean);
  return validKeys.includes(token);
}
