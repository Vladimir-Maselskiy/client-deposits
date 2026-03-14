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

  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="overline" color="primary.main">
            New Deposit
          </Typography>
          <Typography variant="h3">Відкриття депозиту</Typography>
          <Typography color="text.secondary">
            У першому зрізі реалізації доступний каркас flow і вибір депозитної програми.
          </Typography>
        </Stack>

        <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 5 }}>
          <Stack spacing={4}>
            <DepositStepper activeStep={currentStep} />
            <SelectProgramStep programs={programs} />

            <Alert severity="info">
              Наступні кроки форми будуть додані після стабілізації базового каркасу.
              Зараз уже зберігається вибрана програма, а також доступні {cards.length}{" "}
              картки поточного користувача для наступного етапу.
            </Alert>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button component={Link} href="/deposits" variant="outlined">
                Назад до вкладів
              </Button>
              <Button variant="contained" disabled={!selectedProgramId}>
                Далі
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
