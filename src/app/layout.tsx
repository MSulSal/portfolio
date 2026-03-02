import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sulemansaleem.dev"),
  title: {
    default: "Suleman Saleem | Software Engineer",
    template: "%s | Suleman Saleem",
  },
  description:
    "Portfolio for Suleman Saleem: test-first software delivery across product engineering, quality automation, and operational reliability.",
  openGraph: {
    title: "Suleman Saleem | Software Engineer",
    description:
      "Portfolio showing production-minded software delivery and verifiable engineering outcomes.",
    type: "website",
    locale: "en_US",
    siteName: "Suleman Saleem Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitializer = `
    (() => {
      try {
        const key = "portfolio-theme";
        const saved = localStorage.getItem(key);
        const theme = saved === "light" || saved === "dark" ? saved : "dark";
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
      } catch {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body className={inter.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
