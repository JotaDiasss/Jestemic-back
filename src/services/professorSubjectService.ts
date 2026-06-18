import {
    addSubjectToProfessor,
    removeSubjectFromProfessor,
    findSubjectsByProfessor,
    findProfessorsBySubject
} from "../repositories/professorSubjectRepository.js"
import { findProfessorById } from '../repositories/professorRepository.js'
import { findSubjectById } from '../repositories/subjectRepository.js'
import { Log } from "../database/mongodb/models/Log.js"

export async function addSubjectToProfessorService (professorId: number, subjectId: number) {
    const professor = await findProfessorById(professorId)
    if (!professor) {
        throw new Error("Professor não encontrado")
    }
    const subject = await findSubjectById(subjectId)
    if (!subject){
        throw new Error("Disciplina não encontrado")
    }

    const subjectAddedToProfessor = await addSubjectToProfessor(professorId, subjectId)
    if (subjectAddedToProfessor === undefined) {
        throw new Error("Erro ao adiciona a disciplina ao professor")
    }

    await Log.create({
        level: "info",
        message: `Disciplina ${subject.name} adicionada ao professor ${professor.name} com sucesso`,
        service: "professorSubject-service",
        metadata: {
            professorId: subjectAddedToProfessor.professorId,
            subjectId: subjectAddedToProfessor.subjectId
        }
    })

    return subjectAddedToProfessor
}

export async function removeSubjectFromProfessorService(professorId: number, subjectId: number) {
    const professor = await findProfessorById(professorId)
    if (!professor) {
        throw new Error("Professor não encontrado")
    }
    const subject = await findSubjectById(subjectId)
    if (!subject){
        throw new Error("Disciplina não encontrado")
    }

    await Log.create({
        level: "info",
        message: `Disciplina ${subject.name} removida do professor ${professor.name} com sucesso`,
        service: "professorSubject-service",
        metadata: {
            professorId: professorId,
            subjectId: subjectId
        }
    })

    await removeSubjectFromProfessor(professorId, subjectId)
}

export async function getSubjectsByProfessorService(professorId: number) {
    const professor = await findProfessorById(professorId)
    if (!professor) {
        throw new Error("Professor não encontrado")
    }

    return await findSubjectsByProfessor(professorId)
}

export async function getProfessorsBySubjectService(subjectId: number) {
    const subject = await findSubjectById(subjectId)
    if (!subject){
        throw new Error("Disciplina não encontrado")
    }

    return await findProfessorsBySubject(subjectId)
}