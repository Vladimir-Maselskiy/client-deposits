"use client";

import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const steps = ["Програма", "Параметри", "Підтвердження", "Договір"];

export function DepositStepper({ activeStep }: { activeStep: number }) {
  const theme = useTheme();
  const isCompact = useMediaQuery("(max-width:450px)");
  const currentLabel = steps[activeStep] ?? steps[0];
  const progressValue = ((activeStep + 1) / steps.length) * 100;

  if (isCompact) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 4,
          background:
            "linear-gradient(180deg, rgba(255,250,244,0.98) 0%, rgba(250,244,235,0.98) 100%)",
        }}
      >
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="subtitle2" fontWeight={700}>
              Крок {activeStep + 1} з {steps.length}
            </Typography>
            <Chip
              label={currentLabel}
              color="primary"
              size="small"
              sx={{ maxWidth: "60%" }}
            />
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              height: 8,
              borderRadius: 999,
              backgroundColor: "rgba(24, 79, 61, 0.12)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 999,
                backgroundColor: theme.palette.primary.main,
              },
            }}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
              gap: 1,
            }}
          >
            {steps.map((label, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;

              return (
                <Box
                  key={label}
                  sx={{
                    height: 6,
                    borderRadius: 999,
                    bgcolor: isActive || isCompleted ? "primary.main" : "divider",
                  }}
                />
              );
            })}
          </Box>
        </Stack>
      </Paper>
    );
  }

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
