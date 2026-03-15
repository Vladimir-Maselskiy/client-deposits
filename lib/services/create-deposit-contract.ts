import { prisma } from "@/lib/prisma";
import { getDefaultCurrentUser } from "@/lib/db/current-user";
import type { CreateDepositPayload, CreateDepositResponse } from "@/types/deposits";
import { parseAmountInput } from "@/lib/utils/amount";

export class CreateDepositError extends Error {}

export async function createDepositContract(
  payload: CreateDepositPayload,
): Promise<CreateDepositResponse> {
  const currentUser = await getDefaultCurrentUser();

  if (!currentUser) {
    throw new CreateDepositError("Current user was not found");
  }

  const program = await prisma.depositProgram.findUnique({
    where: {
      id: payload.selectedProgramId,
    },
  });

  if (!program) {
    throw new CreateDepositError("Deposit program was not found");
  }

  const amount = parseAmountInput(payload.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new CreateDepositError("Deposit amount must be greater than zero");
  }

  const trimmedCustomName = payload.customName.trim();
  const trimmedAgreementText = payload.agreementText.trim();

  if (!trimmedAgreementText) {
    throw new CreateDepositError("Agreement text is required");
  }

  const contract = await prisma.$transaction(async (tx) => {
    let cardId: string | null = null;

    if (payload.paymentMethod === "CARD") {
      if (!payload.selectedCardId) {
        throw new CreateDepositError("Card payment requires a selected card");
      }

      const card = await tx.card.findUnique({
        where: {
          id: payload.selectedCardId,
        },
      });

      if (!card || card.userId !== currentUser.id) {
        throw new CreateDepositError("Selected card is not available");
      }

      if (card.currency !== program.currency) {
        throw new CreateDepositError("Card currency must match deposit currency");
      }

      if (card.balance < amount) {
        throw new CreateDepositError("Insufficient card balance");
      }

      await tx.card.update({
        where: {
          id: card.id,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      cardId = card.id;
    }

    return tx.contract.create({
      data: {
        userId: currentUser.id,
        depositProgramId: program.id,
        cardId,
        amount,
        customName: trimmedCustomName || null,
        paymentMethod: payload.paymentMethod,
        agreementText: trimmedAgreementText,
      },
    });
  });

  return {
    contractId: contract.id,
    amount: contract.amount,
    currency: program.currency,
    programName: trimmedCustomName || program.name,
    createdAt: contract.createdAt.toISOString(),
  };
}
