import { Schema, model } from "mongoose"

const weekDays = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
] as const;

export type WeekDay = typeof weekDays[number];

export interface ISubject {
    name: string
    weekDays: WeekDay[]
    startAt: string
    finishAt: string
    workload: number
}

const subjectSchema = new Schema<ISubject>({
    name: {
        type: String,
        required: true
    },

    weekDays: {
        type: [String],
        enum: weekDays,
        required: true
    },

    startAt: {
        type: String,
        required: true
    },

    finishAt: {
        type: String,
        required: true
    },

    workload: {
        type: Number,
        required: true
    }
})

export const Subject = model<ISubject>(
    "Subject",
    subjectSchema
);