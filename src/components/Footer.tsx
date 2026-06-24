"use client";

import { useState } from "react";
import { HER_NAME } from "@/lib/content";

export default function Footer() {
  const [easterEgg, setEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleHeartClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setEasterEgg(true);
    }
  };

  return (
    <footer
      className="py-12 px-6 text-center"
      style={{ background: "#2C1810" }}
    >
      <div className="max-w-lg mx-auto">
        {/* Easter egg message */}
        {easterEgg && (
          <div
            className="mb-6 px-6 py-5 rounded-xl"
            style={{
              background: "rgba(201, 169, 110, 0.1)",
              border: "1px solid rgba(201, 169, 110, 0.2)",
            }}
          >
            <p
              className="font-serif italic text-base"
              style={{ color: "#C9A96E", lineHeight: "1.8" }}
            >
              "You found it. 🤍{" "}
              <br />
              I hid this here because I knew you'd be curious enough to look."
            </p>
          </div>
        )}

        {/* Heart (click 5 times for easter egg) */}
        <button
          onClick={handleHeartClick}
          className="text-2xl mb-5 block mx-auto transition-transform duration-150"
          style={{
            transform: clickCount > 0 && !easterEgg ? `scale(${1 + clickCount * 0.05})` : "scale(1)",
            filter: easterEgg ? "drop-shadow(0 0 12px rgba(201, 169, 110, 0.6))" : "none",
          }}
          aria-label="A heart"
          title="..."
        >
          {easterEgg ? "✨" : "♡"}
        </button>

        {/* Divider */}
        <div
          className="gold-divider mx-auto mb-6"
          style={{ width: "48px", opacity: 0.3 }}
        />

        {/* Text */}
        <p
          className="font-serif italic text-sm mb-3"
          style={{ color: "#C9A96E", opacity: 0.7, lineHeight: "1.8" }}
        >
          Made with intention, for {HER_NAME}.
        </p>
        <p
          className="font-body text-xs"
          style={{
            color: "#C9A96E",
            opacity: 0.3,
            letterSpacing: "0.15em",
            fontSize: "9px",
          }}
        >
          FIVE LETTERS · ACROSS THE DISTANCE
        </p>
      </div>
    </footer>
  );
}
