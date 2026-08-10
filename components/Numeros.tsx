"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const STATS = [
  { target: 25, suffix: "+", lbl: "ANOS NO MERCADO FINANCEIRO" },
  { target: 300, suffix: "+", lbl: "CLIENTES ATENDIDOS" },
  { target: 104, prefix: "R$", suffix: "M+", lbl: "EM PATRIMÔNIO ASSESSORADO" },
];

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

function StatItem({
  stat,
  start,
}: {
  stat: (typeof STATS)[number];
  start: boolean;
}) {
  const value = useCountUp(stat.target, start);

  return (
    <div className="text-center sm:text-left">
      <div className="mx-auto mb-5 h-[3px] w-7 bg-gold sm:mx-0" />
      <div className="mb-2.5 font-display text-[38px] font-black text-white">
        {stat.prefix}
        {value}
        {stat.suffix}
      </div>
      <div className="text-xs leading-[1.4] tracking-[0.5px] text-white/55">
        {stat.lbl}
      </div>
    </div>
  );
}

export default function Numeros() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="bg-green-800 px-8 py-24 md:px-16 lg:py-30">
      <div className="mx-auto mb-16 max-w-[680px] text-center">
        <div className="mb-4 text-[13px] font-bold tracking-[1.5px] text-gold">
          MINHA EXPERIÊNCIA EM NÚMEROS
        </div>
        <h2 className="font-display text-[clamp(24px,3vw,32px)] font-extrabold text-white">
          Uma trajetória sólida
          <br />
          no mercado financeiro
        </h2>
      </div>
      <div
        ref={ref}
        className="mx-auto grid max-w-[820px] grid-cols-1 gap-8 sm:grid-cols-3"
      >
        {STATS.map((stat) => (
          <StatItem key={stat.lbl} stat={stat} start={inView} />
        ))}
      </div>
    </section>
  );
}
