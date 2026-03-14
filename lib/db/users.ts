import { prisma } from "@/lib/prisma";
import type { CurrentUserProfile, CurrentUserWithDeposits } from "@/types/deposits";
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

export async function getCurrentUserProfile(): Promise<CurrentUserProfile | null> {
  return safeDbQuery(
    () =>
      prisma.user.findFirst({
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          fullName: true,
          address: true,
        },
      }),
    null,
    "Failed to load current user profile",
  );
}
