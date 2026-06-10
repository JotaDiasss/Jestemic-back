import { pgTable, integer } from "drizzle-orm/pg-core";
import { student } from "./student.js"
import { subject } from "./subject.js";

export const studentSubject = pgTable("studentSubject", {
    studentId: integer("studentId").references(() => student.id, { onDelete: "cascade"}),
    subjectId: integer("subjectId").references(() => subject.id, { onDelete: "cascade"})
})