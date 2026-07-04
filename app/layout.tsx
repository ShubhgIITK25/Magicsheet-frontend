import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import "./globals.css";
import MuiProvider from "@/components/mui-provider";
import DashboardShell from "@/components/dashboard-shell";

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
    <html lang="en" className="h-full antialiased">
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