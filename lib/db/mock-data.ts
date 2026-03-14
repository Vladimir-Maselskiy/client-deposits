import type { CurrentUserWithDeposits, DepositProgramSummary, UserCardSummary } from "@/types/deposits";

export const mockCards: UserCardSummary[] = [
  {
    id: "mock-card-uah",
    name: "Salary Card",
    balance: 125000,
    currency: "UAH",
  },
  {
    id: "mock-card-usd",
    name: "Travel Card",
    balance: 4200,
    currency: "USD",
  },
];

export const mockDepositPrograms: DepositProgramSummary[] = [
  {
    id: "mock-program-uah",
    name: "Stable Income",
    rate: 15.5,
    termMonths: 6,
    currency: "UAH",
  },
  {
    id: "mock-program-usd",
    name: "Global Reserve",
    rate: 4.2,
    termMonths: 12,
    currency: "USD",
  },
  {
    id: "mock-program-eur",
    name: "Euro Growth",
    rate: 3.8,
    termMonths: 9,
    currency: "EUR",
  },
];

export const mockCurrentUser: CurrentUserWithDeposits = {
  id: "mock-user-1",
  fullName: "Demo Client",
  address: "Kyiv, Demo Street 1",
  cards: mockCards,
  contracts: [],
};
