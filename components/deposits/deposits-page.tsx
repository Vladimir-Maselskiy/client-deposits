import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';
import type { CurrentUserWithDeposits } from '@/types/deposits';
import { DepositsEmptyState } from './deposits-empty-state';
import { DepositsList } from './deposits-list';

type Props = {
  user: CurrentUserWithDeposits | null;
};

export function DepositsPage({ user }: Props) {
  const contracts = user?.contracts ?? [];
  const hasContracts = contracts.length > 0;
  const hasUser = Boolean(user);
  const currentClientSummary = user
    ? `Current client: ${user.fullName}. Review active contracts or open a new deposit.`
    : "Database data is not available yet. Once the database and seed are ready, deposits will appear here.";

  return (
    <Box sx={{ width: '100%', py: { xs: 2, md: 3 } }}>
      <Box sx={{ width: '100%', maxWidth: 1080, mx: 'auto' }}>
        <Stack spacing={{ xs: 3.5, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              padding: { xs: '28px 24px', md: '40px 44px' },
              borderRadius: 5,
              background:
                'linear-gradient(135deg, rgba(24,79,61,0.08) 0%, rgba(255,250,244,0.96) 52%, rgba(182,132,26,0.08) 100%)',
            }}
          >
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              spacing={3}
              alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            >
              <Stack spacing={1.75} sx={{ minWidth: 0, maxWidth: 760 }}>
                <Typography variant="overline" color="primary.main">
                  Client Deposits
                </Typography>
                <Typography variant="h3">My Deposits</Typography>
                <Typography color="text.secondary">
                  {currentClientSummary}
                </Typography>
              </Stack>
              <Button
                href="/deposits/new"
                variant="contained"
                size="large"
                sx={{
                  flexShrink: 0,
                  alignSelf: { xs: 'flex-start', md: 'center' },
                }}
              >
                New Deposit
              </Button>
            </Stack>
          </Paper>

          {!hasUser && (
            <Alert severity="warning">
              The page is in fallback mode because the current user could not be
              loaded from the database.
            </Alert>
          )}

          {hasContracts ? (
            <DepositsList contracts={contracts} />
          ) : (
            <DepositsEmptyState />
          )}
        </Stack>
      </Box>
    </Box>
  );
}
