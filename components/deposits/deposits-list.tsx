import { Chip, Paper, Stack, Typography } from "@mui/material";
import type { DepositContractSummary } from "@/types/deposits";

type Props = {
  contracts: DepositContractSummary[];
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function DepositsList({ contracts }: Props) {
  return (
    <Stack spacing={2}>
      {contracts.map((contract) => (
        <Paper key={contract.id} elevation={0} sx={{ p: 3, borderRadius: 4 }}>
          <Stack spacing={1.5}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              spacing={1.5}
            >
              <Stack spacing={0.5}>
                <Typography variant="h6">
                  {contract.customName || contract.depositProgram.name}
                </Typography>
                <Typography color="text.secondary">
                  {contract.depositProgram.name}
                </Typography>
              </Stack>
              <Chip
                label={`${contract.amount} ${contract.depositProgram.currency}`}
                color="primary"
                variant="outlined"
              />
            </Stack>
            <Typography color="text.secondary">
              Дата відкриття: {formatDate(contract.createdAt)}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
