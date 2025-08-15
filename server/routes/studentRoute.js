import express from "express";
import { addStudent, deleteStudent, exportToExcel, getStudents, updateStudent } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.post('/add', addStudent)
studentRouter.get('/students', getStudents)
studentRouter.get('/students/:id', getStudentById)
studentRouter.put('/update/:id', updateStudent)
studentRouter.delete('/delete/:id', deleteStudent)
studentRouter.get('/data', exportToExcel)

export default studentRouter;