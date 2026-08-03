"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Qual a diferença entre o Programa de Educação Financeira e o modelo com Flat Fee?",
    a: "No Programa de Educação Financeira você recebe diagnóstico, carteira e ensino prático por 3 meses. Na opção com Flat Fee, além de tudo isso, você conta com acompanhamento contínuo, suporte via WhatsApp e reuniões semestrais.",
  },
  {
    q: "Você recebe comissões ou rebates por recomendar produtos?",
    a: "Não. O modelo é de valor fixo, pago diretamente por você. Não há conflito de interesse com corretoras ou gestoras de fundos.",
  },
  {
    q: "Existe um valor mínimo de patrimônio para participar?",
    a: "Não há valor mínimo obrigatório. O programa é indicado para quem quer aprender a gerir a própria carteira com método, independentemente do tamanho do patrimônio atual.",
  },
  {
    q: "Preciso ter conta em alguma corretora específica?",
    a: "Não é obrigatório. Trabalhamos com orientações compatíveis com as principais corretoras do mercado, e você mantém total liberdade de escolha.",
  },
  {
    q: "Eu já tenho uma carteira. Vocês ajudam a simplificar?",
    a: "Sim. Fazemos um diagnóstico completo da carteira atual e apresentamos um plano para reorganizá-la de forma mais simples e eficiente.",
  },
  {
    q: "Como funciona o canal direto de WhatsApp?",
    a: "Durante o período de acompanhamento você tem acesso a um canal direto para tirar dúvidas pontuais sobre a carteira e o mercado.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-tan px-8 py-24 md:px-16 lg:py-30">
      <div className="mx-auto mb-16 max-w-[680px] text-center">
        <div className="mb-4 text-[13px] font-bold tracking-[1.5px] text-gold">
          FAQ
        </div>
        <h2 className="font-display text-[clamp(26px,3.2vw,34px)] font-extrabold text-green-700">
          Dúvidas frequentes
        </h2>
      </div>
      <div className="mx-auto flex max-w-[760px] flex-col gap-3">
        {FAQS.map((item, i) => {
          const open = openIndex === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-xl border border-green-700/8 bg-white"
            >
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-[26px] py-[22px] text-left text-[15px] font-bold text-green-700"
              >
                {item.q}
                <span className="shrink-0 text-xl text-gold">{open ? "−" : "+"}</span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="px-[26px] pb-[22px] text-sm leading-[1.65] text-green-700/65">
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
