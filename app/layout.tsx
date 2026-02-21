import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/organisms/Footer/Footer";
import "./globals.css";
import { WalletProviderWrapper } from "@/components/providers/WalletProviderWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FarmCredit",
  description: "FarmCredit - Decentralized agricultural credit on Stellar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
