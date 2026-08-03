import Image from "next/image";

const CHECKLIST = [
  "Total independência",
  "Especialista em ETFs",
  "Baixo custo e eficiência",
  "Sem conflito de interesses",
];

export default function Filosofia() {
  return (
    <section className="bg-tan px-8 py-24 md:px-16 lg:py-30">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <Image
          src="/portfolio-dashboard.jpeg"
          alt="Diagrama de alocação de carteira"
          width={1024}
          height={1024}
          className="order-last aspect-square w-full rounded-2xl object-cover lg:order-none"
        />
        <div>
          <div className="mb-4 text-[13px] font-bold tracking-[1.5px] text-gold-dark">
            MINHA FILOSOFIA
          </div>
          <h2 className="mb-5 max-w-[480px] font-display text-[clamp(26px,3.2vw,34px)] font-extrabold text-green-700">
            Transparência e dados acima de opiniões
          </h2>
          <p className="mb-8 max-w-[480px] text-base leading-[1.65] text-green-700/65">
            Meu compromisso é com você, não com instituições financeiras. Uso
            evidências e dados para construir carteiras simples e eficientes
            que protegem e rentabilizam seu patrimônio no longo prazo.
          </p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {CHECKLIST.map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm font-semibold">
                <div className="h-[7px] w-[7px] shrink-0 rounded-full bg-gold" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
