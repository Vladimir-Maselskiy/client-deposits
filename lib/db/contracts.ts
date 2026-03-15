import { prisma } from "@/lib/prisma";
import type { DepositContractSummary } from "@/types/deposits";
import { safeDbQuery } from "./safe-query";
import { getActiveUser } from "@/lib/auth/active-user";

type CurrentUserContractsResult = {
  contracts: DepositContractSummary[];
} | null;

export async function getCurrentUserContracts(): Promise<DepositContractSummary[]> {
  const currentUser = await getActiveUser();

  if (!currentUser) {
    return [];
  }

  const user = await safeDbQuery<CurrentUserContractsResult>(
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
