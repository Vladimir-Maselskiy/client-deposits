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
    ? `Поточний клієнт: ${user.fullName}. Перегляньте активні договори або відкрийте новий вклад.`
    : "Дані з бази поки недоступні. Після підключення бази та виконання seed тут з’являться вклади.";

  return (
    <Box sx={{ width: '100%', py: { xs: 2, md: 3 } }}>
      <Box sx={{ width: '100%' }}>
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
                  Депозити клієнта
                </Typography>
                <Typography variant="h3">Мої вклади</Typography>
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
                Новий вклад
              </Button>
            </Stack>
          </Paper>

          {!hasUser && (
            <Alert severity="warning">
              Сторінка працює у fallback-режимі, тому що не вдалося завантажити
              поточного користувача з бази даних.
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
