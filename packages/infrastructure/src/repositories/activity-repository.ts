import type { DatabaseClient } from "../database/client";

/**
 * docs/05-Database-Design.md, section 4 (activity_logs).
 * Examples per that doc: "Lead Imported", "Lead Deleted", "Project Created",
 * "Export Completed".
 */
export class ActivityRepository {
  constructor(private readonly db: DatabaseClient) {}

  log(action: string, details?: string): void {
    this.db
      .prepare("INSERT INTO activity_logs (action, details) VALUES (?, ?)")
      .run(action, details ?? null);
  }

  recent(limit = 20): Array<{ id: number; action: string; details: string | null; createdAt: string }> {
    const rows = this.db
      .prepare("SELECT * FROM activity_logs ORDER BY created_at DESC, id DESC LIMIT ?")
      .all(limit) as Array<{ id: number; action: string; details: string | null; created_at: string }>;
    return rows.map((r) => ({ id: r.id, action: r.action, details: r.details, createdAt: r.created_at }));
  }
}
