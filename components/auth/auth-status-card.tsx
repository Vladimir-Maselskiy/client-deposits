import { Chip, Paper, Stack, Typography } from "@mui/material";
import type { Session } from "next-auth";
import { AuthActions } from "./auth-actions";

type Props = {
  session: Session | null;
  googleEnabled: boolean;
};

export function AuthStatusCard({ session, googleEnabled }: Props) {
  const authMode = session?.user?.authMode ?? "demo";
  const isGoogleSession = authMode === "google";
  const modeLabel = isGoogleSession ? "Google session" : "Demo user";
  const description = isGoogleSession
    ? `Authenticated as ${session?.user?.fullName ?? session?.user?.name ?? "Google user"}.`
    : "The current flow can continue with the seeded demo client or switch to Google sign-in.";

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 5,
        background:
          "linear-gradient(180deg, rgba(255,250,244,0.98) 0%, rgba(250,244,235,0.98) 100%)",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2.5}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", lg: "center" }}
      >
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6">Access Mode</Typography>
            <Chip
              label={modeLabel}
              color={isGoogleSession ? "secondary" : "primary"}
              size="small"
            />
          </Stack>
          <Typography color="text.secondary">{description}</Typography>
          {!googleEnabled && (
            <Typography color="text.secondary">
              Google sign-in is disabled until `GOOGLE_CLIENT_ID`,
              `GOOGLE_CLIENT_SECRET`, and `NEXTAUTH_SECRET` are configured.
            </Typography>
          )}
        </Stack>
        <AuthActions
          googleEnabled={googleEnabled}
          isAuthenticated={Boolean(session)}
          isGoogleSession={isGoogleSession}
        />
      </Stack>
    </Paper>
  );
}
