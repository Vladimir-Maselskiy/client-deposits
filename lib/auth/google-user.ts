import { Currency } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function createRandomBalance(currency: Currency) {
  if (currency === Currency.UAH) {
    return 50000 + Math.floor(Math.random() * 100000);
  }

  return 1000 + Math.floor(Math.random() * 4000);
}

function createGoogleCards() {
  return [
    {
      name: "Google Primary Card",
      balance: createRandomBalance(Currency.UAH),
      currency: Currency.UAH,
    },
    {
      name: "Google Travel Card",
      balance: createRandomBalance(Currency.USD),
      currency: Currency.USD,
    },
  ];
}

export async function ensureGoogleUserByName(fullName: string) {
  const trimmedFullName = fullName.trim();

  if (!trimmedFullName) {
    throw new Error("Google profile name is required");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      fullName: trimmedFullName,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (existingUser) {
    return existingUser;
  }

  return prisma.user.create({
    data: {
      fullName: trimmedFullName,
      address: "Google profile address not provided",
      cards: {
        create: createGoogleCards(),
      },
    },
  });
}
