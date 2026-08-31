"use client";

import { useEffect, useRef } from "react";
import type { Post } from "@/data/posts";
import { diaDoMes, diaDaSemana, nomeDoMes } from "@/lib/cronograma";
import BotaoCopiar from "./BotaoCopiar";

export default function Detalhe({
  post,
  publicado,
  onAlternar,
  onFechar,
}: {
  post: Post;
  publicado: boolean;
  onAlternar: (data: string) => void;
  onFechar: () => void;
}) {
  const painel = useRef<HTMLDivElement>(null);
  const anterior = useRef<Element | null>(null);

  useEffect(() => {
    anterior.current = document.activeElement;
    painel.current?.focus();

    const travado = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") onFechar();
    }
    document.addEventListener("keydown", aoTeclar);

    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = travado;
      // Devolve o foco para o item da lista que abriu o painel.
      if (anterior.current instanceof HTMLElement) anterior.current.focus();
    };
  }, [onFechar]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Fechar detalhe"
        onClick={onFechar}
        className="absolute inset-0 bg-green-900/60"
      />

      <div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detalhe-titulo"
        tabIndex={-1}
        className="relative flex h-full w-full flex-col overflow-y-auto bg-cream focus-visible:outline-none md:max-w-[560px] md:border-l-4 md:border-green-800"
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 md:px-10">
          <div className="font-sans text-[13px] text-green-700/70">
            {diaDaSemana(post.data)} {diaDoMes(post.data)} de{" "}
            {nomeDoMes(post.data)} &middot; {post.formato} &middot; {post.pilar}
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="-mt-1 shrink-0 rounded-lg px-2 py-1 font-sans text-[15px] font-semibold text-green-700 underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            fechar
          </button>
        </div>

        <h2
          id="detalhe-titulo"
          className="px-6 pt-5 font-display text-[clamp(26px,3.4vw,38px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-green-900 md:px-10"
        >
          {post.card}
        </h2>

        {post.formato === "Carrossel" && (
          <ol className="mt-9 flex flex-col">
            {post.slides.map((slide, i) => (
              <li
                key={i}
                className="flex gap-4 border-t border-green-700/15 px-6 py-5 md:px-10"
              >
                {/* Índice do slide em corpo pequeno de propósito: várias
                    legendas já trazem a própria numeração ("1.", "2.") dentro
                    do texto aprovado, e dois números do mesmo peso brigavam. */}
                <span className="mt-[2px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[3px] bg-gold font-sans text-[12px] leading-none font-bold text-green-900 tabular-nums">
                  {i + 1}
                </span>
                <p className="font-sans text-[16px] leading-[1.6] text-green-700">
                  {slide}
                </p>
              </li>
            ))}
          </ol>
        )}

        {post.formato === "Reels" && (
          <div className="mt-9 border-t border-green-700/15 px-6 pt-6 md:px-10">
            <div className="flex items-baseline gap-3">
              <h3 className="font-display text-[19px] font-bold text-green-900">
                Roteiro
              </h3>
              {post.duracao && (
                <span className="font-sans text-[13px] text-green-700/70">
                  {post.duracao}
                </span>
              )}
            </div>
            <p className="mt-3 font-sans text-[15px] leading-[1.7] whitespace-pre-line text-green-700">
              {post.roteiro}
            </p>
          </div>
        )}

        <div className="mt-9 bg-tan px-6 py-7 md:px-10">
          <h3 className="font-display text-[19px] font-bold text-green-900">
            Legenda
          </h3>
          <p className="mt-3 font-sans text-[15px] leading-[1.7] whitespace-pre-line text-green-700">
            {post.legenda}
          </p>
        </div>

        {post.obs && (
          <div className="mx-6 mt-7 border-l-4 border-gold pl-5 md:mx-10">
            <h3 className="font-sans text-[13px] font-bold text-green-900">
              Produção
            </h3>
            <p className="mt-1.5 font-sans text-[15px] leading-[1.6] text-green-700">
              {post.obs}
            </p>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-3 px-6 pt-10 pb-8 md:px-10">
          <BotaoCopiar texto={post.legenda} primario>
            Copiar legenda
          </BotaoCopiar>
          {post.formato === "Carrossel" && (
            <BotaoCopiar
              texto={post.slides
                .map((slide, i) => `${i + 1}. ${slide}`)
                .join("\n\n")}
            >
              Copiar slides
            </BotaoCopiar>
          )}
          <button
            type="button"
            onClick={() => onAlternar(post.data)}
            aria-pressed={publicado}
            className={`rounded-lg px-5 py-3 font-sans text-[15px] font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none ${
              publicado
                ? "bg-gold text-green-900"
                : "border border-green-700 text-green-700"
            }`}
          >
            {publicado ? "Publicado" : "Marcar como publicado"}
          </button>
        </div>
      </div>
    </div>
  );
}
