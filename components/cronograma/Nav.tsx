"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/cronograma", rotulo: "linha do tempo" },
  { href: "/cronograma/grade", rotulo: "grade" },
] as const;

export default function Nav() {
  const caminho = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-green-900 px-5 py-4 md:px-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <div className="flex items-end gap-2.5">
          <div className="flex items-end gap-[3px]">
            <div className="h-[9px] w-[5px] bg-white/45" />
            <div className="h-[14px] w-[5px] bg-white/75" />
            <div className="h-[19px] w-[5px] bg-gold" />
          </div>
          <span className="font-display text-[19px] leading-none font-bold tracking-[-0.3px] text-white">
            cronograma
          </span>
        </div>

        <nav className="flex gap-6">
          {LINKS.map((link) => {
            const ativo = caminho === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={ativo ? "page" : undefined}
                className={`font-sans text-[15px] underline-offset-[6px] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  ativo
                    ? "font-bold text-white underline decoration-gold decoration-2"
                    : "font-medium text-white/60 hover:text-white"
                }`}
              >
                {link.rotulo}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
