import { prisma } from "@/lib/prisma";
import { safeDbQuery } from "./safe-query";

type DefaultCurrentUser = Awaited<ReturnType<typeof prisma.user.findFirst>>;

export async function getDefaultCurrentUser(): Promise<DefaultCurrentUser> {
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
