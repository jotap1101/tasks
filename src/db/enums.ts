import { pgEnum } from "drizzle-orm/pg-core";

export const labelEnum = pgEnum("label", ["bug", "feature", "documentation"]);
export const statusEnum = pgEnum("status", [
  "todo",
  "in_progress",
  "done",
  "canceled",
]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);
