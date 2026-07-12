import type { Priority } from "@atlas/domain";

const STYLES: Record<Priority, string> = {
  Green: "bg-emerald-100 text-emerald-800",
  Yellow: "bg-amber-100 text-amber-800",
  Red: "bg-red-100 text-red-800",
};

/**
 * Renders a lead's priority per docs/06-Rule-Engine-Specification.md section 6.
 * Priority is always derived from score - this component never lets the
 * value be edited, matching "cannot be edited manually" in that doc.
 */
export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[priority]}`}
    >
      {priority}
    </span>
  );
}
