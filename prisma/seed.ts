import { Currency, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.contract.deleteMany();
  await prisma.card.deleteMany();
  await prisma.depositProgram.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      id: "mock-user-1",
      fullName: "Demo Client",
      address: "Kyiv, Demo Street 1",
      cards: {
        create: [
          {
            id: "mock-card-uah",
            name: "Salary Card",
            balance: 125000,
            currency: Currency.UAH,
          },
          {
            id: "mock-card-usd",
            name: "Travel Card",
            balance: 4200,
            currency: Currency.USD,
          },
        ],
      },
    },
  });

  await prisma.depositProgram.createMany({
    data: [
      {
        id: "mock-program-uah",
        name: "Stable Income",
        rate: 15.5,
        termMonths: 6,
        currency: Currency.UAH,
      },
      {
        id: "mock-program-usd",
        name: "Global Reserve",
        rate: 4.2,
        termMonths: 12,
        currency: Currency.USD,
      },
      {
        id: "mock-program-eur",
        name: "Euro Growth",
        rate: 3.8,
        termMonths: 9,
        currency: Currency.EUR,
      },
    ],
  });

  console.log(`Seed completed for user ${user.fullName}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
