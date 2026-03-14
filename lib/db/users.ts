import { prisma } from "@/lib/prisma";
import type { CurrentUserWithDeposits } from "@/types/deposits";

export async function getCurrentUserWithDeposits(): Promise<CurrentUserWithDeposits | null> {
  return prisma.user.findFirst({
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
  });
}

export async function getCurrentUserCards() {
  const user = await prisma.user.findFirst({
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
  });

  return user?.cards ?? [];
}
