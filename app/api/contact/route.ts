import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "contato@simplifiquecapital.com.br";

const FIELD_LABELS: Record<string, string> = {
  nome: "Nome",
  email: "E-mail",
  whatsapp: "WhatsApp",
  servico: "Serviço de interesse",
  objetivo: "Objetivo",
  patrimonio: "Patrimônio aproximado",
  nivel: "Nível de conhecimento em investimentos",
};

export async function POST(request: Request) {
  const body = await request.json();
  const { formName, ...fields } = body as {
    formName?: string;
    [key: string]: string | undefined;
  };

  if (!formName || typeof formName !== "string") {
    return NextResponse.json(
      { ok: false, error: "formName é obrigatório" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY não configurada");
    return NextResponse.json(
      { ok: false, error: "Serviço de e-mail não configurado" },
      { status: 500 }
    );
  }

  const rows = Object.entries(fields)
    .filter(([, value]) => value && value.trim().length > 0)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:700;vertical-align:top;">${
          FIELD_LABELS[key] ?? key
        }</td><td style="padding:6px 0;">${value}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;color:#152420;">
      <h2 style="margin:0 0 16px;">Novo contato — ${formName}</h2>
      <table style="border-collapse:collapse;">${rows}</table>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Simplifique Capital <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: fields.email && fields.email.trim() ? fields.email : undefined,
      subject: formName,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Falha ao enviar e-mail" },
      { status: 500 }
    );
  }
}
