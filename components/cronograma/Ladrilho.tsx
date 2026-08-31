"use client";

import type { Pilar, Post } from "@/data/posts";

/**
 * Cada pilar tem um par fundo/texto chapado, sempre o mesmo. É isso que faz a
 * sequência do feed ter ritmo de cor: dá para bater o olho e ver se três posts
 * escuros ficaram colados.
 */
const CORES: Record<
  Pilar,
  { fundo: string; texto: string; sutil: string; marca: string }
> = {
  Simplicidade: {
    fundo: "var(--color-cream)",
    texto: "var(--color-green-900)",
    sutil: "rgb(10 36 32 / 0.72)",
    marca: "var(--color-green-900)",
  },
  Transparência: {
    fundo: "var(--color-gold)",
    texto: "var(--color-green-900)",
    sutil: "rgb(10 36 32 / 0.85)",
    // O dourado do marcador sumiria no fundo dourado deste pilar.
    marca: "var(--color-green-900)",
  },
  Estratégia: {
    fundo: "var(--color-green-800)",
    texto: "var(--color-cream)",
    sutil: "rgb(247 243 234 / 0.55)",
    marca: "var(--color-gold)",
  },
};

/**
 * Tamanho da tipografia em `cqw` — percentual da largura do próprio ladrilho.
 * Assim o mesmo componente serve para a grade de 3 colunas no celular e para a
 * grade larga no desktop, sem breakpoint: texto curto ocupa o quadro inteiro,
 * texto longo encolhe o suficiente para caber.
 */
function corpoDeTexto(texto: string): number {
  const n = texto.length;
  if (n <= 28) return 18;
  if (n <= 48) return 14.5;
  if (n <= 75) return 12;
  return 10;
}

/** Onde o texto se ancora dentro do quadro, por formato. */
const ANCORA: Record<Post["formato"], string> = {
  Card: "justify-center",
  Carrossel: "justify-start",
  Reels: "justify-end",
};

export default function Ladrilho({
  post,
  publicado,
  hoje,
  onSelecionar,
}: {
  post: Post;
  publicado: boolean;
  hoje: boolean;
  onSelecionar: (post: Post) => void;
}) {
  const cores = CORES[post.pilar];

  return (
    <button
      type="button"
      onClick={() => onSelecionar(post)}
      style={{ background: cores.fundo, color: cores.texto }}
      className="group relative flex aspect-[4/5] w-full [container-type:inline-size] cursor-pointer flex-col overflow-hidden p-[6cqw] text-left focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-gold"
      aria-label={`${post.card} — ${post.formato}, ${post.pilar}`}
    >
      {post.formato === "Reels" && (
        <div
          className="font-sans font-semibold"
          style={{ fontSize: "6.5cqw", color: cores.sutil }}
        >
          Reels
        </div>
      )}

      <div className={`flex min-h-0 flex-1 flex-col ${ANCORA[post.formato]}`}>
        <p
          className="font-display leading-[1.04] font-extrabold tracking-[-0.02em] text-balance"
          style={{ fontSize: `${corpoDeTexto(post.card)}cqw` }}
        >
          {post.card}
        </p>
      </div>

      {post.formato === "Carrossel" && (
        <div
          className="font-sans font-semibold"
          style={{ fontSize: "6.5cqw", color: cores.sutil }}
        >
          1/{post.slides.length}
        </div>
      )}

      {/* Barra em cima = é hoje. Barra embaixo = já publicado. */}
      {hoje && (
        <span
          className="absolute inset-x-0 top-0 h-[1.8cqw]"
          style={{ background: cores.marca }}
        />
      )}
      {publicado && (
        <span
          className="absolute inset-x-0 bottom-0 h-[1.8cqw]"
          style={{ background: cores.marca }}
        />
      )}
    </button>
  );
}
