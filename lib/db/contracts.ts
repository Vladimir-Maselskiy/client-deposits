import { prisma } from "@/lib/prisma";
import { safeDbQuery } from "./safe-query";
import { getActiveUser } from "@/lib/auth/active-user";

export async function getCurrentUserContracts() {
  const currentUser = await getActiveUser();

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
