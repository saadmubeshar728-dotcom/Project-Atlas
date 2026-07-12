import type { Category, RawLeadInput } from "../types/lead";

export const UNCATEGORIZED = "Uncategorized";

/**
 * docs/06-Rule-Engine-Specification.md, section 7.
 * V1 matching is a simple case-insensitive match against the extension's
 * categoryHint (e.g. Google Maps business type) or the user's category names
 * appearing in the business name. Falls back to Uncategorized.
 *
 * Kept intentionally simple/deterministic per section 9 (Future Improvements
 * defers smarter matching to later versions).
 */
export function matchCategory(
  input: RawLeadInput,
  userCategories: Category[]
): Category | null {
  if (userCategories.length === 0) return null;

  const hint = input.categoryHint?.toLowerCase().trim();
  const name = input.businessName?.toLowerCase() ?? "";

  for (const category of userCategories) {
    const categoryName = category.name.toLowerCase();
    if (hint && (hint === categoryName || hint.includes(categoryName))) {
      return category;
    }
    if (name.includes(categoryName)) {
      return category;
    }
  }

  return null;
}
