import type {
  CurrentUserProfile,
  DepositProgramSummary,
  UserCardSummary,
} from "@/types/deposits";

type BuildAgreementInput = {
  user: CurrentUserProfile | null;
  program: DepositProgramSummary | null;
  amount: string;
  customName: string;
  paymentMethod: "CASH" | "CARD";
  card: UserCardSummary | null;
};

export function buildDepositAgreement({
  user,
  program,
  amount,
  customName,
  paymentMethod,
  card,
}: BuildAgreementInput) {
  const today = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  const programName = customName || program?.name || "Not selected";
  const paymentMethodLabel = paymentMethod === "CARD" ? "Card" : "Cash";

  const cardLine =
    paymentMethod === "CARD" && card
      ? `${card.balance} ${card.currency}, ${card.name}`
      : "Not applicable";

  return `APPLICATION FORM
for opening a bank deposit

Client Information
Full name: ${user?.fullName ?? "Not available"}
Registration address: ${user?.address ?? "Not available"}

I, ${user?.fullName ?? "the client"}, request the opening of a deposit account under the selected terms and confirm the accuracy of the data provided.

Deposit Terms
Program name: ${programName}
Amount and currency: ${amount || "-"} ${program?.currency ?? ""}
Term: ${program?.termMonths ?? "-"} months
Payment method: ${paymentMethodLabel}
Card details: ${cardLine}

Date: ${today}
Signature: __________`;
}
