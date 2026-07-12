import { beforeEach, describe, expect, it } from "vitest";
import Database from "better-sqlite3";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LeadRepository } from "../repositories/lead-repository";
import { CategoryRepository } from "../repositories/category-repository";
import { ActivityRepository } from "../repositories/activity-repository";

function createTestDb() {
  const db = new Database(":memory:");
  db.pragma("foreign_keys = ON");
  const schema = readFileSync(join(__dirname, "../database/schema.sql"), "utf-8");
  db.exec(schema);
  return db;
}

describe("LeadRepository", () => {
  let db: Database.Database;
  let leads: LeadRepository;

  beforeEach(() => {
    db = createTestDb();
    leads = new LeadRepository(db);
  });

  it("saves a lead and reads it back by id", () => {
    const now = new Date().toISOString();
    const saved = leads.save({
      businessName: "Bright Smiles Dental",
      phone: "+15551234567",
      email: "hello@brightsmiles.com",
      website: "https://brightsmiles.com",
      address: "123 Main St",
      city: "Dallas",
      country: "USA",
      source: "google_maps",
      categoryId: null,
      score: 90,
      priority: "Green",
      notes: null,
      importedAt: now,
      updatedAt: now,
    });

    expect(saved.id).toBeTypeOf("number");
    const found = leads.findById(saved.id!);
    expect(found?.businessName).toBe("Bright Smiles Dental");
    expect(found?.priority).toBe("Green");
  });

  it("finds possible matches by business name for duplicate detection", () => {
    const now = new Date().toISOString();
    leads.save({
      businessName: "Bright Smiles Dental",
      phone: null,
      email: null,
      website: null,
      address: null,
      city: null,
      country: null,
      source: "google_maps",
      categoryId: null,
      score: 10,
      priority: "Red",
      notes: null,
      importedAt: now,
      updatedAt: now,
    });

    const matches = leads.findPossibleMatches({ businessName: "bright smiles dental" });
    expect(matches).toHaveLength(1);
  });

  it("lists leads filtered by priority", () => {
    const now = new Date().toISOString();
    leads.save({
      businessName: "A",
      phone: "1",
      email: null,
      website: null,
      address: null,
      city: null,
      country: null,
      source: "google_maps",
      categoryId: null,
      score: 90,
      priority: "Green",
      notes: null,
      importedAt: now,
      updatedAt: now,
    });
    leads.save({
      businessName: "B",
      phone: "2",
      email: null,
      website: null,
      address: null,
      city: null,
      country: null,
      source: "google_maps",
      categoryId: null,
      score: 10,
      priority: "Red",
      notes: null,
      importedAt: now,
      updatedAt: now,
    });

    expect(leads.list({ priority: "Green" })).toHaveLength(1);
    expect(leads.list({ priority: "Red" })).toHaveLength(1);
  });
});

describe("CategoryRepository", () => {
  it("prevents deleting a category that has leads assigned", () => {
    const db = createTestDb();
    const categories = new CategoryRepository(db);
    const leads = new LeadRepository(db);

    const category = categories.create({ name: "Dentist", color: "#1D9E75" });
    const now = new Date().toISOString();
    leads.save({
      businessName: "X",
      phone: "1",
      email: null,
      website: null,
      address: null,
      city: null,
      country: null,
      source: "google_maps",
      categoryId: category.id!,
      score: 10,
      priority: "Red",
      notes: null,
      importedAt: now,
      updatedAt: now,
    });

    const result = categories.delete(category.id!);
    expect(result.deleted).toBe(false);
  });

  it("allows deleting an unused category", () => {
    const db = createTestDb();
    const categories = new CategoryRepository(db);
    const category = categories.create({ name: "Roofing", color: "#378ADD" });

    const result = categories.delete(category.id!);
    expect(result.deleted).toBe(true);
    expect(categories.list()).toHaveLength(0);
  });
});

describe("ActivityRepository", () => {
  it("logs and retrieves recent activity", () => {
    const db = createTestDb();
    const activity = new ActivityRepository(db);

    activity.log("Lead Imported", "Bright Smiles Dental");
    activity.log("Export Completed");

    const recent = activity.recent();
    expect(recent).toHaveLength(2);
    expect(recent[0].action).toBe("Export Completed");
  });
});
