const STEPS = [
  {
    title: "Diagnóstico financeiro completo",
    desc: "Levantamos sua situação atual, objetivos e perfil de risco antes de qualquer recomendação.",
  },
  {
    title: "Montagem da carteira ideal",
    desc: "Construímos uma carteira personalizada, simples e alinhada ao seu momento de vida.",
  },
  {
    title: "Ensino prático de gestão",
    desc: "Você aprende a operar, rebalancear e acompanhar a carteira com autonomia.",
  },
  {
    title: "Acompanhamento com o mentor",
    desc: "Revisões periódicas e um canal direto para tirar dúvidas ao longo do processo.",
  },
];

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
          <div className="flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-4">
                <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-gold/50 font-display text-[15px] font-black text-gold">
                  {i + 1}
                </div>
                <div>
                  <div className="mb-1 text-[15px] font-bold text-green-700">
                    {step.title}
                  </div>
                  <div className="text-sm leading-[1.55] text-green-700/60">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="placeholder-img flex aspect-square items-center justify-center rounded-2xl">
          <span className="placeholder-label">ilustração / etapas do programa</span>
        </div>
      </div>
    </section>
  );
}
