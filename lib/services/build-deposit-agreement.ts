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
  const today = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  const programName = customName || program?.name || "Не обрано";
  const paymentMethodLabel = paymentMethod === "CARD" ? "Картка" : "Готівка";

  const cardLine =
    paymentMethod === "CARD" && card
      ? `${card.balance} ${card.currency}, ${card.name}`
      : "Не застосовується";

  return `ЗАЯВА-АНКЕТА
на відкриття банківського вкладу

Дані клієнта
ПІБ: ${user?.fullName ?? "Недоступно"}
Адреса реєстрації: ${user?.address ?? "Недоступно"}

Я, ${user?.fullName ?? "клієнт"}, прошу відкрити мені депозитний рахунок згідно з обраними умовами та підтверджую достовірність вказаних даних.

Умови вкладу
Назва програми: ${programName}
Сума та валюта: ${amount || "-"} ${program?.currency ?? ""}
Строк: ${program?.termMonths ?? "-"} ${program?.termMonths === 1 ? "місяць" : "місяців"}
Спосіб внесення: ${paymentMethodLabel}
Дані картки: ${cardLine}

${today}
Підпис __________`;
}
