const STATS = [
  { val: "25+", lbl: "ANOS NO MERCADO FINANCEIRO" },
  { val: "300+", lbl: "CLIENTES ATENDIDOS" },
  { val: "R$104M+", lbl: "EM PATRIMÔNIO ASSESSORADO" },
];

export default function Numeros() {
  return (
    <section className="bg-green-800 px-8 py-24 md:px-16 lg:py-30">
      <div className="mx-auto mb-16 max-w-[680px] text-center">
        <div className="mb-4 text-[13px] font-bold tracking-[1.5px] text-gold">
          MINHA EXPERIÊNCIA EM NÚMEROS
        </div>
        <h2 className="font-display text-[clamp(24px,3vw,32px)] font-extrabold text-white">
          Uma trajetória sólida no mercado financeiro
        </h2>
      </div>
      <div className="mx-auto grid max-w-[820px] grid-cols-1 gap-8 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.lbl}>
            <div className="mb-5 h-[3px] w-7 bg-gold" />
            <div className="mb-2.5 font-display text-[38px] font-black text-white">
              {stat.val}
            </div>
            <div className="text-xs leading-[1.4] tracking-[0.5px] text-white/55">
              {stat.lbl}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
