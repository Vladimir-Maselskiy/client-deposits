"use client";

import GoogleIcon from "@mui/icons-material/Google";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { Button, Stack } from "@mui/material";
import { signIn, signOut } from "next-auth/react";

type Props = {
  googleEnabled: boolean;
  isAuthenticated: boolean;
  isGoogleSession: boolean;
};

export function AuthActions({
  googleEnabled,
  isAuthenticated,
  isGoogleSession,
}: Props) {
  if (isGoogleSession) {
    return (
      <Button
        variant="outlined"
        startIcon={<LogoutRoundedIcon />}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Logout
      </Button>
    );
  }

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
      {!isAuthenticated && (
        <Button
          variant="contained"
          startIcon={<PersonOutlineRoundedIcon />}
          onClick={() => signIn("credentials", { callbackUrl: "/deposits" })}
        >
          Continue As Demo User
        </Button>
      )}
      <Button
        variant="outlined"
        startIcon={<GoogleIcon />}
        disabled={!googleEnabled}
        onClick={() => signIn("google", { callbackUrl: "/deposits" })}
      >
        Sign In With Google
      </Button>
    </Stack>
  );
}
