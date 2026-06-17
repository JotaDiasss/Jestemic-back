import type { Request, Response } from "express";
import * as subjectService from "../services/subjectServices.js"

export const getAllSubjects = async (req: Request, res: Response) => {
    try {
        const subject = await subjectService.getAllSubjects()
        res.status(200).json(subject)
    } catch (err) {
        res.status(500).json({
            err: "Erro ao buscar a diciplina"
        })
    }
}

export const getSubject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const subjectId = Number(id)

        const subject = await subjectService.getSubjectById(subjectId)

        res.status(200).json(subject)
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Disciplina não encontrada") {
                return res.status(404).json({ err: err.message })
            }
        }
        res.status(500).json({
            err: "Erro ao bsucar a Disciplina"
        })
    }
}

export const createNewSubject = async (req: Request, res: Response) => {
    try {
        const {
            name,
            workload,
            startAt,
            finishAt
        } = req.body

        const subject = await subjectService.createNewSubject({
            name,
            workload,
            startAt,
            finishAt
        })

        res.status(201).json(subject)
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Nome da disciplina é obrigatório" ||
                err.message === "Nome deve conter apenas letras, números e espaços" ||
                err.message === "Carga horária deve ser maior que zero" ||
                err.message === "Horário de início é obrigatório" ||
                err.message === "Horário de início deve estar no formato HH:MM" ||
                err.message === "Horário de término é obrigatório" ||
                err.message === "Horário de término deve estar no formato HH:MM" ||
                err.message === "Horário de término deve ser maior que o horário de início"
            ) {
                return res.status(400).json({ err: err.message })
            }
            if (err.message === "Disciplina não encontrado") {
                return res.status(404).json({ err: err.message })
            }
        }
        res.status(500).json({
            err: "Erro ao criar a disciplina"
        })
    }
}

export const updateSubject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const {
            name,
            workload,
            startAt,
            finishAt
        } = req.body
        const subjectId = Number(id)

        const subject = await subjectService.updateExistingSubject(
            subjectId, {
            name,
            workload,
            startAt,
            finishAt
        })

        res.status(200).json(subject)
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Disciplina não encontrada" ||
                err.message === "Nome da disciplina é obrigatorio" ||
                err.message === "Nome deve conter apenas letras, números e espaços" ||
                err.message === "Carga horária deve ser maior que zero" ||
                err.message === "Horário de término deve ser maior que o horário de início"
            ) {
                return res.status(400).json({ err: err.message })
            }
            if (err.message === "Disciplina não encontrado") {
                return res.status(404).json({ err: err.message })
            }
        }
        res.status(500).json({
            err: "Erro ao editar a disciplina"
        })
    }
}

export const deleteSubject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const subjectId = Number(id)

        await subjectService.deleteExistingSubject(subjectId)

        res.status(204).send()
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Disciplina não encontrada") {
                return res.status(404).json({ err: err.message })
            }
        }
        res.status(500).json({
            err: "Erro ao deletar a disciplina"
        })

    }
}