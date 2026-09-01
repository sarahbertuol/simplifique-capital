import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT_CC_EMAIL, CONTACT_EMAIL } from "@/lib/contact";

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

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD não configuradas");
    return NextResponse.json(
      { ok: false, error: "Serviço de e-mail não configurado" },
      { status: 500 }
    );
  }

  const title = formName.trim().slice(0, 120);
  const leadEmail = fields.find(([key]) => key === "email")?.[1];

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

  const text = [
    `Novo contato — ${title}`,
    "",
    ...fields.map(([key, value]) => `${FIELD_LABELS[key] ?? key}: ${value}`),
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: gmailUser, pass: gmailPass },
      // Falha rápido em vez de estourar o tempo da função serverless.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transporter.sendMail({
      // O Gmail rejeita um remetente diferente da conta autenticada,
      // por isso o From é sempre a própria conta que envia.
      from: { name: "Site Simplifique Capital", address: gmailUser },
      to: CONTACT_EMAIL,
      cc: CONTACT_CC_EMAIL,
      replyTo: leadEmail && EMAIL_RE.test(leadEmail) ? leadEmail : undefined,
      subject: `Novo contato — ${title}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Falha ao enviar e-mail" },
      { status: 500 }
    );
  }
}
