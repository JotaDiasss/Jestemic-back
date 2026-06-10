import mongoose, { Schema, model } from "mongoose"

export interface IProfessor {
    name: string
    subjects: mongoose.Types.ObjectId[]
}

const professorSchema = new Schema<IProfessor>({
    name: {
        type: String,
        required: true
    },

    subjects: [{
        type: Schema.Types.ObjectId,
        ref: "Subject"
    }]
})

export const Professor = model<IProfessor>(
    "Professor",
    professorSchema
)