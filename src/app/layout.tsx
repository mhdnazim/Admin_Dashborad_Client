import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/utils/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee Portal",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        {children}
        </body>
    </html>
  );
}
