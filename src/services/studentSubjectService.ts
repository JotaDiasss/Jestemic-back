import {
    addSubjectToStudent,
    removeSubjectFromStudent,
    findSubjectsByStudent,
    findStudentsBySubject
} from "../repositories/studentSubjectRepository.js"
import { findStudentById } from '../repositories/studentRepository.js'
import { findSubjectById } from '../repositories/subjectRepository.js'
import { Log } from "../database/mongodb/models/Log.js"

export async function addSubjectToStudentService(studentId: number, subjectId: number) {
    const student = await findStudentById(studentId)
    if (!student) {
        throw new Error("Estudante não encontrado")
    }
    const subject = await findSubjectById(subjectId)
    if (!subject) {
        throw new Error("Diciplina não encontrado")
    }

    const subjectAddedToStudent = await addSubjectToStudent(studentId, subjectId)
    if (subjectAddedToStudent === undefined) {
        throw new Error("Erro ao adiciona a disciplina ao estudante")
    }

    await Log.create({
        level: "info",
        message: `Disciplina ${subject.name} adicionada ao estudante ${student.name} com sucesso`,
        service: "studentSubject-service",
        metadata: {
            studentId: subjectAddedToStudent.studentId,
            subjectId: subjectAddedToStudent.subjectId
        }
    })

    return subjectAddedToStudent
}

export async function removeSubjectFromStudentService(studentId: number, subjectId: number) {
    const student = await findStudentById(studentId)
    if (!student) {
        throw new Error("Estudante não encontrado")
    }
    const subject = await findSubjectById(subjectId)
    if (!subject) {
        throw new Error("Disciplina não encontrado")
    }

    await Log.create({
        level: "info",
        message: `Disciplina ${subject.name} removida do estudante ${student.name} com sucesso`,
        service: "studentSubject-service",
        metadata: {
            studentId: studentId,
            subjectId: subjectId
        }
    })

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
    if (!subject) {
        throw new Error("Disciplina não encontrado")
    }

    return await findStudentsBySubject(subjectId)
} 