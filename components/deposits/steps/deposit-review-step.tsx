'use client';

import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import type { DepositProgramSummary, UserCardSummary } from '@/types/deposits';
import { useDepositFlowStore } from '@/store/deposit-flow-store';

type Props = {
  programs: DepositProgramSummary[];
  cards: UserCardSummary[];
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      spacing={1}
    >
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={600}>{value}</Typography>
    </Stack>
  );
}

export function DepositReviewStep({ programs, cards }: Props) {
  const selectedProgramId = useDepositFlowStore(
    state => state.selectedProgramId
  );
  const amount = useDepositFlowStore(state => state.amount);
  const customName = useDepositFlowStore(state => state.customName);
  const paymentMethod = useDepositFlowStore(state => state.paymentMethod);
  const selectedCardId = useDepositFlowStore(state => state.selectedCardId);
  const setCurrentStep = useDepositFlowStore(state => state.setCurrentStep);

  const selectedProgram =
    programs.find(program => program.id === selectedProgramId) ?? null;
  const selectedCard = cards.find(card => card.id === selectedCardId) ?? null;

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h5">Перевірка даних вкладу</Typography>
        <Typography color="text.secondary">
          Перевірте обраний продукт і введені параметри перед переходом до договору.
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 5,
          background:
            "linear-gradient(180deg, rgba(255,250,244,0.96) 0%, rgba(252,247,238,0.96) 100%)",
        }}
      >
        <Stack spacing={2}>
          <SummaryRow
            label="Програма"
            value={selectedProgram?.name ?? 'Програму не обрано'}
          />
          <Divider flexItem />
          <SummaryRow
            label="Ставка та строк"
            value={
              selectedProgram
                ? `${selectedProgram.rate}% річних, ${selectedProgram.termMonths} міс.`
                : '-'
            }
          />
          <Divider flexItem />
          <SummaryRow
            label="Сума вкладу"
            value={
              selectedProgram
                ? `${amount} ${selectedProgram.currency}`
                : amount || '-'
            }
          />
          <Divider flexItem />
          <SummaryRow
            label="Назва договору"
            value={customName || 'Не вказано'}
          />
          <Divider flexItem />
          <SummaryRow
            label="Спосіб внесення"
            value={paymentMethod === 'CARD' ? 'Картка' : 'Готівка'}
          />
          {paymentMethod === 'CARD' && (
            <>
              <Divider flexItem />
              <SummaryRow
                label="Обрана картка"
                value={
                  selectedCard
                    ? `${selectedCard.name} - ${selectedCard.balance} ${selectedCard.currency}`
                    : 'Картку не обрано'
                }
              />
            </>
          )}
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button variant="outlined" onClick={() => setCurrentStep(1)}>
          Назад
        </Button>
        <Button variant="contained" onClick={() => setCurrentStep(3)}>
          Перейти до договору
        </Button>
      </Stack>
    </Stack>
  );
}
