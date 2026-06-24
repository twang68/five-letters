"use client";

import { useState, useEffect } from "react";
import { getTimeUntilUnlock, isLetterUnlocked } from "@/lib/utils";
import { LETTERS } from "@/lib/content";

export default function CountdownToNextLetter() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  const [nextWeek, setNextWeek] = useState<number | null>(null);
  const [allUnlocked, setAllUnlocked] = useState(false);

  useEffect(() => {
    // Find next locked letter
    const findNext = () => {
      for (let i = 1; i <= 5; i++) {
        if (!isLetterUnlocked(i)) return i;
      }
      return null;
    };

    const week = findNext();
    setNextWeek(week);
    setAllUnlocked(week === null);

    if (week === null) return;

    const tick = () => {
      const { days, hours, minutes, seconds, total } = getTimeUntilUnlock(week);
      setTimeLeft({ days, hours, minutes, seconds, total });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (allUnlocked) return null;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="text-center py-12 px-6">
      <p
        className="font-body text-xs tracking-widest uppercase mb-6"
        style={{ color: "#C9A96E", letterSpacing: "0.2em", opacity: 0.8 }}
      >
        {nextWeek ? `Week ${nextWeek} opens in` : ""}
      </p>

      <div className="flex items-center justify-center gap-4 md:gap-8">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Minutes" },
          { value: timeLeft.seconds, label: "Seconds" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-4 md:gap-8">
            <div className="text-center">
              <div
                className="font-serif text-3xl md:text-4xl font-light"
                style={{ color: "#2C1810", letterSpacing: "0.05em" }}
              >
                {pad(value)}
              </div>
              <div
                className="font-body text-xs mt-1 tracking-widest uppercase"
                style={{
                  color: "#6B4226",
                  letterSpacing: "0.15em",
                  opacity: 0.5,
                  fontSize: "9px",
                }}
              >
                {label}
              </div>
            </div>
            {i < 3 && (
              <span
                className="font-serif text-2xl self-start mt-1"
                style={{ color: "#C9A96E", opacity: 0.4 }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
