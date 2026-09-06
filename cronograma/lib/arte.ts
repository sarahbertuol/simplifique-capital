import type { Pilar, Post } from "@/data/posts";

/**
 * Desenho da arte final de cada peça, em canvas.
 *
 * É a única fonte da verdade do visual: a grade, o preview no detalhe e o
 * arquivo que você baixa saem todos daqui, na mesma função. Se fossem dois
 * desenhos, um em HTML para a tela e outro para o download, eles divergiriam
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
  /** Cor da palavra destacada no primeiro card. */
  destaque: string;
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
const GOLD_DARK = "#a97c1f";
const WHITE = "#ffffff";

export const PALETA: Record<Pilar, Paleta> = {
  Simplicidade: {
    fundo: CREAM,
    texto: GREEN_900,
    // O dourado claro não tem contraste sobre o creme; o escuro tem.
    destaque: GOLD_DARK,
    logo: GREEN_900,
    acento: GOLD,
    barras: ["rgba(10,36,32,0.35)", "rgba(10,36,32,0.65)"],
  },
  Transparência: {
    fundo: GOLD,
    texto: GREEN_900,
    // Sobre o dourado, o destaque dourado sumiria.
    destaque: CREAM,
    logo: GREEN_900,
    // Sobre o dourado, o acento dourado sumiria: o logotipo vira monocromático.
    acento: GREEN_900,
    barras: ["rgba(10,36,32,0.35)", "rgba(10,36,32,0.65)"],
  },
  Estratégia: {
    fundo: GREEN_800,
    texto: CREAM,
    destaque: GOLD,
    logo: WHITE,
    acento: GOLD,
    barras: ["rgba(255,255,255,0.45)", "rgba(255,255,255,0.75)"],
  },
  Abertura: {
    fundo: GREEN_900,
    texto: GOLD,
    destaque: CREAM,
    logo: WHITE,
    acento: GOLD,
    barras: ["rgba(255,255,255,0.45)", "rgba(255,255,255,0.75)"],
  },
  Apresentação: {
    fundo: GREEN_900,
    texto: CREAM,
    destaque: GOLD,
    logo: WHITE,
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
  /** Trecho a destacar em outra cor. Só o primeiro card de cada post tem. */
  destaque?: string;
  /** Peça sem texto: só o logotipo, grande e centralizado. */
  soLogo: boolean;
  /**
   * O logotipo sai do rodapé, sobe colado ao texto, centralizado na largura e
   * maior que o das outras peças. É o fecho de um carrossel.
   */
  logoCentral: boolean;
  /** Linha secundária do slide de fecho, menor e esmaecida. */
  subtexto?: string;
}

/** Todas as peças de um post, na ordem em que vão ao ar. */
export function pecasDoPost(post: Post): Peca[] {
  if (post.formato === "Carrossel") {
    return post.slides.map((texto, i) => ({
      post,
      slide: i,
      texto,
      // A capa usa `destaque`; os demais slides só destacam quando a copy
      // pedir, por `destaqueExtra`. Destaque em todo slide deixa de destacar.
      destaque: i === 0 ? post.destaque : post.destaqueExtra?.[i],
      soLogo: false,
      // `logoDestaque` vem em base 1, como o slide é contado no cronograma.
      logoCentral: post.logoDestaque === i + 1,
      subtexto:
        post.logoDestaque === i + 1 ? post.subtextoFecho : undefined,
    }));
  }
  return [
    {
      post,
      slide: null,
      texto: post.card,
      destaque: post.destaque,
      soLogo: post.arte === "logo",
      logoCentral: false,
    },
  ];
}

export function nomeDoArquivo(peca: Peca): string {
  const formato = peca.post.formato.toLowerCase();
  const sufixo =
    peca.slide === null
      ? ""
      : `-slide-${String(peca.slide + 1).padStart(2, "0")}`;
  return `${peca.post.data}-${formato}${sufixo}.png`;
}

interface Segmento {
  texto: string;
  destacada: boolean;
}

interface Palavra {
  /** A palavra inteira, usada para medir e para avançar o cursor. */
  texto: string;
  /** A palavra fatiada nos limites do destaque. Quase sempre uma fatia só. */
  segmentos: Segmento[];
}

type Linha = Palavra[];

/**
 * Separa o texto em parágrafos de palavras, marcando as que caem dentro do
 * trecho destacado.
 *
 * A marcação é por trecho, e não por palavra inteira: destacar "má ideia" não
 * pode levar junto o ponto final que vem colado. Como o corte é por posição no
 * texto, um destaque de duas palavras sobrevive à quebra de linha no meio dele.
 */
/** Corta a palavra nos limites do destaque, devolvendo de uma a três fatias. */
function fatiar(
  palavra: string,
  a: number,
  b: number,
  inicio: number,
  fim: number,
): Segmento[] {
  if (inicio < 0 || a >= fim || b <= inicio) {
    return [{ texto: palavra, destacada: false }];
  }
  const de = Math.max(inicio - a, 0);
  const ate = Math.min(fim - a, palavra.length);

  const partes: Segmento[] = [];
  if (de > 0) partes.push({ texto: palavra.slice(0, de), destacada: false });
  partes.push({ texto: palavra.slice(de, ate), destacada: true });
  if (ate < palavra.length) {
    partes.push({ texto: palavra.slice(ate), destacada: false });
  }
  return partes;
}

function tokenizar(texto: string, destaque?: string): Palavra[][] {
  const inicio = destaque ? texto.indexOf(destaque) : -1;
  const fim = inicio >= 0 ? inicio + destaque!.length : -1;

  const paragrafos: Palavra[][] = [];
  let deslocamento = 0;

  for (const paragrafo of texto.split("\n")) {
    const palavras: Palavra[] = [];
    for (const m of paragrafo.matchAll(/\S+/g)) {
      const a = deslocamento + (m.index ?? 0);
      const b = a + m[0].length;
      palavras.push({ texto: m[0], segmentos: fatiar(m[0], a, b, inicio, fim) });
    }
    paragrafos.push(palavras);
    deslocamento += paragrafo.length + 1; // + 1 pelo \n consumido
  }
  return paragrafos;
}

/**
 * Largura da linha somando palavra a palavra.
 *
 * Tem que ser a mesma conta usada no desenho: medir a linha inteira de uma vez
 * dá um valor ligeiramente diferente, e a diferença apareceria como texto
 * passando da margem.
 */
function larguraDaLinha(ctx: CanvasRenderingContext2D, linha: Linha): number {
  if (linha.length === 0) return 0;
  const espaco = ctx.measureText(" ").width;
  let total = 0;
  for (const palavra of linha) total += ctx.measureText(palavra.texto).width;
  return total + espaco * (linha.length - 1);
}

function quebrarLinhas(
  ctx: CanvasRenderingContext2D,
  paragrafos: Palavra[][],
  larguraMax: number,
): Linha[] {
  const linhas: Linha[] = [];
  for (const palavras of paragrafos) {
    if (palavras.length === 0) {
      linhas.push([]); // linha em branco entre parágrafos
      continue;
    }
    let atual: Linha = [];
    for (const palavra of palavras) {
      const tentativa = [...atual, palavra];
      if (larguraDaLinha(ctx, tentativa) <= larguraMax || atual.length === 0) {
        atual = tentativa;
      } else {
        linhas.push(atual);
        atual = [palavra];
      }
    }
    linhas.push(atual);
  }
  return linhas;
}

/**
 * Entrelinha padrão. Um post pode pedir outra pelo campo `entrelinha`, que é
 * como os posts já fechados ficam congelados no valor com que foram aprovados.
 */
const ENTRELINHA_PADRAO = 1.18;

/**
 * Corpo alvo, como fração da largura, por comprimento do texto.
 *
 * Esta escala é a que já estava na grade e foi aprovada. Não mexa nela para
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
 * Teto de linhas por peça.
 *
 * É isto que controla o tamanho na prática, mais do que o corpo alvo. Texto
 * curto já cabe em duas ou três linhas no corpo máximo e passa reto; texto
 * longo é o que encolhe, porque oito linhas empilhadas não se leem num feed.
 *
 * Cada parágrafo extra ganha uma linha de folga. Sem isso, um texto de dois
 * parágrafos é medido como se fosse corrido, mas a quebra de parágrafo obriga
 * uma linha nova, e ele acaba com corpo bem menor do que um texto corrido do
 * mesmo tamanho. Era o que fazia o slide dos "queremos acreditar" sair a 30px
 * ao lado de um vizinho de 39px.
 */
function maxLinhas(texto: string): number {
  const base = texto.length <= 90 ? 3 : 4;
  const paragrafos = texto.split("\n").filter((t) => t.trim() !== "").length;
  return base + Math.max(paragrafos - 1, 0);
}

/**
 * O corpo alvo, encolhido só o necessário para caber na caixa e no teto de
 * linhas. Nunca cresce acima do alvo.
 */
function ajustarCorpo(
  ctx: CanvasRenderingContext2D,
  paragrafos: Palavra[][],
  texto: string,
  familia: string,
  larguraCaixa: number,
  alturaCaixa: number,
  alvo: number,
  entrelinha: number,
): { corpo: number; linhas: Linha[] } {
  let corpo = alvo;
  let linhas: Linha[] = [];

  const teto = maxLinhas(texto);

  // 40 reduções de 4% chegam a ~20% do alvo: sobra para o texto mais longo do
  // cronograma caber no teto de linhas.
  for (let i = 0; i < 40; i++) {
    ctx.font = `800 ${corpo}px ${familia}`;
    linhas = quebrarLinhas(ctx, paragrafos, larguraCaixa);

    const cabeAltura = linhas.length * corpo * entrelinha <= alturaCaixa;
    // A linha em branco entre parágrafos ocupa altura, mas não é linha de
    // leitura: contá-la no teto encolhia o texto sem motivo.
    const comTexto = linhas.filter((l) => l.length > 0).length;
    // Uma palavra sozinha pode ser mais larga que a caixa. "aposentadoria,"
    // era o caso, e a quebra de linha não tem como resolver isso. Sem esta
    // conferência de largura ela vazava pela margem direita da arte.
    const cabeLargura = linhas.every(
      (linha) => larguraDaLinha(ctx, linha) <= larguraCaixa,
    );

    if (cabeAltura && cabeLargura && comTexto <= teto) break;
    corpo *= 0.96;
  }
  return { corpo, linhas };
}

/** Desenha o logotipo, com a origem no canto inferior esquerdo do bloco. */
/**
 * Proporções do logotipo, relativas ao corpo do texto. São as do
 * `components/Logo.tsx` do site, tamanho "footer": texto 16px, barras de 5px de
 * largura com 3px de vão e alturas 7/12/16, 10px até a palavra e tracking de
 * -0,3px. Mantidas iguais para o logotipo daqui não divergir do do site.
 */
const LOGO = {
  larguraBarra: 5 / 16,
  vaoBarra: 3 / 16,
  alturas: [7 / 16, 12 / 16, 16 / 16],
  vaoTexto: 10 / 16,
  tracking: -0.3 / 16,
};

/** Prepara o contexto para medir e desenhar o logotipo no corpo dado. */
function fonteDoLogo(
  ctx: CanvasRenderingContext2D,
  corpo: number,
  familia: string,
): void {
  ctx.font = `700 ${corpo}px ${familia}`;
  ctx.letterSpacing = `${LOGO.tracking * corpo}px`;
}

function larguraDoLogo(
  ctx: CanvasRenderingContext2D,
  corpo: number,
  familia: string,
): number {
  fonteDoLogo(ctx, corpo, familia);
  const barras =
    3 * LOGO.larguraBarra * corpo + 2 * LOGO.vaoBarra * corpo + LOGO.vaoTexto * corpo;
  return (
    barras +
    ctx.measureText("simplifique ").width +
    ctx.measureText("capital").width
  );
}

/** Corpo do logotipo que faz o conjunto ocupar `alvo` de largura. */
function corpoParaLargura(
  ctx: CanvasRenderingContext2D,
  alvo: number,
  familia: string,
): number {
  let baixo = 4;
  let alto = alvo;
  for (let i = 0; i < 40; i++) {
    const meio = (baixo + alto) / 2;
    if (larguraDoLogo(ctx, meio, familia) <= alvo) baixo = meio;
    else alto = meio;
  }
  return baixo;
}

/** Desenha o logotipo com a base do conjunto em `baseY` e começando em `x`. */
function desenharLogo(
  ctx: CanvasRenderingContext2D,
  paleta: Paleta,
  x: number,
  baseY: number,
  corpo: number,
  familia: string,
): void {
  const larguraBarra = LOGO.larguraBarra * corpo;
  const vao = LOGO.vaoBarra * corpo;

  let bx = x;
  const cores = [paleta.barras[0], paleta.barras[1], paleta.acento];
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = cores[i];
    const h = LOGO.alturas[i] * corpo;
    ctx.fillRect(bx, baseY - h, larguraBarra, h);
    bx += larguraBarra + vao;
  }

  const textoX = bx - vao + LOGO.vaoTexto * corpo;
  fonteDoLogo(ctx, corpo, familia);
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = paleta.logo;
  ctx.fillText("simplifique ", textoX, baseY);
  const deslocamento = ctx.measureText("simplifique ").width;
  ctx.fillStyle = paleta.acento;
  ctx.fillText("capital", textoX + deslocamento, baseY);

  // O espacejamento fica no contexto e contaminaria o texto da próxima peça.
  ctx.letterSpacing = "0px";
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

  if (peca.soLogo) {
    // Logotipo ocupando 84% da largura, centralizado nos dois eixos.
    const corpo = corpoParaLargura(ctx, largura * 0.84, familia);
    const x = (largura - larguraDoLogo(ctx, corpo, familia)) / 2;
    desenharLogo(ctx, paleta, x, altura / 2 + corpo / 2, corpo, familia);
    return;
  }

  // O logotipo entra em toda peça, então o espaço dele é sempre reservado.
  // No slide de fecho ele é maior e sobe para junto do texto, o que muda tanto
  // o quanto ele ocupa quanto onde é desenhado.
  const alturaLogo = peca.logoCentral
    ? corpoParaLargura(ctx, largura * 0.6, familia)
    : largura * 0.038;
  const vaoLogo = peca.logoCentral ? largura * 0.08 : largura * 0.055;

  // O subtexto de fecho tem corpo fixo, e não derivado do texto principal: se
  // dependesse dele a conta viraria circular, porque o corpo do texto só é
  // conhecido depois de saber quanta altura sobrou.
  const corpoSub = largura * 0.04;
  const alturaSub = peca.subtexto ? corpoSub * 1.2 : 0;
  const vaoSub = peca.subtexto ? largura * 0.035 : 0;

  const caixaL = largura - margem * 2;
  const caixaA =
    altura - margem * 2 - alturaLogo - vaoLogo - alturaSub - vaoSub;

  const paragrafos = tokenizar(peca.texto, peca.destaque);
  const entrelinha = peca.post.entrelinha ?? ENTRELINHA_PADRAO;

  const { corpo, linhas } = ajustarCorpo(
    ctx,
    paragrafos,
    peca.texto,
    familia,
    caixaL,
    caixaA,
    largura * corpoAlvo(peca.texto),
    entrelinha,
  );

  ctx.font = `800 ${corpo}px ${familia}`;
  ctx.textBaseline = "top";

  // Sempre centralizado na altura e alinhado à esquerda. No slide de fecho o
  // que se centraliza é o conjunto texto + logotipo, para que os dois subam
  // juntos e o logo fique colado ao texto em vez de no rodapé.
  const alturaTexto = linhas.length * corpo * entrelinha;
  const disponivel = altura - margem * 2;
  const alturaGrupo = peca.logoCentral
    ? alturaTexto + vaoSub + alturaSub + vaoLogo + alturaLogo
    : alturaTexto;
  const topo = peca.logoCentral
    ? margem + (disponivel - alturaGrupo) / 2
    : margem + (caixaA - alturaTexto) / 2;
  const espaco = ctx.measureText(" ").width;

  linhas.forEach((linha, i) => {
    const y = topo + i * corpo * entrelinha;
    // O slide de fecho centraliza o texto; os demais ficam alinhados à esquerda.
    let x = peca.logoCentral
      ? margem + (caixaL - larguraDaLinha(ctx, linha)) / 2
      : margem;
    for (const palavra of linha) {
      let cursor = x;
      for (const seg of palavra.segmentos) {
        ctx.fillStyle = seg.destacada ? paleta.destaque : paleta.texto;
        ctx.fillText(seg.texto, cursor, y);
        cursor += ctx.measureText(seg.texto).width;
      }
      // Avança pela largura da palavra inteira, e não pela soma das fatias:
      // as duas diferem por fração de pixel e o erro se acumularia na linha.
      x += ctx.measureText(palavra.texto).width + espaco;
    }
  });

  if (peca.logoCentral) {
    if (peca.subtexto) {
      ctx.font = `600 ${corpoSub}px ${familia}`;
      ctx.textBaseline = "top";
      ctx.fillStyle = paleta.texto;
      ctx.globalAlpha = 0.55;
      const larguraSub = ctx.measureText(peca.subtexto).width;
      ctx.fillText(
        peca.subtexto,
        margem + (caixaL - larguraSub) / 2,
        topo + alturaTexto + vaoSub,
      );
      ctx.globalAlpha = 1;
    }

    const larguraLogo = larguraDoLogo(ctx, alturaLogo, familia);
    desenharLogo(
      ctx,
      paleta,
      (largura - larguraLogo) / 2,
      topo + alturaTexto + vaoSub + alturaSub + vaoLogo + alturaLogo,
      alturaLogo,
      familia,
    );
  } else {
    desenharLogo(ctx, paleta, margem, altura - margem, alturaLogo, familia);
  }
}
