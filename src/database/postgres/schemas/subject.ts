import { pgTable, serial, varchar, integer, time } from "drizzle-orm/pg-core";

export const subject = pgTable("subject", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    workload: integer("workload").notNull(),
    startAt: time("start_at").notNull(),
    finishAt: time("finish_at").notNull()
})