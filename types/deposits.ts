import type { Currency, PaymentMethod } from "@prisma/client";

export type DepositProgramSummary = {
  id: string;
  name: string;
  rate: number;
  termMonths: number;
  currency: Currency;
};

export type UserCardSummary = {
  id: string;
  name: string;
  balance: number;
  currency: Currency;
};

export type DepositContractSummary = {
  id: string;
  amount: number;
  customName: string | null;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  depositProgram: {
    id: string;
    name: string;
    currency: Currency;
    termMonths: number;
    rate: number;
  };
};

export type CurrentUserWithDeposits = {
  id: string;
  fullName: string;
  address: string;
  cards: UserCardSummary[];
  contracts: DepositContractSummary[];
};

export type CurrentUserProfile = {
  id: string;
  fullName: string;
  address: string;
};

export type CreateDepositPayload = {
  selectedProgramId: string;
  amount: string;
  customName: string;
  paymentMethod: "CASH" | "CARD";
  selectedCardId: string | null;
  agreementText: string;
};

export type CreateDepositResponse = {
  contractId: string;
  amount: number;
  currency: Currency;
  programName: string;
  createdAt: string;
};
