import { WEEK_ONE_START_DATE, LETTERS } from "./content";

export function getUnlockDate(weekNumber: number): Date {
  const startDate = new Date(WEEK_ONE_START_DATE);
  const unlockDate = new Date(startDate);
  unlockDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
  return unlockDate;
}

export function isLetterUnlocked(weekNumber: number): boolean {
  const now = new Date();
  const unlockDate = getUnlockDate(weekNumber);
  return now >= unlockDate;
}

export function getNextUnlockDate(): Date | null {
  for (let i = 1; i <= LETTERS.length; i++) {
    if (!isLetterUnlocked(i)) {
      return getUnlockDate(i);
    }
  }
  return null;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getTimeUntilUnlock(weekNumber: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const now = new Date();
  const unlockDate = getUnlockDate(weekNumber);
  const diff = unlockDate.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total: diff };
}

export function getCurrentWeek(): number {
  for (let i = LETTERS.length; i >= 1; i--) {
    if (isLetterUnlocked(i)) return i;
  }
  return 0;
}

export function isCloseToUnlocking(weekNumber: number): boolean {
  const timeLeft = getTimeUntilUnlock(weekNumber);
  return timeLeft.total > 0 && timeLeft.total < 1000 * 60 * 60 * 48; // within 48 hours
}
