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
        throw new Error("Disciplina não encontrada")
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

    const subject = await createSubject(data)
    return subject
}

export async function updateExistingSubject(id: number, data: {
    name?: string,
    workload?: number,
    startAt?: string,
    finishAt?: string
}) {
    const subject = await findSubjectById(id)

    if(!subject) {
        throw new Error("Disciplina não encontrada")
    }
    
    if (data.name !== undefined) {
        if (!data.name || data.name.trim() === "") {
            throw new Error("Nome da disciplina é obrigatorio")
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
    
    const finalStartAt = data.startAt !== undefined ? data.startAt : subject.startAt
    const finalFinishAt = data.finishAt !== undefined ? data.finishAt : subject.finishAt

    if (finalFinishAt <= finalStartAt) {
        throw new Error("Horário de término deve ser maior que o horário de início")
    }
    
    await updateSubject(id, data)
    return subject
}

export async function deleteExistingSubject(id: number) {
    const subject = await findSubjectById(id)
    if (!subject) {
        throw new Error("Disciplina não encontrada")
    }
    await deleteSubject(id)
}