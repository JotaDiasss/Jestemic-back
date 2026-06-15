import { postgresDB } from "../database/postgres/connection.js";
import { students, subjects} from "../database/postgres/index.js";
import { studentSubjects } from "../database/postgres/schemas/studentSubjects.js"
import { eq, and } from "drizzle-orm"

export async function addSubjectToStudent (studentId: number, subjectId: number) {
    const result = await postgresDB
        .insert(studentSubjects)
        .values({studentId, subjectId})
        .returning()
    return result[0]
}

export async function removeSubjectFromStudent (studentId: number, subjectId: number) {
    await postgresDB
        .delete(studentSubjects)
        .where(and(
            eq(studentSubjects.studentId, studentId),
            eq(studentSubjects.subjectId, subjectId)
        ))
}

export async function findSubjectsByStudent (studentId: number) {
    const result = await postgresDB
        .select({
            id: subjects.id,
            name: subjects.name,
            workload: subjects.workload,
            startAt: subjects.startAt,
            finishAt: subjects.finishAt
        })
        .from(studentSubjects)
        .innerJoin(subjects, eq(studentSubjects.subjectId, subjects.id))
        .where(eq(studentSubjects.studentId, studentId))
    return result
}

export async function findStudentsBySubject (subjectId: number) {
    const result = await postgresDB
        .select({
            id: students.id,
            name: students.name,
        })
        .from(studentSubjects)
        .innerJoin(students, eq(studentSubjects.studentId, students.id))
        .where(eq(studentSubjects.subjectId, subjectId))
        return result
}