"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

const STEPS = [
  {
    title: "Diagnóstico financeiro completo",
    desc: "Levantamos sua situação atual, objetivos e perfil de risco antes de qualquer recomendação.",
  },
  {
    title: "Montagem da carteira ideal",
    desc: "Construímos uma carteira personalizada, simples e alinhada ao seu momento de vida.",
  },
  {
    title: "Ensino prático de gestão",
    desc: "Você aprende a operar, rebalancear e acompanhar a carteira com autonomia.",
  },
  {
    title: "Acompanhamento com o mentor",
    desc: "Revisões periódicas e um canal direto para tirar dúvidas ao longo do processo.",
  },
];

export default function StepsList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstCircleRef = useRef<HTMLDivElement>(null);
  const lastCircleRef = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState<{ top: number; height: number } | null>(null);
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      const first = firstCircleRef.current;
      const last = lastCircleRef.current;
      if (!container || !first || !last) return;
      const containerRect = container.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      const firstCenter = firstRect.top + firstRect.height / 2 - containerRect.top;
      const lastCenter = lastRect.top + lastRect.height / 2 - containerRect.top;
      setLine({ top: firstCenter, height: lastCenter - firstCenter });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        viewRef.current = node;
      }}
      className="relative flex flex-col gap-6"
    >
      {line && (
        <>
          <div
            className="absolute left-[15px] w-[2px] bg-green-700/10"
            style={{ top: line.top, height: line.height }}
          />
          <div
            className={`steps-line absolute left-[15px] w-[2px] bg-gold ${inView ? "in-view" : ""}`}
            style={{ top: line.top, height: line.height }}
          />
        </>
      )}
      {STEPS.map((step, i) => (
        <div key={step.title} className="relative flex items-start gap-4">
          <div
            ref={
              i === 0
                ? firstCircleRef
                : i === STEPS.length - 1
                  ? lastCircleRef
                  : undefined
            }
            className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-gold/50 bg-tan font-display text-[15px] font-black text-gold"
          >
            {i + 1}
          </div>
          <div>
            <div className="mb-1 text-[15px] font-bold text-green-700">
              {step.title}
            </div>
            <div className="text-sm leading-[1.55] text-green-700/60">
              {step.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
