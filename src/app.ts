import express from "express"
import professorRoutes from "./routes/professorRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import subjectRoutes from "./routes/subjectRoutes.js"
import { errorHandler } from "./middlewares/errorHandle.js"

const app = express()

app.use(express.json())

app.use(professorRoutes)
app.use(studentRoutes)
app.use(subjectRoutes)

app.use(errorHandler)

export default app