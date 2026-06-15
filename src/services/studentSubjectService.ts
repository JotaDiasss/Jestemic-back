import {
    addSubjectToStudent,
    removeSubjectFromStudent,
    findSubjectsByStudent,
    findStudentsBySubject
} from "../repositories/studentSubjectRepository.js"
import { findStudentById } from '../repositories/studentRepository.js'
import { findSubjectById } from '../repositories/subjectRepository.js'

export async function addSubjectToStudentService (studentId: number, subjectId: number) {
    const student = await findStudentById(studentId)
    if (!student) {
        throw new Error("Estudante não encontrado")
    }
    const subject = await findSubjectById(subjectId)
    if (!subject){
        throw new Error("Diciplina não encontrado")
    }

    return await addSubjectToStudent(studentId, subjectId)
}

export async function removeSubjectFromStudentService(studentId: number, subjectId: number) {
    const student = await findStudentById(studentId)
    if (!student) {
        throw new Error("Estudante não encontrado")
    }
    const subject = await findSubjectById(subjectId)
    if (!subject){
        throw new Error("Disciplina não encontrado")
    }

    await removeSubjectFromStudent(studentId, subjectId)
}

export async function getSubjectsByStudentService(studentId: number) {
    const student = await findStudentById(studentId)
    if (!student) {
        throw new Error("Estudante não encontrado")
    }

    return await findSubjectsByStudent(studentId)
}

export async function getStudentsBySubjectService(subjectId: number) {
    const subject = await findSubjectById(subjectId)
    if (!subject){
        throw new Error("Disciplina não encontrado")
    }

    return await findStudentsBySubject(subjectId)
} 