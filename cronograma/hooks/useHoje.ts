"use client";

import { useSyncExternalStore } from "react";
import { hojeISO } from "@/lib/cronograma";

/** Data de hoje no fuso do aparelho. Nunca muda enquanto a aba está viva. */
const naoMuda = () => () => {};
const noServidor = () => null;

/**
 * A data de hoje, `YYYY-MM-DD`, resolvida no fuso do aparelho.
 *
 * No servidor devolve `null`, e nenhum post fica destacado: renderizar em UTC
 * destacaria o post errado durante algumas horas do dia. O destaque aparece na
 * hidratação, já com o fuso certo.
 */
export function useHoje(): string | null {
  return useSyncExternalStore(naoMuda, hojeISO, noServidor);
}
