/**
 * Domain types for leads.
 * Field set mirrors docs/05-Database-Design.md "leads" table.
 */

export type LeadSource = "google_maps" | "google_search" | "company_website";

export type Priority = "Green" | "Yellow" | "Red";

/** Raw payload as sent by the browser extension (docs/04, section 8: Communication). */
export interface RawLeadInput {
  source: LeadSource;
  businessName: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  rating?: number;
  categoryHint?: string;
}

/** A lead after cleanup, validation, scoring, and priority assignment. */
export interface Lead {
  id?: number;
  businessName: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  source: LeadSource;
  categoryId: number | null;
  score: number;
  priority: Priority;
  notes: string | null;
  importedAt: string;
  updatedAt: string;
}

export interface Category {
  id?: number;
  name: string;
  color: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  matchedLeadId?: number;
  matchedOn?: Array<"businessName" | "website" | "phone">;
}
