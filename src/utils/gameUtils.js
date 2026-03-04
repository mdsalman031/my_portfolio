import { MAX_LEVEL, XP_PER_LEVEL } from "../data/portfolioData";

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export function getLevel(xp) {
  return clamp(Math.floor(xp / XP_PER_LEVEL) + 1, 1, MAX_LEVEL);
}

export function getLevelProgress(xp) {
  return (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
}
