/**
 * Nome real da família tipográfica do display.
 *
 * O canvas precisa de um nome de família de verdade em `ctx.font` — não aceita
 * `var(--font-poppins)`. O `next/font` gera um nome com sufixo aleatório a cada
 * build, então lemos do próprio CSS em vez de escrever à mão.
 */
let cache: string | null = null;

export function familiaDisplay(): string {
  if (cache) return cache;
  const sonda = document.createElement("span");
  sonda.className = "font-display";
  sonda.style.cssText = "position:absolute;visibility:hidden;pointer-events:none";
  document.body.appendChild(sonda);
  cache = getComputedStyle(sonda).fontFamily || "sans-serif";
  sonda.remove();
  return cache;
}
