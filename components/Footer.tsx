import Logo from "./Logo";
import { CONTACT_EMAIL } from "@/lib/contact";

export default function Footer() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-green-900 px-8 py-12 md:px-16">
      <Logo size="footer" />
      <div className="flex flex-col items-start gap-1 text-[13px] text-white/45 sm:items-end">
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/60 hover:text-white">
          {CONTACT_EMAIL}
        </a>
        <div>Copyright 2026, Simplifique Capital. Todos os direitos reservados.</div>
      </div>
    </div>
  );
}
