import {
    addSubjectToProfessor,
    removeSubjectFromProfessor,
    findSubjectsByProfessor,
    findProfessorsBySubject
} from "../repositories/professorSubjectRepository.js"
import { findProfessorById } from '../repositories/professorRepository.js'
import { findSubjectById } from '../repositories/subjectRepository.js'

export async function addSubjectToProfessorService (professorId: number, subjectId: number) {
    const professor = await findProfessorById(professorId)
    if (!professor) {
        throw new Error("Professor não encontrado")
    }
    const subject = await findSubjectById(subjectId)
    if (!subject){
        throw new Error("Disciplina não encontrado")
    }

    return await addSubjectToProfessor(professorId, subjectId)
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