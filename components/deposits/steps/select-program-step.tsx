"use client";

import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import type { DepositProgramSummary } from "@/types/deposits";
import { useDepositFlowStore } from "@/store/deposit-flow-store";

type Props = {
  programs: DepositProgramSummary[];
};

export function SelectProgramStep({ programs }: Props) {
  const selectedProgramId = useDepositFlowStore((state) => state.selectedProgramId);
  const setSelectedProgramId = useDepositFlowStore(
    (state) => state.setSelectedProgramId,
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h5">Choose A Deposit Program</Typography>
        <Typography color="text.secondary">
          Select the banking product first. Deposit parameters will be entered on the next
          step.
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {programs.map((program) => {
          const isSelected = selectedProgramId === program.id;

          return (
            <Paper
              key={program.id}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 5,
                border: "1px solid",
                borderColor: isSelected ? "primary.main" : "divider",
                background: isSelected
                  ? "linear-gradient(135deg, rgba(24,79,61,0.08) 0%, rgba(255,250,244,0.98) 100%)"
                  : "linear-gradient(180deg, rgba(255,250,244,0.96) 0%, rgba(252,247,238,0.96) 100%)",
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                spacing={2}
              >
                <Stack spacing={1}>
                  <Typography variant="h6">{program.name}</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip label={`${program.rate}% annual`} />
                    <Chip label={`${program.termMonths} months`} />
                    <Chip label={program.currency} />
                  </Stack>
                </Stack>
                <Box>
                  <Button
                    variant={isSelected ? "contained" : "outlined"}
                    onClick={() => setSelectedProgramId(program.id)}
                  >
                    {isSelected ? "Selected" : "Choose"}
                  </Button>
                </Box>
              </Stack>
            </Paper>
          );
        })}
      </Stack>
    </Stack>
  );
}
