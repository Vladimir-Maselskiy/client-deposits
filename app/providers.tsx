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
      main: "#184f3d",
      dark: "#123c2e",
      light: "#2f6d58",
      contrastText: "#fcf8f1",
    },
    secondary: {
      main: "#b6841a",
    },
    background: {
      default: "#efe6d8",
      paper: "#fffaf4",
    },
    text: {
      primary: "#14201b",
      secondary: "#60706a",
    },
    divider: "#d9cfbf",
    action: {
      hover: "rgba(24, 79, 61, 0.08)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
    overline: {
      fontWeight: 700,
      letterSpacing: "0.18em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.04em",
      lineHeight: 1,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    body1: {
      lineHeight: 1.65,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at top left, rgba(255,250,244,0.95), transparent 28%), linear-gradient(180deg, #efe6d8 0%, #e8dece 100%)",
          color: "#14201b",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#fffaf4",
          border: "1px solid #e1d8ca",
          boxShadow: "0 18px 45px rgba(74, 61, 42, 0.08)",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          alignItems: "center",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 999,
          padding: "10px 18px",
          minHeight: 42,
          minWidth: 0,
          justifyContent: "center",
        },
        containedPrimary: {
          color: "#fcf8f1",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fffdf9",
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          paddingInline: 0,
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
