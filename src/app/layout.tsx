import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollIndicator from "./components/ScrollIndicator/ScrollIndicator";
import { LanguageProvider } from "./contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arthur Teles - Desenvolvedor Full Stack",
  description: "Portfólio de Arthur Teles - Desenvolvedor Full Stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-black text-white`}>
        <LanguageProvider>
          {children}
          <ScrollIndicator />
        </LanguageProvider>
      </body>
    </html>
  );
}
