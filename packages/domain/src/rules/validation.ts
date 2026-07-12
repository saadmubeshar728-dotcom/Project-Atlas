import type { RawLeadInput, ValidationResult } from "../types/lead";

/**
 * docs/06-Rule-Engine-Specification.md, section 3.
 * A lead is valid if it has a business name AND at least one contact method
 * (phone, email, or website).
 */
export function validateLead(input: RawLeadInput): ValidationResult {
  const errors: string[] = [];

  if (!input.businessName || input.businessName.trim().length === 0) {
    errors.push("Business name is required.");
  }

  const hasContactMethod = Boolean(
    input.phone?.trim() || input.email?.trim() || input.website?.trim()
  );

  if (!hasContactMethod) {
    errors.push("At least one contact method (phone, email, or website) is required.");
  }

  return { valid: errors.length === 0, errors };
}

/**
 * docs/06-Rule-Engine-Specification.md, section 3 "Data Cleanup".
 * Trims whitespace, lowercases URLs, normalizes phone formatting,
 * and converts empty strings to null.
 */
export function cleanLeadData(input: RawLeadInput): RawLeadInput {
  const trim = (v?: string) => v?.trim().replace(/\s+/g, " ") || undefined;
  const emptyToUndefined = (v?: string) => (v && v.length > 0 ? v : undefined);

  return {
    ...input,
    businessName: trim(input.businessName) ?? "",
    phone: emptyToUndefined(normalizePhone(trim(input.phone))),
    email: emptyToUndefined(trim(input.email)?.toLowerCase()),
    website: emptyToUndefined(normalizeUrl(trim(input.website))),
    address: emptyToUndefined(trim(input.address)),
    city: emptyToUndefined(trim(input.city)),
    country: emptyToUndefined(trim(input.country)),
  };
}

function normalizePhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  // Keep digits and a single leading "+" for country codes; drop separators like
  // dashes, dots, and repeated parentheses/spaces.
  const hasLeadingPlus = phone.trim().startsWith("+");
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length ? (hasLeadingPlus ? `+${digits}` : digits) : undefined;
}

function normalizeUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return url.toLowerCase().replace(/\/+$/, "");
}
