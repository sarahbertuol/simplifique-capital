# Tokens da marca da Simplifique Capital

Extraídos do código-fonte real do site (`simplifiquecapital.com.br`), neste mesmo
repositório. Fontes: `app/globals.css` (bloco `@theme inline`), `app/layout.tsx`
(fontes), e uso agregado nos 18 componentes de `components/`.

Nada aqui foi inventado. Onde um valor não existe como token declarado, ele está
marcado como **derivado do uso**, quer dizer, é o padrão que os componentes
seguem na prática, não uma variável nomeada.

---

## Cores

Tokens declarados em `@theme inline`:

| Token | Hex | Uso real no site |
|---|---|---|
| `--color-green-900` | `#0a2420` | Verde mais profundo; fundos de bloco |
| `--color-green-800` | `#0f2e28` | Fundo escuro principal de seção |
| `--color-green-700` | `#152420` | **Cor de texto padrão do body**; bordas |
| `--color-gold` | `#c9982e` | Acento, links, barra do logo, CTA |
| `--color-gold-dark` | `#a97c1f` | Hover de link |
| `--color-cream` | `#f7f3ea` | **Fundo padrão do body** |
| `--color-tan` | `#f0ebe0` | Superfície secundária sobre o creme |

Cores fora do `@theme`, derivadas do uso:

| Hex | Onde | Papel |
|---|---|---|
| `#b0402f` | `Contato.tsx`, `PlanosEModal.tsx` | Erro / validação de formulário |
| `#4f615d` | `icon.tsx`, `opengraph-image.tsx` | Barra média do logo (verde dessaturado) |
| `#9aa8a3` | `icon.tsx`, `opengraph-image.tsx` | Barra baixa do logo (cinza-esverdeado) |

Ignorados de propósito: `#F7931A`, `#D9502E`, `#D2232A`, `#131B33`, que são cores de
marca de terceiros (logos das plataformas em `Atendimento.tsx`), não da Simplifique.

Contagem de uso confirma a hierarquia: `text-green-700` (50×) é o texto, `bg-gold`
/ `text-gold` (24×) é o acento, `bg-green-800` (11×) é o bloco escuro.

## Tipografia

Duas famílias, carregadas via `next/font/google` em `app/layout.tsx`:

- **Display, Poppins.** Pesos `700`, `800`, `900`. Exposta como `--font-display`.
  Usada em títulos (`font-display`, 27×), sempre com peso alto.
- **Texto, Inter.** Pesos `400`, `500`, `600`, `700`. Exposta como `--font-sans`.
  É a fonte do `body`.

Tracking: `-0.3px` no display em tamanho grande (`Logo.tsx`).

### Escala de tamanhos (derivada do uso)

Fixos, em ordem de frequência: `text-sm` (14px, 25×), `text-xs` (12px, 18×),
`15px` (16×), `13px` (13×), `text-base` (16px, 10×), `text-2xl`, `text-xl`,
`11px`, `10px`, `17px`, `19px`, `21px`, `22px`, `38px`, `text-6xl`.

Títulos são **fluidos**, com `clamp()`. Este é o padrão da casa e o que vou seguir:

- `clamp(32px, 4.5vw, 52px)`: título de herói
- `clamp(28px, 3.5vw, 36px)`
- `clamp(26px, 3.4vw, 38px)`
- `clamp(26px, 3.2vw, 34px)`: título de seção, o mais comum (5×)
- `clamp(24px, 3vw, 32px)`
- `clamp(20px, 2.6vw, 32px)`

## Raio de borda

Derivado do uso, em ordem de frequência: `rounded-lg` (8px, 21×) é o padrão da
casa; `rounded-full` (13×) para pílulas e pontos; `rounded-2xl` (16px, 10×) para
superfícies grandes; `rounded-xl` (12px, 4×).

## Espaçamento e medida

- Container: `max-w-6xl` (1152px)
- Coluna de texto corrido: `max-w-[680px]`
- Formulário / coluna estreita: `max-w-[480px]`
- Padding horizontal: `px-4` (mobile) → `px-8` → `px-16` (desktop)
- Padding vertical de seção: `py-24` / `py-30`

---

## O que isso significa para o app de cronograma

A paleta da marca já é o que a direção de arte pede: cor chapada, contraste alto,
sem gradiente. Verde profundo e creme como base, dourado como único acento.

Onde eu preciso de mais separação visual do que a marca oferece, nos três pilares
da grade de feed, vou usar os três tons de verde já existentes (`green-900`,
`green-800`, `green-700`) mais o creme e o dourado, alternando fundo/texto. Sem
introduzir matiz nova.
