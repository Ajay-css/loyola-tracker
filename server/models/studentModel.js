import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    std: { type: String, required: true },
    section: { type: String, required: true },
    subStatus: { type: String, required: true },
    attendance: { type: String, required: true },
    feesPaid : { type: Boolean, default: false },
}, { timestamps: true }); // shows created at and updated at date

const Student = mongoose.model("Student", studentSchema);

export default Student;