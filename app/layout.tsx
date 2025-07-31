// app/layout.tsx
import "./globals.css";
import Providers from "./Providers"; // <-- importamos el client wrapper
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Finder",
  description: "Encuentra y forma equipos fácilmente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Aquí colocamos solo elementos server */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
