import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const student = pgTable ("student", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    period: integer("period").notNull()
})