This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

This project is deployed at [simplifique-capital-site.vercel.app](https://simplifique-capital-site.vercel.app).

---

## Cronograma editorial

Ferramenta interna de planejamento do Instagram, em `/cronograma`. Três telas:
linha do tempo (`/cronograma`), grade de preview do feed (`/cronograma/grade`) e
o detalhe de cada post, que abre em painel sobre qualquer uma das duas.

Não tem banco. O que já foi publicado fica no `localStorage` do aparelho, na
chave `simplifique-cronograma:publicados` — quer dizer: marcar no celular não
aparece no computador, e limpar os dados do navegador zera as marcações.

A rota é `noindex`, mas fica no mesmo domínio do site: quem souber o endereço
abre. Não é lugar para coisa sigilosa.

### Como adicionar um post novo

Todo post mora em `data/posts.ts`, no array `posts`. A ordem no arquivo não
importa — o app ordena por data. O formato decide quais campos existem, e o
TypeScript cobra: `slides` só existe em `Carrossel`, `roteiro` só em `Reels`.

Campos comuns: `data` (ISO `AAAA-MM-DD`, e é o identificador do post),
`pilar`, `card` (o texto que vai na arte — é ele que a grade renderiza),
`legenda` e `obs` (opcional, uma observação de produção, que nunca sai daqui).

Os pilares são `Simplicidade`, `Transparência` e `Estratégia`. Existem ainda
`Abertura` e `Apresentação`, que não são pilares de conteúdo: são os dois posts
institucionais de largada de setembro. Ficam na mesma lista para que nenhum post
suma quando você filtra. Se criar um pilar novo, adicione em `PILARES` e dê a ele
um par de cores em `components/cronograma/Ladrilho.tsx` — o TypeScript cobra.

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
