import { Alert, Box, Button, Container, Stack, Typography } from "@mui/material";
import type { CurrentUserWithDeposits } from "@/types/deposits";
import { DepositsEmptyState } from "./deposits-empty-state";
import { DepositsList } from "./deposits-list";

type Props = {
  user: CurrentUserWithDeposits | null;
};

export function DepositsPage({ user }: Props) {
  const hasContracts = Boolean(user?.contracts.length);
  const hasUser = Boolean(user);

  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack spacing={1}>
              <Typography variant="overline" color="primary.main">
                Client Deposits
              </Typography>
              <Typography variant="h3">My Deposits</Typography>
              <Typography color="text.secondary" maxWidth={720}>
                {hasUser
                  ? `Current client: ${user.fullName}. Review active contracts or open a new deposit.`
                  : "Database data is not available yet. Once the database and seed are ready, deposits will appear here."}
              </Typography>
            </Stack>
            <Button href="/deposits/new" variant="contained" size="large">
              New Deposit
            </Button>
          </Stack>

          {!hasUser && (
            <Alert severity="warning">
              The page is in fallback mode because the current user could not be loaded from
              the database.
            </Alert>
          )}

          {hasContracts ? <DepositsList contracts={user.contracts} /> : <DepositsEmptyState />}
        </Stack>
      </Container>
    </Box>
  );
}
