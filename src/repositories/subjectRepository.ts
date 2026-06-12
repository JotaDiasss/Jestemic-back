import { postgresDB } from "../database/postgres/connection.js";
import { subjects } from "../database/postgres/schemas/subjects.js"
import { eq } from "drizzle-orm"

export async function findAllSubjects() {
    const result = await postgresDB
        .select()
        .from(subjects)
    return result
}

export async function findSubjectById(id: number) {
    const result = await postgresDB
        .select()
        .from(subjects)
        .where(eq(subjects.id, id))
    return result[0]
}

export async function createSubject(data: { 
    name: string,
    workload: number,
    startAt: string,
    finishAt: string 
}) {
    const result = await postgresDB
        .insert(subjects)
        .values(data)
        .returning()
    return result[0]
}

export async function updateSubject(id: number, data: {
    name?: string,
    workload?: number,
    startAt?: string,
    finishAt?: string
}) {
    const result = await postgresDB
        .update(subjects)
        .set(data)
        .where(eq(subjects.id, id))
        .returning()
    return result[0]
}

export async function deleteSubject(id: number) {
    await postgresDB
        .delete(subjects)
        .where(eq(subjects.id, id))
}
