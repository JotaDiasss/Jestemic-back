import { postgresDB } from "../database/postgres/connection.js";
import { professors } from "../database/postgres/schemas/professors.js"
import { eq } from "drizzle-orm"

export async function findAllProfessors() {
    const result = await postgresDB
        .select()
        .from(professors)
    return result
}

export async function findProfessorById(id: number) {
    const result = await postgresDB
        .select()
        .from(professors)
        .where(eq(professors.id, id))
    return result[0]
}

export async function createProfessor(data: { name: string }) {
    const result = await postgresDB
        .insert(professors)
        .values(data)
        .returning()
    return result[0]
}

export async function updateProfessor(id: number, data: { name?: string }) {
    const result = await postgresDB
        .update(professors)
        .set(data)
        .where(eq(professors.id, id))
        .returning()
    return result[0]
}

export async function deleteProfessor(id: number) {
    await postgresDB
        .delete(professors)
        .where(eq(professors.id, id))
}