"use client";

import { FORMATOS, PILARES, type Formato, type Pilar } from "@/data/posts";
import type { Filtros as EstadoFiltros } from "@/lib/cronograma";

/** Filtro é texto clicável, não pílula: some quando não está em uso. */
function Linha<T extends string>({
  titulo,
  opcoes,
  ativo,
  onEscolher,
}: {
  titulo: string;
  opcoes: readonly T[];
  ativo: T | null;
  onEscolher: (valor: T | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
      <span className="font-sans text-[13px] text-green-700/70">{titulo}</span>
      {[null, ...opcoes].map((opcao) => {
        const selecionado = ativo === opcao;
        return (
          <button
            key={opcao ?? "todos"}
            type="button"
            onClick={() => onEscolher(opcao)}
            aria-pressed={selecionado}
            className={`font-sans text-[15px] underline-offset-[6px] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              selecionado
                ? "font-bold text-green-900 underline decoration-gold decoration-2"
                : "font-medium text-green-700/70 hover:text-green-900"
            }`}
          >
            {opcao ?? "todos"}
          </button>
        );
      })}
    </div>
  );
}

export default function Filtros({
  filtros,
  onMudar,
}: {
  filtros: EstadoFiltros;
  onMudar: (filtros: EstadoFiltros) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Linha<Pilar>
        titulo="pilar"
        opcoes={PILARES}
        ativo={filtros.pilar}
        onEscolher={(pilar) => onMudar({ ...filtros, pilar })}
      />
      <Linha<Formato>
        titulo="formato"
        opcoes={FORMATOS}
        ativo={filtros.formato}
        onEscolher={(formato) => onMudar({ ...filtros, formato })}
      />
    </div>
  );
}
