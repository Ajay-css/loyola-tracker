import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios.js';

const CreateStudent = () => {

    const [name, setName] = useState("");
    const [std, setStd] = useState("");
    const [section, setSection] = useState("");
    const [subStatus, setSubStatus] = useState("");
    const [attendance, setAttendance] = useState("");
    const [feesPaid, setFeesPaid] = useState(false);

    const resetForm = () => {
        setName("");
        setStd("");
        setSection("");
        setSubStatus("");
        setAttendance("");
    };

    const navigate = useNavigate()

    const fetchStudents = async () => {
        try {
            const response = await api.get("/students");
            console.log('Students fetched successfully:', response.data);
            // You can set the fetched students to a state if needed
        } catch (error) {
            console.error("Error fetching students:", error);
            toast.error("Failed to fetch students");
        }
    }

    // Create Students Data

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/add", {
                name,
                std,
                section,
                subStatus,
                attendance,
                feesPaid
            });
            console.log(`Student Created Successfully`)
            toast.success("Student Added Successfully");
            fetchStudents();
            resetForm();
            navigate('/dashboard')
        }
        catch (error) {
            console.error("Error submitting student data:", error);
            toast.error("Failed to submit student data");
        }
    }

    const discardChanges = () => {
        resetForm();
        navigate('/dashboard');
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.h2}>Add Student</h2>
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
                <button style={styles.Dbutton} onClick={discardChanges}>Back To Home</button>
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
        margin: '90px auto'
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
    },
    Dbutton: {
        padding: '10px 15px',
        backgroundColor: 'red',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%'
    }
}

export default CreateStudent