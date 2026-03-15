"use client";

import { useEffect } from "react";
import { Alert, Box, Button, Paper, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateDepositPayload,
  CreateDepositResponse,
  CurrentUserProfile,
  DepositProgramSummary,
  UserCardSummary,
} from "@/types/deposits";
import { useDepositFlowStore } from "@/store/deposit-flow-store";
import { DepositStepper } from "./deposit-stepper";
import { DepositAgreementStep } from "./steps/deposit-agreement-step";
import { DepositParamsStep } from "./steps/deposit-params-step";
import { DepositReviewStep } from "./steps/deposit-review-step";
import { SelectProgramStep } from "./steps/select-program-step";

type Props = {
  user: CurrentUserProfile | null;
  programs: DepositProgramSummary[];
  cards: UserCardSummary[];
};

export function DepositFlow({ user, programs, cards }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentStep = useDepositFlowStore((state) => state.currentStep);
  const selectedProgramId = useDepositFlowStore((state) => state.selectedProgramId);
  const amount = useDepositFlowStore((state) => state.amount);
  const customName = useDepositFlowStore((state) => state.customName);
  const paymentMethod = useDepositFlowStore((state) => state.paymentMethod);
  const selectedCardId = useDepositFlowStore((state) => state.selectedCardId);
  const setCurrentStep = useDepositFlowStore((state) => state.setCurrentStep);
  const resetFlow = useDepositFlowStore((state) => state.resetFlow);
  const hasPrograms = programs.length > 0;

  const createDepositMutation = useMutation<
    CreateDepositResponse,
    Error,
    CreateDepositPayload
  >({
    mutationFn: async (payload) => {
      const response = await fetch("/api/deposits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Не вдалося оформити вклад");
      }

      return data as CreateDepositResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      resetFlow();
      router.push("/deposits");
      router.refresh();
    },
  });
  const isSubmitting = createDepositMutation.isPending;

  const handleAgreementSubmit = (agreementText: string) => {
    if (!selectedProgramId) {
      return;
    }

    createDepositMutation.mutate({
      selectedProgramId,
      amount,
      customName,
      paymentMethod,
      selectedCardId,
      agreementText,
    });
  };

  useEffect(() => {
    if (!isSubmitting) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isSubmitting]);

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
      <DepositAgreementStep
        user={user}
        programs={programs}
        cards={cards}
        isSubmitting={createDepositMutation.isPending}
        onSubmit={handleAgreementSubmit}
      />
    );
  };

  return (
    <Box sx={{ width: "100%", py: { xs: 1, md: 2 } }}>
      <Stack spacing={4}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 5,
            background:
              "linear-gradient(135deg, rgba(24,79,61,0.1) 0%, rgba(255,250,244,0.96) 50%, rgba(182,132,26,0.08) 100%)",
          }}
        >
          <Stack spacing={1.5}>
            <Typography variant="overline" color="primary.main">
              Новий вклад
            </Typography>
            <Typography variant="h3">Відкриття вкладу</Typography>
            <Typography color="text.secondary" maxWidth={720}>
              Пройдіть повний шлях оформлення: оберіть програму, задайте параметри,
              перевірте дані та підтвердьте сформований договір.
            </Typography>
          </Stack>
        </Paper>

        {!hasPrograms && (
          <Alert severity="warning">
            Депозитні програми поки недоступні. Зазвичай це означає, що база даних
            не підключена або тестові дані ще не створені.
          </Alert>
        )}

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            p: { xs: 2.5, md: 4 },
            borderRadius: 5,
            background:
              "linear-gradient(180deg, rgba(255,250,244,0.98) 0%, rgba(250,244,235,0.98) 100%)",
          }}
        >
          {isSubmitting && (
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 3,
                bgcolor: "rgba(255, 250, 244, 0.82)",
                backdropFilter: "blur(4px)",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  width: "min(100%, 420px)",
                  p: { xs: 3, md: 4 },
                  borderRadius: 5,
                  textAlign: "center",
                  background:
                    "linear-gradient(180deg, rgba(255,250,244,0.98) 0%, rgba(250,244,235,0.98) 100%)",
                }}
              >
                <Stack spacing={1.5} alignItems="center">
                  <CircularProgress />
                  <Typography fontWeight={700}>Оформлюємо вклад</Typography>
                  <Typography color="text.secondary">
                    Запит на створення договору навмисно затримується на 10 секунд.
                    До завершення відповіді сторінка залишається заблокованою.
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          )}
          <Stack spacing={4}>
            <DepositStepper activeStep={currentStep} />
            {createDepositMutation.isError && (
              <Alert severity="error">{createDepositMutation.error.message}</Alert>
            )}
            {isSubmitting && (
              <Alert
                severity="info"
                icon={<CircularProgress size={18} color="inherit" />}
              >
                Створюємо договір вкладу. Запит навмисно затримується на 10 секунд.
              </Alert>
            )}
            {renderStep()}

            {currentStep === 0 && (
              <>
                <Alert severity="info">
                  Обрана програма зберігається в Zustand, а на наступному кроці доступно{" "}
                  {cards.length} карток поточного користувача.
                </Alert>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button component={Link} href="/deposits" variant="outlined">
                    Назад до вкладів
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!selectedProgramId || isSubmitting}
                    onClick={() => setCurrentStep(1)}
                  >
                    Далі
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
