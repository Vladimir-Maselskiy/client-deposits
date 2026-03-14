"use client";

import { Alert, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import type { DepositProgramSummary, UserCardSummary } from "@/types/deposits";
import { useDepositFlowStore } from "@/store/deposit-flow-store";
import { DepositStepper } from "./deposit-stepper";
import { SelectProgramStep } from "./steps/select-program-step";

type Props = {
  programs: DepositProgramSummary[];
  cards: UserCardSummary[];
};

export function DepositFlow({ programs, cards }: Props) {
  const currentStep = useDepositFlowStore((state) => state.currentStep);
  const selectedProgramId = useDepositFlowStore((state) => state.selectedProgramId);
  const hasPrograms = programs.length > 0;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="overline" color="primary.main">
            New Deposit
          </Typography>
          <Typography variant="h3">Open Deposit</Typography>
          <Typography color="text.secondary">
            This first slice contains the flow shell and a working program selection step.
          </Typography>
        </Stack>

        {!hasPrograms && (
          <Alert severity="warning">
            Deposit programs are not available yet. This usually means the database is not
            connected or seed data has not been created.
          </Alert>
        )}

        <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 5 }}>
          <Stack spacing={4}>
            <DepositStepper activeStep={currentStep} />
            <SelectProgramStep programs={programs} />

            <Alert severity="info">
              The next form steps will be added in the next implementation pass. The selected
              program is already stored in Zustand, and {cards.length} current-user cards are
              available for the upcoming payment step.
            </Alert>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button component={Link} href="/deposits" variant="outlined">
                Back To Deposits
              </Button>
              <Button variant="contained" disabled={!selectedProgramId}>
                Next
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
