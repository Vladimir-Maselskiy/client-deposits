import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import type { CurrentUserWithDeposits } from "@/types/deposits";
import { DepositsEmptyState } from "./deposits-empty-state";
import { DepositsList } from "./deposits-list";

type Props = {
  user: CurrentUserWithDeposits | null;
};

export function DepositsPage({ user }: Props) {
  const hasContracts = Boolean(user?.contracts.length);

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
              <Typography variant="h3">Мої вклади</Typography>
              <Typography color="text.secondary" maxWidth={720}>
                {user
                  ? `Поточний клієнт: ${user.fullName}. Переглядайте чинні договори або відкрийте новий вклад.`
                  : "У базі поки немає користувача. Після seed можна буде переглядати й відкривати вклади."}
              </Typography>
            </Stack>
            <Button component={Link} href="/deposits/new" variant="contained" size="large">
              Новий вклад
            </Button>
          </Stack>

          {hasContracts ? (
            <DepositsList contracts={user!.contracts} />
          ) : (
            <DepositsEmptyState />
          )}
        </Stack>
      </Container>
    </Box>
  );
}
