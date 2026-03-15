import { prisma } from "@/lib/prisma";
import type {
  CurrentUserProfile,
  CurrentUserWithDeposits,
  UserCardSummary,
} from "@/types/deposits";
import { safeDbQuery } from "./safe-query";
import { getActiveUser } from "@/lib/auth/active-user";

type CurrentUserCardsResult = {
  cards: UserCardSummary[];
} | null;

export async function getCurrentUserWithDeposits(): Promise<CurrentUserWithDeposits | null> {
  const currentUser = await getActiveUser();

  if (!currentUser) {
    return null;
  }

  return safeDbQuery(
    () =>
      prisma.user.findUnique({
        where: {
          id: currentUser.id,
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

export async function getCurrentUserCards(): Promise<UserCardSummary[]> {
  const currentUser = await getActiveUser();

  if (!currentUser) {
    return [];
  }

  const user = await safeDbQuery<CurrentUserCardsResult>(
    () =>
      prisma.user.findUnique({
        where: {
          id: currentUser.id,
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
  const currentUser = await getActiveUser();

  if (!currentUser) {
    return null;
  }

  return {
    id: currentUser.id,
    fullName: currentUser.fullName,
    address: currentUser.address,
  };
}
