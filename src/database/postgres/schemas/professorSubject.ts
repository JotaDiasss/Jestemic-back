import { pgTable, integer } from "drizzle-orm/pg-core";
import { professor } from "./professor.js";
import { subject } from "./subject.js";

export const professorSubject = pgTable("professorSubject", {
    professorId: integer("professor_id").references(() => professor.id, { onDelete: "cascade" }),
    subjectId: integer("subject_id").references(() => subject.id, { onDelete: "cascade" })
})