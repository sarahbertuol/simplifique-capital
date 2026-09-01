"use client";

import { useState } from "react";
import CtaTrace from "./CtaTrace";
import {
  WHATSAPP_HREF,
  WHATSAPP_DISPLAY,
  whatsappFormHref,
} from "@/lib/whatsapp";
import {
  CONTACT_EMAIL,
  isValidEmail,
  isValidPhone,
  sendContactForm,
} from "@/lib/contact";

const PATRIMONIO_OPTIONS = [
  "Até R$ 100 mil",
  "R$ 100 mil a R$ 300 mil",
  "R$ 300 mil a R$ 1 milhão",
  "Acima de R$ 1 milhão",
];

const SERVICO_OPTIONS = [
  "Programa de Educação Financeira",
  "Flat Fee",
  "Consultoria Pontual",
  "Não sei ainda",
];

const NIVEL_OPTIONS = [
  "Nunca investi e não entendo de investimentos",
  "Tenho pouca experiência e quero aprender do zero",
  "Já invisto, mas sem uma estratégia clara",
  "Tenho experiência, mas quero profissionalizar minha carteira",
  "Sou experiente e busco uma segunda opinião especializada",
];

export default function Contato() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whats, setWhats] = useState("");
  const [servico, setServico] = useState(SERVICO_OPTIONS[0]);
  const [patrimonio, setPatrimonio] = useState(PATRIMONIO_OPTIONS[0]);
  const [nivel, setNivel] = useState(NIVEL_OPTIONS[0]);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [delivered, setDelivered] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.nome = "Informe seu nome.";
    if (!whats.trim()) next.whatsapp = "Informe seu WhatsApp.";
    else if (!isValidPhone(whats))
      next.whatsapp = "Informe um WhatsApp válido com DDD.";
    if (!email.trim()) next.email = "Informe seu e-mail.";
    else if (!isValidEmail(email)) next.email = "Informe um e-mail válido.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    if (!validate()) return;
    setSending(true);
    setSendError(false);
    const result = await sendContactForm({
      formName: "Vamos Começar",
      nome: name,
      email,
      whatsapp: whats,
      servico,
      patrimonio,
      nivel,
    });
    setSending(false);
    if (result.received) {
      setDelivered(result.delivered);
      setSubmitted(true);
    } else {
      setSendError(true);
    }
  }

  const whatsappHref = whatsappFormHref("Vamos Começar", [
    ["Nome", name],
    ["E-mail", email],
    ["WhatsApp", whats],
    ["Serviço de interesse", servico],
    ["Patrimônio aproximado", patrimonio],
    ["Nível de conhecimento", nivel],
  ]);

  return (
    <section id="contato" className="bg-green-800 px-8 py-24 md:px-16 lg:py-30">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
        <div>
          <div className="mb-4 text-[13px] font-bold tracking-[1.5px] text-gold">
            VAMOS COMEÇAR
          </div>
          <h2 className="mb-5 max-w-[440px] text-balance font-display text-[clamp(26px,3.2vw,34px)] font-extrabold text-white">
            Dê o primeiro passo para simplificar seus investimentos
          </h2>
          <p className="mb-8 max-w-[440px] text-base leading-[1.65] text-white/70">
            Preencha o formulário ou fale diretamente pelo WhatsApp. Retorno
            em até 1 dia útil.
          </p>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/6 px-6 py-3.5 text-[15px] font-semibold text-white hover:text-white/80"
          >
            WhatsApp: {WHATSAPP_DISPLAY} →
          </a>
        </div>

        {submitted ? (
          <div className="rounded-2xl bg-cream p-9 text-center text-green-700">
            <h4 className="mb-3.5 font-display text-2xl font-extrabold text-green-700">
              Recebemos seu interesse!
            </h4>
            <p className="text-[15px] leading-[1.6] text-green-700/65">
              Entraremos em contato em até 24h. Se preferir, você também
              pode nos escrever em{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            {!delivered && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-lg bg-green-800 py-3.5 text-sm font-bold text-white"
              >
                Quer agilizar? Falar agora no WhatsApp
              </a>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl bg-cream p-9 text-green-700"
          >
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
                <div className="text-xs text-[#b0402f]">{errors.nome}</div>
              )}
            </div>
            <div className="mb-[18px] flex flex-col gap-2">
              <label className="text-xs font-bold tracking-[0.3px] text-green-700">
                E-MAIL *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                aria-invalid={Boolean(errors.email)}
                className={`rounded-lg border bg-white px-4 py-[13px] text-sm ${
                  errors.email ? "border-[#b0402f]" : "border-green-700/15"
                }`}
              />
              {errors.email && (
                <div className="text-xs text-[#b0402f]">{errors.email}</div>
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
                  errors.whatsapp ? "border-[#b0402f]" : "border-green-700/15"
                }`}
              />
              {errors.whatsapp && (
                <div className="text-xs text-[#b0402f]">{errors.whatsapp}</div>
              )}
            </div>
            <div className="mb-[18px] flex flex-col gap-2">
              <label className="text-xs font-bold tracking-[0.3px] text-green-700">
                QUAL SERVIÇO VOCÊ BUSCA?
              </label>
              <select
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                className="rounded-lg border border-green-700/15 bg-white px-4 py-[13px] text-sm"
              >
                {SERVICO_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="mb-[18px] flex flex-col gap-2">
              <label className="text-xs font-bold tracking-[0.3px] text-green-700">
                PATRIMÔNIO APROXIMADO
              </label>
              <select
                value={patrimonio}
                onChange={(e) => setPatrimonio(e.target.value)}
                className="rounded-lg border border-green-700/15 bg-white px-4 py-[13px] text-sm"
              >
                {PATRIMONIO_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="mb-[18px] flex flex-col gap-2">
              <label className="text-xs font-bold tracking-[0.3px] text-green-700">
                COMO VOCÊ AVALIA SEU NÍVEL DE CONHECIMENTO EM INVESTIMENTOS?
              </label>
              <select
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                className="rounded-lg border border-green-700/15 bg-white px-4 py-[13px] text-sm"
              >
                {NIVEL_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            {sendError && (
              <div className="mb-[18px] rounded-lg border border-[#b0402f]/25 bg-[#b0402f]/5 p-4">
                <div className="mb-3 text-xs leading-[1.5] text-[#b0402f]">
                  Não foi possível enviar seu formulário agora. Você pode
                  tentar de novo ou mandar suas respostas pelo WhatsApp — elas
                  já vão preenchidas na mensagem.
                </div>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg bg-green-800 py-3 text-center text-sm font-bold text-white"
                >
                  Enviar respostas pelo WhatsApp
                </a>
              </div>
            )}
            <button
              type="submit"
              disabled={sending}
              className="cta-trace relative mt-2 w-full cursor-pointer rounded-lg bg-green-800 py-4 text-[15px] font-bold text-white disabled:opacity-60"
            >
              {sending ? "Enviando..." : "Quero agendar uma conversa"}
              <CtaTrace color="#c9982e" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
