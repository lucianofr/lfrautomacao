import type { Metadata } from "next";
import { Chakra_Petch, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const chakra = Chakra_Petch({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-heading',
});

const plex = IBM_Plex_Sans({ 
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: "LFR Automação | Consultoria e Controle Avançado",
  description: "Otimização de processos e controle avançado industrial utilizando Inteligência Artificial, Visão Computacional e Arquiteturas Edge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${chakra.variable} ${plex.variable}`}>
        {children}
      </body>
    </html>
  );
}
