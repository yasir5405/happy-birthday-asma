"use client";

import { useState, type CSSProperties } from "react";

type LetterContent = {
  greeting: string;
  paragraphs: string[];
  signature: string;
};

export default function Letter({ name, letter }: { name: string; letter: LetterContent }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`letter ${open ? "is-open" : ""}`}>
      <div className="collapse envelope-wrap">
        <div>
          <button className="envelope" onClick={() => setOpen(true)} aria-expanded={open} disabled={open}>
            <span className="envelope-flap" aria-hidden />
            <span className="envelope-seal" aria-hidden>
              ♥
            </span>
            <span className="envelope-to">For {name}</span>
            <span className="envelope-hint">tap to open</span>
          </button>
        </div>
      </div>

      <div className="collapse paper-wrap" aria-hidden={!open}>
        <div>
          <article className="paper">
            <p className="paper-greeting" style={{ "--i": 0 } as CSSProperties}>
              {letter.greeting}
            </p>
            {letter.paragraphs.map((p, i) => (
              <p key={i} style={{ "--i": i + 1 } as CSSProperties}>
                {p}
              </p>
            ))}
            <p className="paper-sign" style={{ "--i": letter.paragraphs.length + 1 } as CSSProperties}>
              <span>{letter.signature}</span>
              <span className="paper-heart">♥</span>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
