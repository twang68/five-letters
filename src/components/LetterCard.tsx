"use client";

import { useState } from "react";
import { formatDate, getUnlockDate, isCloseToUnlocking } from "@/lib/utils";

interface LetterCardProps {
  week: number;
  title: string;
  previewText: string;
  unlocked: boolean;
  isFeatured?: boolean;
  onOpen: () => void;
}

const LOCKED_MESSAGES = [
  "This letter is waiting for the right moment.",
  "Not yet, my love. Come back next week.",
  "This one opens soon.",
  "A little longer. It'll be worth it.",
  "This letter is still yours. It's just not time yet.",
];

export default function LetterCard({
  week,
  title,
  previewText,
  unlocked,
  isFeatured = false,
  onOpen,
}: LetterCardProps) {
  const [hovered, setHovered] = useState(false);
  const unlockDate = getUnlockDate(week);
  const nearlyUnlocked = isCloseToUnlocking(week);
  const lockedMessage = LOCKED_MESSAGES[(week - 1) % LOCKED_MESSAGES.length];

  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        !unlocked && nearlyUnlocked ? "nearly-unlocked" : ""
      }`}
      style={{
        background: unlocked
          ? "#FDFAF5"
          : "rgba(250, 245, 236, 0.7)",
        border: unlocked
          ? "1px solid rgba(201, 169, 110, 0.35)"
          : "1px solid rgba(201, 169, 110, 0.15)",
        boxShadow: hovered && unlocked
          ? "0 8px 40px rgba(44, 24, 16, 0.14)"
          : "0 2px 20px rgba(44, 24, 16, 0.08)",
        transform: hovered && unlocked ? "translateY(-4px)" : "translateY(0)",
        opacity: !unlocked ? 0.75 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={unlocked ? onOpen : undefined}
      role={unlocked ? "button" : undefined}
      tabIndex={unlocked ? 0 : undefined}
      onKeyDown={(e) => {
        if (unlocked && e.key === "Enter") onOpen();
      }}
    >
      {/* Featured badge */}
      {isFeatured && unlocked && (
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full font-body text-xs tracking-widest uppercase"
          style={{
            background: "linear-gradient(135deg, #C9A96E, #A8864A)",
            color: "#FDFAF5",
            letterSpacing: "0.12em",
            fontSize: "9px",
          }}
        >
          This Week
        </div>
      )}

      {/* "Soon" badge for nearly unlocked */}
      {!unlocked && nearlyUnlocked && (
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full font-body text-xs tracking-widest uppercase"
          style={{
            background: "rgba(201, 169, 110, 0.15)",
            color: "#C9A96E",
            letterSpacing: "0.12em",
            border: "1px solid rgba(201, 169, 110, 0.3)",
            fontSize: "9px",
          }}
        >
          Coming Soon
        </div>
      )}

      <div className="p-7 md:p-8">
        {/* Week label */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="font-body text-xs tracking-widest uppercase"
            style={{
              color: unlocked ? "#C9A96E" : "#8B6B47",
              letterSpacing: "0.2em",
              opacity: unlocked ? 1 : 0.5,
              fontSize: "10px",
            }}
          >
            Week {week}
          </span>
          <div
            className="h-px flex-1"
            style={{
              background: unlocked
                ? "linear-gradient(to right, rgba(201, 169, 110, 0.4), transparent)"
                : "rgba(201, 169, 110, 0.12)",
            }}
          />
          {unlocked ? (
            <span style={{ fontSize: "14px" }}>✉️</span>
          ) : (
            <span style={{ fontSize: "14px", opacity: 0.4 }}>🔒</span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-serif mb-3"
          style={{
            color: unlocked ? "#2C1810" : "#4A2C1A",
            fontSize: "1.25rem",
            fontWeight: 500,
            opacity: unlocked ? 1 : 0.5,
          }}
        >
          {title}
        </h3>

        {/* Content */}
        {unlocked ? (
          <>
            <p
              className="font-body text-sm leading-relaxed mb-6"
              style={{
                color: "#4A2C1A",
                opacity: 0.75,
                lineHeight: "1.8",
              }}
            >
              {previewText}
            </p>

            {/* Read button */}
            <div className="flex items-center gap-2 group">
              <span
                className="font-body text-xs tracking-widest uppercase"
                style={{
                  color: "#C9A96E",
                  letterSpacing: "0.15em",
                  fontSize: "10px",
                }}
              >
                Read this letter
              </span>
              <span
                style={{
                  color: "#C9A96E",
                  transform: hovered ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.2s ease",
                  display: "inline-block",
                }}
              >
                →
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Locked state */}
            <p
              className="font-body text-sm mb-4 italic"
              style={{
                color: "#4A2C1A",
                opacity: 0.35,
                lineHeight: "1.7",
                fontStyle: "italic",
              }}
            >
              {lockedMessage}
            </p>
            <p
              className="font-body text-xs"
              style={{
                color: "#6B4226",
                opacity: 0.3,
                fontSize: "10px",
                letterSpacing: "0.05em",
              }}
            >
              Opens {formatDate(unlockDate)}
            </p>
          </>
        )}
      </div>

      {/* Bottom gold accent for unlocked */}
      {unlocked && (
        <div
          className="h-px mx-7 mb-0"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(201, 169, 110, 0.3), transparent)",
          }}
        />
      )}
    </div>
  );
}
