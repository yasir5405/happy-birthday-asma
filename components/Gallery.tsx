"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import type { Photo } from "@/lib/photos";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length]
  );

  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close, step]);

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <div className="gallery">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={(i % 3) * 120} className="gallery-item">
            <button className="gallery-btn" onClick={() => setIndex(i)} aria-label={`Open photo ${i + 1}`}>
              <Image
                src={p.src}
                width={p.width}
                height={p.height}
                alt={p.alt}
                sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 340px"
              />
            </button>
            {p.caption && <p className="gallery-caption">{p.caption}</p>}
          </Reveal>
        ))}
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <figure className="lightbox-figure" key={current.src} onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.alt}
              sizes="90vw"
              className="lightbox-img"
              priority
            />
            {current.caption && <figcaption>{current.caption}</figcaption>}
          </figure>

          <button className="lb-btn lb-close" onClick={close} aria-label="Close">
            ×
          </button>
          {photos.length > 1 && (
            <>
              <button
                className="lb-btn lb-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                className="lb-btn lb-next"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
              >
                ›
              </button>
              <p className="lb-count">
                {index! + 1} / {photos.length}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
