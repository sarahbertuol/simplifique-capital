export default function Quote() {
  return (
    <section className="bg-green-900 px-8 py-20 md:px-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 font-display text-6xl leading-none font-black text-gold">
          &ldquo;
        </div>
        <p className="mb-6 font-display text-[clamp(22px,3.4vw,34px)] leading-[1.35] font-bold text-white">
          Se você me demitir, eu fiz meu trabalho direito.
        </p>
        <div className="text-[13px] font-bold tracking-[1.5px] text-gold">
          — MARCO KAYSER
        </div>
      </div>
    </section>
  );
}
