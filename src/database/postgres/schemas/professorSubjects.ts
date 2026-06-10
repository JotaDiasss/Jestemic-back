import { pgTable, integer } from "drizzle-orm/pg-core";
import { professors } from "./professors.js";
import { subjects } from "./subjects.js";

export const professorSubjects = pgTable("professorSubjects", {
    professorId: integer("professor_id").references(() => professors.id, { onDelete: "cascade" }),
    subjectId: integer("subject_id").references(() => subjects.id, { onDelete: "cascade" })
})