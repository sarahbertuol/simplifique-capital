export default function MarketIllustration() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="block h-full w-full"
      role="img"
      aria-label="Ilustração representando a simplificação do mercado financeiro"
    >
      <defs>
        <linearGradient id="cardBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#152420" />
          <stop offset="100%" stopColor="#0a2420" />
        </linearGradient>
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="10" result="blur" />
        </filter>
      </defs>

      <rect width="400" height="500" fill="url(#cardBg)" />

      {[100, 180, 260, 340, 420].map((y) => (
        <line
          key={y}
          x1="40"
          y1={y}
          x2="360"
          y2={y}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      <polyline
        points="40,420 70,380 90,410 120,360 140,400 170,340 190,380 220,330 240,370"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="40,440 65,410 95,440 125,395 155,430 185,385 215,415 245,375"
        fill="none"
        stroke="rgba(201,152,46,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="40,400 60,430 85,390 110,420 135,380 160,410 185,370 210,400"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="340" cy="90" r="26" fill="#c9982e" opacity="0.35" filter="url(#glow)" />

      <path
        d="M 60 440 C 130 420, 160 340, 210 300 C 260 260, 270 180, 340 90"
        fill="none"
        stroke="#c9982e"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <circle cx="130" cy="420" r="3.5" fill="#c9982e" opacity="0.55" />
      <circle cx="210" cy="300" r="3.5" fill="#c9982e" opacity="0.7" />

      <circle cx="340" cy="90" r="13" fill="none" stroke="#c9982e" strokeWidth="1" opacity="0.4" />
      <circle cx="340" cy="90" r="7" fill="#c9982e" />
    </svg>
  );
}
