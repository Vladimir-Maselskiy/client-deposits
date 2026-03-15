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
      .min(1, "Сума є обов’язковою")
      .refine((value) => {
        const parsed = parseAmountInput(normalizeAmount(value));

        return Number.isFinite(parsed) && parsed > 0;
      }, "Сума має бути більшою за нуль"),
    customName: z.string().trim().max(60, "Назва має містити не більше 60 символів"),
    paymentMethod: z.enum(["CASH", "CARD"]),
    selectedCardId: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "CARD" && !data.selectedCardId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["selectedCardId"],
        message: "Оберіть картку для внесення з картки",
      });
    }
  });

export type DepositParamsFormValues = z.infer<typeof depositParamsSchema>;
