import { prisma } from "@/lib/prisma";
import { mockDepositPrograms } from "./mock-data";
import { safeDbQuery } from "./safe-query";

export async function getDepositPrograms() {
  return safeDbQuery(
    () =>
      prisma.depositProgram.findMany({
        orderBy: [{ currency: "asc" }, { termMonths: "asc" }, { rate: "desc" }],
      }),
    mockDepositPrograms,
    "Failed to load deposit programs",
  );
}
