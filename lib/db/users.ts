import { prisma } from "@/lib/prisma";
import type { CurrentUserWithDeposits } from "@/types/deposits";
import { safeDbQuery } from "./safe-query";

export async function getCurrentUserWithDeposits(): Promise<CurrentUserWithDeposits | null> {
  return safeDbQuery(
    () =>
      prisma.user.findFirst({
        orderBy: {
          createdAt: "asc",
        },
        include: {
          cards: {
            orderBy: {
              name: "asc",
            },
          },
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
    "Failed to load current user with deposits",
  );
}

export async function getCurrentUserCards() {
  const user = await safeDbQuery(
    () =>
      prisma.user.findFirst({
        orderBy: {
          createdAt: "asc",
        },
        include: {
          cards: {
            orderBy: {
              name: "asc",
            },
          },
        },
      }),
    null,
    "Failed to load current user cards",
  );

  return user?.cards ?? [];
}
