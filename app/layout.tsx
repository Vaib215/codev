import NavBar from "@/components/layouts/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/lib/next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | codev",
  description: "Code runner for DSA geeks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " h-screen flex flex-col overflow-hidden"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <NavBar />
            {children}
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
