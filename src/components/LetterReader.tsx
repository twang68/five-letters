"use client";

import { useEffect, useState } from "react";
import { formatDate, getUnlockDate } from "@/lib/utils";

interface LetterReaderProps {
  week: number;
  title: string;
  body: string;
  onClose: () => void;
}

export default function LetterReader({ week, title, body, onClose }: LetterReaderProps) {
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(true);
  const unlockDate = getUnlockDate(week);

  useEffect(() => {
    // Envelope animation then show letter
    setTimeout(() => setOpening(false), 600);
    setTimeout(() => setVisible(true), 700);

    // Lock scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 400);
  };

  // Render paragraphs
  const paragraphs = body.split("\n\n").filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4 modal-backdrop"
      style={{
        background: "rgba(44, 24, 16, 0.55)",
        opacity: 1,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Envelope animation overlay */}
      {opening && (
        <div
          className="fixed inset-0 flex items-center justify-center z-60 pointer-events-none"
          style={{ zIndex: 60 }}
        >
          <div
            className="text-7xl envelope-opening"
            style={{ animationDuration: "0.6s" }}
          >
            💌
          </div>
        </div>
      )}

      {/* Letter paper */}
      <div
        className="relative w-full max-w-xl mx-auto rounded-2xl overflow-hidden"
        style={{
          background: "#FDFAF5",
          boxShadow: "0 20px 80px rgba(44, 24, 16, 0.25), 0 4px 20px rgba(44, 24, 16, 0.1)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        {/* Top decorative bar */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(to right, #C9A96E, #A8864A, #C9A96E)",
          }}
        />

        {/* Letter content */}
        <div className="px-8 pt-10 pb-12 md:px-12 md:pt-12 md:pb-14">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: "rgba(44, 24, 16, 0.06)",
              color: "#6B4226",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(44, 24, 16, 0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(44, 24, 16, 0.06)";
            }}
            aria-label="Close letter"
          >
            <span className="text-xs">✕</span>
          </button>

          {/* Wax seal / header decoration */}
          <div className="flex justify-center mb-8">
            <div className="wax-seal">
              <span className="text-xl font-serif text-white font-bold" style={{ fontSize: "22px", lineHeight: 1 }}>
                ♡
              </span>
            </div>
          </div>

          {/* Week label */}
          <p
            className="text-center font-body text-xs tracking-widest uppercase mb-2"
            style={{
              color: "#C9A96E",
              letterSpacing: "0.25em",
              fontSize: "10px",
            }}
          >
            Week {week}  ·  {formatDate(unlockDate)}
          </p>

          {/* Title */}
          <h2
            className="font-serif text-center mb-2"
            style={{
              color: "#2C1810",
              fontSize: "1.75rem",
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h2>

          {/* Gold divider */}
          <div className="gold-divider mx-auto mb-8" style={{ width: "60px" }} />

          {/* Letter body */}
          <div className="font-body text-base leading-relaxed space-y-5">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  color: "#2C1810",
                  lineHeight: "1.95",
                  fontSize: "1rem",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Closing */}
          <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(201, 169, 110, 0.15)" }}>
            <p
              className="font-serif text-center italic"
              style={{
                color: "#6B4226",
                fontSize: "0.95rem",
                opacity: 0.7,
              }}
            >
              I love you. I'll see you soon.
            </p>
          </div>

          {/* Back button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleClose}
              className="px-6 py-3 rounded-xl font-body text-xs tracking-widest uppercase transition-all duration-200 border"
              style={{
                color: "#6B4226",
                borderColor: "rgba(201, 169, 110, 0.3)",
                letterSpacing: "0.15em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(201, 169, 110, 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              ← Back to letters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
