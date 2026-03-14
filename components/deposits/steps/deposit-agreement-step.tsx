"use client";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type {
  CurrentUserProfile,
  DepositProgramSummary,
  UserCardSummary,
} from "@/types/deposits";
import { buildDepositAgreement } from "@/lib/services/build-deposit-agreement";
import { useDepositFlowStore } from "@/store/deposit-flow-store";

type Props = {
  user: CurrentUserProfile | null;
  programs: DepositProgramSummary[];
  cards: UserCardSummary[];
};

export function DepositAgreementStep({ user, programs, cards }: Props) {
  const selectedProgramId = useDepositFlowStore((state) => state.selectedProgramId);
  const amount = useDepositFlowStore((state) => state.amount);
  const customName = useDepositFlowStore((state) => state.customName);
  const paymentMethod = useDepositFlowStore((state) => state.paymentMethod);
  const selectedCardId = useDepositFlowStore((state) => state.selectedCardId);
  const agreementAccepted = useDepositFlowStore((state) => state.agreementAccepted);
  const setAgreementAccepted = useDepositFlowStore(
    (state) => state.setAgreementAccepted,
  );
  const setCurrentStep = useDepositFlowStore((state) => state.setCurrentStep);

  const selectedProgram =
    programs.find((program) => program.id === selectedProgramId) ?? null;
  const selectedCard = cards.find((card) => card.id === selectedCardId) ?? null;

  const agreementText = buildDepositAgreement({
    user,
    program: selectedProgram,
    amount,
    customName,
    paymentMethod,
    card: selectedCard,
  });

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h5">Agreement</Typography>
        <Typography color="text.secondary">
          Review the generated agreement text and confirm consent before submission is added.
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 5,
          whiteSpace: "pre-wrap",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "0.95rem",
          lineHeight: 1.8,
          color: "text.primary",
          background:
            "linear-gradient(180deg, rgba(255,252,247,0.98) 0%, rgba(250,244,235,0.98) 100%)",
        }}
      >
        {agreementText}
      </Paper>

      <FormControlLabel
        control={
          <Checkbox
            checked={agreementAccepted}
            onChange={(event) => setAgreementAccepted(event.target.checked)}
          />
        }
        label="I confirm that I have read the agreement and accept its terms."
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button variant="outlined" onClick={() => setCurrentStep(2)}>
          Back
        </Button>
        <Button variant="contained" disabled={!agreementAccepted}>
          Submit Deposit
        </Button>
      </Stack>
    </Stack>
  );
}
