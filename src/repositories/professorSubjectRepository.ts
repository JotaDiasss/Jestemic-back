import { postgresDB } from "../database/postgres/connection.js";
import { professors, subjects } from "../database/postgres/index.js";
import { professorSubjects } from "../database/postgres/schemas/professorSubjects.js"
import { eq, and } from "drizzle-orm"

export async function addSubjectToProfessor (professorId: number, subjectId: number) {
    const result = await postgresDB
        .insert(professorSubjects)
        .values({professorId, subjectId})
        .returning()
    return result[0]
}

export async function removeSubjectFromProfessor (professorId: number, subjectId: number) {
    await postgresDB
        .delete(professorSubjects)
        .where(and(
            eq(professorSubjects.professorId, professorId),
            eq(professorSubjects.subjectId, subjectId)
        ))
}

export async function findSubjectsByProfessor (professorId: number) {
    const result = await postgresDB
        .select({
            id: subjects.id,
            name: subjects.name,
            workload: subjects.workload,
            startAt: subjects.startAt,
            finishAt: subjects.finishAt
        })
        .from(professorSubjects)
        .innerJoin(subjects, eq(professorSubjects.subjectId, subjects.id))
        .where(eq(professorSubjects.professorId, professorId))
    return result
}

export async function findProfessorsBySubject (subjectId: number) {
    const result = await postgresDB
        .select({
            id: professors.id,
            name: professors.name,
        })
        .from(professorSubjects)
        .innerJoin(professors, eq(professorSubjects.professorId, professors.id))
        .where(eq(professorSubjects.subjectId, subjectId))
        return result
}

export async function findSubjectNamesByProfessor(professorId: number) {
    const result = await postgresDB
        .select({
            name: subjects.name
        })
        .from(professorSubjects)
        .innerJoin(subjects, eq(professorSubjects.subjectId, subjects.id))
        .where(eq(professorSubjects.professorId, professorId))
    
    return result.map(r => r.name)
}