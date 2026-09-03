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

function AgoraLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
        <svg viewBox="0 0 186.41 186.41" className="h-full w-full">
          <rect width="186.41" height="186.41" fill="#01c592" />
          <polygon
            points="135.88 136.09 100.03 50.32 100.02 50.32 86.39 50.32 86.38 50.32 50.53 136.09 64.18 136.09 93.21 66.63 122.23 136.09 135.88 136.09"
            fill="#05464d"
          />
        </svg>
      </div>
      <svg
        viewBox="271.4 20.6 595.6 115.3"
        role="img"
        aria-label="Ágora Investimentos"
        className="h-[26px] w-auto shrink-0"
        fill="#07474e"
      >
        <path d="m298.97,102.52l15.05-36,15.05,36h-30.1Zm8.29-52.49l-35.85,85.76h13.64l8.65-20.69h40.62l8.65,20.69h13.64l-35.84-85.76s-13.51,0-13.51,0Z" />
        <polygon points="343.07 20.68 319.5 20.68 314.47 32.69 343.07 32.69 343.07 20.68 343.07 20.68" />
        <path d="m441.91,98.23h28.78v6.86c-1.52,4.28-3.89,8.02-7.08,11.07-5.69,5.43-13.7,8.43-22.57,8.43-17.46,0-31.66-14.2-31.66-31.66s14.2-31.66,31.66-31.66c8.76,0,16.7,3.58,22.44,9.36l8.55-9.27c-7.98-7.84-18.92-12.68-30.99-12.68-24.44,0-44.25,19.81-44.25,44.25s19.81,44.25,44.25,44.25c19.8,0,36.62-11.22,42.25-30.02v-21.52h-41.37v12.59h-.01Z" />
        <path d="m573.08,124.58c-17.46,0-31.66-14.2-31.66-31.66s14.2-31.66,31.66-31.66,31.66,14.2,31.66,31.66-14.2,31.66-31.66,31.66h0Zm0-75.92c-24.44,0-44.25,19.81-44.25,44.25s19.81,44.25,44.25,44.25,44.25-19.81,44.25-44.25-19.81-44.25-44.25-44.25h0Z" />
        <path d="m680.5,85.64v-23.01h25.59c6.34,0,11.51,5.16,11.51,11.51s-5.16,11.51-11.51,11.51h-25.59Zm49.68-11.51c0-13.31-10.79-24.1-24.09-24.1h-38.18v85.76h12.59v-37.57h19.92l20.06,37.57h14.27l-20.77-38.9c9.43-3.27,16.2-12.22,16.2-22.77h0Z" />
        <path d="m805.69,102.52l15.05-36,15.05,36h-30.1Zm21.8-52.49h-13.51l-35.85,85.76h13.64l8.65-20.69h40.62l8.65,20.69h13.64l-35.85-85.76h0Z" />
      </svg>
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
  AgoraLogo,
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
