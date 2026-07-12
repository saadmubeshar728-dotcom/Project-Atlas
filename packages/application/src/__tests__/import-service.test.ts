import { beforeEach, describe, expect, it } from "vitest";
import Database from "better-sqlite3";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ActivityRepository,
  CategoryRepository,
  LeadRepository,
} from "@atlas/infrastructure";
import type { RawLeadInput } from "@atlas/domain";
import { ImportService } from "../services/import-service";

// Resolves schema.sql from the infrastructure package rather than duplicating it.
function createTestDb() {
  const schemaPath = join(
    require.resolve("@atlas/infrastructure/package.json"),
    "../src/database/schema.sql"
  );
  const db = new Database(":memory:");
  db.pragma("foreign_keys = ON");
  db.exec(readFileSync(schemaPath, "utf-8"));
  return db;
}

describe("ImportService", () => {
  let importService: ImportService;
  let leadRepository: LeadRepository;
  let categoryRepository: CategoryRepository;

  beforeEach(() => {
    const db = createTestDb();
    leadRepository = new LeadRepository(db);
    categoryRepository = new CategoryRepository(db);
    const activityRepository = new ActivityRepository(db);
    importService = new ImportService(leadRepository, categoryRepository, activityRepository);
    categoryRepository.create({ name: "Dentist", color: "#1D9E75" });
  });

  it("accepts, categorizes, and persists a batch mirroring the extension payload example", async () => {
    // Payload shape matches docs/04-Architecture-Specification.md section 8.
    const batch: RawLeadInput[] = [
      {
        source: "google_maps",
        businessName: "ABC Dental Clinic",
        phone: "+1 555-123-4567",
        website: "https://abcdental.com",
        categoryHint: "Dentist",
      },
    ];

    const outcome = await importService.importLeads(batch);

    expect(outcome.accepted).toBe(1);
    expect(outcome.rejected).toBe(0);

    const stored = leadRepository.list();
    expect(stored).toHaveLength(1);
    expect(stored[0].categoryId).not.toBeNull();
    expect(stored[0].priority).toBe("Yellow"); // name + phone + website + category = 60
  });

  it("rejects a batch entry with no business name without touching valid entries", async () => {
    const batch: RawLeadInput[] = [
      { source: "google_search", businessName: "", phone: "123" },
      { source: "google_search", businessName: "Valid Co", phone: "456" },
    ];

    const outcome = await importService.importLeads(batch);

    expect(outcome.rejected).toBe(1);
    expect(outcome.accepted).toBe(1);
  });

  it("counts a second import of the same business as a duplicate, not a new row", async () => {
    const lead: RawLeadInput = {
      source: "company_website",
      businessName: "Repeat Co",
      email: "hi@repeat.co",
    };

    await importService.importLeads([lead]);
    const outcome = await importService.importLeads([lead]);

    expect(outcome.duplicates).toBe(1);
    expect(leadRepository.list()).toHaveLength(1);
  });
});
