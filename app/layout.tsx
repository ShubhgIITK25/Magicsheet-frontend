import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import "./globals.css";
import MuiProvider from "@/components/mui-provider";
import DashboardShell from "@/components/dashboard-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MagicSheet",
  description: "Centralised Magicsheet management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppRouterCacheProvider>
          <MuiProvider>
            <DashboardShell>
              {children}
            </DashboardShell>
          </MuiProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}