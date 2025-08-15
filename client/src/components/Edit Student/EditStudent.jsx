import React, { useState, useEffect } from 'react'
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/axios.js';

const EditStudent = () => {
    const [name, setName] = useState("");
    const [std, setStd] = useState("");
    const [section, setSection] = useState("");
    const [subStatus, setSubStatus] = useState("");
    const [attendance, setAttendance] = useState("");
    const [feesPaid, setFeesPaid] = useState("No");

    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch student data when component mounts
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await api.get(`/students/${id}`);
                const student = response.data;
                setName(student.name || "");
                setStd(student.std || "");
                setSection(student.section || "");
                setSubStatus(student.subStatus || "");
                setAttendance(student.attendance || "");
                setFeesPaid(!!student.feesPaid); // ensure boolean
            } catch (error) {
                console.error("Error fetching student:", error);
                toast.error("Failed to fetch student data");
                navigate('/dashboard');
            }
        };

        fetchStudent();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.put(`/update/${id}`, {
                name,
                std,
                section,
                subStatus,
                attendance,
                feesPaid
            });
            toast.success("Student details updated successfully");
            navigate('/dashboard');
        } catch (error) {
            console.error("Error updating student data:", error);
            toast.error("Failed to update student data");
        }
    };

    const handleDiscard = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <h1 style={styles.title}>Student Details Editing Page</h1>
            <div style={styles.container}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Standard"
                        value={std}
                        onChange={(e) => setStd(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Section"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Subject Status"
                        value={subStatus}
                        onChange={(e) => setSubStatus(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Attendance"
                        value={attendance}
                        onChange={(e) => setAttendance(e.target.value)}
                        style={styles.input}
                    />
                    <div style={styles.checkboxContainer}>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={feesPaid}
                                onChange={(e) => setFeesPaid(e.target.checked)}
                                style={styles.checkbox}
                            />
                            Fees Paid
                        </label>
                    </div>
                    <button type="submit" style={styles.button}>Save Changes</button>
                    <button
                        type="button"
                        onClick={handleDiscard}
                        style={styles.Dbutton}
                    >
                        Discard Changes
                    </button>
                </form>
            </div>
        </div>
    )
}

// Update title style to make it visible
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '60px auto'
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
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%'
    },
    title: {
        textAlign: 'center',
        color: '#fff', // Changed from white to dark color
        marginTop: '20px',
        marginBottom: '20px'
    },
    checkboxContainer: {
        margin: '10px 0',
        display: 'flex',
        alignItems: 'center'
    },
    checkbox: {
        marginRight: '8px',
        cursor: 'pointer',
        color: '#000000',
    }
}

export default EditStudent