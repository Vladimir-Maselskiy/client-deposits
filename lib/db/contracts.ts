import { prisma } from "@/lib/prisma";
import { safeDbQuery } from "./safe-query";

export async function getCurrentUserContracts() {
  const user = await safeDbQuery(
    () =>
      prisma.user.findFirst({
        orderBy: {
          createdAt: "asc",
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
