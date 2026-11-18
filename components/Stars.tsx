import type { CSSProperties } from "react";

// Deterministic pseudo-random so server and client render identically.
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const rand = seeded(1906);
const STARS = Array.from({ length: 70 }, () => ({
  x: rand() * 100,
  y: rand() * 100,
  s: 1 + rand() * 2.2,
  d: 2.5 + rand() * 4,
  delay: -rand() * 6,
}));

export default function Stars() {
  return (
    <div className="stars" aria-hidden>
      {STARS.map((st, i) => (
        <span
          key={i}
          style={
            {
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.s,
              height: st.s,
              animationDuration: `${st.d}s`,
              animationDelay: `${st.delay}s`,
            } as CSSProperties
          }
        />
      ))}
      <span className="shooting-star" />
    </div>
  );
}
