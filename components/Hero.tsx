import MarketIllustration from "./MarketIllustration";

export default function Hero() {
  return (
    <section className="grid min-h-dvh grid-cols-1 items-center gap-10 bg-green-800 px-8 py-16 md:px-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="mb-7 inline-block rounded-full border border-gold/50 px-[18px] py-2 text-xs font-bold tracking-[1px] text-gold">
          CONSULTORIA &amp; EDUCAÇÃO FINANCEIRA
        </div>
        <h1 className="mb-6 max-w-[620px] font-display text-[clamp(32px,4.5vw,52px)] leading-[1.15] font-extrabold text-white">
          Seu patrimônio merece estratégia, não complicação.
        </h1>
        <p className="mb-10 max-w-[520px] text-[17px] leading-[1.65] text-white/75">
          Aprenda a montar e administrar sua própria carteira com orientação de
          quem viveu o mercado financeiro por dentro — sem conflito de
          interesses e com total transparência sobre custos e remuneração.
        </p>
        <div className="flex flex-nowrap items-center gap-2 sm:gap-5">
          <a
            href="#contato"
            className="inline-block rounded-lg bg-gold px-3 py-2.5 text-[11px] font-bold whitespace-nowrap text-green-800 hover:text-green-800 hover:brightness-95 sm:px-[30px] sm:py-4 sm:text-[15px]"
          >
            Quero simplificar meus investimentos
          </a>
          <a
            href="https://wa.me/5551999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold whitespace-nowrap text-white hover:text-white/80 sm:text-[15px]"
          >
            Falar no WhatsApp →
          </a>
        </div>
      </div>
      <div className="relative order-first mx-auto w-fit lg:order-none">
        <div className="absolute -top-6 -right-6 h-full w-full rounded-2xl border-2 border-gold/40" />
        <div className="relative aspect-4/5 h-[32dvh] max-w-full overflow-hidden rounded-2xl sm:h-[38dvh] lg:h-[52dvh]">
          <MarketIllustration />
        </div>
      </div>
    </section>
  );
}
