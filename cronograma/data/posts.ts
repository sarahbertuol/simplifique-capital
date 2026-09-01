/**
 * Cronograma editorial — Simplifique Capital
 *
 * A copy destes posts está aprovada. Não reescreva o texto ao editar este
 * arquivo: acentuação e quebras de parágrafo (\n\n) fazem parte da legenda que
 * vai ser copiada e colada no Instagram.
 *
 * Para adicionar um post novo, veja o README.md.
 */

/**
 * Os três pilares editoriais, mais duas categorias que existem de fato no
 * cronograma de setembro: a abertura do perfil e o post de apresentação. Não
 * são pilares de conteúdo — são posts institucionais de largada —, mas ficam
 * aqui para que nenhum post suma quando você filtra.
 */
export const PILARES = [
  "Simplicidade",
  "Transparência",
  "Estratégia",
  "Abertura",
  "Apresentação",
] as const;
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
  /**
   * Trecho do primeiro card a destacar em outra cor. Tem que aparecer literal
   * no texto da primeira peça, senão nada é destacado.
   */
  destaque?: string;
  /** Observação de produção, só para mim. Nunca vai para o Instagram. */
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
  /** Duração alvo da gravação, quando o cronograma especifica. Ex.: "50s". */
  duracao?: string;
}

/**
 * União discriminada por `formato`: o TypeScript só deixa usar `slides` num
 * Carrossel e `roteiro` num Reels.
 */
export type Post = PostCard | PostCarrossel | PostReels;

export const posts: Post[] = [
  // ---------------------------------------------------------------------------
  // SETEMBRO 2026
  // ---------------------------------------------------------------------------
  {
    data: "2026-09-01",
    formato: "Card",
    pilar: "Abertura",
    card: "Simplifique Capital",
    legenda:
      "Simplifique Capital.\n\nConsultoria e educação financeira, sem conflito de interesse. Aqui eu vou explicar, de forma simples, como montar e cuidar da própria carteira.\n\nSem produto empurrado, sem promessa de retorno.",
    obs: "Arte: fundo verde escuro, logo centralizado, nada mais. Sem frase, sem data, sem \"em breve\". O silêncio é o ponto: quem chegar pelo anúncio de quinta vê um perfil que já existe. Postar cedo, entre 8h e 9h. Atualizar a bio e o link no mesmo dia, antes deste post ir ao ar.",
  },
  {
    data: "2026-09-03",
    formato: "Carrossel",
    pilar: "Estratégia",
    card: "Conta de investimento para o filho menor de idade pode ser uma má ideia.",
    slides: [
      "Conta de investimento para o filho menor de idade pode ser uma má ideia.\n\nTe digo o porquê.",
      "A intenção é ótima. Começar cedo é o que mais funciona em investimento.",
      "Mas tem um ponto central: controle.",
      "Seu filho passa a ter controle total do patrimônio aos 18 anos.\nSerá que ele terá maturidade suficiente para isso?",
      "Queremos acreditar que nosso filho terá educação suficiente para se controlar e seguirá nossos conselhos. Mas já tivemos essa idade e sabemos que nem sempre é assim.",
      "Aos 18 anos a visão de mundo ainda está sendo construída e pode ser que o filho resvale em algumas ideias malucas, convencido por amigos socialistas no meio do caminho.",
      "Afinal, já diria o ditado popular:\nSe você não for socialista aos 18 anos, não tem coração; se continuar socialista depois dos 30, não tem cérebro.",
      "Minha sugestão: manter o patrimônio no nome do titular, pai ou mãe. Lá na frente, com mais maturidade, o titular decide com calma quanto e quando passar.",
      "A intenção de cuidar do futuro do filho continua a mesma. Só muda quem segura o volante até a hora certa.",
    ],
    destaque: "má ideia",
    legenda:
      "Eventualmente me deparo com pais querendo abrir uma conta de investimento no nome do filho menor de idade, para já ir formando um patrimônio. A intenção é ótima. Mas eu sempre desaconselho, e o motivo é um só: controle.\n\nAos 18 anos o controle passa a ser total e irrestrito. E por mais bem educado que seja o nosso filho, ninguém sabe em que momento de vida ele vai estar aos 18: que companhias terá, que ideias terá formado.\n\nPrefiro mil vezes ter esse controle na mão e escolher o melhor momento do que chegar nos 18 anos e ser surpreendido.\n\nE vocês, como pensam sobre isso? Fariam diferente?",
    obs: "Este é o post que vai receber o tráfego do anúncio da gravidez. Tema de pai falando com pais: a conexão acontece sozinha, sem precisar mencionar nada pessoal. Responder todos os comentários no mesmo dia.",
  },
  {
    data: "2026-09-08",
    formato: "Carrossel",
    pilar: "Apresentação",
    card: "O que é a Simplifique Capital.",
    slides: [
      "O que é a Simplifique Capital.",
      "Eu ensino você a montar e cuidar da sua própria carteira.",
      "Primeiro a gente olha o que você já tem, para onde quer ir e em quanto tempo.",
      "Depois monta uma carteira simples, feita para o seu caso.",
      "Aí vem a parte que quase ninguém ensina: como operar, rebalancear e acompanhar sozinho.",
      "Você mantém sua corretora. Eu não vendo produto e não recebo comissão de ninguém.",
      "Se você me demitir, eu fiz meu trabalho direito.",
    ],
    destaque: "Simplifique Capital",
    legenda:
      "Passei quatro anos como assessor de investimentos e vi de perto como o mercado funciona por dentro. A Simplifique Capital nasceu da decisão de trabalhar do outro lado da mesa.\n\nO modelo é de valor fixo, pago por você. Não recebo comissão de corretora, banco ou gestora. Se eu recomendo alguma coisa, é porque faz sentido para o seu caso.\n\nQualquer dúvida, é só chamar aqui.",
  },
  {
    data: "2026-09-10",
    formato: "Card",
    pilar: "Simplicidade",
    card: "Para a maioria das pessoas, o ETF é a forma mais eficiente de investir em ações.",
    destaque: "mais eficiente",
    legenda:
      "ETF é uma cesta pronta. Em vez de escolher empresa por empresa, você faz uma compra e passa a ter uma fatia de dezenas ou centenas delas.\n\nTrês motivos pelos quais eu uso ETF na minha própria carteira:\n\n1. Custo. A taxa costuma ser uma fração do que um fundo cobra. E taxa é a única variável do investimento que você controla com certeza.\n\n2. Diversificação imediata. Uma ordem, e o risco já está espalhado.\n\n3. Transparência. Você consegue ver exatamente o que tem dentro, a qualquer momento.\n\nETF não elimina risco e não garante retorno. O preço oscila como qualquer ação. A vantagem é estrutural: menos custo e menos dependência de alguém acertar a escolha.",
    obs: "Troquei \"a melhor opção do mercado\" por \"a forma mais eficiente para a maioria das pessoas\". Absoluto atrai contra-argumento fácil nos comentários e soa a promessa, o que é sensível para quem presta consultoria. A força do post fica na legenda, não no superlativo.",
  },
  {
    data: "2026-09-12",
    formato: "Reels",
    pilar: "Estratégia",
    card: "O segredo é não se movimentar",
    duracao: "50s",
    roteiro:
      "Se você é médico, advogado, engenheiro, dono de uma loja: você não tem tempo de acompanhar o mercado. E a boa notícia é que você não precisa.\n\nAcompanhar taxa de juros, tentar adivinhar para onde a bolsa vai, entrar e sair na hora certa: isso é um trabalho de tempo integral. E mesmo quem faz isso em tempo integral erra bastante.\n\nO investidor comum não perde dinheiro por escolher errado. Perde por mexer demais.\n\nMonte uma carteira que faça sentido para o seu prazo. Depois disso, o trabalho é quase todo de não fazer nada.",
    destaque: "não se movimentar",
    legenda:
      "A parte mais difícil de investir bem não é escolher. É aguentar ficar parado.",
    obs: "Fechamento em silêncio, olhando para a câmera. Sem CTA falado. Gravar sentado, luz natural, sem música. Legenda queimada no vídeo em duas linhas por vez.",
  },
  {
    data: "2026-09-15",
    formato: "Card",
    pilar: "Transparência",
    card: "Não acredite em mim. Faça esta pergunta ao ChatGPT: \"Por que as corretoras brasileiras raramente incentivam a compra de ETFs?\"",
    destaque: "Não acredite em mim.",
    legenda:
      "Não precisa confiar na minha palavra. Pergunte para uma fonte que não tem nada a ganhar com a sua resposta.\n\nA explicação é simples: produto com taxa maior remunera melhor quem distribui. ETF quase não deixa margem para quem vende. Não é conspiração, é incentivo, e incentivo explica quase tudo no mercado financeiro.\n\nComente ETF aqui embaixo que eu mando o prompt completo no seu direct, junto com o que observar na resposta.",
    obs: "O direct automático não é nativo do Instagram. Precisa de ManyChat (plano gratuito atende no começo) conectado à conta profissional. Configurar a palavra-chave antes de publicar, senão o post gera comentário e nenhuma resposta.",
  },
  {
    data: "2026-09-17",
    formato: "Carrossel",
    pilar: "Transparência",
    card: "Dois por cento ao ano parece pouco. Em vinte anos, não é.",
    slides: [
      "Dois por cento ao ano parece pouco. Em vinte anos, não é.",
      "A taxa é cobrada todo ano. E sobre um valor que cresce.",
      "Ou seja: ela também tem juros compostos. Só que a favor de quem cobra.",
      "O tempo é o maior aliado do investidor. E o maior aliado da taxa.",
      "Você não controla o retorno. Controla o custo.",
    ],
    destaque: "Em vinte anos, não é.",
    legenda:
      "Custo é a única parte do resultado que você consegue decidir hoje e ter certeza amanhã.\n\nVale o exercício: pegue o extrato da sua carteira e some tudo que é cobrado por ano. Taxa de administração, taxa de performance, custódia, corretagem. Muita gente nunca fez essa conta.",
    obs: "Se quiser incluir número, usar um exemplo redondo e deixar claro que é ilustração, não projeção de rentabilidade.",
  },
  {
    data: "2026-09-19",
    formato: "Reels",
    pilar: "Simplicidade",
    card: "Reserva de emergência",
    duracao: "40s",
    roteiro:
      "Tem uma conta que quase todo mundo faz errado: a da reserva de emergência.\n\nA conta não é sobre o seu salário. É sobre o seu gasto mensal. São coisas diferentes, e a diferença costuma ser grande.\n\nSome tudo que sai da sua conta em um mês normal. Multiplique por três, ou por seis se a sua renda for variável. Esse é o valor.\n\nE ele precisa estar em algo que você consiga resgatar no mesmo dia. Reserva que demora a sair não é reserva.",
    destaque: "emergência",
    legenda: "Antes de investir, isso. Sempre.",
  },
  {
    data: "2026-09-22",
    formato: "Card",
    pilar: "Simplicidade",
    card: "Se você não consegue explicar seu investimento em uma frase, ele provavelmente não foi feito para você.",
    destaque: "em uma frase",
    legenda:
      "Complexidade quase sempre é custo escondido. Produto difícil de entender costuma ser fácil de vender e difícil de comparar, e é exatamente aí que a taxa se esconde.\n\nTeste rápido: pegue o produto mais complicado da sua carteira e tente explicar para alguém em uma frase. Se não sair, vale entender melhor antes de manter.",
  },
  {
    data: "2026-09-24",
    formato: "Carrossel",
    pilar: "Transparência",
    card: "Três coisas que raramente te contam antes de te venderem um investimento.",
    slides: [
      "Três coisas que raramente te contam antes de te venderem um investimento.",
      "Quem recomendou pode receber comissão pelo produto.",
      "Essa comissão sai do seu dinheiro, só que de forma indireta.",
      "Existe meta de vendas. Nem sempre o que bate a meta é o que serve para você.",
      "Nada disso é ilegal. Só costuma não ser dito.",
    ],
    destaque: "raramente te contam",
    legenda:
      "Não é sobre pessoas mal-intencionadas. É sobre como o sistema remunera quem trabalha nele.\n\nA pergunta que resolve quase tudo: \"como você é remunerado nessa recomendação?\" Quem trabalha com transparência responde na hora.",
  },
  {
    data: "2026-09-26",
    formato: "Reels",
    pilar: "Transparência",
    card: "Como eu ganho dinheiro",
    duracao: "45s",
    roteiro:
      "Já que eu passo o tempo todo falando de conflito de interesse, é justo eu explicar como eu ganho dinheiro.\n\nValor fixo, pago diretamente por você. Só isso.\n\nNão recebo comissão de corretora, não recebo de gestora de fundo, não recebo por indicar produto nenhum. Se eu recomendo alguma coisa, é porque ela faz sentido para o seu caso, não porque ela me paga melhor.\n\nE o valor é o mesmo independente do tamanho do seu patrimônio.",
    destaque: "ganho dinheiro",
    legenda:
      "Transparência sobre remuneração deveria ser o mínimo. Ainda é exceção.",
    obs: "Melhor post do mês para impulsionar, se for testar tráfego pago.",
  },
  {
    data: "2026-09-29",
    formato: "Card",
    pilar: "Estratégia",
    card: "Pergunte ao ChatGPT: \"Se eu pago 2% de taxa ao ano por 20 anos, quanto do meu patrimônio final vai embora só em taxa?\"",
    destaque: "Pergunte ao ChatGPT",
    legenda:
      "Faça o teste com o valor que você tem hoje. O número costuma assustar mais do que qualquer post meu.\n\nDepois pergunte quanto seria com 0,2%. A diferença entre as duas respostas é o que está em jogo quando a gente fala de custo.\n\nComente TAXA que eu mando o prompt pronto no direct.",
    obs: "Mesmo formato do post de 15/09. Se o primeiro performar bem, este vira série mensal fixa.",
  },
  // ---------------------------------------------------------------------------
  // OUTUBRO 2026
  // ---------------------------------------------------------------------------
  {
    data: "2026-10-02",
    formato: "Card",
    pilar: "Estratégia",
    card: "Quanto você precisa ter guardado para parar de trabalhar? Existe um número, e ele é seu.",
    destaque: "Existe um número",
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
    destaque: "em quatro passos",
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
    destaque: "É um número.",
    legenda: "Você já calculou o seu número?",
  },
  {
    data: "2026-10-09",
    formato: "Card",
    pilar: "Transparência",
    card: "Se você parasse de trabalhar hoje, seu dinheiro duraria quantos meses?",
    destaque: "quantos meses?",
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
    destaque: "sem termo técnico",
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
    destaque: "Três erros",
    legenda:
      "Se você tem uma previdência privada, procure a taxa de administração no extrato e me conta nos comentários qual é. Muita gente descobre nesse momento.",
    obs: "Post com alto potencial de comentário. Responder um a um.",
  },
];
