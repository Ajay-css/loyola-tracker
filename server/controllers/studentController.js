import Student from "../models/studentModel.js";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { formatDate } from "../utils/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Will be initialized to server.js

let io = null;
export const initSocket = (socketIo) => { io = socketIo }

export const addStudent = async (req, res) => {
    const { name, std, section, subStatus, attendance, feesPaid } = req.body;
    try {
        const newStudent = new Student({
            name,
            std,
            section,
            subStatus,
            attendance,
            feesPaid
        });
        await newStudent.save();
        res.status(201).json({ message: "Student Added Successfully!", student: newStudent });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const exportToExcel = async (req, res) => {
    try {
        // Get attendance filter from query params
        const { attendance } = req.query;
        let filter = {};
        if (attendance) {
            filter.attendance = attendance;
        }

        const students = await Student.find(filter);
        if (students.length === 0) {
            return res.status(404).json({ message: "No Students Found!" });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Students");

        worksheet.columns = [
            { header: "Name", key: "name", width: 30 },
            { header: "Standard", key: "std", width: 10 },
            { header: "Section", key: "section", width: 10 },
            { header: "Subject Status", key: "subStatus", width: 20 },
            { header: "Attendance", key: "attendance", width: 15 },
            { header: "Fees Info", key: "feesPaid", width: 15 }
        ];

        students.forEach(student => {
            worksheet.addRow({
                name: student.name,
                std: student.std,
                section: student.section,
                subStatus: student.subStatus,
                attendance: student.attendance,
                feesPaid: student.feesPaid
            });
        });

        const uploadsDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        const currentDate = new Date().toISOString().split('T')[0];
        const filePath = path.join(__dirname, `../uploads/students-${currentDate}.xlsx`);

        await workbook.xlsx.writeFile(filePath);

        res.download(filePath, (err) => {
            if (err) {
                console.error("Download error:", err);
                res.status(500).json({ message: "Error downloading file" });
            } else {
                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error("Error deleting file:", unlinkErr);
                    }
                });
            }
        });
    } catch (error) {
        console.error("Export error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, std, section, subStatus, attendance, feesPaid } = req.body;
        const student = await Student.findByIdAndUpdate(id, { name, std, section, subStatus, attendance, feesPaid }, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).json({ message: "Student Not Found!" });
        }
        res.status(200).json({ message: "Student Updated Successfully!", student });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ message: "Student Not Found!" });
        }
        res.status(200).json({ message: "Student Deleted Successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}