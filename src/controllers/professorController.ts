import type { Request, Response } from "express";
import * as professorService from "../services/professorServices.js"
import * as professorSubjectService from "../services/professorSubjectService.js"
import { error } from "node:console";

export const getAllProfessors = async (req: Request, res: Response) => {
    try {
        const professors = await professorService.getAllProfessors()
        res.status(200).json(professors)
    } catch (err) {
        res.status(500).json({
            err: "Erro ao buscar os professores"
        })
    }
}

export const getProfessor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const professorId = Number(id)

        const professor = await professorService.getProfessorById(professorId)

        if (!professor) {
            return res.status(404).json({
                err: "Professor não encontrado"
            })
        }

        res.status(200).json(professor)
    } catch (err) {
        res.status(500).json({
            err: "Erro ao buscar o professor"
        })
    }
}

export const createProfessor = async (req: Request, res: Response) => {
    try {
        const { name, subjects } = req.body

        const professor = await professorService.createNewProfessor({ name })
        if (!professor) {
            throw new Error("Erro ao criar professor")
        }
        if (subjects && Array.isArray(subjects)) {
            for (const subjectId of subjects) {
                await professorSubjectService.addSubjectToProfessorService(professor.id, subjectId)
            }
        }

        res.status(201).json(professor)
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Nome do Professor é obrigatório" ||
                err.message === "Nome deve conter apenas letras e espaços"
            ) {
                return res.status(400).json({
                    err: err.message
                })
            }
            if (err.message === "Professor não encontrado" ||
                err.message === "Disciplina não encontrado"
            ) {
                return res.status(404).json({ err: err.message })
            }
        }
        res.status(500).json({
            err: "Erro ao criar professor"
        })
    }
}

export const updateProfessor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, subjects } = req.body
        const professorId = Number(id)

        const professor = await professorService.updateExistingProfessor(
            professorId, name
        )

        if (subjects && Array.isArray(subjects)) {
            for (const subjectId of subjects) {
                await professorSubjectService.addSubjectToProfessorService(professorId, subjectId)
            }
        }

        res.status(200).json(professor)
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Nome do Professor é obrigatório" ||
                err.message === "Nome deve conter apenas letras e espaços"
            ) {

            }
            if (err.message === "Professor não encontrado" ||
                err.message === "Disciplina não encontrado"
            ) {
                return res.status(404).json({ err: err.message })
            }
        }


        res.status(500).json({
            err: "Erro ao editar o professor"
        })
    }
}

export const deleteProfessor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const professorId = Number(id)

        await professorService.deleteExistingProfessor(professorId)

        res.status(204).send()
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Professor não encontrado") {
                return res.status(404).json({ err: err.message })
            }
        }
        res.status(500).json({
            err: "Erro ao deletar o professor"
        })
    }
}