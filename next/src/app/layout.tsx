import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StockContextProvider } from "@C/StockContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoughFlow",
  description: "MAJE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StockContextProvider>
          {children}
        </StockContextProvider>
      </body>
    </html>
  );
}
