"use client";

import { useEffect, useRef, useState } from "react";

type Estado = "parado" | "copiado" | "falhou";

/**
 * Copiar com confirmação visual. O rótulo muda no próprio botão em vez de
 * abrir um aviso flutuante. No celular, com o polegar em cima do botão, é o
 * único lugar onde a confirmação é vista.
 */
export default function BotaoCopiar({
  texto,
  children,
  primario = false,
}: {
  texto: string;
  children: string;
  primario?: boolean;
}) {
  const [estado, setEstado] = useState<Estado>("parado");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copiar() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(texto);
      ok = true;
    } catch {
      ok = false;
    }
    setEstado(ok ? "copiado" : "falhou");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setEstado("parado"), 2200);
  }

  const rotulo =
    estado === "copiado"
      ? "copiado"
      : estado === "falhou"
        ? "não consegui copiar"
        : children;

  const base = primario
    ? "bg-green-800 text-cream"
    : "bg-transparent text-green-700 border border-green-700";

  return (
    <button
      type="button"
      onClick={copiar}
      aria-live="polite"
      className={`rounded-lg px-5 py-3 font-sans text-[15px] font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none ${
        estado === "copiado" ? "bg-gold text-green-900" : base
      }`}
    >
      {rotulo}
    </button>
  );
}
