import Logo from "./Logo";

const LINKS = [
  { href: "#programa", label: "Programa" },
  { href: "#sobre", label: "Sobre" },
  { href: "#faq", label: "Dúvidas" },
];

export default function Nav() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-green-800 px-8 py-5 md:px-16">
      <Logo size="nav" />
      <div className="flex items-center gap-8">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden text-sm font-semibold text-white/75 hover:text-white sm:inline"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contato"
          className="rounded-full bg-gold px-[22px] py-2.5 text-[13px] font-bold text-green-800 hover:text-green-800 hover:brightness-95"
        >
          Falar com Marco
        </a>
      </div>
    </div>
  );
}
