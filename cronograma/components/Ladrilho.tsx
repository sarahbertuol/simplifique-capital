"use client";

import type { Pilar, Post } from "@/data/posts";
import Arte from "./Arte";

/**
 * Cores só dos rótulos sobrepostos ("Reels", "1/7") e das barras de estado.
 * As cores da arte em si vivem em `lib/arte.ts` — aqui é só o que fica por
 * cima do canvas e não entra no arquivo baixado.
 */
const SOBREPOSTO: Record<Pilar, { sutil: string; marca: string }> = {
  Simplicidade: { sutil: "rgb(10 36 32 / 0.72)", marca: "bg-green-900" },
  // O dourado do marcador sumiria no fundo dourado deste pilar.
  Transparência: { sutil: "rgb(10 36 32 / 0.85)", marca: "bg-green-900" },
  Estratégia: { sutil: "rgb(247 243 234 / 0.6)", marca: "bg-gold" },
  Abertura: { sutil: "rgb(247 243 234 / 0.6)", marca: "bg-cream" },
  Apresentação: { sutil: "rgb(247 243 234 / 0.6)", marca: "bg-gold" },
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
  const sobreposto = SOBREPOSTO[post.pilar];

  return (
    <button
      type="button"
      onClick={() => onSelecionar(post)}
      className="group relative block w-full [container-type:inline-size] cursor-pointer focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-gold"
      aria-label={`${post.card} — ${post.formato}, ${post.pilar}`}
    >
      <Arte post={post} indice={0} />

      {/* Rótulos de leitura da grade. Ficam por cima do canvas de propósito:
          não são parte da arte e não vão para o arquivo baixado. */}
      {post.formato === "Reels" && (
        <span
          className="pointer-events-none absolute top-[6cqw] left-[7.5cqw] font-sans font-semibold"
          style={{ fontSize: "5.5cqw", color: sobreposto.sutil }}
        >
          Reels
        </span>
      )}
      {post.formato === "Carrossel" && (
        <span
          className="pointer-events-none absolute right-[7.5cqw] bottom-[6cqw] font-sans font-semibold"
          style={{ fontSize: "5.5cqw", color: sobreposto.sutil }}
        >
          1/{post.slides.length}
        </span>
      )}

      {/* Barra em cima = é hoje. Barra embaixo = já publicado. */}
      {hoje && (
        <span
          className={`pointer-events-none absolute inset-x-0 top-0 h-[1.8cqw] ${sobreposto.marca}`}
        />
      )}
      {publicado && (
        <span
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-[1.8cqw] ${sobreposto.marca}`}
        />
      )}
    </button>
  );
}
