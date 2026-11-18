"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Petal = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  opacity: number;
};

/** Soft rose petals drifting down behind everything. Generated on the client to avoid hydration mismatch. */
export default function Petals({ count = 16 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 9 + Math.random() * 11,
        duration: 16 + Math.random() * 16,
        delay: -Math.random() * 32,
        drift: (Math.random() - 0.5) * 220,
        rotate: Math.random() * 360,
        opacity: 0.25 + Math.random() * 0.35,
      }))
    );
  }, [count]);

  return (
    <div className="petals" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.25,
              animationDuration: `${p.duration}s, ${p.duration / 4}s`,
              animationDelay: `${p.delay}s, ${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--rot": `${p.rotate}deg`,
              "--o": p.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
