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
        <Paper
          key={contract.id}
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 5,
            background:
              "linear-gradient(180deg, rgba(255,250,244,0.96) 0%, rgba(252,247,238,0.96) 100%)",
          }}
        >
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
                sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
              />
            </Stack>
            <Typography color="text.secondary">
              Opened on: {formatDate(contract.createdAt)}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
