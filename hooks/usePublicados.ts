"use client";

import { useCallback, useSyncExternalStore } from "react";

const CHAVE = "simplifique-cronograma:publicados";
const VAZIO: ReadonlySet<string> = new Set();

/**
 * Quais posts já foram publicados. Vive só no navegador — não há banco.
 *
 * É um `useSyncExternalStore` e não um `useState` + `useEffect` porque
 * localStorage é exatamente isso: um estado externo ao React. O servidor
 * renderiza com o conjunto vazio e o navegador assume na hidratação, sem
 * diferença de marcação. De brinde, duas abas abertas ficam em sincronia.
 */
let cache: ReadonlySet<string> | null = null;
const ouvintes = new Set<() => void>();

function ler(): ReadonlySet<string> {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return VAZIO;
    const valor: unknown = JSON.parse(bruto);
    // Se alguém mexeu na chave à mão, ignoramos em vez de quebrar a tela.
    if (!Array.isArray(valor)) return VAZIO;
    return new Set(valor.filter((i): i is string => typeof i === "string"));
  } catch {
    return VAZIO;
  }
}

function notificar() {
  for (const ouvinte of ouvintes) ouvinte();
}

function aoMudarNoutraAba(evento: StorageEvent) {
  if (evento.key === null || evento.key === CHAVE) {
    cache = null;
    notificar();
  }
}

function assinar(ouvinte: () => void) {
  if (ouvintes.size === 0) {
    window.addEventListener("storage", aoMudarNoutraAba);
  }
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
    if (ouvintes.size === 0) {
      window.removeEventListener("storage", aoMudarNoutraAba);
    }
  };
}

/** Precisa devolver sempre a mesma referência enquanto nada mudar. */
function noNavegador(): ReadonlySet<string> {
  if (cache === null) cache = ler();
  return cache;
}

function noServidor(): ReadonlySet<string> {
  return VAZIO;
}

export function usePublicados() {
  const publicados = useSyncExternalStore(assinar, noNavegador, noServidor);

  const alternar = useCallback((data: string) => {
    const proximo = new Set(noNavegador());
    if (proximo.has(data)) proximo.delete(data);
    else proximo.add(data);

    try {
      localStorage.setItem(CHAVE, JSON.stringify([...proximo]));
    } catch {
      // Modo privado ou armazenamento cheio: segue valendo nesta sessão.
    }
    cache = proximo;
    notificar();
  }, []);

  return { publicados, alternar };
}
