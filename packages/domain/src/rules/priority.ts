import type { Priority } from "../types/lead";

/**
 * docs/06-Rule-Engine-Specification.md, section 6.
 * 75-100 -> Green (High), 45-74 -> Yellow (Medium), 0-44 -> Red (Low).
 * Priority is derived, never set directly - do not expose a setter for it
 * on Lead elsewhere in the codebase.
 */
export function assignPriority(score: number): Priority {
  if (score >= 75) return "Green";
  if (score >= 45) return "Yellow";
  return "Red";
}
