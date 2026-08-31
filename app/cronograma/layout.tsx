import type { Metadata } from "next";
import Nav from "@/components/cronograma/Nav";

export const metadata: Metadata = {
  title: "Cronograma editorial | Simplifique Capital",
  // Ferramenta interna de planejamento: não deve entrar em busca.
  robots: { index: false, follow: false },
};

export default function CronogramaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <main className="pb-24">{children}</main>
    </div>
  );
}
