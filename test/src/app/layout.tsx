import type { Metadata } from "next";
import { Inter, Jacquard_12, New_Tegomin } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const j12 = Jacquard_12({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-j12",
});

const ng = New_Tegomin({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ng",
});

export const metadata: Metadata = {
  title: "Test Fonts",
  description: "Font test with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${j12.variable} ${ng.variable}`}>
        {children}
      </body>
    </html>
  );
}
