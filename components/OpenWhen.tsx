"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function OpenWhen({ items }: { items: { when: string; note: string }[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="openwhen">
      {items.map((item, i) => (
        <Reveal key={i} delay={(i % 3) * 120}>
          <button
            className={`ow-card ${open.has(i) ? "is-flipped" : ""}`}
            onClick={() => toggle(i)}
            aria-pressed={open.has(i)}
          >
            <span className="ow-inner">
              <span className="ow-face ow-front">
                <span className="ow-seal" aria-hidden>
                  ♥
                </span>
                <span className="ow-label">Open when</span>
                <span className="ow-when">{item.when}</span>
              </span>
              <span className="ow-face ow-back">
                <span className="ow-note">{item.note}</span>
              </span>
            </span>
          </button>
        </Reveal>
      ))}
    </div>
  );
}
