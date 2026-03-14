"use client";

import { Alert, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import type { DepositProgramSummary, UserCardSummary } from "@/types/deposits";
import { useDepositFlowStore } from "@/store/deposit-flow-store";
import { DepositStepper } from "./deposit-stepper";
import { DepositParamsStep } from "./steps/deposit-params-step";
import { DepositReviewStep } from "./steps/deposit-review-step";
import { SelectProgramStep } from "./steps/select-program-step";

type Props = {
  programs: DepositProgramSummary[];
  cards: UserCardSummary[];
};

export function DepositFlow({ programs, cards }: Props) {
  const currentStep = useDepositFlowStore((state) => state.currentStep);
  const selectedProgramId = useDepositFlowStore((state) => state.selectedProgramId);
  const setCurrentStep = useDepositFlowStore((state) => state.setCurrentStep);
  const hasPrograms = programs.length > 0;

  const renderStep = () => {
    if (currentStep === 0) {
      return <SelectProgramStep programs={programs} />;
    }

    if (currentStep === 1) {
      return <DepositParamsStep cards={cards} />;
    }

    if (currentStep === 2) {
      return <DepositReviewStep programs={programs} cards={cards} />;
    }

    return (
      <Alert severity="info">
        The agreement step will be implemented next. The flow already preserves the selected
        program and the entered deposit parameters.
      </Alert>
    );
  };

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

        {hasPrograms && programs.some((program) => program.id.startsWith("mock-")) && (
          <Alert severity="info">
            Demo deposit programs are currently shown because the database is not connected yet.
          </Alert>
        )}

        <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 5 }}>
          <Stack spacing={4}>
            <DepositStepper activeStep={currentStep} />
            {renderStep()}

            {currentStep === 0 && (
              <>
                <Alert severity="info">
                  The selected program is already stored in Zustand, and {cards.length}{" "}
                  current-user cards are available for the upcoming payment step.
                </Alert>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button component={Link} href="/deposits" variant="outlined">
                    Back To Deposits
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!selectedProgramId}
                    onClick={() => setCurrentStep(1)}
                  >
                    Next
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
