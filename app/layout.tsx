import type { Metadata } from "next";
import { Space_Grotesk, Archivo, JetBrains_Mono, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mrs-saint-delafield",
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
        className={`${spaceGrotesk.variable} ${archivo.variable} ${jetbrainsMono.variable} ${mrsSaintDelafield.variable}`}
        style={{ background: "#060606", color: "#F5F0E8" }}
      >
        {children}
      </body>
    </html>
  );
}
