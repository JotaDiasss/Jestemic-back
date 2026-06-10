import { postgresDB } from "../database/postgres/connection.js";
import { professors } from "../database/postgres/schemas/professors.js"
import { eq } from "drizzle-orm"

export async function findAllProfessors() {
    const result = await postgresDB.select().from(professors)
}