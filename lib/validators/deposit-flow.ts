import { z } from "zod";
import { parseAmountInput } from "@/lib/utils/amount";

function normalizeAmount(value: string) {
  return value.replace(/\s+/g, "").replace(",", ".");
}

export const depositParamsSchema = z
  .object({
    amount: z
      .string()
      .trim()
      .min(1, "Amount is required")
      .refine((value) => {
        const parsed = parseAmountInput(normalizeAmount(value));

        return Number.isFinite(parsed) && parsed > 0;
      }, "Amount must be greater than zero"),
    customName: z.string().trim().max(60, "Name must be 60 characters or fewer"),
    paymentMethod: z.enum(["CASH", "CARD"]),
    selectedCardId: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "CARD" && !data.selectedCardId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["selectedCardId"],
        message: "Select a card for card payment",
      });
    }
  });

export type DepositParamsFormValues = z.infer<typeof depositParamsSchema>;
