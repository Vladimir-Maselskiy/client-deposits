"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { useState } from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f5d46",
      contrastText: "#f7f4ed",
    },
    secondary: {
      main: "#c69214",
    },
    background: {
      default: "#f3ede3",
      paper: "#fffaf2",
    },
    text: {
      primary: "#18211d",
      secondary: "#58655f",
    },
    divider: "#d8d1c3",
    action: {
      hover: "rgba(15, 93, 70, 0.06)",
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f3ede3",
          color: "#18211d",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid #e1d8ca",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </QueryClientProvider>
  );
}
