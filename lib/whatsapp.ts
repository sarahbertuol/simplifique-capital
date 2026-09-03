const WHATSAPP_NUMBER = "5551993690120";
const WHATSAPP_MESSAGE =
  "Olá Marco, vim do site Simplifique Capital e gostaria de saber mais sobre o programa.";

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const WHATSAPP_DISPLAY = "(51) 99369-0120";

/**
 * Link do WhatsApp com as respostas do formulário já escritas na mensagem.
 * Usado como saída quando o envio por e-mail falha, para não perder o lead.
 */
export function whatsappFormHref(
  formName: string,
  answers: [string, string | null | undefined][]
) {
  const lines = [
    `Olá Marco, vim do site Simplifique Capital. Tenho interesse em ${formName}.`,
    "",
    ...answers
      .filter(([, value]) => value && value.trim())
      .map(([label, value]) => `${label}: ${value!.trim()}`),
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
}
