import { validateLead, cleanLeadData } from "./rules/validation";
import { findDuplicate } from "./rules/duplicate-detection";
import { matchCategory, UNCATEGORIZED } from "./rules/category-matching";
import { calculateScore } from "./rules/scoring";
import { assignPriority } from "./rules/priority";
import type { Category, Lead, RawLeadInput } from "./types/lead";

export interface RuleEngineDeps {
  /** Candidate leads to check against for duplicates (already loaded by the caller). */
  existingLeads: Lead[];
  /** The user's defined categories. */
  categories: Category[];
}

export type RuleEngineResult =
  | { status: "rejected"; errors: string[] }
  | { status: "duplicate"; matchedLeadId?: number; matchedOn?: string[] }
  | { status: "accepted"; lead: Omit<Lead, "id"> };

/**
 * docs/06-Rule-Engine-Specification.md, section 8 (Rule Processing Order):
 * Import -> Validate -> Clean Data -> Check Duplicate -> Assign Category ->
 * Calculate Score -> Assign Priority -> Save Lead.
 *
 * This function performs everything up to (not including) "Save Lead" -
 * persistence is the caller's job (see @atlas/infrastructure LeadRepository
 * and @atlas/application ImportService), keeping this package free of I/O
 * per Architecture Spec section 9.
 */
export function processLead(
  rawInput: RawLeadInput,
  deps: RuleEngineDeps
): RuleEngineResult {
  const validation = validateLead(rawInput);
  if (!validation.valid) {
    return { status: "rejected", errors: validation.errors };
  }

  const cleaned = cleanLeadData(rawInput);

  const duplicateCheck = findDuplicate(cleaned, deps.existingLeads);
  if (duplicateCheck.isDuplicate) {
    return {
      status: "duplicate",
      matchedLeadId: duplicateCheck.matchedLeadId,
      matchedOn: duplicateCheck.matchedOn,
    };
  }

  const category = matchCategory(cleaned, deps.categories);
  const score = calculateScore(cleaned, category !== null);
  const priority = assignPriority(score);
  const now = new Date().toISOString();

  const lead: Omit<Lead, "id"> = {
    businessName: cleaned.businessName,
    phone: cleaned.phone ?? null,
    email: cleaned.email ?? null,
    website: cleaned.website ?? null,
    address: cleaned.address ?? null,
    city: cleaned.city ?? null,
    country: cleaned.country ?? null,
    source: cleaned.source,
    categoryId: category?.id ?? null,
    score,
    priority,
    notes: null,
    importedAt: now,
    updatedAt: now,
  };

  return { status: "accepted", lead };
}

export { UNCATEGORIZED };
