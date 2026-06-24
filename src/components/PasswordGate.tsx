"use client";

import { useState, useRef, useEffect } from "react";
import { SITE_PASSWORD, COPY } from "@/lib/content";

interface PasswordGateProps {
  onCorrectPassword: () => void;
}

export default function PasswordGate({ onCorrectPassword }: PasswordGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fade in
    setTimeout(() => setVisible(true), 100);
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (value.toLowerCase().trim() === SITE_PASSWORD.toLowerCase().trim()) {
      setError(false);
      onCorrectPassword();
    } else {
      setError(true);
      setShaking(true);
      setValue("");
      setTimeout(() => setShaking(false), 500);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #F5EDD8 0%, #FAF5EC 40%, #FDFAF5 100%)",
      }}
    >
      {/* Soft background orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #E8C4C0 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #C9A96E 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-8 max-w-sm mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        {/* Envelope icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div
              className="w-20 h-20 flex items-center justify-center"
              style={{
                fontSize: "52px",
                filter: "drop-shadow(0 4px 12px rgba(201, 169, 110, 0.3))",
              }}
            >
              💌
            </div>
          </div>
        </div>

        {/* Message */}
        <p
          className="font-serif text-2xl text-espresso mb-3 tracking-wide"
          style={{ color: "#2C1810" }}
        >
          {COPY.passwordPageMessage}
        </p>
        <p
          className="font-body text-sm mb-10 tracking-widest uppercase"
          style={{ color: "#6B4226", letterSpacing: "0.15em", opacity: 0.7 }}
        >
          {COPY.passwordPageSubtext}
        </p>

        {/* Gold divider */}
        <div className="gold-divider mb-10 mx-auto w-24" />

        {/* Password input */}
        <div
          className={`relative mb-4 ${shaking ? "animate-pulse" : ""}`}
          style={{
            transform: shaking ? "translateX(-8px)" : "translateX(0)",
            transition: "transform 0.1s ease",
          }}
        >
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter your word"
            className="w-full px-6 py-4 text-center font-body text-base tracking-widest rounded-2xl border outline-none transition-all duration-200"
            style={{
              background: "rgba(253, 250, 245, 0.9)",
              borderColor: error
                ? "rgba(220, 100, 80, 0.5)"
                : "rgba(201, 169, 110, 0.3)",
              color: "#2C1810",
              boxShadow: error
                ? "0 0 0 2px rgba(220, 100, 80, 0.2)"
                : "0 2px 20px rgba(44, 24, 16, 0.06), inset 0 1px 3px rgba(44, 24, 16, 0.04)",
              letterSpacing: "0.25em",
            }}
          />
        </div>

        {/* Error */}
        <div
          style={{
            opacity: error ? 1 : 0,
            height: error ? "24px" : "0",
            overflow: "hidden",
            transition: "opacity 0.3s ease, height 0.3s ease",
          }}
        >
          <p
            className="text-xs font-body mb-4"
            style={{ color: "#C0392B", letterSpacing: "0.05em" }}
          >
            That's not quite right. Try again.
          </p>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 px-8 rounded-2xl font-body text-sm tracking-widest uppercase font-medium transition-all duration-300 mt-2"
          style={{
            background: "linear-gradient(135deg, #C9A96E, #A8864A)",
            color: "#FDFAF5",
            letterSpacing: "0.2em",
            boxShadow: "0 4px 20px rgba(168, 134, 74, 0.3)",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.boxShadow =
              "0 6px 28px rgba(168, 134, 74, 0.45)";
            (e.target as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.boxShadow =
              "0 4px 20px rgba(168, 134, 74, 0.3)";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          {COPY.passwordButtonText}
        </button>

        {/* Decorative footer text */}
        <p
          className="mt-10 font-body text-xs"
          style={{ color: "#6B4226", opacity: 0.4, letterSpacing: "0.1em" }}
        >
          made with love
        </p>
      </div>
    </div>
  );
}
