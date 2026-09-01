import { NextResponse } from "next/server";
import { CONTACT_CC_EMAIL, CONTACT_EMAIL } from "@/lib/contact";
import { resolveMailerConfig, sendMail, verifyMailer } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const FIELD_ORDER = [
  "nome",
  "email",
  "whatsapp",
  "servico",
  "objetivo",
  "patrimonio",
  "nivel",
] as const;

const FIELD_LABELS: Record<string, string> = {
  nome: "Nome",
  email: "E-mail",
  whatsapp: "WhatsApp",
  servico: "Serviço de interesse",
  objetivo: "Objetivo",
  patrimonio: "Patrimônio aproximado",
  nivel: "Nível de conhecimento em investimentos",
};

const MAX_FIELD_LENGTH = 500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Mantém apenas strings preenchidas, já limpas e com tamanho limitado. */
function normalize(fields: Record<string, unknown>) {
  const entries: [string, string][] = [];
  const keys = [
    ...FIELD_ORDER.filter((key) => key in fields),
    ...Object.keys(fields).filter(
      (key) => !FIELD_ORDER.includes(key as (typeof FIELD_ORDER)[number])
    ),
  ];

  for (const key of keys) {
    const raw = fields[key];
    if (typeof raw !== "string") continue;
    const value = raw.trim().slice(0, MAX_FIELD_LENGTH);
    if (value) entries.push([key, value]);
  }

  return entries;
}

/**
 * Registra o lead no log do servidor quando o e-mail não pôde ser entregue.
 * Marcador fixo para facilitar a busca no painel de logs da Vercel.
 */
function logLead(text: string, motivo: string) {
  console.error(
    `[LEAD-NAO-ENVIADO] ${new Date().toISOString()} — ${motivo}\n${text}\n[/LEAD-NAO-ENVIADO]`
  );
}

function maskAddress(address: string) {
  const [local, domain] = address.split("@");
  if (!domain) return "***";
  return `${local.slice(0, 2)}***@${domain}`;
}

/**
 * Diagnóstico do serviço de e-mail — abrir /api/contact no navegador mostra se
 * as variáveis estão configuradas; /api/contact?verify=1 testa o login SMTP.
 * Nenhum segredo é exposto: só nomes de variáveis, endereço mascarado e o
 * código de erro do SMTP.
 */
export async function GET(request: Request) {
  const config = resolveMailerConfig();

  if ("reason" in config) {
    return NextResponse.json(
      {
        ok: false,
        problema: "Variáveis de ambiente de e-mail não configuradas",
        faltando: config.missing,
        comoResolver:
          "Configure as variáveis no painel da Vercel (Settings → Environment Variables) para o ambiente Production e refaça o deploy.",
      },
      { status: 500 }
    );
  }

  const base = {
    ok: true,
    remetente: maskAddress(config.user),
    host: config.host,
    destinatarios: [CONTACT_EMAIL, CONTACT_CC_EMAIL],
  };

  const url = new URL(request.url);
  if (url.searchParams.get("verify") !== "1") {
    return NextResponse.json({
      ...base,
      dica: "Adicione ?verify=1 à URL para testar a conexão e o login SMTP.",
    });
  }

  const result = await verifyMailer(config);
  if (result.ok) {
    return NextResponse.json({ ...base, smtp: "ok", porta: result.port });
  }

  return NextResponse.json(
    {
      ...base,
      ok: false,
      smtp: "falhou",
      codigo: result.code,
      respostaSmtp: result.responseCode,
      comoResolver:
        result.code === "EAUTH"
          ? "Login recusado pelo Gmail: gere uma Senha de App (myaccount.google.com/apppasswords) com verificação em duas etapas ativa e use-a em GMAIL_APP_PASSWORD."
          : "O servidor não conseguiu conectar ao SMTP. Verifique host/porta ou use outro provedor via SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASSWORD.",
    },
    { status: 500 }
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Corpo da requisição inválido" },
      { status: 400 }
    );
  }

  const { formName, ...rest } = body;

  if (typeof formName !== "string" || !formName.trim()) {
    return NextResponse.json(
      { ok: false, error: "formName é obrigatório" },
      { status: 400 }
    );
  }

  const fields = normalize(rest);
  if (fields.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Preencha ao menos um campo" },
      { status: 400 }
    );
  }

  const title = formName.trim().slice(0, 120);
  const leadEmail = fields.find(([key]) => key === "email")?.[1];
  const text = [
    `Novo contato — ${title}`,
    "",
    ...fields.map(([key, value]) => `${FIELD_LABELS[key] ?? key}: ${value}`),
  ].join("\n");

  const config = resolveMailerConfig();
  if ("reason" in config) {
    // Sem credenciais não há como enviar, mas o lead não pode se perder nem
    // virar erro na tela: fica registrado no log e o visitante segue para o
    // WhatsApp. O diagnóstico em GET /api/contact continua mostrando a verdade.
    logLead(text, `e-mail não configurado (${config.missing.join(", ")})`);
    return NextResponse.json({ ok: true, delivered: false, code: "ENOENV" });
  }

  const rows = fields
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:700;vertical-align:top;">${escapeHtml(
          FIELD_LABELS[key] ?? key
        )}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;color:#152420;">
      <h2 style="margin:0 0 16px;">Novo contato — ${escapeHtml(title)}</h2>
      <table style="border-collapse:collapse;">${rows}</table>
    </div>
  `;

  const result = await sendMail(config, {
    // O Gmail rejeita um remetente diferente da conta autenticada,
    // por isso o From é sempre a própria conta que envia.
    from: { name: "Site Simplifique Capital", address: config.user },
    to: CONTACT_EMAIL,
    cc: CONTACT_CC_EMAIL,
    replyTo: leadEmail && EMAIL_RE.test(leadEmail) ? leadEmail : undefined,
    subject: `Novo contato — ${title}`,
    text,
    html,
  });

  if (!result.ok) {
    logLead(
      text,
      `falha no envio (${result.code}${
        result.responseCode ? ` / ${result.responseCode}` : ""
      }): ${result.message}`
    );
    return NextResponse.json({ ok: true, delivered: false, code: result.code });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
