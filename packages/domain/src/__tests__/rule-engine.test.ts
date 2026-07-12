import { describe, expect, it } from "vitest";
import { processLead } from "../rule-engine";
import { calculateScore } from "../rules/scoring";
import { assignPriority } from "../rules/priority";
import { validateLead } from "../rules/validation";
import type { Category, Lead, RawLeadInput } from "../types/lead";

const fullLead: RawLeadInput = {
  source: "google_maps",
  businessName: "Bright Smiles Dental",
  phone: "+1 555-123-4567",
  email: "hello@brightsmiles.com",
  website: "https://BrightSmiles.com/",
  address: "123 Main St",
  city: "Dallas",
  country: "USA",
  rating: 4.8,
  categoryHint: "Dentist",
};

const categories: Category[] = [{ id: 1, name: "Dentist", color: "#1D9E75" }];

describe("validateLead", () => {
  it("rejects a lead with no business name", () => {
    const result = validateLead({ ...fullLead, businessName: "" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Business name is required.");
  });

  it("rejects a lead with a name but no contact method", () => {
    const result = validateLead({
      source: "google_search",
      businessName: "No Contact Co",
    });
    expect(result.valid).toBe(false);
  });

  it("accepts a lead with just a website", () => {
    const result = validateLead({
      source: "company_website",
      businessName: "Website Only Co",
      website: "https://example.com",
    });
    expect(result.valid).toBe(true);
  });
});

describe("calculateScore", () => {
  it("scores a fully-populated lead at 100, capped", () => {
    expect(calculateScore(fullLead, true)).toBe(100);
  });

  it("scores a name-only lead at 10", () => {
    expect(calculateScore({ source: "google_maps", businessName: "X" }, false)).toBe(10);
  });
});

describe("assignPriority", () => {
  it.each([
    [100, "Green"],
    [75, "Green"],
    [74, "Yellow"],
    [45, "Yellow"],
    [44, "Red"],
    [0, "Red"],
  ] as const)("maps score %i to %s", (score, expected) => {
    expect(assignPriority(score)).toBe(expected);
  });
});

describe("processLead", () => {
  it("rejects invalid leads before touching duplicate/scoring logic", () => {
    const result = processLead(
      { source: "google_maps", businessName: "" },
      { existingLeads: [], categories }
    );
    expect(result.status).toBe("rejected");
  });

  it("flags a duplicate by business name match", () => {
    const existing: Lead = {
      id: 1,
      businessName: "Bright Smiles Dental",
      phone: null,
      email: null,
      website: null,
      address: null,
      city: null,
      country: null,
      source: "google_maps",
      categoryId: 1,
      score: 90,
      priority: "Green",
      notes: null,
      importedAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };

    const result = processLead(fullLead, { existingLeads: [existing], categories });
    expect(result.status).toBe("duplicate");
  });

  it("accepts, categorizes, scores, and prioritizes a clean new lead", () => {
    const result = processLead(fullLead, { existingLeads: [], categories });
    expect(result.status).toBe("accepted");
    if (result.status === "accepted") {
      expect(result.lead.categoryId).toBe(1);
      expect(result.lead.score).toBe(100);
      expect(result.lead.priority).toBe("Green");
      // cleanup: lowercased + trailing slash stripped
      expect(result.lead.website).toBe("https://brightsmiles.com");
    }
  });

  it("marks an uncategorized lead when no category matches", () => {
    const result = processLead(
      { source: "google_maps", businessName: "Unrelated Biz", phone: "5551234567" },
      { existingLeads: [], categories }
    );
    expect(result.status).toBe("accepted");
    if (result.status === "accepted") {
      expect(result.lead.categoryId).toBeNull();
    }
  });
});
