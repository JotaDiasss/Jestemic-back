import { Router } from "express"
import { getAllStudents, getStudent, createStudent, updateStudent, deleteStudent } from "../controllers/studentController.js"

const router = Router()

router.get("/students", getAllStudents)
router.get("/students/:id", getStudent)
router.post("/students", createStudent)
router.patch("/students/:id", updateStudent)
router.delete("/students/:id", deleteStudent)

export default router