import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from "react-hot-toast"

const StudentCard = () => {

    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [std, setStd] = useState("");
    const [section, setSection] = useState("");
    const [subStatus, setSubStatus] = useState("");
    const [attendance, setAttendance] = useState("");
    const [editingId, setEditingId] = useState(false);

    // Getting Students Data

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/details/students");
            setStudents(response.data);
            console.log('Students fetched successfully:', response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
            toast.error("Failed to fetch students");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Create and Update Students Data

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                // Update existing student
                const response = await axios.put(`http://localhost:3000/api/details/update/${editingId}`, {
                    name,
                    std,
                    section,
                    subStatus,
                    attendance
                });
                console.log(response.data)
                toast.success("Student updated successfully");
            } else {
                // Create new student
                const response = await axios.post("http://localhost:3000/api/details/add", {
                    name,
                    std,
                    section,
                    subStatus,
                    attendance
                });
                toast.success("Student added successfully");
            }
            fetchStudents();
            resetForm();
        }
        catch (error) {
            console.error("Error submitting student data:", error);
            toast.error("Failed to submit student data");
        }
    }

    const resetForm = () => {
        setName("");
        setStd("");
        setSection("");
        setSubStatus("");
        setAttendance("");
        setEditingId(false);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.h2}>Students Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Standard"
                    value={std}
                    onChange={(e) => setStd(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Subject Status"
                    value={subStatus}
                    onChange={(e) => setSubStatus(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Attendance"
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Add Student</button>
            </form>
        </div>
    )
}

const styles = {
    h2: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px'
    },
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: 'auto'
    },
    input: {
        width: '95%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%'
    }
}

export default StudentCard