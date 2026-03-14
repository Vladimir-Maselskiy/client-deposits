import { prisma } from "@/lib/prisma";

export async function getDepositPrograms() {
  return prisma.depositProgram.findMany({
    orderBy: [{ currency: "asc" }, { termMonths: "asc" }, { rate: "desc" }],
  });
}
