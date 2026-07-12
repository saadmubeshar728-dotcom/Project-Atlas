import type { DatabaseClient } from "../database/client";

export interface Project {
  id?: number;
  leadId: number;
  projectName: string;
  clientName: string | null;
  budget: number | null;
  status: "Active" | "Completed" | "Cancelled";
  startDate: string | null;
  endDate: string | null;
  notes: string | null;
}

interface ProjectRow {
  id: number;
  lead_id: number;
  project_name: string;
  client_name: string | null;
  budget: number | null;
  status: Project["status"];
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
}

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    leadId: row.lead_id,
    projectName: row.project_name,
    clientName: row.client_name,
    budget: row.budget,
    status: row.status,
    startDate: row.start_date,
    endDate: row.end_date,
    notes: row.notes,
  };
}

/**
 * docs/05-Database-Design.md, section 7 (Project Rules):
 * a project must reference an existing lead, and a lead can only be
 * converted into one active project (enforced by UNIQUE(lead_id) in schema.sql).
 */
export class ProjectRepository {
  constructor(private readonly db: DatabaseClient) {}

  create(project: Omit<Project, "id">): Project {
    const stmt = this.db.prepare(
      `INSERT INTO projects
        (lead_id, project_name, client_name, budget, status, start_date, end_date, notes)
       VALUES (@leadId, @projectName, @clientName, @budget, @status, @startDate, @endDate, @notes)`
    );
    const result = stmt.run(project);
    return { ...project, id: Number(result.lastInsertRowid) };
  }

  list(status?: Project["status"]): Project[] {
    const rows = status
      ? this.db
          .prepare<unknown[], ProjectRow>("SELECT * FROM projects WHERE status = ?")
          .all(status)
      : this.db.prepare<[], ProjectRow>("SELECT * FROM projects").all();
    return rows.map(rowToProject);
  }
}
