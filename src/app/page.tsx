"use client";

import { useState, useRef, useEffect } from "react";
import PasswordGate from "@/components/PasswordGate";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LettersSection from "@/components/LettersSection";
import MuseumGallery from "@/components/MuseumGallery";
import Footer from "@/components/Footer";

const SESSION_KEY = "love_letters_auth";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [siteVisible, setSiteVisible] = useState(false);

  const lettersSectionRef = useRef<HTMLElement | null>(null);
  const museumSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Check session storage so she doesn't re-enter the password on every refresh
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved === "true") {
      setAuthenticated(true);
      setSiteVisible(true);
    }
  }, []);

  const handleCorrectPassword = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setAuthenticated(true);
    setTimeout(() => setSiteVisible(true), 100);
  };

  const scrollToLetters = () => {
    lettersSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToMuseum = () => {
    museumSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Prevent flash before mount
  if (!mounted) {
    return (
      <div
        className="fixed inset-0"
        style={{ background: "#FDFAF5" }}
      />
    );
  }

  if (!authenticated) {
    return <PasswordGate onCorrectPassword={handleCorrectPassword} />;
  }

  return (
    <div
      style={{
        opacity: siteVisible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <Navbar onLettersClick={scrollToLetters} onMuseumClick={scrollToMuseum} />

      <main>
        <HeroSection
          onOpenLetters={scrollToLetters}
          onViewAll={scrollToLetters}
          onMuseum={scrollToMuseum}
        />

        {/* Subtle divider between hero and letters */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(201, 169, 110, 0.3), transparent)",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        />

        <LettersSection ref={lettersSectionRef} />

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(201, 169, 110, 0.2), transparent)",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        />

        <MuseumGallery ref={museumSectionRef} />
      </main>

      <Footer />
    </div>
  );
}
