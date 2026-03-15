import { prisma } from "@/lib/prisma";
import { safeDbQuery } from "./safe-query";
import { getDefaultCurrentUser } from "./current-user";

export async function getCurrentUserContracts() {
  const currentUser = await getDefaultCurrentUser();

  if (!currentUser) {
    return [];
  }

  const user = await safeDbQuery(
    () =>
      prisma.user.findUnique({
        where: {
          id: currentUser.id,
        },
        select: {
          contracts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              depositProgram: true,
            },
          },
        },
      }),
    null,
    "Failed to load current user contracts",
  );

  return user?.contracts ?? [];
}
