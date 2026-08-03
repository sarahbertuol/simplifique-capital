"use client";

import { useState } from "react";
import Logo from "./Logo";
import CtaTrace from "./CtaTrace";
import { WHATSAPP_HREF } from "@/lib/whatsapp";

const LINKS = [
  { href: "#programa", label: "Programa" },
  { href: "#sobre", label: "Sobre" },
  { href: "#faq", label: "Dúvidas" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-green-800">
      <div className="flex items-center justify-between px-8 py-5 md:px-16">
        <Logo size="nav" />

        <div className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white/75 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-trace relative rounded-full bg-gold px-[22px] py-2.5 text-[13px] font-bold text-green-800 hover:text-green-800 hover:brightness-95"
          >
            Falar com Marco
            <CtaTrace pill color="#f7f3ea" />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="cursor-pointer text-2xl leading-none text-white sm:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-white/10 px-8 pt-2 pb-5 sm:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-semibold text-white/75 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-gold px-[22px] py-2.5 text-center text-[13px] font-bold text-green-800"
          >
            Falar com Marco
          </a>
        </div>
      )}
    </div>
  );
}
