import Image from "next/image";
import StepsList from "./StepsList";

export default function Programa() {
  return (
    <section className="bg-tan px-8 py-24 md:px-16 lg:py-30">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <div className="mb-4 text-[13px] font-bold tracking-[1.5px] text-gold-dark">
            O PROGRAMA
          </div>
          <h2 className="mb-5 max-w-[480px] font-display text-[clamp(26px,3.2vw,34px)] font-extrabold text-green-700">
            O que é o Programa de Educação Financeira
          </h2>
          <p className="mb-9 max-w-[480px] text-base leading-[1.7] text-green-700/65">
            Um processo guiado para você entender sua situação financeira,
            montar uma carteira sob medida e aprender a administrá-la sozinho
            — com o suporte de quem já viveu o mercado por dentro. Nada de
            fórmulas prontas: cada etapa é pensada para o seu momento, seus
            objetivos e seu perfil de risco.
          </p>
          <StepsList />
        </div>
        <Image
          src="/programa-etapas.jpeg"
          alt="Etapas do Programa de Educação Financeira"
          width={768}
          height={1376}
          className="hidden aspect-[768/1376] w-full max-w-[220px] mx-auto justify-self-center rounded-2xl object-cover lg:block lg:max-w-[420px]"
        />
      </div>
    </section>
  );
}
