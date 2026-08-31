# Cronograma editorial — Simplifique Capital

Ferramenta interna de planejamento do Instagram. Três telas: linha do tempo
(`/`), grade de preview do feed (`/grade`) e o detalhe de cada post, que abre
em painel sobre qualquer uma das duas.

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
`card` (o texto que vai na arte — é ele que a grade renderiza), `legenda` e
`obs` (opcional, uma observação de produção, que nunca sai daqui).

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
