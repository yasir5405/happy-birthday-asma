import type { CSSProperties } from "react";
import { content } from "@/lib/content";
import Petals from "@/components/Petals";
import Reveal from "@/components/Reveal";
import TimeTogether from "@/components/TimeTogether";
import Letter from "@/components/Letter";
import Wish from "@/components/Wish";
import Gallery from "@/components/Gallery";
import { getPhotos } from "@/lib/photos";
import Rose from "@/components/Rose";
import OpenWhen from "@/components/OpenWhen";
import Coupons from "@/components/Coupons";
import Stars from "@/components/Stars";

const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"];

export default function Home() {
  const photos = getPhotos();

  // Split the name into words so spaces survive and each word stays together.
  const words = content.name.trim().split(/\s+/);
  const offsets = words.map((_, w) => words.slice(0, w).join("").length);
  const longestWord = Math.max(...words.map((w) => w.length));

  return (
    <>
      <Petals />
      <main>
        {/* ── Hero ───────────────────────────────── */}
        <section className="hero">
          <Rose className="hero-rose" />
          <p className="eyebrow hero-fade" style={{ "--d": "1.6s" } as CSSProperties}>
            {content.birthday}
          </p>
          <h1 className="hero-title">
            <span className="hero-greeting hero-fade" style={{ "--d": "1.85s" } as CSSProperties}>
              Happy Birthday meri laadliii
            </span>
            <span className="hero-name" aria-label={content.name} style={{ "--n": longestWord } as CSSProperties}>
              {words.map((word, w) => (
                <span key={w} className="hero-word" aria-hidden>
                  {[...word].map((ch, i) => (
                    <span key={i} style={{ "--i": offsets[w] + i } as CSSProperties}>
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>
          <span className="hero-rule" aria-hidden />
          <p className="hero-sub hero-fade" style={{ "--d": "3.3s" } as CSSProperties}>
            {content.heroLine}
          </p>
          <div className="scroll-cue hero-fade" style={{ "--d": "4s" } as CSSProperties} aria-hidden>
            <span />
          </div>
        </section>

        {/* ── Time together ─────────────────────── */}
        <section className="section">
          <Reveal>
            <p className="eyebrow">Us, so far</p>
            <h2 className="section-title">
              Every moment <em>counted</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <TimeTogether since={content.togetherSince} />
          </Reveal>
        </section>

        {/* ── Chapters ─────────────────────────── */}
        <section className="section">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="section-title">
              Six chapters <em>of us</em>
            </h2>
          </Reveal>
          <ol className="timeline">
            {content.chapters.map((c, i) => (
              <li key={c.year} className={i % 2 ? "right" : "left"}>
                <Reveal className="chapter">
                  <span className="chapter-dot" aria-hidden />
                  <p className="chapter-year">{c.year}</p>
                  <h3 className="chapter-title">{c.title}</h3>
                  <p className="chapter-text">{c.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Gallery ──────────────────────────── */}
        {photos.length > 0 && (
          <section className="section section-wide">
            <Reveal>
              <p className="eyebrow">Moments I keep close</p>
              <h2 className="section-title">
                A few of <em>my favourites</em>
              </h2>
            </Reveal>
            <Gallery photos={photos} />
          </section>
        )}

        {/* ── Reasons ──────────────────────────── */}
        <section className="section">
          <Reveal>
            <p className="eyebrow">A short, incomplete list</p>
            <h2 className="section-title">
              Things I love <em>about you</em>
            </h2>
          </Reveal>
          <div className="reasons">
            {content.reasons.map((r, i) => (
              <Reveal key={i} delay={(i % 4) * 110} className="reason">
                <span className="reason-num">{roman[i]}.</span>
                <p>{r}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Open when ────────────────────────── */}
        <section className="section">
          <Reveal>
            <p className="eyebrow">For later</p>
            <h2 className="section-title">
              Open when<em>…</em>
            </h2>
            <p className="section-lead">Little notes for whenever you need them. Tap one to open it.</p>
          </Reveal>
          <OpenWhen items={content.openWhen} />
        </section>

        {/* ── Letter ───────────────────────────── */}
        <section className="section">
          <Reveal>
            <p className="eyebrow">Something I wrote for you</p>
            <h2 className="section-title">
              A letter, <em>sealed with love</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <Letter name={content.name} letter={content.letter} />
          </Reveal>
        </section>

        {/* ── Future ───────────────────────────── */}
        <section className="night">
          <Stars />
          <div className="night-inner">
            <Reveal>
              <p className="eyebrow">Still to come</p>
              <h2 className="section-title">
                Everything I want <em>to do with you</em>
              </h2>
            </Reveal>
            <ul className="future">
              {content.future.map((f, i) => (
                <li key={i}>
                  <Reveal delay={i * 90}>
                    <span className="future-star" aria-hidden>
                      ✦
                    </span>
                    {f}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Coupons ──────────────────────────── */}
        <section className="section">
          <Reveal>
            <p className="eyebrow">Your birthday gifts</p>
            <h2 className="section-title">
              Coupons, <em>valid forever</em>
            </h2>
            <p className="section-lead">No expiry date. Tap redeem, then show me the screen.</p>
          </Reveal>
          <Coupons items={content.coupons} />
        </section>

        {/* ── Wish ─────────────────────────────── */}
        <section className="section wish-section">
          <Reveal>
            <p className="eyebrow">One more thing</p>
            <h2 className="section-title">
              Make a <em>wish</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <Wish prompt={content.wish.prompt} after={content.wish.after} />
          </Reveal>
        </section>

        <footer className="footer">
          <Reveal>
            <p className="footer-line">{content.closing}</p>
            <p className="footer-heart" aria-hidden>
              ♥
            </p>
          </Reveal>
        </footer>
      </main>
    </>
  );
}
