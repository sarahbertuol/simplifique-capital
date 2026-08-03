import Image from "next/image";

export default function Sobre() {
  return (
    <section id="sobre" className="px-8 py-24 md:px-16 lg:py-30">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
        <div className="relative order-last lg:order-none">
          <div className="absolute top-5 left-5 h-full w-full rounded-2xl border-2 border-gold/35" />
          <Image
            src="/marco-kayser.png"
            alt="Marco Kayser"
            width={800}
            height={1000}
            className="relative block aspect-4/5 w-full rounded-2xl object-cover"
          />
        </div>
        <div>
          <div className="mb-7 inline-block rounded-full border border-gold-dark/50 px-[18px] py-2 text-xs font-bold tracking-[1px] text-gold-dark">
            QUEM SOU EU
          </div>
          <h2 className="mb-6 font-display text-[clamp(28px,3.5vw,36px)] font-extrabold text-green-700">
            Sobre Marco Kayser
          </h2>
          <p className="mb-5 text-base leading-[1.7] text-green-700/70">
            Foram 4 anos como assessor de investimentos na XP Investimentos —
            uma experiência que ajudou Marco a definir com clareza o tipo de
            trabalho que queria construir: sem conflito de interesses, com
            total transparência, e sempre pensando no que faz mais sentido
            para cada cliente.
          </p>
          <p className="mb-5 text-base leading-[1.7] text-green-700/70">
            Foi a partir dessa visão que nasceu o Programa de Educação
            Financeira: uma forma de simplificar o processo de investir, sem
            produtos empurrados ou vieses de remuneração — só o que
            realmente faz sentido para o seu momento.
          </p>
          <p className="text-base leading-[1.7] text-green-700/70">
            Aqui, a entrega é sempre o que você realmente precisa — sem
            letras miúdas, sem conflito de interesse, sem amarras. E o que
            ele ensina no programa é exatamente o que aplica na própria
            carteira.
          </p>
        </div>
      </div>
    </section>
  );
}
