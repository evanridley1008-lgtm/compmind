import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://compmind.xyz"),

  title: {
    default: "CompMind | Fortnite Competitive Improvement",
    template: "%s | CompMind",
  },

  description:
    "CompMind helps Fortnite competitive players analyse gameplay, identify weaknesses, and improve with personalised training and performance insights.",

  keywords: [
    "Fortnite",
    "Fortnite competitive",
    "Fortnite replay analysis",
    "Fortnite VOD analysis",
    "Fortnite improvement",
    "Fortnite coaching",
    "Fortnite performance analysis",
    "Fortnite competitive improvement",
    "Fortnite esports",
    "Fortnite training",
  ],

  authors: [
    {
      name: "CompMind",
      url: "https://compmind.xyz",
    },
  ],

  creator: "CompMind",
  publisher: "CompMind",

  alternates: {
    canonical: "https://compmind.xyz",
  },

  openGraph: {
    title: "CompMind | Fortnite Competitive Improvement",
    description:
      "Analyse your Fortnite gameplay, identify weaknesses, and improve with personalised competitive training and performance insights.",
    url: "https://compmind.xyz",
    siteName: "CompMind",
    type: "website",
    locale: "en_GB",
  },

  twitter: {
    card: "summary_large_image",
    title: "CompMind | Fortnite Competitive Improvement",
    description:
      "Analyse your Fortnite gameplay, identify weaknesses, and improve with personalised competitive training.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}