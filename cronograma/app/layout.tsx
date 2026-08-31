import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cronograma editorial | Simplifique Capital",
  description:
    "Planejamento dos posts do Instagram da Simplifique Capital: linha do tempo, preview de feed e legendas prontas para copiar.",
  // Ferramenta interna: fora de busca.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0a2420",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <div className="min-h-screen bg-cream">
          <Nav />
          <main className="pb-24">{children}</main>
        </div>
      </body>
    </html>
  );
}
