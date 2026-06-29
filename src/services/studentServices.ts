import {
    findAllStudents,
    findStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} from '../repositories/studentRepository.js'
import { Log } from "../database/mongodb/models/Log.js"
import { findSubjectNamesByStudent } from '../repositories/studentSubjectRepository.js'

export async function getAllStudents() {
    return await findAllStudents()
}

export async function getStudentById(id: number) {
    const student = await findStudentById(id)
    if (!student) {
        throw new Error("Estudante não encontrado")
    }
    
    const subjectNames = await findSubjectNamesByStudent(id)
    
    return { ...student, subjects: subjectNames }
}

export async function createNewStudent(data: { name: string, period: number }) {
    if (!data.name || data.name.trim() === "") {
        throw new Error("Nome do estudante é obrigatório")
    }
    if (!/^[a-zA-Z\s]+$/.test(data.name)) {
        throw new Error("Nome deve conter apenas letras e espaços")
    }
    if (!data.period) {
        throw new Error("Periodo do estudante é obrigatório")
    }
    const createdStudent = await createStudent(data)
    if (createdStudent === undefined) {
        throw new Error("Erro ao criar o estudante")
    }

    await Log.create({
        level: "info",
        message: `Estudante ${createdStudent.name} criado com sucesso`,
        service: "student-service",
        metadata: { studentId: createdStudent.id }
    })

    return createdStudent
}

export async function updateExistingStudent(id: number, data: { name?: string, period?: number }) {
    const student = await findStudentById(id)
    if (!student) {
        throw new Error("Estudante não encontrado")
    }
    if (data.name !== undefined) {
        if (!data.name || data.name.trim() === "") {
            throw new Error("Nome do estudante é obrigatório")
        }
        if (!/^[a-zA-Z\s]+$/.test(data.name)) {
            throw new Error('Nome deve conter apenas letras e espaços')
        }
    }
    if (data.period !== undefined) {
        if (!data.period) {
            throw new Error("Periodo do estudante é obrigatório")
        }
    }
    if (Object.keys(data).length === 0) {
        throw new Error("Nenhum campo para atualizar")
    }
    const updatedStudent = await updateStudent(id, data)
    if (updatedStudent === undefined) {
        throw new Error("Erro ao editar o estudante")
    }


    await Log.create({
        level: "info",
        message: `Estudante ${updatedStudent.name} editado com sucesso`,
        service: "student-service",
        metadata: { studentId: updatedStudent.id }
    })

    return updatedStudent
}

export async function deleteExistingStudent(id: number) {
    const student = await findStudentById(id)
    if (!student) {
        throw new Error("Estudante não encontrado")
    }

    await deleteStudent(id)

    await Log.create({
        level: "info",
        message: `Estudante ${student.name} deletado com sucesso`,
        service: "student-service",
        metadata: { studentId: student.id }
    })
}