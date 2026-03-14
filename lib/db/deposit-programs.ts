import { prisma } from "@/lib/prisma";
import { safeDbQuery } from "./safe-query";

export async function getDepositPrograms() {
  return safeDbQuery(
    () =>
      prisma.depositProgram.findMany({
        orderBy: [{ currency: "asc" }, { termMonths: "asc" }, { rate: "desc" }],
      }),
    [],
    "Failed to load deposit programs",
  );
}
