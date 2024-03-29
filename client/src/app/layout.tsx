import DeleteDialog from "@/components/dialog/DeleteDialog";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/query-provider";
import ThemeProvider from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MernGPT",
  description: "Have a fun and factful conversation with MernGPT",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookie = cookies();
  const userCookie = cookie.get("user");
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      <body className={cn(inter.className, "h-screen overflow-hidden")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            {children}
            <DeleteDialog userCookie={userCookie} />
            <Toaster position="top-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
