import type { DatabaseClient } from "../database/client";
import type { Lead } from "@atlas/domain";

interface LeadRow {
  id: number;
  business_name: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  source: Lead["source"];
  category_id: number | null;
  score: number;
  priority: Lead["priority"];
  notes: string | null;
  imported_at: string;
  updated_at: string;
}

function rowToLead(row: LeadRow): Lead {
  return {
    id: row.id,
    businessName: row.business_name,
    phone: row.phone,
    email: row.email,
    website: row.website,
    address: row.address,
    city: row.city,
    country: row.country,
    source: row.source,
    categoryId: row.category_id,
    score: row.score,
    priority: row.priority,
    notes: row.notes,
    importedAt: row.imported_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Repository Layer, per Architecture Specification section 5.
 * The only place in the codebase that runs SQL against the `leads` table.
 */
export class LeadRepository {
  constructor(private readonly db: DatabaseClient) {}

  /**
   * Candidate pool for @atlas/domain's findDuplicate(). Deliberately loose -
   * pulls leads that share a business name, website, or phone so the pure
   * domain function can do the exact-match logic without touching SQL.
   */
  findPossibleMatches(candidate: {
    businessName: string;
    website?: string;
    phone?: string;
  }): Lead[] {
    const stmt = this.db.prepare<unknown[], LeadRow>(
      `SELECT * FROM leads
       WHERE LOWER(business_name) = LOWER(?)
          OR (? IS NOT NULL AND LOWER(website) = LOWER(?))
          OR (? IS NOT NULL AND phone = ?)`
    );
    const rows = stmt.all(
      candidate.businessName,
      candidate.website ?? null,
      candidate.website ?? null,
      candidate.phone ?? null,
      candidate.phone ?? null
    );
    return rows.map(rowToLead);
  }

  save(lead: Omit<Lead, "id">): Lead {
    const stmt = this.db.prepare(
      `INSERT INTO leads
        (business_name, phone, email, website, address, city, country,
         source, category_id, score, priority, notes, imported_at, updated_at)
       VALUES (@businessName, @phone, @email, @website, @address, @city, @country,
         @source, @categoryId, @score, @priority, @notes, @importedAt, @updatedAt)`
    );
    const result = stmt.run(lead);
    return { ...lead, id: Number(result.lastInsertRowid) };
  }

  findById(id: number): Lead | null {
    const row = this.db
      .prepare<unknown[], LeadRow>("SELECT * FROM leads WHERE id = ?")
      .get(id);
    return row ? rowToLead(row) : null;
  }

  list(options: { categoryId?: number; priority?: Lead["priority"] } = {}): Lead[] {
    let query = "SELECT * FROM leads WHERE 1=1";
    const params: unknown[] = [];

    if (options.categoryId !== undefined) {
      query += " AND category_id = ?";
      params.push(options.categoryId);
    }
    if (options.priority) {
      query += " AND priority = ?";
      params.push(options.priority);
    }
    query += " ORDER BY score DESC, imported_at DESC, id DESC";

    const rows = this.db.prepare<unknown[], LeadRow>(query).all(...params);
    return rows.map(rowToLead);
  }

  delete(id: number): void {
    this.db.prepare("DELETE FROM leads WHERE id = ?").run(id);
  }
}
