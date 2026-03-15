import { DepositsPage } from "@/components/deposits/deposits-page";
import { getCurrentUserWithDeposits } from "@/lib/db/users";

export const dynamic = "force-dynamic";

export default async function DepositsRoute() {
  const user = await getCurrentUserWithDeposits();

  return <DepositsPage user={user} />;
}
