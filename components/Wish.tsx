"use client";

import { useState, type CSSProperties } from "react";

const HEARTS = Array.from({ length: 14 }, (_, i) => ({
  x: Math.round(Math.sin(i * 2.4) * 120),
  delay: (i * 0.13) % 1.4,
  size: 10 + ((i * 7) % 12),
  dur: 3.2 + ((i * 5) % 10) / 6,
}));

export default function Wish({ prompt, after }: { prompt: string; after: string }) {
  const [blown, setBlown] = useState(false);

  return (
    <div className={`wish ${blown ? "is-blown" : ""}`}>
      <p className="wish-prompt">{prompt}</p>

      <button
        className="cake"
        onClick={() => setBlown(true)}
        disabled={blown}
        aria-label={blown ? "Candles blown out" : "Blow out the candles"}
      >
        <span className="candles">
          {[0, 1, 2].map((i) => (
            <span key={i} className="candle" style={{ "--c": i } as CSSProperties}>
              <span className="flame" />
              <span className="smoke" />
            </span>
          ))}
        </span>
        <span className="tier tier-top" />
        <span className="tier tier-bottom" />
        <span className="plate" />

        {blown && (
          <span className="hearts" aria-hidden>
            {HEARTS.map((h, i) => (
              <span
                key={i}
                style={
                  {
                    "--x": `${h.x}px`,
                    "--hd": `${h.delay}s`,
                    "--hs": `${h.size}px`,
                    "--dur": `${h.dur}s`,
                  } as CSSProperties
                }
              >
                ♥
              </span>
            ))}
          </span>
        )}
      </button>

      <p className="wish-after" aria-live="polite">
        {blown ? after : " "}
      </p>
    </div>
  );
}
