import {
    findAllProfessors,
    findProfessorById,
    createProfessor,
    updateProfessor,
    deleteProfessor
} from '../repositories/professorRepository.js'

export async function getAllProfessors() {
    return await findAllProfessors()
}

export async function getProfessorById(id: number) {
    const professor = await findProfessorById(id)
    if (!professor) {
        throw new Error("Professor nao encontrado")
    }
    return professor
}

export async function createNewProfessor(data: { name: string }) {
    if (!data.name || data.name.trim() === "") {
        throw new Error("Nome do Professor é obrigatório")
    }
    if (!/^[a-zA-Z\s]+$/.test(data.name)) {
        throw new Error('Nome deve conter apenas letras e espaços')
    }
    return await createProfessor(data)
}

export async function updateExistingProfessor(id: number, data: { name?: string }) {
    const professor = await findProfessorById(id)
    if (!professor) {
        throw new Error("Professor não encontrado")
    }
    if (data.name !== undefined ) {
        if (!data.name || data.name.trim() === "" ) {
            throw new Error("Nome do Professor é obrigatório")
        }
        if (!/^[a-zA-Z\s]+$/.test(data.name)) {
            throw new Error('Nome deve conter apenas letras e espaços')
        }
    }
    return await updateProfessor(id, data)
}

export async function deleteExistingProfessor(id: number) {
    const professor = await findProfessorById(id)
    if (!professor) {
        throw new Error("Professor não encontrado")
    }
    await deleteProfessor(id)
}