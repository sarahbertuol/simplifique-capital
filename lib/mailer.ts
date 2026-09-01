import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * Configuração do SMTP. Aceita as variáveis genéricas SMTP_* (qualquer
 * provedor) e, se não houver, cai para a conta Gmail já usada pelo site.
 */
export type MailerConfig = {
  host: string;
  user: string;
  pass: string;
  /** Portas tentadas em ordem: 465 (SSL) e depois 587 (STARTTLS). */
  ports: { port: number; secure: boolean }[];
};

export type MailerConfigError = {
  ok: false;
  reason: "missing-env";
  missing: string[];
};

export function resolveMailerConfig(): MailerConfig | MailerConfigError {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const user = process.env.SMTP_USER || process.env.GMAIL_USER || "";
  const pass = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || "";

  const missing: string[] = [];
  if (!user) missing.push("GMAIL_USER (ou SMTP_USER)");
  if (!pass) missing.push("GMAIL_APP_PASSWORD (ou SMTP_PASSWORD)");
  if (missing.length) return { ok: false, reason: "missing-env", missing };

  // Porta explícita desliga a tentativa alternativa.
  const explicitPort = Number(process.env.SMTP_PORT) || 0;
  const ports = explicitPort
    ? [{ port: explicitPort, secure: explicitPort === 465 }]
    : [
        { port: 465, secure: true },
        { port: 587, secure: false },
      ];

  return { host, user, pass, ports };
}

function createTransport(
  config: MailerConfig,
  { port, secure }: { port: number; secure: boolean }
): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port,
    secure,
    auth: { user: config.user, pass: config.pass },
    requireTLS: !secure,
    // Falha rápido em vez de estourar o tempo da função serverless.
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12_000,
  });
}

type SmtpError = Error & { code?: string; responseCode?: number };

/** Erro de autenticação/recusa não melhora trocando de porta. */
function isPortProblem(err: SmtpError) {
  return (
    err.code === "ETIMEDOUT" ||
    err.code === "ECONNECTION" ||
    err.code === "ESOCKET" ||
    err.code === "ECONNREFUSED"
  );
}

export type MailerFailure = {
  ok: false;
  /** Código curto do nodemailer/SMTP, útil para diagnóstico. */
  code: string;
  responseCode?: number;
  message: string;
};

async function withTransport<T>(
  config: MailerConfig,
  run: (transporter: Transporter) => Promise<T>
): Promise<{ ok: true; port: number; result: T } | MailerFailure> {
  let lastError: SmtpError | undefined;

  for (const candidate of config.ports) {
    const transporter = createTransport(config, candidate);
    try {
      const result = await run(transporter);
      return { ok: true, port: candidate.port, result };
    } catch (err) {
      lastError = err as SmtpError;
      if (!isPortProblem(lastError)) break;
    } finally {
      transporter.close();
    }
  }

  return {
    ok: false,
    code: lastError?.code ?? "EUNKNOWN",
    responseCode: lastError?.responseCode,
    message: lastError?.message ?? "Falha desconhecida no envio",
  };
}

/** Testa credenciais e conexão sem enviar mensagem. */
export function verifyMailer(config: MailerConfig) {
  return withTransport(config, (transporter) => transporter.verify());
}

export function sendMail(
  config: MailerConfig,
  message: nodemailer.SendMailOptions
) {
  return withTransport(config, (transporter) => transporter.sendMail(message));
}
