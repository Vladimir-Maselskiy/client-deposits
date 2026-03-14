import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";

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
            У вас ще немає відкритих вкладів, але це легко виправити
          </Typography>
          <Typography color="text.secondary">
            Оберіть депозитну програму та відкрийте перший вклад у кілька кроків.
          </Typography>
        </Stack>
        <Button component={Link} href="/deposits/new" variant="contained" size="large">
          Відкрити депозит
        </Button>
      </Stack>
    </Paper>
  );
}
