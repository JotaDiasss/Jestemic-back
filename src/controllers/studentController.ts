import type { Request, Response } from "express";
import { Student } from "../models/Student.js"

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const student = await Student.find()
        res.status(200).json(student)
    } catch (err) {
        res.status(500).json({
            err: "Erro ao buscar os estudantes"
        })
    }
}

export const getStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const student = await Student.findById(id)

        if (!student) {
            return res.status(404).json({
                err: "Estudante não encontrado"
            })
        }

        res.status(200).json(student)
    } catch (err) {
        res.status(500).json({
            err: "Erro ao buscar o estudante"
        })
    }
}

export const createStudent = async (req: Request, res: Response) => {
    try {
        const { name, period, subjects } = req.body

        const student = await Student.create({
            name,
            period,
            subjects: subjects || []
        })

        res.status(201).json(student)
    } catch (err) {
        res.status(500).json({
            err: "Erro ao criar estudante"
        })
    }
}

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, period, subjects } = req.body

        const updateData: any = {}
        if(name !== undefined) updateData.name = name
        if(period !== undefined) updateData.period = period
        if(subjects !== undefined) updateData.subjects = subjects

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                err: "Envie pelo menos um campo para atualizar"
            })
        }

        const student = await Student.findByIdAndUpdate(
            id, updateData, { new: true }
        )

        if (!student) {
            return res.status(404).json({
                err: "Estudante não encontrado"
            })
        }

        res.status(200).json(student)
    } catch (err) {
        res.status(500).json({
            err: "Erro ao editar o estudante"
        })
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const student = await Student.findByIdAndDelete(id)

        if (!student) {
            return res.status(404).json({
                err: "Estudante não encontrado"
            })
        }

        res.status(204).send()
    } catch (err) {
        res.status(500).json({
            err: "Erro ao deletar o estudante"
        })
    }
}