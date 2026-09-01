export const CONTACT_EMAIL = "contato@simplifiquecapital.com.br";

/** Cópia de todas as respostas dos formulários. */
export const CONTACT_CC_EMAIL = "marco@simplifiquecapital.com.br";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

/** Precisa sobrar dígito suficiente para um telefone brasileiro com DDD. */
export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export type ContactPayload = {
  formName: string;
  nome?: string;
  email?: string;
  whatsapp?: string;
  servico?: string;
  objetivo?: string | null;
  patrimonio?: string | null;
  nivel?: string | null;
};

export type ContactResult = {
  /** O servidor recebeu e registrou o contato. */
  received: boolean;
  /** O e-mail chegou à caixa de entrada. Falso quando ficou só no log. */
  delivered: boolean;
};

/**
 * Envia o formulário para a API. Tenta uma segunda vez quando a falha é de
 * rede ou do servidor — falhas de SMTP costumam ser intermitentes.
 */
export async function sendContactForm(
  payload: ContactPayload
): Promise<ContactResult> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          delivered?: boolean;
        };
        return { received: true, delivered: data.delivered !== false };
      }
      // Erro de validação não melhora com nova tentativa.
      if (res.status < 500) return { received: false, delivered: false };
    } catch {
      // Falha de rede: cai para a nova tentativa.
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, 1200));
  }
  return { received: false, delivered: false };
}
