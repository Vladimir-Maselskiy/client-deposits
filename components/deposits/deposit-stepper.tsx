"use client";

import { Step, StepLabel, Stepper } from "@mui/material";

const steps = ["Програма", "Параметри", "Підтвердження", "Договір"];

export function DepositStepper({ activeStep }: { activeStep: number }) {
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
