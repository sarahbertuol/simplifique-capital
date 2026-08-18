import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import Filosofia from "@/components/Filosofia";
import Numeros from "@/components/Numeros";
import Sobre from "@/components/Sobre";
import Programa from "@/components/Programa";
import Atendimento from "@/components/Atendimento";
import PlanosEModal from "@/components/PlanosEModal";
import Faq from "@/components/Faq";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Quote />
      <Filosofia />
      <Numeros />
      <Sobre />
      <Programa />
      <Atendimento />
      <PlanosEModal />
      <Faq />
      <Contato />
      <Footer />
    </>
  );
}
