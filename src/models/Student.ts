import mongoose, { Schema, model } from "mongoose"

export interface IStudent {
    name: string
    period: number
    subjects: mongoose.Types.ObjectId[]
}

const studentSchema = new Schema<IStudent>({
    name: {
        type: String,
        required: true
    },

    period: {
        type: Number,
        required: true
    },

    subjects: [{
        type: Schema.Types.ObjectId,
        ref: "Subject"
    }]
})

export const Student = model<IStudent>(
    "Student",
    studentSchema
)