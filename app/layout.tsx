import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { AuthStatusCard } from "@/components/auth/auth-status-card";
import { authOptions, isGoogleAuthEnabled } from "@/lib/auth/auth-options";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Client Deposits",
  description: "Client deposit management module",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="uk">
      <body>
        <Providers>
          <main className="app-shell">
            <div className="app-frame">
              <AuthStatusCard
                session={session}
                googleEnabled={isGoogleAuthEnabled()}
              />
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
