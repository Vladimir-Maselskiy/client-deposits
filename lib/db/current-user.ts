import { prisma } from "@/lib/prisma";
import { safeDbQuery } from "./safe-query";

export async function getDefaultCurrentUser() {
  return safeDbQuery(
    () =>
      prisma.user.findFirst({
        orderBy: {
          createdAt: "asc",
        },
      }),
    null,
    "Failed to resolve default current user",
  );
}
