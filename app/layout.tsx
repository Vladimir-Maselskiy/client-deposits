import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import { AuthStatusCard } from "@/components/auth/auth-status-card";
import { authOptions, isGoogleAuthEnabled } from "@/lib/auth/auth-options";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Client Deposits",
  description: "Client deposit management module",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
