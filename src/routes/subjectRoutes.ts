import { Router } from "express"
import { getAllSubjects, getSubject, createNewSubject, updateSubject, deleteSubject } from "../controllers/subjectController.js"

const router = Router()

router.get("/subjects", getAllSubjects)
router.get("/subjects/:id", getSubject)
router.post("/subjects", createNewSubject)
router.patch("/subjects/:id", updateSubject)
router.delete("/subjects/:id", deleteSubject)

export default router