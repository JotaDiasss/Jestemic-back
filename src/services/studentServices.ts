import {
    findAllStudents,
    findStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} from '../repositories/studentRepository.js'

export async function getAllStudents() {
    return await findAllStudents()
}

export async function getStudentById(id: number) {
    const student = await findStudentById(id)
    if (!student) {
        throw new Error("Estudante nao encontrado")
    }
    return student
}

export async function createNewStudent(data: { name: string, period: number }) {
    if (!data.name || data.name.trim() === "") {
        throw new Error("Nome do Estudante é obrigatório")
    }
    if (!/^[a-zA-Z\s]+$/.test(data.name)) {
        throw new Error('Nome deve conter apenas letras e espaços')
    }
    return await createStudent(data)
}

export async function updateExistingStudent(id: number, data: { name?: string, period: number }) {
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
    return await updateStudent(id, data)
}

export async function deleteExistingStudent(id: number) {
    const student = await findStudentById(id)
    if (!student) {
        throw new Error("Estudante não encontrado")
    }
    await deleteStudent(id)
}