import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

// Self-hosted Instrument Serif. Bypasses next/font/google's
// `unicode-range: U+??` (a wildcard form lightningcss collapses to)
// which iOS Safari silently rejects, causing italic text to fall
// through to system Georgia/Times.
const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/instrument-serif-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/instrument-serif-italic-latin.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  title: "FollowMe Global Business Solutions | We Don't Consult. We Transform Industries.",
  description:
    "FollowMe Global Business Solutions is a multi-divisional strategic consultancy that has generated over $2.1 billion in revenue for clients across 7+ industries.",
  keywords: ["business consulting", "strategic consultancy", "Jason Slaughter", "FollowMe", "business transformation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${instrumentSerif.variable}`}
        style={{ background: "#060606", color: "#F5F0E8" }}
      >
        {children}
      </body>
    </html>
  );
}
