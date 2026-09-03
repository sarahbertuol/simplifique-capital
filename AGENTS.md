<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Escrita

**Nunca use travessão.** Nem o travessão (U+2014) nem a meia-risca (U+2013),
em lugar nenhum: copy do site, legendas, README, comentários de código,
mensagens de commit, descrição de PR. Regra permanente da Sarah, vale para
todos os projetos dela.

Em vez do travessão, escolha o sinal que a frase pede: vírgula quando o trecho
é um aposto, dois-pontos quando o que vem depois explica o que veio antes,
ponto final quando são duas ideias que aguentam ficar separadas, ou parênteses
quando é mesmo um comentário à parte.

Antes de entregar qualquer alteração de texto, confira que o comando abaixo não
devolve nada:

```
grep -rnP "\x{2014}|\x{2013}" --include=*.tsx --include=*.ts --include=*.css --include=*.md . | grep -v node_modules
```

# Deploy

A Vercel publica o `master`. Trabalho que fica só numa branch não vai ao ar,
por mais pronto que esteja.

Portanto, ao terminar uma alteração pedida pela Sarah: commitar na branch de
trabalho, abrir o pull request para o `master` e **mesclar assim que os checks
passarem**, sem esperar revisão, a menos que ela peça o contrário. O trabalho só
está entregue quando está no `master`.

Se a branch de trabalho ficou para trás porque o `master` andou, rebasear sobre
o `master` atual antes de abrir o PR, em vez de mesclar um estado antigo por
cima do novo.
