import { prisma } from "@/lib/prisma";

export async function getCurrentUserContracts() {
  const user = await prisma.user.findFirst({
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
  });

  return user?.contracts ?? [];
}
