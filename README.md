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

## Formulários de contato

Os dois formulários do site (seção "Vamos Começar" e o modal dos planos) abrem o
WhatsApp com as respostas já preenchidas. Esse é o caminho principal e não
depende de nenhuma configuração.

Em paralelo, cada envio é registrado em `/api/contact`. Se as variáveis abaixo
estiverem configuradas, esse registro também vira um e-mail para
`contato@simplifiquecapital.com.br` com cópia para
`marco@simplifiquecapital.com.br`. Se não estiverem, o contato fica apenas no
log da função, marcado com `[LEAD-NAO-ENVIADO]`, e o visitante não vê erro
nenhum, porque o WhatsApp já resolveu o contato dele.

### Variáveis de ambiente do e-mail (opcionais)

Sem estas variáveis nenhum e-mail é enviado; o WhatsApp continua funcionando
normalmente:

| Variável | Descrição |
| --- | --- |
| `GMAIL_USER` | Conta que autentica no SMTP e assina o envio |
| `GMAIL_APP_PASSWORD` | Senha de App do Google (não é a senha da conta) |

A Senha de App é gerada em https://myaccount.google.com/apppasswords, com a
verificação em duas etapas ativa na conta.

Elas precisam estar cadastradas **no projeto da Vercel que serve o domínio**,
no ambiente Production, seguidas de um redeploy. Variável nova não vale para
deploys já publicados.

Para usar outro provedor de e-mail, basta definir `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER` e `SMTP_PASSWORD` no lugar das variáveis do Gmail.

### Diagnóstico

`GET /api/contact` mostra se as variáveis estão configuradas.
`GET /api/contact?verify=1` testa a conexão e o login SMTP e explica o erro
encontrado. Nenhum segredo é exposto.
