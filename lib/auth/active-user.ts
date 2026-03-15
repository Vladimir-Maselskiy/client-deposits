import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { safeDbQuery } from "@/lib/db/safe-query";
import { getDefaultCurrentUser } from "@/lib/db/current-user";
import { authOptions } from "./auth-options";

export async function getActiveUser() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return getDefaultCurrentUser();
  }

  return safeDbQuery(
    () =>
      prisma.user.findUnique({
        where: {
          id: userId,
        },
      }),
    null,
    "Failed to resolve active authenticated user",
  );
}
