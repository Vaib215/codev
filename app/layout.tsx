import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeBtn from "@/components/util/theme-toggle";
import { Suspense } from "react";
import IconBtnLoader from "@/components/loaders/icon-button-loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "codev",
  description: "Code runner for DSA geeks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
