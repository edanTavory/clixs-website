import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Clixs - Build Google Ads campaigns in minutes",
  description:
    "Create high-performing Google Search campaigns with full control. Draft first, review everything, no learning curve required.",
  keywords: [
    "google ads",
    "google search campaigns",
    "ppc management",
    "ad campaign builder",
  ],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
