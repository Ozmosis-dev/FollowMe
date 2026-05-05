import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
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
