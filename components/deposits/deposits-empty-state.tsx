import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

export function DepositsEmptyState() {
  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 4 }}>
      <Stack spacing={2.5} alignItems="flex-start">
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <AddCircleOutlineRounded />
        </Box>
        <Stack spacing={1}>
          <Typography variant="h5">
            You do not have any open deposits yet, but that is easy to fix.
          </Typography>
          <Typography color="text.secondary">
            Choose a deposit program and open your first contract in a few steps.
          </Typography>
        </Stack>
        <Button href="/deposits/new" variant="contained" size="large">
          Open Deposit
        </Button>
      </Stack>
    </Paper>
  );
}
