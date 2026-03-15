import { Paper, Stack, Typography } from "@mui/material";
import { SwaggerClient } from "./swagger-client";

export const dynamic = "force-dynamic";

export default function ApiDocsPage() {
  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 5,
          background:
            "linear-gradient(135deg, rgba(24,79,61,0.1) 0%, rgba(255,250,244,0.96) 50%, rgba(182,132,26,0.08) 100%)",
        }}
      >
        <Stack spacing={1.5}>
          <Typography variant="overline" color="primary.main">
            API Docs
          </Typography>
          <Typography variant="h3">Swagger UI</Typography>
          <Typography color="text.secondary">
            Interactive OpenAPI documentation for the deposit contract endpoint.
          </Typography>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, md: 2 },
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <SwaggerClient specUrl="/api/openapi" />
      </Paper>
    </Stack>
  );
}
