import type { Metadata } from "next";
import { Poppins, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-heading',
});

const inter = Inter({ 
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  variable: '--font-body',
});

const plexMono = IBM_Plex_Mono({ 
  weight: ['400', '600'],
  subsets: ["latin"],
  variable: '--font-mono',
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
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} ${plexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
