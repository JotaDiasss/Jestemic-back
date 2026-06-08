import { Router } from "express"
import { getAllProfessors, getProfessor, createProfessor, updateProfessor, deleteProfessor} from "../controllers/professorController.js"

const router = Router()

router.get("/professors", getAllProfessors)
router.get("/professors/:id", getProfessor)
router.post("/professors", createProfessor)
router.patch("/professors/:id", updateProfessor)
router.delete("/professors/:id", deleteProfessor)

export default router