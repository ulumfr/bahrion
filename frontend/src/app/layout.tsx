import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BAHRION — Maritime Intelligence for Financial Navigation",
  description:
    "AI-powered financial navigation system that transforms market data into structured, actionable insights through maritime intelligence.",
  keywords: [
    "financial intelligence",
    "AI analysis",
    "market navigation",
    "investment insights",
  ],
  openGraph: {
    title: "BAHRION — Your Captain in the Ocean of Wealth",
    description:
      "Navigate financial markets with AI-powered maritime intelligence. Get structured insights, risk assessment, and strategic recommendations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
