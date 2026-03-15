import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: {
      id: "mock-user-1",
    },
    update: {
      fullName: "Demo Client",
      address: "Kyiv, Demo Street 1",
    },
    create: {
      id: "mock-user-1",
      fullName: "Demo Client",
      address: "Kyiv, Demo Street 1",
    },
  });

  await prisma.card.upsert({
    where: {
      id: "mock-card-uah",
    },
    update: {
      name: "Salary Card",
      balance: 125000,
      currency: "UAH",
      userId: user.id,
    },
    create: {
      id: "mock-card-uah",
      name: "Salary Card",
      balance: 125000,
      currency: "UAH",
      userId: user.id,
    },
  });

  await prisma.card.upsert({
    where: {
      id: "mock-card-usd",
    },
    update: {
      name: "Travel Card",
      balance: 4200,
      currency: "USD",
      userId: user.id,
    },
    create: {
      id: "mock-card-usd",
      name: "Travel Card",
      balance: 4200,
      currency: "USD",
      userId: user.id,
    },
  });

  await prisma.depositProgram.upsert({
    where: {
      id: "mock-program-uah",
    },
    update: {
      name: "Stable Income",
      rate: 15.5,
      termMonths: 6,
      currency: "UAH",
    },
    create: {
      id: "mock-program-uah",
      name: "Stable Income",
      rate: 15.5,
      termMonths: 6,
      currency: "UAH",
    },
  });

  await prisma.depositProgram.upsert({
    where: {
      id: "mock-program-usd",
    },
    update: {
      name: "Global Reserve",
      rate: 4.2,
      termMonths: 12,
      currency: "USD",
    },
    create: {
      id: "mock-program-usd",
      name: "Global Reserve",
      rate: 4.2,
      termMonths: 12,
      currency: "USD",
    },
  });

  await prisma.depositProgram.upsert({
    where: {
      id: "mock-program-eur",
    },
    update: {
      name: "Euro Growth",
      rate: 3.8,
      termMonths: 9,
      currency: "EUR",
    },
    create: {
      id: "mock-program-eur",
      name: "Euro Growth",
      rate: 3.8,
      termMonths: 9,
      currency: "EUR",
    },
  });

  console.log(`Seed ensured for user ${user.fullName}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
