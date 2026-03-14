export async function safeDbQuery<T>(
  query: () => Promise<T>,
  fallback: T,
  context: string,
) {
  try {
    return await query();
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message.split("\n")[0]
        : "Unknown database error";

    console.warn(`[db] ${context}: ${message}`);
    return fallback;
  }
}
