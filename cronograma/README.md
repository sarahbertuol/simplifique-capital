# Cronograma editorial — Simplifique Capital

Ferramenta interna de planejamento do Instagram. Três telas: linha do tempo
(`/`), grade de preview do feed (`/grade`) e o detalhe de cada post, que abre
em painel sobre qualquer uma das duas.

A arte de cada peça é gerada na hora, em canvas, e pode ser baixada em PNG
1080x1350 pelo painel de detalhe — uma peça por vez ou todas de um carrossel de
uma vez. O desenho vive em `lib/arte.ts` e é a única fonte da verdade: a grade,
o preview e o arquivo baixado saem da mesma função, então não há como a tela
mostrar uma coisa e o arquivo sair outra.

App independente. Não faz parte do site `simplifiquecapital.com.br` — só
compartilha a identidade visual, documentada em `tokens.md`.

```bash
npm install
npm run dev
```

Não tem banco. O que já foi publicado fica no `localStorage` do aparelho, na
chave `simplifique-cronograma:publicados` — quer dizer: marcar no celular não
aparece no computador, e limpar os dados do navegador zera as marcações.

## Como adicionar um post novo

Todo post mora em `data/posts.ts`, no array `posts`. A ordem no arquivo não
importa — o app ordena por data. O formato decide quais campos existem, e o
TypeScript cobra: `slides` só existe em `Carrossel`, `roteiro` só em `Reels`.

Campos comuns: `data` (ISO `AAAA-MM-DD`, e é o identificador do post), `pilar`,
`card`, `legenda` e `obs` (opcional, uma observação de produção, que nunca sai
daqui).

O que vira arte depende do formato. Em `Card` e `Reels`, a arte é o `card`. Em
`Carrossel`, cada slide vira uma arte, e a capa do feed é o **slide 1** — não o
`card`, que ali funciona só como título interno, usado na linha do tempo e na
busca. Se você quer mudar o que aparece na capa de um carrossel, mexa no
primeiro item de `slides`.

### Regras fixas da arte

Estas não são campos, são regras no código. Não há como ligar ou desligar por
post, e é de propósito: elas existem para o feed não virar uma colcha de
retalhos.

1. **O logotipo entra em toda peça**, inclusive em cada slide de carrossel.
2. **O texto é sempre centralizado na altura e alinhado à esquerda.**
3. **Nada de travessão.** Use dois pontos ou vírgula. Vale para o texto da arte
   e para as legendas.
4. **O primeiro card de cada post destaca um trecho em outra cor**, pelo campo
   `destaque`. O trecho tem que aparecer literal no texto da primeira peça,
   senão nada é pintado. O corte é por posição, não por palavra: destacar
   `"má ideia"` não leva junto o ponto final colado nele.

A cor do destaque muda por pilar, em `lib/arte.ts`. Sobre o fundo dourado do
pilar Transparência ela vira creme, porque um destaque dourado sobre dourado
não se veria.

Os pilares são `Simplicidade`, `Transparência` e `Estratégia`. Existem ainda
`Abertura` e `Apresentação`, que não são pilares de conteúdo: são os dois posts
institucionais de largada de setembro. Ficam na mesma lista para que nenhum post
suma quando você filtra. Se criar um pilar novo, adicione em `PILARES` e dê a ele
um par de cores em `components/Ladrilho.tsx` — o TypeScript cobra.

Um `Reels` aceita `duracao` opcional (ex.: `"50s"`), que aparece ao lado do
roteiro no detalhe.

```ts
{
  data: "2026-11-02",
  formato: "Carrossel",
  pilar: "Simplicidade",
  card: "Título que aparece na capa",
  slides: [
    "Slide 1, a capa.",
    "Slide 2.",
  ],
  legenda: "Primeiro parágrafo.\n\nSegundo parágrafo.",
  obs: "Lembrete de produção.",
},
```

Um `Card` não leva `slides` nem `roteiro`. Um `Reels` leva `roteiro: "..."` no
lugar de `slides`.

Duas coisas que quebram o texto sem dar erro: quebra de parágrafo é `\n\n`
dentro da string (é o que o botão "Copiar legenda" entrega pronto para colar),
e acento tem que ser digitado normal, sem escapar. Depois de mexer, vale rodar
`npx tsc --noEmit` para conferir se os campos batem com o formato.
