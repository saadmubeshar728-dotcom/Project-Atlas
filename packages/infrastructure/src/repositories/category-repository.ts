import type { DatabaseClient } from "../database/client";
import type { Category } from "@atlas/domain";

interface CategoryRow {
  id: number;
  name: string;
  color: string | null;
}

/**
 * docs/05-Database-Design.md, section 7 (Category Rules):
 * names must be unique; categories cannot be deleted while leads reference them.
 */
export class CategoryRepository {
  constructor(private readonly db: DatabaseClient) {}

  list(): Category[] {
    const rows = this.db
      .prepare<[], CategoryRow>("SELECT * FROM categories ORDER BY name ASC")
      .all();
    return rows.map((r) => ({ id: r.id, name: r.name, color: r.color ?? "" }));
  }

  create(category: Omit<Category, "id">): Category {
    const stmt = this.db.prepare("INSERT INTO categories (name, color) VALUES (?, ?)");
    const result = stmt.run(category.name, category.color);
    return { ...category, id: Number(result.lastInsertRowid) };
  }

  delete(id: number): { deleted: boolean; reason?: string } {
    const inUse = this.db
      .prepare("SELECT COUNT(*) as count FROM leads WHERE category_id = ?")
      .get(id) as { count: number };

    if (inUse.count > 0) {
      return { deleted: false, reason: "Category has leads assigned to it." };
    }

    this.db.prepare("DELETE FROM categories WHERE id = ?").run(id);
    return { deleted: true };
  }
}
