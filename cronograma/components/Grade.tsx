"use client";

import { Fragment, useMemo, useState } from "react";
import type { Post } from "@/data/posts";
import { usePublicados } from "@/hooks/usePublicados";
import { useHoje } from "@/hooks/useHoje";
import {
  agruparPorMes,
  filtrar,
  type Filtros as EstadoFiltros,
} from "@/lib/cronograma";
import Detalhe from "./Detalhe";
import Filtros from "./Filtros";
import Ladrilho from "./Ladrilho";

export default function Grade({ posts }: { posts: Post[] }) {
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

      <div className="w-full max-w-[975px] pt-10 pb-20 md:px-10">
        {meses.length === 0 && (
          <p className="px-5 py-16 font-display md:px-0 text-[clamp(20px,2.6vw,32px)] font-bold text-green-700/70">
            Nenhum post com esse filtro.
          </p>
        )}

        {meses.map((mes) => (
          <Fragment key={mes.chave}>
            <h2 className="px-5 pt-10 pb-3 font-display text-[19px] font-bold tracking-[-0.02em] text-green-700/70 md:px-0">
              {mes.nome} {mes.ano}
            </h2>
            {/* Fundo escuro atrás da grade: sem ele os ladrilhos creme do pilar
                Simplicidade somem no creme da página. Os vãos de 2px viram
                fios escuros, que é como o feed do Instagram se lê. */}
            <div className="grid grid-cols-3 gap-[2px] bg-green-900 p-[2px]">
              {mes.posts.map((post) => (
                <Ladrilho
                  key={post.data}
                  post={post}
                  publicado={publicados.has(post.data)}
                  hoje={post.data === hoje}
                  onSelecionar={setAberto}
                />
              ))}
            </div>
          </Fragment>
        ))}
      </div>

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
