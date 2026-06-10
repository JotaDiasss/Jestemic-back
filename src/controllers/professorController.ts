import type { Request, Response } from "express";
import { Professor } from "../database/mongodb/models/Professor.js"

export const getAllProfessors = async (req: Request, res: Response) => {
    try {
        const professors = await Professor.find()
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
        const professor = await Professor.findById(id)

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

        const professor = await Professor.create({
            name,
            subjects: subjects || []
        })

        res.status(201).json(professor)
    } catch (err) {
        res.status(500).json({
            err: "Erro ao criar professor"
        })
    }
}

export const updateProfessor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, subjects } = req.body

        const updateData: any = {}
        if (name !== undefined) updateData.name = name
        if (subjects !== undefined) updateData.subjects = subjects

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                err: "Envie pelo menos um campo para atualizar"
            })
        }

        const professor = await Professor.findByIdAndUpdate(
            id, updateData, { new: true }
        )

        if (!professor) {
            return res.status(404).json({
                err: "Professor não encontrado"
            })
        }

        res.status(200).json(professor)
    } catch (err) {
        res.status(500).json({
            err: "Erro ao editar o professor"
        })
    }
}

export const deleteProfessor = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const professor = await Professor.findByIdAndDelete(id)

        if (!professor) {
            return res.status(404).json({
                err: "Professor não encontrado"
            })
        }

        res.status(204).send()
    } catch (err) {
        res.status(500).json({
            err: "Erro ao deletar o professor"
        })
    }
}