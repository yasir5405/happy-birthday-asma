import type { CSSProperties } from "react";

/** A hand-drawn rose that grows: stem draws in, leaves unfold, petals bloom inside-out, then it sways. */
export default function Rose({ className = "" }: { className?: string }) {
  const p = (n: number) => ({ "--p": n }) as CSSProperties;

  return (
    <svg className={`rose ${className}`} viewBox="0 0 200 320" role="img" aria-label="A rose, for you">
      <defs>
        <linearGradient id="rBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c95a6c" />
          <stop offset="1" stopColor="#8f2c40" />
        </linearGradient>
        <linearGradient id="rSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e5808f" />
          <stop offset="1" stopColor="#b0425a" />
        </linearGradient>
        <linearGradient id="rFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0a3ae" />
          <stop offset="0.5" stopColor="#d4657a" />
          <stop offset="1" stopColor="#a5374c" />
        </linearGradient>
        <linearGradient id="rOuter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e38896" />
          <stop offset="1" stopColor="#93293e" />
        </linearGradient>
        <radialGradient id="rCore" cx="0.5" cy="0.75" r="0.8">
          <stop offset="0" stopColor="#6e1a2c" />
          <stop offset="1" stopColor="#b14558" />
        </radialGradient>
        <linearGradient id="rLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8aa476" />
          <stop offset="1" stopColor="#55714a" />
        </linearGradient>
        <radialGradient id="rGlow">
          <stop offset="0" stopColor="#f3b7c0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f3b7c0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="rose-sway">
        <circle className="rose-glow" cx="100" cy="95" r="90" fill="url(#rGlow)" />

        {/* stem */}
        <path
          className="rose-stem"
          pathLength={1}
          d="M100,140 C97,185 105,225 99,268 C97,288 100,302 100,316"
          fill="none"
          stroke="#5f7b51"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* leaves */}
        <g className="rose-leaf rose-leaf-l">
          <path d="M100,212 C84,192 62,192 48,204 C62,222 86,224 100,212 Z" fill="url(#rLeaf)" />
          <path d="M100,212 C84,204 66,202 52,204" fill="none" stroke="#e8efdf" strokeOpacity="0.45" strokeWidth="0.9" />
        </g>
        <g className="rose-leaf rose-leaf-r">
          <path d="M100,252 C116,232 140,232 154,244 C140,262 116,264 100,252 Z" fill="url(#rLeaf)" />
          <path d="M100,252 C116,244 136,242 150,244" fill="none" stroke="#e8efdf" strokeOpacity="0.45" strokeWidth="0.9" />
        </g>

        {/* sepals */}
        <g className="rose-sepals">
          <path d="M100,144 C90,142 78,148 70,160 C84,152 94,152 100,148 Z" fill="#5f7b51" />
          <path d="M100,144 C110,142 122,148 130,160 C116,152 106,152 100,148 Z" fill="#5f7b51" />
          <path d="M100,146 C98,152 97,160 99,168 C101,160 102,152 100,146 Z" fill="#55714a" />
        </g>

        {/* bloom */}
        <g className="rose-head">
          <path
            className="rp"
            style={p(1)}
            d="M60,96 C52,72 58,50 78,46 C88,44 95,48 100,53 C105,48 112,44 122,46 C142,50 148,72 140,96 C128,88 114,85 100,85 C86,85 72,88 60,96 Z"
            fill="url(#rBack)"
          />
          <g className="rp" style={p(0)}>
            <path d="M82,86 C79,68 88,57 100,57 C112,57 121,68 118,86 C110,80 90,80 82,86 Z" fill="url(#rCore)" />
            <path d="M84,82 C85,70 95,62 106,64 C97,68 92,74 92,84 Z" fill="#c4566a" />
            <path d="M116,82 C116,72 110,66 102,66 C108,70 110,76 108,84 Z" fill="#a9405a" />
            <path
              d="M88,72 C92,62 106,59 113,67"
              fill="none"
              stroke="#f0a7b1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />
          </g>
          <path
            className="rp"
            style={p(2)}
            d="M100,130 C74,128 54,110 55,86 C54,76 55,68 58,61 C65,69 70,76 74,82 C86,96 96,110 100,130 Z"
            fill="url(#rSide)"
          />
          <path
            className="rp"
            style={p(2)}
            d="M100,130 C126,128 146,110 145,86 C146,76 145,68 142,61 C135,69 130,76 126,82 C114,96 104,110 100,130 Z"
            fill="url(#rSide)"
          />
          <path
            className="rp"
            style={p(3)}
            d="M72,118 C80,138 91,147 100,148 C109,147 120,138 128,118 C118,127 109,131 100,131 C91,131 82,127 72,118 Z"
            fill="#a3354b"
          />
          <g className="rp" style={p(3)}>
            <path
              d="M66,84 C76,76 90,75 100,80 C110,75 124,76 134,84 C132,108 119,127 100,129 C81,127 68,108 66,84 Z"
              fill="url(#rFront)"
            />
            <path
              d="M66,84 C76,76 90,75 100,80 C110,75 124,76 134,84"
              fill="none"
              stroke="#fad0d6"
              strokeWidth="1.4"
              strokeOpacity="0.85"
              strokeLinecap="round"
            />
          </g>
          <g className="rp rp-outer-l" style={p(4)}>
            <path d="M48,86 C42,116 64,143 98,147 C87,133 78,114 74,96 C69,89 60,85 48,86 Z" fill="url(#rOuter)" />
            <path d="M48,86 C56,84 64,86 70,90 C62,90 54,90 48,86 Z" fill="#f2b3bc" />
          </g>
          <g className="rp rp-outer-r" style={p(4)}>
            <path d="M152,86 C158,116 136,143 102,147 C113,133 122,114 126,96 C131,89 140,85 152,86 Z" fill="url(#rOuter)" />
            <path d="M152,86 C144,84 136,86 130,90 C138,90 146,90 152,86 Z" fill="#f2b3bc" />
          </g>
        </g>
      </g>
    </svg>
  );
}
