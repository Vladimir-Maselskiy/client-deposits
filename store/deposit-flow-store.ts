"use client";

import { create } from "zustand";

type DepositFlowState = {
  currentStep: number;
  selectedProgramId: string | null;
  amount: string;
  customName: string;
  paymentMethod: "CASH" | "CARD";
  selectedCardId: string | null;
  agreementAccepted: boolean;
  setCurrentStep: (step: number) => void;
  setSelectedProgramId: (programId: string) => void;
  setDepositParams: (params: {
    amount: string;
    customName: string;
    paymentMethod: "CASH" | "CARD";
    selectedCardId: string | null;
  }) => void;
  resetFlow: () => void;
};

const initialState = {
  currentStep: 0,
  selectedProgramId: null,
  amount: "",
  customName: "",
  paymentMethod: "CASH" as const,
  selectedCardId: null,
  agreementAccepted: false,
};

export const useDepositFlowStore = create<DepositFlowState>((set) => ({
  ...initialState,
  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedProgramId: (programId) =>
    set({ selectedProgramId: programId, currentStep: 1 }),
  setDepositParams: (params) =>
    set({
      amount: params.amount,
      customName: params.customName,
      paymentMethod: params.paymentMethod,
      selectedCardId: params.paymentMethod === "CARD" ? params.selectedCardId : null,
      currentStep: 2,
    }),
  resetFlow: () => set(initialState),
}));
