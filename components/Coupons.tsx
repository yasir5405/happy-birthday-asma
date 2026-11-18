"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const KEY = "birthday-coupons-redeemed";

export default function Coupons({ items }: { items: { title: string; note: string }[] }) {
  const [redeemed, setRedeemed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setRedeemed(saved);
    } catch {}
  }, []);

  const redeem = (title: string) => {
    setRedeemed((r) => {
      const next = r.includes(title) ? r : [...r, title];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className="coupons">
      {items.map((c, i) => {
        const used = redeemed.includes(c.title);
        return (
          <Reveal key={c.title} delay={(i % 3) * 120}>
            <div className={`coupon ${used ? "is-used" : ""}`}>
              <div className="coupon-body">
                <span className="coupon-kicker">Good for one</span>
                <h3 className="coupon-title">{c.title}</h3>
                <p className="coupon-note">{c.note}</p>
              </div>
              <div className="coupon-stub">
                {used ? (
                  <span className="coupon-claim">Show me to claim ♥</span>
                ) : (
                  <button className="coupon-btn" onClick={() => redeem(c.title)}>
                    Redeem
                  </button>
                )}
              </div>
              <span className="coupon-stamp" aria-hidden>
                Redeemed
              </span>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
