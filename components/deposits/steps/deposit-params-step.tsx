"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import type { UserCardSummary } from "@/types/deposits";
import { useDepositFlowStore } from "@/store/deposit-flow-store";
import {
  type DepositParamsFormValues,
  depositParamsSchema,
} from "@/lib/validators/deposit-flow";

type Props = {
  cards: UserCardSummary[];
};

export function DepositParamsStep({ cards }: Props) {
  const amount = useDepositFlowStore((state) => state.amount);
  const customName = useDepositFlowStore((state) => state.customName);
  const paymentMethod = useDepositFlowStore((state) => state.paymentMethod);
  const selectedCardId = useDepositFlowStore((state) => state.selectedCardId);
  const setCurrentStep = useDepositFlowStore((state) => state.setCurrentStep);
  const setDepositParams = useDepositFlowStore((state) => state.setDepositParams);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DepositParamsFormValues>({
    resolver: zodResolver(depositParamsSchema),
    defaultValues: {
      amount,
      customName,
      paymentMethod,
      selectedCardId,
    },
  });

  const currentPaymentMethod = watch("paymentMethod");
  const isCardPayment = currentPaymentMethod === "CARD";

  const onSubmit = (values: DepositParamsFormValues) => {
    setDepositParams(values);
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <Typography variant="h5">Deposit Parameters</Typography>
        <Typography color="text.secondary">
          Enter the amount, optional contract name, and payment method.
        </Typography>
      </Stack>

      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Amount"
            placeholder="10000"
            error={Boolean(errors.amount)}
            helperText={errors.amount?.message || "Enter the deposit amount"}
            fullWidth
          />
        )}
      />

      <Controller
        name="customName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Custom Name"
            placeholder="Vacation Reserve"
            error={Boolean(errors.customName)}
            helperText={errors.customName?.message || "Optional field"}
            fullWidth
          />
        )}
      />

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <FormControl error={Boolean(errors.paymentMethod)}>
            <FormLabel>Payment Method</FormLabel>
            <RadioGroup row {...field}>
              <FormControlLabel value="CASH" control={<Radio />} label="Cash" />
              <FormControlLabel value="CARD" control={<Radio />} label="Card" />
            </RadioGroup>
            <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>
          </FormControl>
        )}
      />

      {isCardPayment ? (
        <Controller
          name="selectedCardId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Card"
              value={field.value ?? ""}
              onChange={(event) => field.onChange(event.target.value || null)}
              error={Boolean(errors.selectedCardId)}
              helperText={
                errors.selectedCardId?.message || "Select a user card for payment"
              }
              fullWidth
            >
              {cards.map((card) => (
                <MenuItem key={card.id} value={card.id}>
                  {card.name} - {card.balance} {card.currency}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      ) : (
        <Alert severity="info">
          Cash payment does not require choosing a card.
        </Alert>
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button variant="outlined" onClick={() => setCurrentStep(0)}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Continue
        </Button>
      </Stack>
    </Stack>
  );
}
