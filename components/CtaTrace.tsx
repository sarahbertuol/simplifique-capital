export default function CtaTrace({
  pill = false,
  color = "#f7f3ea",
}: {
  pill?: boolean;
  color?: string;
}) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx={pill ? undefined : 9}
        ry={pill ? "50%" : 9}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        pathLength="1"
        className="cta-trace-rect"
      />
    </svg>
  );
}
