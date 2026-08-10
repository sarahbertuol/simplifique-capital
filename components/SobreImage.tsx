"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function SobreImage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let raf: number;
    let current = 0;

    function loop() {
      const wrap = wrapRef.current;
      const img = imgRef.current;
      if (wrap && img) {
        const rect = wrap.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const rawTarget = (elementCenter - viewportCenter) * 0.08;
        const target = Math.max(-40, Math.min(40, rawTarget));
        // Ease toward the target instead of snapping to it, so the
        // image visibly lags behind the scroll instead of tracking it 1:1.
        current += (target - current) * 0.06;
        img.style.transform = `translateY(${current.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative order-last lg:order-none">
      <div className="absolute top-5 left-5 h-full w-full rounded-2xl border-2 border-gold/35" />
      <div
        ref={wrapRef}
        className="relative aspect-4/5 w-full overflow-hidden rounded-2xl"
      >
        <Image
          ref={imgRef}
          src="/marco-kayser.png"
          alt="Marco Kayser"
          width={800}
          height={1000}
          className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
        />
      </div>
    </div>
  );
}
