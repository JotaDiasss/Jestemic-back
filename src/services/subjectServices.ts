import {
    findAllSubjects,
    findSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
} from '../repositories/subjectRepository.js'

export async function getAllSubjects() {
    return await findAllSubjects()
}

export async function getSubjectById(id: number) {
    const subject = await findSubjectById(id)
    if (!subject) {
        throw new Error("Cadeira não encontrada")
    }
    return subject
}

export async function createNewSubject(data: {
    name: string,
    workload: number,
    startAt: string,
    finishAt: string
}) {
    //  name
    if (!data.name || data.name.trim() === "") {
        throw new Error("Nome da disciplina é obrigatório")
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(data.name)) {
        throw new Error("Nome deve conter apenas letras, números e espaços")
    }

    // workload
    if (!data.workload || data.workload <= 0) {
        throw new Error("Carga horária deve ser maior que zero")
    }

    //  startAt
    if (!data.startAt) {
        throw new Error("Horário de início é obrigatório")
    }
    if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(data.startAt)) {
        throw new Error("Horário de início deve estar no formato HH:MM")
    }
    //  finishAt
    if (!data.finishAt) {
        throw new Error("Horário de término é obrigatório")
    }
    if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(data.finishAt)) {
        throw new Error("Horário de término deve estar no formato HH:MM")
    }
    //  startAt & finishAt
    if (data.finishAt <= data.startAt) {
        throw new Error("Horário de término deve ser maior que o horário de início")
    }

}

export async function updateExistingSubject(id: number, data: {
    name?: string,
    workload?: number,
    startAt?: string,
    finishAt?: string
}) {
    const subject = await findSubjectById(id)
    if (data.name !== undefined) {
        if (!data.name || data.name.trim() === "") {
            throw new Error("Nome da cadeira é obrigatorio")
        }
        if (!/^[a-zA-Z0-9\s]+$/.test(data.name)) {
            throw new Error("Nome deve conter apenas letras, números e espaços")
        }
    }
    if (data.workload !== undefined) {
        if (!data.workload || data.workload <= 0) {
            throw new Error("Carga horária deve ser maior que zero")
        }
    }
    if (data.startAt !== undefined) {
        if (!data.startAt) {
            throw new Error("Horário de início é obrigatório")
        }
    }
    if (data.finishAt !== undefined) {
        if (!data.finishAt) {
            throw new Error("Horário de término é obrigatório")
        }
    }
    if (data.finishAt !== undefined && data.startAt !== undefined) {
        if (data.finishAt <= data.startAt) {
            throw new Error("Horário de término deve ser maior que o horário de início")
        }
    }
}

export async function deleteExistingSubject(id: number) {
    const subject = await findSubjectById(id)
    if (!subject) {
        throw new Error("Cadeira não encontrada")
    }
    await deleteSubject
}