import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "재고 관리 시스템",
  description: "PDA 기반 재고 관리 시스템",
};

import { QueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/hooks/use-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head />
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
