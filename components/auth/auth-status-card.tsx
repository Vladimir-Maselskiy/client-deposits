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
  const modeLabel = isGoogleSession ? "Сесія Google" : "Демо-користувач";
  const description = isGoogleSession
    ? `Виконано вхід як ${session?.user?.fullName ?? session?.user?.name ?? "користувач Google"}.`
    : "Поточний сценарій можна продовжити з тестовим демо-клієнтом або перейти до входу через Google.";

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
            <Typography variant="h6">Режим доступу</Typography>
            <Chip
              label={modeLabel}
              color={isGoogleSession ? "secondary" : "primary"}
              size="small"
            />
          </Stack>
          <Typography color="text.secondary">{description}</Typography>
          {!googleEnabled && (
            <Typography color="text.secondary">
              Вхід через Google вимкнений, доки не налаштовано `GOOGLE_CLIENT_ID`,
              `GOOGLE_CLIENT_SECRET` та `NEXTAUTH_SECRET`.
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
