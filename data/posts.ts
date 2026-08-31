/**
 * Cronograma editorial — Simplifique Capital
 *
 * A copy destes posts está aprovada. Não reescreva o texto ao editar este
 * arquivo: acentuação e quebras de parágrafo (\n\n) fazem parte da legenda que
 * vai ser copiada e colada no Instagram.
 *
 * Para adicionar um post novo, veja o README.md.
 */

export const PILARES = ["Simplicidade", "Transparência", "Estratégia"] as const;
export const FORMATOS = ["Card", "Carrossel", "Reels"] as const;

export type Pilar = (typeof PILARES)[number];
export type Formato = (typeof FORMATOS)[number];

/** Campos comuns a todo post, independente do formato. */
interface PostBase {
  /** Data de publicação, ISO `YYYY-MM-DD`. Também serve de identificador. */
  data: string;
  pilar: Pilar;
  /** Texto que aparece na arte. É o que a grade de feed renderiza. */
  card: string;
  legenda: string;
  /** Observação de produção — só para mim, nunca vai para o Instagram. */
  obs?: string;
}

export interface PostCard extends PostBase {
  formato: "Card";
}

export interface PostCarrossel extends PostBase {
  formato: "Carrossel";
  /** Um item por slide, na ordem. O primeiro slide é a capa. */
  slides: string[];
}

export interface PostReels extends PostBase {
  formato: "Reels";
  /** Roteiro falado. Parágrafos separados por \n\n. */
  roteiro: string;
}

/**
 * União discriminada por `formato`: o TypeScript só deixa usar `slides` num
 * Carrossel e `roteiro` num Reels.
 */
export type Post = PostCard | PostCarrossel | PostReels;

export const posts: Post[] = [
  // ---------------------------------------------------------------------------
  // OUTUBRO 2026
  // ---------------------------------------------------------------------------
  {
    data: "2026-10-02",
    formato: "Card",
    pilar: "Estratégia",
    card: "Quanto você precisa ter guardado para parar de trabalhar? Existe um número, e ele é seu.",
    legenda:
      "Não é uma pergunta filosófica. É uma conta.\n\nEla precisa de três informações: quanto você gasta por mês hoje, em quantos anos você quer poder parar, e quanto você já tem guardado.\n\nCom isso dá para chegar em um valor concreto. E ter um número muda tudo: você para de guardar dinheiro no escuro e passa a saber se está perto ou longe.\n\nEu faço essa conta com meus clientes na primeira semana. Comente NÚMERO que eu explico como ela funciona no direct.",
    obs: "Palavra-chave NÚMERO configurada no ManyChat antes de publicar.",
  },
  {
    data: "2026-10-05",
    formato: "Carrossel",
    pilar: "Simplicidade",
    card: "A conta da aposentadoria, em quatro passos",
    slides: [
      "A conta da aposentadoria, em quatro passos.",
      "1. Quanto você quer ter por mês quando parar. Use o seu gasto de hoje como ponto de partida.",
      "2. Multiplique por doze. Esse é o valor de um ano de vida sem trabalhar.",
      "3. Multiplique por vinte e cinco. É uma regra prática, usada para estimar quanto você precisa ter acumulado.",
      "4. Desconte o que você já tem hoje. O que sobra é o seu alvo.",
      "É uma estimativa, não uma promessa. Mas é infinitamente melhor do que não ter alvo nenhum.",
    ],
    legenda:
      "Faça a conta agora, leva um minuto. Se o número assustar, tudo bem: assustar é melhor do que não saber.\n\nO que muda o resultado dessa conta não é acertar o investimento da moda. É o tempo e o quanto você consegue guardar de forma consistente.",
    obs: "Não citar taxa de retorno específica. Deixar claro que é regra prática.",
  },
  {
    data: "2026-10-07",
    formato: "Reels",
    pilar: "Estratégia",
    card: "Aposentadoria não é uma idade. É um número.",
    roteiro:
      "A gente cresceu ouvindo que aposentadoria é uma idade. Você chega nos 65 e para.\n\nNa prática, não é assim. Aposentadoria é um número: é o tanto de dinheiro que precisa estar guardado para o rendimento cobrir a sua vida.\n\nSe você chega nesse número aos 50, pode parar aos 50. Se não chega aos 70, não dá para parar aos 70. A idade é consequência.\n\nE a maior parte das pessoas nunca calculou esse número. Só está guardando e torcendo.",
    legenda: "Você já calculou o seu número?",
  },
  {
    data: "2026-10-09",
    formato: "Card",
    pilar: "Transparência",
    card: "Se você parasse de trabalhar hoje, seu dinheiro duraria quantos meses?",
    legenda:
      "Divida o que você tem guardado pelo seu gasto mensal. O resultado é em meses.\n\nEsse número não é a sua aposentadoria. Mas é o retrato mais honesto de onde você está hoje.\n\nA maioria das pessoas nunca fez essa divisão. É uma conta de dez segundos que costuma mudar a conversa.",
  },
  {
    data: "2026-10-12",
    formato: "Carrossel",
    pilar: "Simplicidade",
    card: "ETF é uma cesta pronta",
    slides: [
      "O que é um ETF, sem termo técnico.",
      "Imagine ir ao mercado comprar fruta. Você pode escolher item por item, comparando cada uma.",
      "Ou pode pegar uma cesta já montada, com várias frutas dentro, por um preço menor.",
      "O ETF é a cesta. Uma compra só, e você passa a ter um pedacinho de dezenas ou centenas de empresas.",
      "Você não precisa acertar qual empresa vai bem. Você tem um pouco de todas.",
      "E a taxa para carregar essa cesta costuma ser uma fração do que um fundo cobra.",
      "A cesta também oscila de preço. Não existe investimento sem risco. Existe risco espalhado ou risco concentrado.",
    ],
    legenda:
      "Sempre que eu explico ETF assim, alguém responde que é simples demais para ser verdade. É simples mesmo. A parte complicada do mercado quase sempre existe para justificar uma taxa.",
    obs: "Se der, gravar uma versão em Reels usando frutas de verdade em cima da mesa.",
  },
  {
    data: "2026-10-14",
    formato: "Carrossel",
    pilar: "Estratégia",
    card: "Três erros comuns no plano de aposentadoria",
    slides: [
      "Três erros que eu vejo com frequência no plano de aposentadoria.",
      "1. Deixar para começar quando sobrar dinheiro. Nunca sobra. O valor pequeno começando cedo vence o valor grande começando tarde.",
      "2. Contar com o INSS para manter o mesmo padrão de vida. Faça a conta do teto e compare com o seu gasto atual.",
      "3. Aceitar uma previdência privada sem olhar a taxa. Em trinta anos, a taxa decide boa parte do resultado.",
      "Nenhum desses erros é sobre escolher o investimento errado. Todos são sobre não ter feito a conta.",
    ],
    legenda:
      "Se você tem uma previdência privada, procure a taxa de administração no extrato e me conta nos comentários qual é. Muita gente descobre nesse momento.",
    obs: "Post com alto potencial de comentário. Responder um a um.",
  },
];
