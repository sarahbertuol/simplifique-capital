"use client";

import { useState } from "react";
import CtaTrace from "./CtaTrace";
import {
  CONTACT_EMAIL,
  isValidEmail,
  isValidPhone,
  sendContactForm,
} from "@/lib/contact";
import { WHATSAPP_HREF } from "@/lib/whatsapp";

const PLANS = [
  {
    variant: "light" as const,
    tag: "OPÇÃO 1",
    title: "Programa de Educação Financeira",
    sub: "3 meses de acompanhamento",
    items: [
      "Diagnóstico financeiro completo",
      "Montagem da carteira ideal personalizada",
      "Ensino prático de gestão",
      "Revisão mensal com o mentor",
      "Canal direto de WhatsApp",
    ],
  },
  {
    variant: "dark" as const,
    tag: "OPÇÃO 2 · MAIS COMPLETO",
    title: "Flat Fee",
    sub: "Acompanhamento contínuo",
    items: [
      "Tudo da Educação Financeira de 3 meses",
      "Apoio técnico em carteira e plataformas",
      "Suporte contínuo via WhatsApp",
      "Reunião semestral de acompanhamento",
      "Valor fixo, independente do patrimônio",
    ],
  },
  {
    variant: "light" as const,
    tag: "OPÇÃO 3 · SOB DEMANDA",
    title: "Consultoria Pontual",
    sub: "Cobrança por hora, sem pacote fixo",
    items: [
      "Sessão avulsa, sem compromisso de continuidade",
      "Cobrança apenas pelas horas utilizadas",
      "Segunda opinião sobre uma decisão específica",
      "Ideal para quem já fez o Programa e quer suporte extra",
      "Também para quem só precisa de uma orientação pontual",
    ],
  },
];

const OBJETIVOS = [
  "Montar minha carteira do zero",
  "Reorganizar/simplificar minha carteira atual",
  "Aprender a investir com mais autonomia",
  "Buscar acompanhamento financeiro contínuo",
  "Outro",
];

const PATRIMONIOS = [
  "Até R$ 100 mil",
  "Entre R$ 100 mil e R$ 500 mil",
  "Entre R$ 500 mil e R$ 1 milhão",
  "Entre R$ 1 milhão e R$ 3 milhões",
  "Entre R$ 3 milhões e R$ 5 milhões",
  "Entre R$ 5 milhões e R$ 10 milhões",
  "Acima de R$ 10 milhões",
];

const NIVEIS_CONHECIMENTO = [
  "Nunca investi e não entendo de investimentos",
  "Tenho pouca experiência e quero aprender do zero",
  "Já invisto, mas sem uma estratégia clara",
  "Tenho experiência, mas quero profissionalizar minha carteira",
  "Sou experiente e busco uma segunda opinião especializada",
];

function RadioOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`mb-2 flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 ${
        selected ? "border-gold bg-gold/8" : "border-green-700/15 bg-white"
      }`}
    >
      <div
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] ${
          selected ? "border-gold" : "border-green-700/30"
        }`}
      >
        {selected && <div className="h-[9px] w-[9px] rounded-full bg-gold" />}
      </div>
      <div className="text-[13px] text-green-700">{label}</div>
    </div>
  );
}

export default function PlanosEModal() {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState("");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whats, setWhats] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [objetivo, setObjetivo] = useState<string | null>(null);
  const [patrimonio, setPatrimonio] = useState<string | null>(null);
  const [nivel, setNivel] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  function openModal(planTitle: string) {
    setPlan(planTitle);
    setName("");
    setEmail("");
    setWhats("");
    setErrors({});
    setObjetivo(null);
    setPatrimonio(null);
    setNivel(null);
    setSubmitted(false);
    setSendError(false);
    setStep(1);
    setOpen(true);
  }

  /** Valida os dados de contato do passo 1. */
  function validateContato() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.nome = "Informe seu nome.";
    if (!whats.trim()) next.whatsapp = "WhatsApp é obrigatório.";
    else if (!isValidPhone(whats))
      next.whatsapp = "Informe um WhatsApp válido com DDD.";
    if (email.trim() && !isValidEmail(email))
      next.email = "Informe um e-mail válido.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goStep(n: number) {
    // Voltar nunca é bloqueado; avançar exige o passo atual preenchido.
    if (n > step) {
      if (!validateContato()) {
        setStep(1);
        return;
      }
      if (step === 2 && !objetivo) {
        setErrors({ objetivo: "Escolha uma opção para continuar." });
        return;
      }
      if (step === 3 && !patrimonio) {
        setErrors({ patrimonio: "Escolha uma opção para continuar." });
        return;
      }
    }
    setErrors({});
    setStep(n);
  }

  async function submit() {
    if (sending) return;
    if (!validateContato()) {
      setStep(1);
      return;
    }
    if (!objetivo) {
      setErrors({ objetivo: "Escolha uma opção para continuar." });
      setStep(2);
      return;
    }
    if (!patrimonio) {
      setErrors({ patrimonio: "Escolha uma opção para continuar." });
      setStep(3);
      return;
    }
    if (!nivel) {
      setErrors({ nivel: "Escolha uma opção para enviar." });
      return;
    }
    setSending(true);
    setSendError(false);
    const ok = await sendContactForm({
      formName: plan,
      nome: name,
      email,
      whatsapp: whats,
      objetivo,
      patrimonio,
      nivel,
    });
    setSending(false);
    if (ok) setSubmitted(true);
    else setSendError(true);
  }

  return (
    <>
      <section id="programa" className="px-8 py-24 md:px-16 lg:py-30">
        <div className="mx-auto mb-16 max-w-[680px] text-center">
          <div className="mb-4 text-[13px] font-bold tracking-[1.5px] text-gold">
            ESCOPO E ENTREGAS
          </div>
          <h2 className="mb-[18px] text-balance font-display text-[clamp(26px,3.4vw,38px)] font-extrabold text-green-700">
            Programa de Educação Financeira
          </h2>
          <p className="text-base leading-[1.6] text-green-700/65">
            Três formas de acompanhamento — escolha a que faz mais sentido
            para o seu momento.
          </p>
        </div>
        <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((p) => {
            const dark = p.variant === "dark";
            return (
              <div
                key={p.title}
                className={`flex h-full flex-col rounded-2xl border p-9 ${
                  dark
                    ? "border-gold/30 bg-green-800 text-white"
                    : "border-green-700/10 bg-cream"
                }`}
              >
                <div
                  className={`mb-4 text-[11px] font-bold tracking-[1px] ${
                    dark ? "text-gold" : "text-gold-dark"
                  }`}
                >
                  {p.tag}
                </div>
                <div
                  className={`mb-1.5 font-display text-[21px] font-bold ${
                    dark ? "text-white" : "text-green-700"
                  }`}
                >
                  {p.title}
                </div>
                <div
                  className={`mb-6 text-[13px] ${
                    dark ? "text-white/60" : "text-green-700/55"
                  }`}
                >
                  {p.sub}
                </div>
                {p.items.map((item) => (
                  <div
                    key={item}
                    className={`mb-3.5 flex items-start gap-2.5 text-sm leading-[1.5] ${
                      dark ? "text-white/85" : ""
                    }`}
                  >
                    <div className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </div>
                ))}
                <button
                  onClick={() => openModal(p.title)}
                  className="mt-auto w-full cursor-pointer bg-transparent pt-4 text-center"
                >
                  <div
                    className={`cta-trace relative rounded-lg px-3.5 py-3.5 text-sm font-bold ${
                      dark
                        ? "bg-gold text-green-800"
                        : "bg-green-700/6 text-green-700"
                    }`}
                  >
                    Me interesso por esse plano
                    <CtaTrace color={dark ? "#f7f3ea" : "#c9982e"} />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-green-800/55 p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative max-h-[88vh] w-full max-w-[480px] overflow-y-auto rounded-2xl bg-white p-10">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border-none bg-tan text-base"
            >
              ×
            </button>

            {!submitted ? (
              <div>
                <div className="mb-2.5 text-xs font-bold tracking-[1px] text-gold-dark">
                  {plan}
                </div>
                <h3 className="mb-[18px] font-display text-[22px] font-extrabold text-green-700">
                  Quero saber mais
                </h3>
                <div className="mb-7 flex items-center gap-3">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-green-700/10">
                    <div
                      className="h-full rounded-full bg-gold transition-[width] duration-[250ms] ease-out"
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs font-bold whitespace-nowrap text-green-700/50">
                    0{step}/04
                  </div>
                </div>

                {step === 1 && (
                  <div>
                    <p className="mb-6 text-sm leading-[1.5] text-green-700/60">
                      Vamos começar com seus dados de contato.
                    </p>
                    <div className="mb-[18px] flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.3px] text-green-700">
                        NOME *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        aria-invalid={Boolean(errors.nome)}
                        className={`rounded-lg border bg-white px-4 py-[13px] text-sm ${
                          errors.nome ? "border-[#b0402f]" : "border-green-700/15"
                        }`}
                      />
                      {errors.nome && (
                        <div className="text-xs text-[#b0402f]">
                          {errors.nome}
                        </div>
                      )}
                    </div>
                    <div className="mb-[18px] flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.3px] text-green-700">
                        E-MAIL
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@email.com"
                        aria-invalid={Boolean(errors.email)}
                        className={`rounded-lg border bg-white px-4 py-[13px] text-sm ${
                          errors.email
                            ? "border-[#b0402f]"
                            : "border-green-700/15"
                        }`}
                      />
                      {errors.email && (
                        <div className="text-xs text-[#b0402f]">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="mb-[18px] flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.3px] text-green-700">
                        WHATSAPP *
                      </label>
                      <input
                        type="tel"
                        value={whats}
                        onChange={(e) => setWhats(e.target.value)}
                        placeholder="(00) 00000-0000"
                        aria-invalid={Boolean(errors.whatsapp)}
                        className={`rounded-lg border bg-white px-4 py-[13px] text-sm ${
                          errors.whatsapp
                            ? "border-[#b0402f]"
                            : "border-green-700/15"
                        }`}
                      />
                      {errors.whatsapp && (
                        <div className="mt-1.5 text-xs text-[#b0402f]">
                          {errors.whatsapp}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => goStep(2)}
                      className="w-full cursor-pointer rounded-lg bg-green-800 py-[15px] text-[15px] font-bold text-white"
                    >
                      Continuar
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="mb-6 text-sm leading-[1.5] text-green-700/60">
                      Qual seu principal objetivo com o programa?
                    </p>
                    <div>
                      {OBJETIVOS.map((label) => (
                        <RadioOption
                          key={label}
                          label={label}
                          selected={objetivo === label}
                          onSelect={() => setObjetivo(label)}
                        />
                      ))}
                    </div>
                    {errors.objetivo && (
                      <div className="mt-3 text-xs text-[#b0402f]">
                        {errors.objetivo}
                      </div>
                    )}
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => goStep(1)}
                        className="flex-1 cursor-pointer rounded-lg bg-green-700/6 py-[15px] text-[15px] font-bold text-green-700"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={() => goStep(3)}
                        className="flex-[2] cursor-pointer rounded-lg bg-green-800 py-[15px] text-[15px] font-bold text-white"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <p className="mb-6 text-sm leading-[1.5] text-green-700/60">
                      Qual a faixa que melhor descreve seu patrimônio
                      financeiro atual?
                    </p>
                    <div>
                      {PATRIMONIOS.map((label) => (
                        <RadioOption
                          key={label}
                          label={label}
                          selected={patrimonio === label}
                          onSelect={() => setPatrimonio(label)}
                        />
                      ))}
                    </div>
                    {errors.patrimonio && (
                      <div className="mt-3 text-xs text-[#b0402f]">
                        {errors.patrimonio}
                      </div>
                    )}
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => goStep(2)}
                        className="flex-1 cursor-pointer rounded-lg bg-green-700/6 py-[15px] text-[15px] font-bold text-green-700"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={() => goStep(4)}
                        className="flex-[2] cursor-pointer rounded-lg bg-green-800 py-[15px] text-[15px] font-bold text-white"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <p className="mb-6 text-sm leading-[1.5] text-green-700/60">
                      Como você avalia seu nível de conhecimento em
                      investimentos?
                    </p>
                    <div>
                      {NIVEIS_CONHECIMENTO.map((label) => (
                        <RadioOption
                          key={label}
                          label={label}
                          selected={nivel === label}
                          onSelect={() => setNivel(label)}
                        />
                      ))}
                    </div>
                    {errors.nivel && (
                      <div className="mt-3 text-xs text-[#b0402f]">
                        {errors.nivel}
                      </div>
                    )}
                    {sendError && (
                      <div className="mt-3 text-xs leading-[1.5] text-[#b0402f]">
                        Não foi possível enviar. Tente novamente ou fale
                        direto pelo{" "}
                        <a
                          href={WHATSAPP_HREF}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold underline"
                        >
                          WhatsApp
                        </a>
                        .
                      </div>
                    )}
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => goStep(3)}
                        disabled={sending}
                        className="flex-1 cursor-pointer rounded-lg bg-green-700/6 py-[15px] text-[15px] font-bold text-green-700 disabled:opacity-50"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={submit}
                        disabled={sending}
                        className="flex-[2] cursor-pointer rounded-lg bg-green-800 py-[15px] text-[15px] font-bold text-white disabled:opacity-60"
                      >
                        {sending ? "Enviando..." : "Enviar"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center">
                <h4 className="mb-3.5 font-display text-2xl font-extrabold text-green-700">
                  Recebemos seu interesse!
                </h4>
                <p className="text-[15px] leading-[1.6] text-green-700/65">
                  Entraremos em contato em até 24h com valores e detalhes do
                  plano <strong>{plan}</strong>. Se preferir, você também
                  pode nos escrever em{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
