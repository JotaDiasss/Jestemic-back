import { postgresDB } from "../database/postgres/connection.js";
import { students } from "../database/postgres/schemas/students.js"
import { eq } from "drizzle-orm"

export async function findAllStudents() {
    const result = await postgresDB
        .select()
        .from(students)
    return result
}

export async function findStudentById(id: number) {
    const result = await postgresDB
        .select()
        .from(students)
        .where(eq(students.id, id))
    return result[0]
}

export async function createStudent(data: { name: string, period: number}) {
    const result = await postgresDB
        .insert(students)
        .values(data)
        .returning()
    return result[0]
}

export async function updateStudent(id: number, data: { name?: string, period?: number }) {
    const result = await postgresDB
        .update(students)
        .set(data)
        .where(eq(students.id, id))
        .returning()
    return result[0]
}

export async function deleteStudent(id: number) {
    await postgresDB
        .delete(students)
        .where(eq(students.id, id))
}