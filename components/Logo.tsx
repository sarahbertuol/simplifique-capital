const SIZES = {
  nav: { text: "text-[19px]", bars: [9, 14, 19] },
  footer: { text: "text-[16px]", bars: [7, 12, 16] },
} as const;

export default function Logo({ size = "nav" }: { size?: keyof typeof SIZES }) {
  const { text, bars } = SIZES[size];

  return (
    <div className="flex items-end gap-2.5">
      <div className="flex items-end gap-[3px]" style={{ height: bars[2] }}>
        <div className="w-[5px] bg-white/45" style={{ height: bars[0] }} />
        <div className="w-[5px] bg-white/75" style={{ height: bars[1] }} />
        <div className="w-[5px] bg-gold" style={{ height: bars[2] }} />
      </div>
      <div className={`font-display leading-none font-bold tracking-[-0.3px] text-white ${text}`}>
        simplifique <span className="text-gold">capital</span>
      </div>
    </div>
  );
}
