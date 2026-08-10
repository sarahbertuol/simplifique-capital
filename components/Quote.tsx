"use client";

import { useInView } from "@/hooks/useInView";

export default function Quote() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="bg-green-900 px-8 py-20 md:px-16">
      <div ref={ref} className="mx-auto max-w-5xl text-center">
        <div className="mb-4 font-display text-6xl leading-none font-black text-gold">
          &ldquo;
        </div>
        <p className="mb-6 text-balance font-display text-[clamp(20px,2.6vw,32px)] leading-[1.5] font-bold whitespace-normal text-white lg:whitespace-nowrap">
          Se você me{" "}
          <span
            className={`word-underline text-gold ${inView ? "in-view" : ""}`}
          >
            demitir
          </span>
          , eu fiz meu trabalho direito.
        </p>
        <div className="text-[13px] font-bold tracking-[1.5px] text-gold">
          — MARCO KAYSER
        </div>
      </div>
    </section>
  );
}
