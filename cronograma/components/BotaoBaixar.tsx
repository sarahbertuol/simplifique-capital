"use client";

import { useState } from "react";
import type { Post } from "@/data/posts";
import {
  desenharPeca,
  LARGURA_EXPORT,
  nomeDoArquivo,
  pecasDoPost,
  PROPORCAO,
} from "@/lib/arte";
import { familiaDisplay } from "@/lib/fonte";

/** Gera o PNG de uma peça em 1080x1350 e dispara o download. */
async function baixarPeca(post: Post, indice: number): Promise<boolean> {
  const peca = pecasDoPost(post)[indice];
  const canvas = document.createElement("canvas");
  canvas.width = LARGURA_EXPORT;
  canvas.height = Math.round(LARGURA_EXPORT * PROPORCAO);
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  // Sem esta espera o PNG pode sair na fonte de fallback.
  await document.fonts.ready;
  desenharPeca(ctx, peca, LARGURA_EXPORT, familiaDisplay());

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) return false;

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeDoArquivo(peca);
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revogar na hora cancelaria o download em alguns navegadores.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
  return true;
}

export default function BotaoBaixar({
  post,
  indice,
  todas = false,
  children,
  primario = false,
  miudo = false,
}: {
  post: Post;
  indice?: number;
  /** Baixa todas as peças do post, uma a uma. */
  todas?: boolean;
  children: string;
  primario?: boolean;
  /** Variante de texto, para o download por slide dentro da lista. */
  miudo?: boolean;
}) {
  const [estado, setEstado] = useState<"parado" | "baixando" | "pronto">(
    "parado",
  );

  async function aoClicar() {
    setEstado("baixando");
    const total = pecasDoPost(post).length;
    if (todas) {
      for (let i = 0; i < total; i++) {
        await baixarPeca(post, i);
        // Downloads em rajada são bloqueados por alguns navegadores; o
        // intervalo curto evita que só o primeiro arquivo desça.
        if (i < total - 1) await new Promise((r) => setTimeout(r, 350));
      }
    } else {
      await baixarPeca(post, indice ?? 0);
    }
    setEstado("pronto");
    setTimeout(() => setEstado("parado"), 2200);
  }

  const rotulo =
    estado === "baixando" ? "gerando…" : estado === "pronto" ? "baixado" : children;

  if (miudo) {
    return (
      <button
        type="button"
        onClick={aoClicar}
        disabled={estado === "baixando"}
        aria-live="polite"
        aria-label={`${children} ${nomeDoArquivo(pecasDoPost(post)[indice ?? 0])}`}
        className={`font-sans text-[13px] font-bold underline underline-offset-[5px] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-70 ${
          estado === "pronto"
            ? "text-gold-dark decoration-gold"
            : "text-green-900 decoration-green-700/40"
        }`}
      >
        {rotulo}
      </button>
    );
  }

  const base = primario
    ? "bg-green-800 text-cream"
    : "border border-green-700 text-green-700";

  return (
    <button
      type="button"
      onClick={aoClicar}
      disabled={estado === "baixando"}
      aria-live="polite"
      className={`rounded-lg px-5 py-3 font-sans text-[15px] font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-70 motion-reduce:transition-none ${
        estado === "pronto" ? "bg-gold text-green-900" : base
      }`}
    >
      {rotulo}
    </button>
  );
}
