import type { Pilar, Post } from "@/data/posts";

/**
 * Desenho da arte final de cada peça, em canvas.
 *
 * É a única fonte da verdade do visual: a grade, o preview no detalhe e o
 * arquivo que você baixa saem todos daqui, na mesma função. Se fossem dois
 * desenhos — um em HTML para a tela, outro para o download — eles divergiriam
 * na primeira mudança.
 *
 * Tudo é proporcional à largura pedida, então a mesma função serve para um
 * ladrilho de 130px na grade do celular e para o PNG de 1080px.
 */

/** Proporção 4:5, o retrato do Instagram. */
export const PROPORCAO = 5 / 4;

/** Largura da arte exportada. 1080x1350 é o retrato nativo do Instagram. */
export const LARGURA_EXPORT = 1080;

interface Paleta {
  fundo: string;
  texto: string;
  /** Cor do texto do logotipo. */
  logo: string;
  /** Cor da barra alta do logotipo e da palavra "capital". */
  acento: string;
  /** Tons das duas barras baixas do logotipo. */
  barras: [string, string];
}

const CREAM = "#f7f3ea";
const GREEN_900 = "#0a2420";
const GREEN_800 = "#0f2e28";
const GOLD = "#c9982e";

export const PALETA: Record<Pilar, Paleta> = {
  Simplicidade: {
    fundo: CREAM,
    texto: GREEN_900,
    logo: GREEN_900,
    acento: GOLD,
    barras: ["rgba(10,36,32,0.35)", "rgba(10,36,32,0.65)"],
  },
  Transparência: {
    fundo: GOLD,
    texto: GREEN_900,
    logo: GREEN_900,
    // Sobre o dourado, o acento dourado sumiria: o logotipo vira monocromático.
    acento: GREEN_900,
    barras: ["rgba(10,36,32,0.35)", "rgba(10,36,32,0.65)"],
  },
  Estratégia: {
    fundo: GREEN_800,
    texto: CREAM,
    logo: CREAM,
    acento: GOLD,
    barras: ["rgba(255,255,255,0.45)", "rgba(255,255,255,0.75)"],
  },
  Abertura: {
    fundo: GREEN_900,
    texto: GOLD,
    logo: CREAM,
    acento: GOLD,
    barras: ["rgba(255,255,255,0.45)", "rgba(255,255,255,0.75)"],
  },
  Apresentação: {
    fundo: GREEN_900,
    texto: CREAM,
    logo: CREAM,
    acento: GOLD,
    barras: ["rgba(255,255,255,0.45)", "rgba(255,255,255,0.75)"],
  },
};

/**
 * Uma peça é uma imagem: ou o card único de um post, ou um slide específico de
 * um carrossel. É a unidade que se baixa.
 */
export interface Peca {
  post: Post;
  /** `null` para card único e capa de Reels; índice do slide no carrossel. */
  slide: number | null;
  texto: string;
  /** O logotipo entra nesta peça. */
  comLogo: boolean;
}

/** Todas as peças de um post, na ordem em que vão ao ar. */
export function pecasDoPost(post: Post): Peca[] {
  if (post.formato === "Carrossel") {
    const ultimo = post.slides.length - 1;
    return post.slides.map((texto, i) => ({
      post,
      slide: i,
      texto,
      // Só o último slide leva o logotipo — é o fecho do carrossel.
      comLogo: i === ultimo,
    }));
  }
  // Card e Reels são peça única, e sempre levam o logotipo.
  return [{ post, slide: null, texto: post.card, comLogo: true }];
}

export function nomeDoArquivo(peca: Peca): string {
  const formato = peca.post.formato.toLowerCase();
  const sufixo =
    peca.slide === null
      ? ""
      : `-slide-${String(peca.slide + 1).padStart(2, "0")}`;
  return `${peca.post.data}-${formato}${sufixo}.png`;
}

/** Quebra o texto em linhas que cabem na largura, medindo no próprio contexto. */
function quebrarLinhas(
  ctx: CanvasRenderingContext2D,
  texto: string,
  larguraMax: number,
): string[] {
  const linhas: string[] = [];
  for (const paragrafo of texto.split("\n")) {
    let atual = "";
    for (const palavra of paragrafo.split(/\s+/).filter(Boolean)) {
      const tentativa = atual ? `${atual} ${palavra}` : palavra;
      if (ctx.measureText(tentativa).width <= larguraMax || !atual) {
        atual = tentativa;
      } else {
        linhas.push(atual);
        atual = palavra;
      }
    }
    linhas.push(atual);
  }
  return linhas;
}

const ENTRELINHA = 1.08;

/**
 * Corpo alvo, como fração da largura, por comprimento do texto.
 *
 * Esta escala é a que já estava na grade e foi aprovada — não mexa nela para
 * "aproveitar melhor a caixa". Texto curto respira de propósito.
 */
function corpoAlvo(texto: string): number {
  const n = texto.length;
  if (n <= 28) return 0.18;
  if (n <= 48) return 0.145;
  if (n <= 75) return 0.12;
  return 0.1;
}

/**
 * O corpo alvo, encolhido só o necessário para caber.
 *
 * Nunca cresce acima do alvo. O encolhimento existe porque o logotipo passou a
 * ocupar a base da arte, e slide longo de carrossel pode não caber mais.
 */
function ajustarCorpo(
  ctx: CanvasRenderingContext2D,
  texto: string,
  familia: string,
  larguraCaixa: number,
  alturaCaixa: number,
  alvo: number,
): { corpo: number; linhas: string[] } {
  let corpo = alvo;
  let linhas: string[] = [];

  // No máximo 24 reduções de 4%: cobre até ~60% do alvo, mais do que qualquer
  // texto do cronograma precisa.
  for (let i = 0; i < 24; i++) {
    ctx.font = `800 ${corpo}px ${familia}`;
    linhas = quebrarLinhas(ctx, texto, larguraCaixa);

    const cabeAltura = linhas.length * corpo * ENTRELINHA <= alturaCaixa;
    // Uma palavra sozinha pode ser mais larga que a caixa — "aposentadoria,"
    // era o caso — e a quebra de linha não tem como resolver isso. Sem esta
    // conferência de largura ela vazava pela margem direita da arte.
    const cabeLargura = linhas.every(
      (linha) => ctx.measureText(linha).width <= larguraCaixa,
    );

    if (cabeAltura && cabeLargura) break;
    corpo *= 0.96;
  }
  return { corpo, linhas };
}

/** Desenha o logotipo, com a origem no canto inferior esquerdo do bloco. */
function desenharLogo(
  ctx: CanvasRenderingContext2D,
  paleta: Paleta,
  x: number,
  baseY: number,
  largura: number,
  familia: string,
): void {
  const corpo = largura * 0.038;
  const larguraBarra = corpo * 0.26;
  const vao = corpo * 0.16;
  const alturas = [corpo * 0.48, corpo * 0.75, corpo];

  let bx = x;
  const cores = [paleta.barras[0], paleta.barras[1], paleta.acento];
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = cores[i];
    ctx.fillRect(bx, baseY - alturas[i], larguraBarra, alturas[i]);
    bx += larguraBarra + vao;
  }

  const textoX = bx + corpo * 0.3;
  ctx.font = `700 ${corpo}px ${familia}`;
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = paleta.logo;
  ctx.fillText("simplifique ", textoX, baseY);
  const deslocamento = ctx.measureText("simplifique ").width;
  ctx.fillStyle = paleta.acento;
  ctx.fillText("capital", textoX + deslocamento, baseY);
}

/** Onde o bloco de texto se ancora, por formato. */
function ancora(post: Post): "topo" | "centro" {
  return post.formato === "Carrossel" ? "topo" : "centro";
}

/**
 * Desenha a peça inteira. `largura` em pixels de dispositivo; a altura sai da
 * proporção 4:5.
 */
export function desenharPeca(
  ctx: CanvasRenderingContext2D,
  peca: Peca,
  largura: number,
  familia: string,
): void {
  const altura = largura * PROPORCAO;
  const paleta = PALETA[peca.post.pilar];

  ctx.clearRect(0, 0, largura, altura);
  ctx.fillStyle = paleta.fundo;
  ctx.fillRect(0, 0, largura, altura);

  const margem = largura * 0.075;
  const alturaLogo = peca.comLogo ? largura * 0.038 : 0;
  const vaoLogo = peca.comLogo ? largura * 0.055 : 0;

  const caixaL = largura - margem * 2;
  const caixaA = altura - margem * 2 - alturaLogo - vaoLogo;

  const { corpo, linhas } = ajustarCorpo(
    ctx,
    peca.texto,
    familia,
    caixaL,
    caixaA,
    largura * corpoAlvo(peca.texto),
  );

  ctx.font = `800 ${corpo}px ${familia}`;
  ctx.fillStyle = paleta.texto;
  ctx.textBaseline = "top";

  const alturaTexto = linhas.length * corpo * ENTRELINHA;
  const topo =
    ancora(peca.post) === "topo"
      ? margem
      : margem + (caixaA - alturaTexto) / 2;

  linhas.forEach((linha, i) => {
    ctx.fillText(linha, margem, topo + i * corpo * ENTRELINHA);
  });

  if (peca.comLogo) {
    desenharLogo(ctx, paleta, margem, altura - margem, largura, familia);
  }
}
