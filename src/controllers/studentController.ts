import type { Request, Response } from "express";
import * as studentService from "../services/studentServices.js"
import * as studentSubjectServices from "../services/studentSubjectService.js"

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const student = await studentService.getAllStudents()
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
        const studentId = Number(id)

        const student = await studentService.getStudentById(studentId)

        res.status(200).json(student)
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Estudante não encontrado") {
                return res.status(404).json({ err: err.message })
            }
        }
        res.status(500).json({
            err: "Erro ao buscar o estudante"
        })
    }
}

export const createStudent = async (req: Request, res: Response) => {
    try {
        const { name, period, subjects } = req.body

        const student = await studentService.createNewStudent({ name, period })
        if (!student) {
            throw new Error("Erro ao criar o estudante")
        }
        if (subjects && Array.isArray(subjects)) {
            for (const subjectId of subjects) {
                await studentSubjectServices.addSubjectToStudentService(student.id, subjectId)
            }
        }

        res.status(201).json(student)
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Nome do estudante é obrigatório" ||
                err.message === "Nome deve conter apenas letras e espaços" ||
                err.message === "Periodo do estudante é obrigatório"
            ) {
                return res.status(400).json({
                    err: err.message
                })
            }
            if (err.message === "Estudante não encontrado" ||
                err.message === "Disciplina não encontrado"
            ) {
                return res.status(404).json({ err: err.message })
            }
        }
        res.status(500).json({
            err: "Erro ao criar o estudante"
        })
    }
}

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, period, subjects } = req.body
        const studentId = Number(id)

        console.log('Dados recebidos:', { name, period, subjects })

        let student = await studentService.getStudentById(studentId)

        if (name !== undefined || period !== undefined) {
            await studentService.updateExistingStudent(studentId, { name, period })
            student = await studentService.getStudentById(studentId)
        }

        if (subjects && Array.isArray(subjects)) {
            for (const subjectId of subjects) {
                await studentSubjectServices.addSubjectToStudentService(studentId, subjectId)
            }
            student = await studentService.getStudentById(studentId)
        }

        res.status(200).json(student)
    } catch (err) {
        console.log('MENSAGEM DO ERRO:', err instanceof Error ? err.message : err)
        if (err instanceof Error) {
            if (err.message === "Nome do estudante é obrigatório" ||
                err.message === "Nome deve conter apenas letras e espaços" ||
                err.message === "Periodo do estudante é obrigatório"
            ) {
                return res.status(400).json({ err: err.message })
            }
            if (err.message === "Estudante não encontrado" ||
                err.message === "Disciplina não encontrada"
            ) {
                return res.status(404).json({ err: err.message })
            }
        }
        res.status(500).json({
            err: "Erro ao editar o estudante"
        })
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const studentId = Number(id)

        await studentService.deleteExistingStudent(studentId)

        res.status(204).send()
    } catch (err) {
        if (err instanceof Error) {
            if (err.message === "Estudante não encontrado") {
                return res.status(404).json({ err: err.message })
            }
        }
        res.status(500).json({
            err: "Erro ao deletar o estudante"
        })
    }
}