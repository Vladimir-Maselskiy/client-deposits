import { DepositFlow } from "@/components/deposits/deposit-flow";
import { getDepositPrograms } from "@/lib/db/deposit-programs";
import { getCurrentUserCards, getCurrentUserProfile } from "@/lib/db/users";

export default async function NewDepositRoute() {
  const [user, programs, cards] = await Promise.all([
    getCurrentUserProfile(),
    getDepositPrograms(),
    getCurrentUserCards(),
  ]);

  return <DepositFlow user={user} programs={programs} cards={cards} />;
}
