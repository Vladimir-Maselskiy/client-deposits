import { Button, Paper, Stack, Typography } from "@mui/material";

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
          Депозити клієнта
        </Typography>
        <Typography variant="h3">Оберіть, як продовжити</Typography>
        <Typography color="text.secondary">
          Можна одразу скористатися тестовим демо-клієнтом або пройти авторизацію
          через Google. Потік відкриття вкладу, договори, картки та формування заяви
          працюють для обох режимів.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          useFlexGap
          flexWrap="wrap"
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Button
            href="/deposits"
            variant="contained"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Перейти до вкладів як демо-користувач
          </Button>
          <Button
            href="/deposits/new"
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Одразу до нового вкладу
          </Button>
          <Button
            href="/api-docs"
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Відкрити API документацію
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
