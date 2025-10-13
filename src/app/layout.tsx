// src\app\layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Techstars Startup Weekend Colombo — Nov 14–16, 2025",
  description: "Join Colombo’s first Techstars Startup Weekend. 54 hours to pitch, build, and launch.",
  openGraph: {
    title: "Techstars Startup Weekend Colombo — Nov 14–16, 2025",
    description: "Join Colombo’s first Techstars Startup Weekend.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-brand-black text-brand-white`}>
        {children}
      </body>
    </html>
  );
}
