import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CompMind — Your Competitive Edge",
  description:
    "Analyse your Fortnite gameplay, find your weaknesses and train smarter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}