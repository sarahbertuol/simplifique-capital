/** Publicados no mês. Um número grande, sem gráfico. */
export default function Progresso({
  publicados,
  total,
}: {
  publicados: number;
  total: number;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-display text-[clamp(32px,4.5vw,52px)] leading-none font-black tracking-[-0.03em] text-green-900 tabular-nums">
        {publicados}
        <span className="text-green-700/50">/{total}</span>
      </span>
      <span className="font-sans text-[13px] text-green-700/70">
        publicados
      </span>
    </div>
  );
}
