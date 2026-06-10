import { pgTable, integer } from "drizzle-orm/pg-core";
import { students } from "./students.js"
import { subjects } from "./subjects.js";

export const studentSubjects = pgTable("studentSubjects", {
    studentId: integer("studentId").references(() => students.id, { onDelete: "cascade"}),
    subjectId: integer("subjectId").references(() => subjects.id, { onDelete: "cascade"})
})