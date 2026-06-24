"use client";

import { useEffect, useState } from "react";
import { COPY, HER_NAME } from "@/lib/content";

interface HeroSectionProps {
  onOpenLetters: () => void;
  onViewAll: () => void;
  onMuseum: () => void;
}

export default function HeroSection({
  onOpenLetters,
  onViewAll,
  onMuseum,
}: HeroSectionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #F5EDD8 0%, #FAF5EC 50%, #FDFAF5 100%)",
      }}
    >
      {/* Soft background orbs */}
      <div
        className="absolute top-20 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #E8C4C0, transparent)" }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A96E, transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Eyebrow */}
        <p
          className="font-body text-xs tracking-widest uppercase mb-6"
          style={{
            color: "#C9A96E",
            letterSpacing: "0.25em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}
        >
          For {HER_NAME}
        </p>

        {/* Main heading */}
        <h1
          className="font-serif mb-6"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            lineHeight: "1.15",
            color: "#2C1810",
            fontWeight: 600,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          {COPY.heroTitle}
        </h1>

        {/* Gold divider */}
        <div
          className="gold-divider mx-auto mb-8"
          style={{
            width: "80px",
            opacity: visible ? 0.6 : 0,
            transition: "opacity 0.8s ease 0.35s",
          }}
        />

        {/* Body text */}
        <p
          className="font-body text-base leading-relaxed mb-12 mx-auto"
          style={{
            color: "#4A2C1A",
            maxWidth: "520px",
            lineHeight: "1.9",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
          }}
        >
          {COPY.heroBody}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col items-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s",
          }}
        >
          {/* Primary button */}
          <button
            onClick={onOpenLetters}
            className="px-10 py-4 rounded-2xl font-body text-sm tracking-widest uppercase font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #C9A96E, #A8864A)",
              color: "#FDFAF5",
              letterSpacing: "0.15em",
              boxShadow: "0 4px 24px rgba(168, 134, 74, 0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 6px 32px rgba(168, 134, 74, 0.5)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 24px rgba(168, 134, 74, 0.35)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Open This Week's Letter
          </button>

          {/* Secondary button */}
          <button
            onClick={onViewAll}
            className="px-8 py-3 rounded-2xl font-body text-sm tracking-widest uppercase transition-all duration-300 border"
            style={{
              background: "transparent",
              color: "#6B4226",
              letterSpacing: "0.15em",
              borderColor: "rgba(201, 169, 110, 0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(201, 169, 110, 0.08)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(201, 169, 110, 0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(201, 169, 110, 0.4)";
            }}
          >
            View All Letters
          </button>

          {/* Tertiary link */}
          <button
            onClick={onMuseum}
            className="font-body text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              color: "#6B4226",
              letterSpacing: "0.15em",
              opacity: 0.5,
              marginTop: "4px",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.opacity = "0.8";
              (e.target as HTMLElement).style.color = "#C9A96E";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.opacity = "0.5";
              (e.target as HTMLElement).style.color = "#6B4226";
            }}
          >
            Museum of Us ↓
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: visible ? 0.35 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <div
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(201, 169, 110, 0.6))",
          }}
        />
        <p
          className="font-body text-xs tracking-widest uppercase"
          style={{ color: "#6B4226", letterSpacing: "0.2em", fontSize: "9px" }}
        >
          Scroll
        </p>
      </div>
    </section>
  );
}
