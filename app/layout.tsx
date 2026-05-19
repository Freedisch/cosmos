import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COSMOS — A Visual Simulation of the Universe",
  description: "A scroll-driven visual and sonified journey through 13.8 billion years of cosmic history, from the Big Bang to the present moment.",
  openGraph: {
    title: "COSMOS — A Visual Simulation of the Universe",
    description: "Experience 13.8 billion years of cosmic evolution from the Planck Epoch to the present moment, driven by physical cosmology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full dark`}>
      <body className="h-full overflow-hidden select-none bg-[#020206] text-[#f8fafc]">
        {children}
      </body>
    </html>
  );
}
