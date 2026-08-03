import Image from "next/image";

const BIO_STATS = [
  { val: "25+", lbl: "ANOS COMO INVESTIDOR" },
  { val: "4", lbl: "ANOS NA XP INVESTIMENTOS" },
  { val: "300+", lbl: "CLIENTES ATENDIDOS" },
  { val: "R$104M+", lbl: "PATRIMÔNIO ASSESSORADO" },
];

export default function Sobre() {
  return (
    <section id="sobre" className="px-8 py-24 md:px-16 lg:py-30">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute top-5 left-5 h-full w-full rounded-2xl border-2 border-gold/35" />
          <Image
            src="/marco-kayser-institucional.png"
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
            Marco Kayser atua há mais de 25 anos no mercado financeiro, com
            passagem como assessor de investimentos na XP Investimentos por 4
            anos, auxiliando centenas de investidores a organizar e
            simplificar suas carteiras.
          </p>
          <p className="mb-10 text-base leading-[1.7] text-green-700/70">
            Não possui vínculo com nenhuma instituição financeira. Investe com
            base em evidências, e não opiniões — o que ensina no programa é o
            que aplica na própria carteira.
          </p>
          <div className="grid grid-cols-2 gap-8">
            {BIO_STATS.map((stat) => (
              <div key={stat.lbl}>
                <div className="mb-3 h-[3px] w-7 bg-gold" />
                <div className="font-display text-[30px] font-black text-green-700">
                  {stat.val}
                </div>
                <div className="mt-1.5 text-xs tracking-[0.3px] text-green-700/55">
                  {stat.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
