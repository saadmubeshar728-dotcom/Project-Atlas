import type { DuplicateCheckResult, Lead, RawLeadInput } from "../types/lead";

/**
 * docs/06-Rule-Engine-Specification.md, section 4.
 * A lead is a possible duplicate if business name, website, or phone matches
 * an existing lead. Matching is case-insensitive on business name and website.
 *
 * This function is pure - it takes the candidate pool (e.g. from
 * LeadRepository.findPossibleMatches in @atlas/infrastructure) so the domain
 * layer never touches SQLite directly (Architecture Spec section 9).
 */
export function findDuplicate(
  candidate: RawLeadInput,
  existingLeads: Lead[]
): DuplicateCheckResult {
  for (const existing of existingLeads) {
    const matchedOn: DuplicateCheckResult["matchedOn"] = [];

    if (
      candidate.businessName &&
      existing.businessName.toLowerCase() === candidate.businessName.toLowerCase()
    ) {
      matchedOn.push("businessName");
    }
    if (
      candidate.website &&
      existing.website &&
      existing.website.toLowerCase() === candidate.website.toLowerCase()
    ) {
      matchedOn.push("website");
    }
    if (candidate.phone && existing.phone && existing.phone === candidate.phone) {
      matchedOn.push("phone");
    }

    if (matchedOn.length > 0) {
      return { isDuplicate: true, matchedLeadId: existing.id, matchedOn };
    }
  }

  return { isDuplicate: false };
}
