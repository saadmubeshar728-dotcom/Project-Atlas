import type { RawLeadInput } from "../types/lead";

/**
 * docs/06-Rule-Engine-Specification.md, section 5.
 * Deterministic point-based scoring, capped at 100.
 */
const SCORE_WEIGHTS = {
  businessName: 10,
  phone: 20,
  email: 20,
  website: 20,
  address: 10,
  category: 10,
  rating: 10,
} as const;

export function calculateScore(
  input: RawLeadInput,
  hasCategory: boolean
): number {
  let score = 0;

  if (input.businessName?.trim()) score += SCORE_WEIGHTS.businessName;
  if (input.phone?.trim()) score += SCORE_WEIGHTS.phone;
  if (input.email?.trim()) score += SCORE_WEIGHTS.email;
  if (input.website?.trim()) score += SCORE_WEIGHTS.website;
  if (input.address?.trim()) score += SCORE_WEIGHTS.address;
  if (hasCategory) score += SCORE_WEIGHTS.category;
  if (typeof input.rating === "number" && input.rating > 0) score += SCORE_WEIGHTS.rating;

  return Math.min(score, 100);
}
