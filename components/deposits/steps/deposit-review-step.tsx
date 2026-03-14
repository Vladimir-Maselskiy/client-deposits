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
        <Typography variant="h5">Review Deposit Details</Typography>
        <Typography color="text.secondary">
          Check the selected product and entered parameters before moving to the
          agreement.
        </Typography>
      </Stack>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
        <Stack spacing={2}>
          <SummaryRow
            label="Program"
            value={selectedProgram?.name ?? 'Program not selected'}
          />
          <Divider flexItem />
          <SummaryRow
            label="Rate and term"
            value={
              selectedProgram
                ? `${selectedProgram.rate}% annual, ${selectedProgram.termMonths} months`
                : '-'
            }
          />
          <Divider flexItem />
          <SummaryRow
            label="Deposit amount"
            value={
              selectedProgram
                ? `${amount} ${selectedProgram.currency}`
                : amount || '-'
            }
          />
          <Divider flexItem />
          <SummaryRow
            label="Custom contract name"
            value={customName || 'Not provided'}
          />
          <Divider flexItem />
          <SummaryRow
            label="Payment method"
            value={paymentMethod === 'CARD' ? 'Card' : 'Cash'}
          />
          {paymentMethod === 'CARD' && (
            <>
              <Divider flexItem />
              <SummaryRow
                label="Selected card"
                value={
                  selectedCard
                    ? `${selectedCard.name} - ${selectedCard.balance} ${selectedCard.currency}`
                    : 'Card not selected'
                }
              />
            </>
          )}
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button variant="outlined" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button variant="contained" onClick={() => setCurrentStep(3)}>
          Continue To Agreement
        </Button>
      </Stack>
    </Stack>
  );
}
