import { NextResponse } from "next/server";
import { createDepositContract, CreateDepositError } from "@/lib/services/create-deposit-contract";
import type { CreateDepositPayload } from "@/types/deposits";

const RESPONSE_DELAY_MS = 10_000;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  const startedAt = Date.now();

  try {
    const payload = (await request.json()) as CreateDepositPayload;
    const result = await createDepositContract(payload);
    const remainingDelay = Math.max(0, RESPONSE_DELAY_MS - (Date.now() - startedAt));

    await wait(remainingDelay);

    return NextResponse.json(result);
  } catch (error) {
    const remainingDelay = Math.max(0, RESPONSE_DELAY_MS - (Date.now() - startedAt));

    await wait(remainingDelay);

    const message =
      error instanceof CreateDepositError
        ? error.message
        : "Не вдалося створити договір вкладу";

    return NextResponse.json({ message }, { status: 400 });
  }
}
