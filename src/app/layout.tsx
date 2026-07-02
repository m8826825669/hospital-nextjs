import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "@/platform/providers/root-provider";

export const metadata: Metadata = {
  title: "HMS",
  description: "Hospital Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
