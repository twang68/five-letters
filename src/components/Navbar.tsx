"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  onLettersClick: () => void;
  onMuseumClick: () => void;
}

export default function Navbar({ onLettersClick, onMuseumClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(253, 250, 245, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201, 169, 110, 0.15)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(44, 24, 16, 0.06)" : "none",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <span className="text-lg" aria-label="envelope">💌</span>
          <span
            className="font-serif text-sm tracking-widest uppercase"
            style={{ color: "#6B4226", letterSpacing: "0.15em" }}
          >
            Five Letters
          </span>
        </button>

        {/* Navigation links */}
        <div className="flex items-center gap-8">
          <button
            onClick={onLettersClick}
            className="font-body text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              color: "#6B4226",
              letterSpacing: "0.15em",
              opacity: 0.7,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.opacity = "1";
              (e.target as HTMLElement).style.color = "#C9A96E";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.opacity = "0.7";
              (e.target as HTMLElement).style.color = "#6B4226";
            }}
          >
            Letters
          </button>
          <button
            onClick={onMuseumClick}
            className="font-body text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              color: "#6B4226",
              letterSpacing: "0.15em",
              opacity: 0.7,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.opacity = "1";
              (e.target as HTMLElement).style.color = "#C9A96E";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.opacity = "0.7";
              (e.target as HTMLElement).style.color = "#6B4226";
            }}
          >
            Museum
          </button>
        </div>
      </div>
    </nav>
  );
}
