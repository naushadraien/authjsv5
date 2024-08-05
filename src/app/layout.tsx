import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { connectDB } from "@/lib/connectDB";
import { config } from "../../config/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth js v5",
  description: "This is auth js v5 tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
