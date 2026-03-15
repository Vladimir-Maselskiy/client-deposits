import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getActiveUser } from "@/lib/auth/active-user";
import type { CreateDepositPayload, CreateDepositResponse } from "@/types/deposits";
import { parseAmountInput } from "@/lib/utils/amount";

export class CreateDepositError extends Error {}

export async function createDepositContract(
  payload: CreateDepositPayload,
): Promise<CreateDepositResponse> {
  const currentUser = await getActiveUser();

  if (!currentUser) {
    throw new CreateDepositError("Поточного користувача не знайдено");
  }

  const program = await prisma.depositProgram.findUnique({
    where: {
      id: payload.selectedProgramId,
    },
  });

  if (!program) {
    throw new CreateDepositError("Депозитну програму не знайдено");
  }

  const amount = parseAmountInput(payload.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new CreateDepositError("Сума вкладу має бути більшою за нуль");
  }

  const trimmedCustomName = payload.customName.trim();
  const trimmedAgreementText = payload.agreementText.trim();

  if (!trimmedAgreementText) {
    throw new CreateDepositError("Текст договору є обов’язковим");
  }

  const contract = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    let cardId: string | null = null;

    if (payload.paymentMethod === "CARD") {
      if (!payload.selectedCardId) {
        throw new CreateDepositError("Для внесення з картки потрібно обрати картку");
      }

      const card = await tx.card.findUnique({
        where: {
          id: payload.selectedCardId,
        },
      });

      if (!card || card.userId !== currentUser.id) {
        throw new CreateDepositError("Обрана картка недоступна");
      }

      if (card.currency !== program.currency) {
        throw new CreateDepositError("Валюта картки має збігатися з валютою вкладу");
      }

      if (card.balance < amount) {
        throw new CreateDepositError("Недостатньо коштів на картці");
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
