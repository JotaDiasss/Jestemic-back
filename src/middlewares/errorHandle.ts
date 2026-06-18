import type { Request, Response, NextFunction } from 'express'
import { Log } from '../database/mongodb/models/Log.js'

export async function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    await Log.create({
        level: "error",
        message: err.message || "Erro desconhecido",
        service: "api",
        metadata: {
            url: req.url,
            method: req.method,
            body: req.body,
            stack: err.stack
        }
    })

    res.status(500).json({ error: "Erro interno do servidor"})
}