import { Paper, Stack, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 1080,
        mx: "auto",
        p: { xs: 3, md: 5 },
        borderRadius: 5,
        background:
          "linear-gradient(135deg, rgba(24,79,61,0.12) 0%, rgba(255,250,244,0.98) 52%, rgba(182,132,26,0.1) 100%)",
      }}
    >
      <Stack spacing={2.5} maxWidth={760}>
        <Typography variant="overline" color="primary.main">
          Client Deposits
        </Typography>
        <Typography variant="h3">Choose How To Continue</Typography>
        <Typography color="text.secondary">
          Use the seeded demo client immediately or authenticate with Google. The
          deposit flow, contracts, cards, and agreement generation remain shared across
          both modes.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button href="/deposits" variant="contained">
            Open Deposits As Demo User
          </Button>
          <Button href="/deposits/new" variant="outlined">
            Go Directly To New Deposit
          </Button>
          <Button href="/api-docs" variant="outlined">
            Open API Docs
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
