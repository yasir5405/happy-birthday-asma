"use client";

import { useEffect, useState } from "react";

const fmt = (n: number) => n.toLocaleString("en-US");
const pad = (n: number) => String(n).padStart(2, "0");

export default function TimeTogether({ since }: { since: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const start = new Date(since).getTime();
  const diff = now ? Math.max(0, now - start) : 0;
  const days = Math.floor(diff / 864e5);
  const hours = Math.floor(diff / 36e5) % 24;
  const minutes = Math.floor(diff / 6e4) % 60;
  const seconds = Math.floor(diff / 1e3) % 60;
  // ~72 beats per minute
  const heartbeats = Math.floor((diff / 6e4) * 72);

  return (
    <div className={`together ${now ? "is-ready" : ""}`}>
      <div className="together-days">
        <span className="together-big">{fmt(days)}</span>
        <span className="together-label">days together</span>
      </div>
      <div className="together-row">
        <Unit value={pad(hours)} label="hours" />
        <span className="together-sep">·</span>
        <Unit value={pad(minutes)} label="minutes" />
        <span className="together-sep">·</span>
        <Unit value={pad(seconds)} label="seconds" tick />
      </div>
      <p className="together-note">
        …and roughly <strong>{fmt(heartbeats)}</strong> of my heartbeats —<br className="br-sm" /> aur hr dhadkan hr baar thoda aur tmhara hota gyaahh❤️.
      </p>
    </div>
  );
}

function Unit({ value, label, tick }: { value: string; label: string; tick?: boolean }) {
  return (
    <span className="together-unit">
      <span key={tick ? value : undefined} className={tick ? "tick" : undefined}>
        {value}
      </span>
      <small>{label}</small>
    </span>
  );
}
