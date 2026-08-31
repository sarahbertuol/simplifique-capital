"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/data/posts";
import { usePublicados } from "@/hooks/usePublicados";
import { useHoje } from "@/hooks/useHoje";
import {
  agruparPorMes,
  diaDaSemana,
  diaDoMes,
  filtrar,
  primeiraFrase,
  type Filtros as EstadoFiltros,
} from "@/lib/cronograma";
import Detalhe from "./Detalhe";
import Filtros from "./Filtros";
import Progresso from "./Progresso";

/** Frase curta ganha corpo maior. É o que dá hierarquia variada à lista. */
function corpo(frase: string): string {
  if (frase.length <= 40) return "text-[clamp(21px,2.6vw,32px)]";
  if (frase.length <= 70) return "text-[clamp(19px,2.2vw,26px)]";
  return "text-[clamp(17px,1.9vw,22px)]";
}

export default function LinhaDoTempo({ posts }: { posts: Post[] }) {
  const { publicados, alternar } = usePublicados();
  const hoje = useHoje();
  const [filtros, setFiltros] = useState<EstadoFiltros>({
    pilar: null,
    formato: null,
  });
  const [aberto, setAberto] = useState<Post | null>(null);

  const meses = useMemo(
    () => agruparPorMes(filtrar(posts, filtros)),
    [posts, filtros],
  );

  return (
    <>
      <div className="border-b border-green-700/15 px-5 pt-7 pb-7 md:px-10">
        <Filtros filtros={filtros} onMudar={setFiltros} />
      </div>

      {meses.length === 0 && (
        <p className="px-5 py-16 font-display text-[clamp(20px,2.6vw,32px)] font-bold text-green-700/70 md:px-10">
          Nenhum post com esse filtro.
        </p>
      )}

      {meses.map((mes) => {
        const publicadosNoMes = mes.posts.filter((p) =>
          publicados.has(p.data),
        ).length;

        return (
          <section key={mes.chave} className="pt-12 md:pt-16">
            <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 px-5 pb-6 md:px-10">
              <h2 className="font-display text-[clamp(38px,7vw,76px)] leading-[0.9] font-black tracking-[-0.04em] text-green-900">
                {mes.nome}
                <span className="text-green-700/70"> {mes.ano}</span>
              </h2>
              <Progresso publicados={publicadosNoMes} total={mes.posts.length} />
            </header>

            <ul>
              {mes.posts.map((post) => {
                const eHoje = post.data === hoje;
                const passado = hoje !== null && post.data < hoje;
                const publicado = publicados.has(post.data);

                return (
                  <li key={post.data}>
                    <button
                      type="button"
                      onClick={() => setAberto(post)}
                      className={`flex w-full cursor-pointer items-start gap-5 border-t px-5 py-6 text-left focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-gold md:gap-8 md:px-10 ${
                        eHoje
                          ? "border-green-800 bg-green-800 text-cream"
                          : "border-green-700/15 text-green-900"
                      } ${passado && !eHoje ? "opacity-60" : ""}`}
                    >
                      <span className="w-12 shrink-0 md:w-16">
                        <span
                          className={`block font-sans text-[13px] ${eHoje ? "text-cream/60" : "text-green-700/70"}`}
                        >
                          {diaDaSemana(post.data)}
                        </span>
                        <span className="block font-display text-[clamp(24px,3vw,32px)] leading-none font-black tracking-[-0.03em] tabular-nums">
                          {diaDoMes(post.data)}
                        </span>
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-display leading-[1.15] font-extrabold tracking-[-0.02em] text-pretty ${corpo(primeiraFrase(post.card))}`}
                        >
                          {primeiraFrase(post.card)}
                        </span>
                        <span
                          className={`mt-2.5 block font-sans text-[13px] ${eHoje ? "text-cream/65" : "text-green-700/70"}`}
                        >
                          {post.formato} &middot; {post.pilar}
                          {publicado && (
                            <span
                              className={
                                eHoje ? "text-gold" : "text-green-900 font-semibold"
                              }
                            >
                              {" "}
                              &middot; publicado
                            </span>
                          )}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {aberto && (
        <Detalhe
          post={aberto}
          publicado={publicados.has(aberto.data)}
          onAlternar={alternar}
          onFechar={() => setAberto(null)}
        />
      )}
    </>
  );
}
