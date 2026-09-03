import { posts, type Formato, type Pilar, type Post } from "@/data/posts";

/**
 * Converte `YYYY-MM-DD` num Date no fuso local.
 *
 * `new Date("2026-10-02")` seria interpretado como meia-noite UTC e, num fuso
 * atrás de Greenwich (o nosso), voltaria dia 01. Por isso montamos por partes.
 */
export function parseData(iso: string): Date {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

const DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"] as const;
const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
] as const;

export function diaDaSemana(iso: string): string {
  return DIAS[parseData(iso).getDay()];
}

export function diaDoMes(iso: string): string {
  return String(parseData(iso).getDate()).padStart(2, "0");
}

export function nomeDoMes(iso: string): string {
  return MESES[parseData(iso).getMonth()];
}

/** Chave `AAAA-MM`, usada para agrupar e para a barra de progresso. */
export function chaveDoMes(iso: string): string {
  return iso.slice(0, 7);
}

export function hojeISO(): string {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${agora.getFullYear()}-${mes}-${dia}`;
}

/**
 * Primeira frase do card, para a linha do tempo. Corta no primeiro ponto final,
 * de interrogação ou exclamação, mas só se sobrar frase depois dele, senão o
 * card inteiro já é uma frase só e volta inteiro.
 */
export function primeiraFrase(card: string): string {
  const fim = card.search(/[.?!]\s/);
  return fim === -1 ? card : card.slice(0, fim + 1);
}

export interface Mes {
  chave: string;
  nome: string;
  ano: number;
  posts: Post[];
}

/** Posts em ordem cronológica, agrupados por mês. */
export function agruparPorMes(lista: Post[]): Mes[] {
  const ordenados = [...lista].sort((a, b) => a.data.localeCompare(b.data));
  const mapa = new Map<string, Post[]>();

  for (const post of ordenados) {
    const chave = chaveDoMes(post.data);
    const grupo = mapa.get(chave);
    if (grupo) grupo.push(post);
    else mapa.set(chave, [post]);
  }

  return [...mapa].map(([chave, posts]) => ({
    chave,
    nome: nomeDoMes(posts[0].data),
    ano: parseData(posts[0].data).getFullYear(),
    posts,
  }));
}

export interface Filtros {
  pilar: Pilar | null;
  formato: Formato | null;
}

export function filtrar(lista: Post[], { pilar, formato }: Filtros): Post[] {
  return lista.filter(
    (post) =>
      (pilar === null || post.pilar === pilar) &&
      (formato === null || post.formato === formato),
  );
}

/** Todos os posts em ordem cronológica. */
export const cronograma: Post[] = [...posts].sort((a, b) =>
  a.data.localeCompare(b.data),
);
