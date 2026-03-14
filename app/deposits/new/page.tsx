import { DepositFlow } from "@/components/deposits/deposit-flow";
import { getDepositPrograms } from "@/lib/db/deposit-programs";
import { getCurrentUserCards } from "@/lib/db/users";

export default async function NewDepositRoute() {
  const [programs, cards] = await Promise.all([
    getDepositPrograms(),
    getCurrentUserCards(),
  ]);

  return <DepositFlow programs={programs} cards={cards} />;
}
