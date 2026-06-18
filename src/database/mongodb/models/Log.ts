import mongoose, { Schema, model } from 'mongoose'

type level = "info" | "error"
type service = "professor-service" | "student-service" | "subject-service" | "professorSubject-service" | "studentSubject-service" |"api"

export interface ILog {
    level: level
    message: string,
    timestamp: Date,
    service: service
    metadata?: Record<string, any>
}

const logSchema = new Schema<ILog> ({
    level: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    service: {
        type: String,
        required: true
    },
    metadata: {
        type: Object,
        default: {}
    }
})

export const Log = model<ILog>(
    "Log",
    logSchema
)