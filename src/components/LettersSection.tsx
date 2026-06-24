"use client";

import { useState, forwardRef } from "react";
import { LETTERS } from "@/lib/content";
import { isLetterUnlocked, getCurrentWeek } from "@/lib/utils";
import LetterCard from "./LetterCard";
import LetterReader from "./LetterReader";
import CountdownToNextLetter from "./CountdownToNextLetter";

const LettersSection = forwardRef<HTMLElement>((_, ref) => {
  const [openLetter, setOpenLetter] = useState<(typeof LETTERS)[0] | null>(null);
  const currentWeek = getCurrentWeek();

  return (
    <>
      <section
        ref={ref}
        className="py-20 px-6"
        style={{ background: "#FDFAF5" }}
        id="letters"
      >
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-4">
            <p
              className="font-body text-xs tracking-widest uppercase mb-4"
              style={{
                color: "#C9A96E",
                letterSpacing: "0.25em",
                fontSize: "10px",
              }}
            >
              The Letters
            </p>
            <h2
              className="font-serif mb-4"
              style={{
                color: "#2C1810",
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                fontWeight: 600,
              }}
            >
              One a week, just for you.
            </h2>
            <div className="gold-divider mx-auto" style={{ width: "60px" }} />
          </div>

          {/* Countdown */}
          <CountdownToNextLetter />

          {/* Letter cards */}
          <div className="space-y-4">
            {LETTERS.map((letter) => {
              const unlocked = isLetterUnlocked(letter.week);
              const isFeatured = letter.week === currentWeek && unlocked;

              return (
                <div
                  key={letter.week}
                  className="animate-in"
                  style={{ animationDelay: `${(letter.week - 1) * 0.1}s`, opacity: 0 }}
                >
                  <LetterCard
                    week={letter.week}
                    title={letter.title}
                    previewText={letter.previewText}
                    unlocked={unlocked}
                    isFeatured={isFeatured}
                    onOpen={() => setOpenLetter(letter)}
                  />
                </div>
              );
            })}
          </div>

          {/* All unlocked message */}
          {currentWeek === LETTERS.length && isLetterUnlocked(LETTERS.length) && (
            <div
              className="mt-12 text-center px-8 py-10 rounded-2xl"
              style={{
                background: "rgba(201, 169, 110, 0.06)",
                border: "1px solid rgba(201, 169, 110, 0.2)",
              }}
            >
              <div className="text-3xl mb-4">✨</div>
              <h3
                className="font-serif text-xl mb-3"
                style={{ color: "#2C1810" }}
              >
                Until I See You Again
              </h3>
              <div className="gold-divider mx-auto mb-4" style={{ width: "40px" }} />
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "#4A2C1A", lineHeight: "1.85", maxWidth: "380px", margin: "0 auto" }}
              >
                You read all five. I'm so glad you did.{" "}
                However many miles are between us right now, you have always
                been close to what matters most to me. I'll see you soon. I
                promise.
              </p>
              <p
                className="font-serif italic mt-5 text-sm"
                style={{ color: "#6B4226", opacity: 0.7 }}
              >
                I love you.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Letter reader modal */}
      {openLetter && (
        <LetterReader
          week={openLetter.week}
          title={openLetter.title}
          body={openLetter.body}
          onClose={() => setOpenLetter(null)}
        />
      )}
    </>
  );
});

LettersSection.displayName = "LettersSection";
export default LettersSection;
