import type { Metadata } from "next";
import Link from "next/link";
import CtaTrace from "@/components/CtaTrace";
import Logo from "@/components/Logo";
import { MARCO_EMAIL } from "@/lib/contact";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Simplifique Capital | Links",
  description:
    "Fale com o Marco pelo WhatsApp, acesse o site ou mande um e-mail.",
  // Página de utilidade, feita para a bio das redes. Não precisa disputar
  // resultado de busca com a página principal.
  robots: { index: false, follow: true },
};

const MENSAGEM_WHATSAPP = "Oi Marco, quero saber mais sobre teu negócio";
const SITE = "www.simplifiquecapital.com.br";

function WhatsappIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-[22px] w-[22px] shrink-0"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.35c0-4.54 3.69-8.23 8.23-8.23a8.23 8.23 0 0 1 0 16.44Zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

function SiteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-[22px] w-[22px] shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9s1.2-6.5 3.6-9Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[22px] w-[22px] shrink-0"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 6.8 7.1 5.1c.66.48 1.54.48 2.2 0l7.1-5.1" />
    </svg>
  );
}

function Seta({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Links() {
  return (
    <main className="flex min-h-screen flex-col bg-green-800 px-6 py-14">
      <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center">
        <div className="mb-10 flex flex-col items-center text-center">
          <Logo size="large" />
          <p className="mt-5 text-balance text-[15px] leading-[1.6] text-white/60">
            Consultoria e educação financeira com Marco Kayser, sem conflito de
            interesses.
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          <a
            href={whatsappHref(MENSAGEM_WHATSAPP)}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-trace relative flex items-center gap-4 rounded-lg bg-gold px-5 py-4 text-green-800 hover:text-green-800 hover:brightness-95"
          >
            <WhatsappIcon />
            <span className="flex-1 text-left">
              <span className="block text-[15px] font-bold">
                Falar pelo WhatsApp
              </span>
              <span className="block text-[13px] font-medium text-green-800/65">
                {WHATSAPP_DISPLAY}
              </span>
            </span>
            <Seta className="text-green-800/50" />
            <CtaTrace color="#f7f3ea" />
          </a>

          <Link
            href="/"
            className="flex items-center gap-4 rounded-lg border border-white/15 bg-white/6 px-5 py-4 text-white hover:bg-white/10 hover:text-white"
          >
            <SiteIcon />
            <span className="flex-1 text-left">
              <span className="block text-[15px] font-semibold">
                Acessar o site
              </span>
              <span className="block text-[13px] text-white/50">{SITE}</span>
            </span>
            <Seta className="text-white/35" />
          </Link>

          <a
            href={`mailto:${MARCO_EMAIL}`}
            className="flex items-center gap-4 rounded-lg border border-white/15 bg-white/6 px-5 py-4 text-white hover:bg-white/10 hover:text-white"
          >
            <EmailIcon />
            <span className="flex-1 text-left">
              <span className="block text-[15px] font-semibold">
                Mandar um e-mail
              </span>
              <span className="block text-[13px] break-all text-white/50">
                {MARCO_EMAIL}
              </span>
            </span>
            <Seta className="text-white/35" />
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[420px] pt-12 text-center text-[12px] text-white/35">
        Copyright 2026, Simplifique Capital. Todos os direitos reservados.
      </div>
    </main>
  );
}
