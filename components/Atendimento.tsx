function XPLogo() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black">
      <span className="font-display text-xl font-black text-white">xp</span>
    </div>
  );
}

function BTGLogo() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
      <span className="font-display text-base font-black text-white">btg</span>
    </div>
  );
}

function AvenueLogo() {
  return (
    <span className="font-display text-2xl font-black text-black italic">
      Avenue
    </span>
  );
}

function InteractiveBrokersLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 40 40" className="shrink-0">
        <rect width="40" height="40" rx="8" fill="#D2232A" />
        <path d="M0 40 L40 0 L40 12 L12 40 Z" fill="#ffffff" />
      </svg>
      <div className="text-left leading-[1.15]">
        <div className="font-display text-sm font-extrabold text-green-700">
          Interactive
        </div>
        <div className="font-display text-sm font-extrabold text-green-700">
          Brokers
        </div>
      </div>
    </div>
  );
}

function MercadoBitcoinLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 40 40" className="shrink-0">
        <polygon
          points="20,1 38,10.5 38,29.5 20,39 2,29.5 2,10.5"
          fill="#F7931A"
        />
      </svg>
      <div className="text-left leading-[1.15]">
        <div className="font-display text-sm font-extrabold text-green-700">
          Mercado
        </div>
        <div className="font-display text-sm font-extrabold text-green-700">
          Bitcoin
        </div>
      </div>
    </div>
  );
}

function SafraLogo() {
  return (
    <div className="flex h-14 flex-col items-center justify-center rounded-xl bg-[#131B33] px-5">
      <span className="font-display text-sm font-black text-white italic">
        Safra
      </span>
      <span className="text-[10px] font-semibold tracking-[1.5px] text-white/70">
        INVEST
      </span>
    </div>
  );
}

function WarrenLogo() {
  return (
    <div className="flex h-14 items-center justify-center rounded-xl bg-[#D9502E] px-6">
      <span className="font-display text-xl font-black text-white italic">
        warren
      </span>
    </div>
  );
}

const LOGOS = [
  XPLogo,
  BTGLogo,
  AvenueLogo,
  InteractiveBrokersLogo,
  MercadoBitcoinLogo,
  SafraLogo,
  WarrenLogo,
];

export default function Atendimento() {
  return (
    <section className="bg-cream px-8 py-24 md:px-16 lg:py-30">
      <div className="mx-auto mb-16 max-w-[680px] text-center">
        <div className="mb-4 text-[13px] font-bold tracking-[1.5px] text-gold-dark">
          RECORRENTE
        </div>
        <h2 className="mb-4 text-balance font-display text-[clamp(26px,3.2vw,34px)] font-extrabold text-green-700">
          Atendimento através de
        </h2>
        <p className="text-balance text-base leading-[1.6] text-green-700/65">
          Sua carteira operada via infraestrutura white label, com acesso às
          principais plataformas do mercado.
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-10 lg:flex-nowrap lg:gap-x-10">
        {LOGOS.map((Logo, i) => (
          <Logo key={i} />
        ))}
      </div>
      <p className="mx-auto mt-14 max-w-2xl text-center text-xs text-balance text-green-700/45 italic">
        Marcas meramente ilustrativas. Representam as plataformas de
        execução disponíveis via a infraestrutura white label.
      </p>
    </section>
  );
}
