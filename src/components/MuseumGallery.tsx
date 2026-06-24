"use client";

import { useState, forwardRef } from "react";
import Image from "next/image";
import { MUSEUM_ITEMS } from "@/lib/content";

const CATEGORIES = [
  "All",
  "Favorite Moments",
  "Places We've Been",
  "Little Things I Love",
  "Us Being Us",
];

const MuseumGallery = forwardRef<HTMLElement>((_, ref) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItem, setOpenItem] = useState<(typeof MUSEUM_ITEMS)[0] | null>(null);

  const filtered =
    activeCategory === "All"
      ? MUSEUM_ITEMS
      : MUSEUM_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <>
      <section
        ref={ref}
        className="py-20 px-6"
        style={{
          background: "linear-gradient(to bottom, #FDFAF5, #FAF5EC)",
        }}
        id="museum"
      >
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <p
              className="font-body text-xs tracking-widest uppercase mb-4"
              style={{
                color: "#C9A96E",
                letterSpacing: "0.25em",
                fontSize: "10px",
              }}
            >
              A Private Gallery
            </p>
            <h2
              className="font-serif mb-4"
              style={{
                color: "#2C1810",
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                fontWeight: 600,
              }}
            >
              The Museum of Us
            </h2>
            <div className="gold-divider mx-auto mb-5" style={{ width: "60px" }} />
            <p
              className="font-body text-sm"
              style={{ color: "#4A2C1A", opacity: 0.65, maxWidth: "380px", margin: "0 auto", lineHeight: "1.8" }}
            >
              A quiet collection of the moments that make up us.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full font-body text-xs tracking-wider uppercase transition-all duration-200"
                style={{
                  background:
                    activeCategory === cat
                      ? "linear-gradient(135deg, #C9A96E, #A8864A)"
                      : "transparent",
                  color: activeCategory === cat ? "#FDFAF5" : "#6B4226",
                  border: `1px solid ${
                    activeCategory === cat
                      ? "transparent"
                      : "rgba(201, 169, 110, 0.3)"
                  }`,
                  letterSpacing: "0.12em",
                  fontSize: "10px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <MuseumItem
                key={item.id}
                item={item}
                index={i}
                onOpen={() => setOpenItem(item)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p
                className="font-serif italic text-lg"
                style={{ color: "#6B4226", opacity: 0.4 }}
              >
                No memories here yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {openItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 modal-backdrop"
          style={{ background: "rgba(44, 24, 16, 0.7)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenItem(null);
          }}
        >
          <div
            className="relative max-w-lg w-full rounded-2xl overflow-hidden"
            style={{
              background: "#FDFAF5",
              boxShadow: "0 20px 80px rgba(44, 24, 16, 0.3)",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setOpenItem(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
              style={{ background: "rgba(253, 250, 245, 0.9)", color: "#6B4226" }}
            >
              <span className="text-xs">✕</span>
            </button>

            {/* Image */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={openItem.imageUrl}
                alt={openItem.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Caption */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="font-serif text-lg"
                  style={{ color: "#2C1810", fontWeight: 500 }}
                >
                  {openItem.title}
                </h3>
                <span
                  className="font-body text-xs ml-4 mt-1 whitespace-nowrap"
                  style={{ color: "#C9A96E", opacity: 0.8 }}
                >
                  {openItem.date}
                </span>
              </div>
              <p
                className="font-body text-xs mb-2"
                style={{ color: "#6B4226", opacity: 0.5, letterSpacing: "0.05em" }}
              >
                📍 {openItem.location}
              </p>
              <div className="gold-divider my-4" />
              <p
                className="font-body text-sm italic leading-relaxed"
                style={{ color: "#4A2C1A", lineHeight: "1.8" }}
              >
                "{openItem.caption}"
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

MuseumGallery.displayName = "MuseumGallery";

// MuseumItem sub-component
function MuseumItem({
  item,
  index,
  onOpen,
}: {
  item: (typeof MUSEUM_ITEMS)[0];
  index: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="cursor-pointer group"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Frame */}
      <div
        className="relative rounded-xl overflow-hidden mb-3 museum-frame"
        style={{
          aspectRatio: index % 3 === 1 ? "3/4" : "4/3",
          boxShadow: hovered
            ? "0 8px 40px rgba(44, 24, 16, 0.2)"
            : "0 3px 16px rgba(44, 24, 16, 0.1)",
          transition: "box-shadow 0.4s ease, transform 0.4s ease",
          transform: hovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
          unoptimized
        />
        {/* Overlay on hover */}
        <div
          className="absolute inset-0 flex items-end p-4"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(44, 24, 16, 0.6), transparent)"
              : "linear-gradient(to top, rgba(44, 24, 16, 0.2), transparent)",
            transition: "background 0.3s ease",
          }}
        >
          {hovered && (
            <p
              className="font-body text-xs text-white italic"
              style={{ opacity: 0.9, lineHeight: "1.6" }}
            >
              {item.caption}
            </p>
          )}
        </div>
      </div>

      {/* Museum label */}
      <div className="px-1">
        <h4
          className="font-serif text-sm mb-0.5"
          style={{ color: "#2C1810", fontWeight: 500 }}
        >
          {item.title}
        </h4>
        <div className="flex items-center gap-2">
          <span
            className="font-body text-xs"
            style={{ color: "#C9A96E", fontSize: "10px" }}
          >
            {item.date}
          </span>
          <span
            className="font-body text-xs"
            style={{ color: "#6B4226", opacity: 0.4, fontSize: "10px" }}
          >
            · {item.location}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MuseumGallery;
