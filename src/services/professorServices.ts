import {
    findAllProfessors,
    findProfessorById,
    createProfessor,
    updateProfessor,
    deleteProfessor
} from "../repositories/professorRepository.js"
import { Log } from "../database/mongodb/models/Log.js"
import { findSubjectsByProfessor } from "../repositories/professorSubjectRepository.js"

export async function getAllProfessors() {
    return await findAllProfessors()
}

export async function getProfessorById(id: number) {
    const professor = await findProfessorById(id)
    if (!professor) {
        throw new Error("Professor não encontrado")
    }

    const subjects = await findSubjectsByProfessor(id)

    return { ...professor, subjects }
}

export async function createNewProfessor(data: { name: string }) {
    if (!data.name || data.name.trim() === "") {
        throw new Error("Nome do professor é obrigatório")
    }
    if (!/^[a-zA-Z\s]+$/.test(data.name)) {
        throw new Error("Nome deve conter apenas letras e espaços")
    }
    const createdProfessor = await createProfessor(data)
    if (createdProfessor === undefined){
        throw new Error("Erro ao criar o professor")
    }

    await Log.create({
        level: "info",
        message: `Professor ${createdProfessor.name} criado com sucesso`,
        service: "professor-service",
        metadata: { professorId: createdProfessor.id }
    })

    return createdProfessor
}

export async function updateExistingProfessor(id: number, data: { name?: string }) {
    const professor = await findProfessorById(id)
    if (!professor) {
        throw new Error("Professor não encontrado")
    }
    if (data.name !== undefined ) {
        if (!data.name || data.name.trim() === "" ) {
            throw new Error("Nome do professor é obrigatório")
        }
        if (!/^[a-zA-Z\s]+$/.test(data.name)) {
            throw new Error("Nome deve conter apenas letras e espaços")
        }
    }
    const updatedProfessor = await updateProfessor(id, data)
    if (updatedProfessor === undefined){
        throw new Error("Erro ao editar o professor")
    }

    await Log.create({
        level: "info",
        message: `Professor ${updatedProfessor.name} editado com sucesso`,
        service: "professor-service",
        metadata: { professorId: updatedProfessor.id }
    })

    return updatedProfessor
}

export async function deleteExistingProfessor(id: number) {
    const professor = await findProfessorById(id)
    if (!professor) {
        throw new Error("Professor não encontrado")
    }

    await Log.create({
        level: "info",
        message: `Professor ${professor.name} deletado com sucesso`,
        service: "professor-service",
        metadata: { professorId: professor.id }
    })

    await deleteProfessor(id)
}