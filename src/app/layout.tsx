// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "@/platform/providers/root-provider";

export const metadata: Metadata = {
  title: "HMS SaaS",
  description: "Enterprise Hospital Management SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}