import { processLead, type RawLeadInput } from "@atlas/domain";
import type {
  ActivityRepository,
  CategoryRepository,
  LeadRepository,
} from "@atlas/infrastructure";

export interface ImportOutcome {
  accepted: number;
  duplicates: number;
  rejected: number;
  errors: Array<{ input: RawLeadInput; reason: string }>;
}

/**
 * docs/04-Architecture-Specification.md, section 3 (High-Level Architecture)
 * and section 7 (Lead Import Flow):
 * Desktop Receiver -> Import Service -> Rule Engine -> Lead Repository -> SQLite.
 *
 * This is the only place that connects the local IPC receiver
 * (@atlas/infrastructure createLocalServer) to the domain rule engine
 * and back to storage. UI code (apps/desktop) should call this service,
 * never the repositories directly (Dependency Rules, section 9).
 */
export class ImportService {
  constructor(
    private readonly leadRepository: LeadRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly activityRepository: ActivityRepository
  ) {}

  async importLeads(rawLeads: RawLeadInput[]): Promise<ImportOutcome> {
    const categories = this.categoryRepository.list();
    const outcome: ImportOutcome = { accepted: 0, duplicates: 0, rejected: 0, errors: [] };

    for (const raw of rawLeads) {
      const existingLeads = this.leadRepository.findPossibleMatches({
        businessName: raw.businessName,
        website: raw.website,
        phone: raw.phone,
      });

      const result = processLead(raw, { existingLeads, categories });

      switch (result.status) {
        case "rejected":
          outcome.rejected += 1;
          outcome.errors.push({ input: raw, reason: result.errors.join(" ") });
          break;
        case "duplicate":
          outcome.duplicates += 1;
          break;
        case "accepted":
          this.leadRepository.save(result.lead);
          this.activityRepository.log("Lead Imported", result.lead.businessName);
          outcome.accepted += 1;
          break;
      }
    }

    return outcome;
  }
}
