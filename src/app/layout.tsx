import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollIndicator from "./components/ScrollIndicator/ScrollIndicator";
import { LanguageProvider } from "./contexts/LanguageContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arthur Teles — Full Stack Developer",
  description:
    "Full Stack Developer specializing in Python, React, and modern web architectures.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[#050508] text-[#e2e8f0] antialiased`}
      >
        <LanguageProvider>
          {children}
          <ScrollIndicator />
        </LanguageProvider>
      </body>
    </html>
  );
}
