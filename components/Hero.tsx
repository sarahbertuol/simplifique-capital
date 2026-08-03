import Image from "next/image";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-16 bg-green-800 px-8 pt-24 pb-30 md:px-16 lg:grid-cols-2">
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
        <div className="flex flex-wrap items-center gap-5">
          <a
            href="#contato"
            className="inline-block rounded-lg bg-gold px-[30px] py-4 text-[15px] font-bold text-green-800 hover:text-green-800 hover:brightness-95"
          >
            Quero simplificar meus investimentos
          </a>
          <a
            href="https://wa.me/5551999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-semibold text-white hover:text-white/80"
          >
            Falar no WhatsApp →
          </a>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-6 -right-6 h-full w-full rounded-2xl border-2 border-gold/40" />
        <Image
          src="/marco-kayser.png"
          alt="Marco Kayser"
          width={800}
          height={1000}
          className="relative block aspect-4/5 w-full rounded-2xl object-cover"
          priority
        />
      </div>
    </section>
  );
}
