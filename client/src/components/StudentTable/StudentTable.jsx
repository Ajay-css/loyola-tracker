import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { FileSpreadsheet, Plus } from 'lucide-react';
import api from '../../lib/axios.js';
import { LogOut } from 'lucide-react';
import axios from 'axios';

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchStudents = async () => {
        try {
            const response = await api.get("/students");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
            toast.error("Failed to fetch students");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Navigate to Edit Student Page
    const navigateToEdit = (id) => {
        navigate(`/edit-student/${id}`);
    }

    const navigateToCreate = () => {
        navigate('/add-student');
    }

    // Delete Student
    const handleDelete = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this student?")) return;
            await api.delete(`/delete/${id}`);
            toast.success("Student deleted successfully");
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
            toast.error("Failed to delete student");
        }
    }

    const handleExcel = async () => {
        try {
            // Make GET request with responseType blob
            const response = await api.get("/data", {
                responseType: 'blob'
            });

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Get current date for filename
            const date = new Date().toISOString().split('T')[0];
            link.setAttribute('download', `students-${date}.xlsx`);

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success("Excel file downloaded successfully");
        } catch (error) {
            console.error("Error downloading Excel file:", error);
            toast.error("Failed to download Excel file");
        }
    }

    // Logout function

    const handleLogout = async () => {
        try {
            await axios.post('https://loyola-tracker-backend.onrender.com/api/auth/logout');
            toast.success("Logged out successfully");
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Failed to log out");
        }
    }

    return (
        <>

            <div style={styles.nav}>
                <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Students List</h1>
                <button style={styles.logout} onClick={handleLogout}><LogOut size={20} />Logout</button>
            </div>

            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search by student name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.tcontainer}>
                <div style={styles.tableWrapper}>
                    <table style={styles.container}>
                        <thead>
                            <tr style={styles.header}>
                                <th style={styles.heading}>Name</th>
                                <th style={styles.heading}>Standard</th>
                                <th style={styles.heading}>Section</th>
                                <th style={styles.heading}>Subject Status</th>
                                <th style={styles.heading}>Attendance</th>
                                <th style={styles.heading}>Fees Paid</th>
                                <th style={styles.heading}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                        No students found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((student) => (
                                    <tr key={student._id}>
                                        <td style={styles.tdata}>{student.name}</td>
                                        <td style={styles.tdata}>{student.std}</td>
                                        <td style={styles.tdata}>{student.section}</td>
                                        <td style={styles.tdata}>{student.subStatus}</td>
                                        <td style={styles.tdata}>{student.attendance}</td>
                                        <td style={styles.tdata}>{student.feesPaid ? "Yes" : "No"}</td>
                                        <td>
                                            <button
                                                onClick={() => navigateToEdit(student._id)}
                                                style={styles.editBtn}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student._id)}
                                                style={styles.delBtn}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div style={styles.excelDiv}>
                    <button style={styles.excel} onClick={handleExcel}>
                        <FileSpreadsheet />
                        <span style={styles.buttonText}>Download Excel</span>
                    </button>
                    <button style={styles.newStudent} onClick={navigateToCreate}>
                        <Plus />
                        <span style={styles.buttonText}>Add Student</span>
                    </button>
                </div>
            </div>
        </>
    )
}

const styles = {
    tableWrapper: {
        overflowX: 'auto',
        width: '100%',
        '@media (max-width: 768px)': {
            fontSize: '14px'
        }
    },
    container: {
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '100%',
        margin: '20px auto',
        borderCollapse: 'collapse',
        textAlign: 'center',
        padding: '10px',
        minWidth: '650px', // Ensures table doesn't get too squished
    },
    tcontainer: {
        marginTop: '20px',
        padding: '10px',
        width: '95%',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    heading: {
        backgroundColor: '#f2f2f2',
        color: '#333',
        padding: '10px',
        textAlign: 'center',
        '@media (max-width: 768px)': {
            padding: '8px 5px',
        }
    },
    tdata: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        textAlign: 'center',
        verticalAlign: 'middle',
        color: '#000000',
        '@media (max-width: 768px)': {
            padding: '8px 5px',
        }
    },
    excelDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        padding: '10px',
        flexWrap: 'wrap',
        gap: '10px',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'stretch',
        }
    },
    excel: {
        backgroundColor: 'green',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        flex: '1',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        '@media (max-width: 600px)': {
            width: '100%',
        }
    },
    newStudent: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        minWidth: '160px',
        flex: '1',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        '@media (max-width: 600px)': {
            width: '100%',
        }
    },
    buttonText: {
        '@media (max-width: 400px)': {
            fontSize: '14px'
        }
    },
    editBtn: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
        '@media (max-width: 768px)': {
            padding: '6px 10px',
            fontSize: '12px'
        }
    },
    delBtn: {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        '@media (max-width: 768px)': {
            padding: '6px 10px',
            fontSize: '12px'
        }
    },
    logout: {
        backgroundColor: '#ff5722',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        top: '35px',
        right: '20px',
        '@media (max-width: 600px)': {
            width: '100%',
            position: 'static',
            marginTop: '10px'
        }
    },
    nav: {
        position: 'relative',
        width: '100%',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
        }
    },
    searchInput : {
        width: '100%',
        maxWidth: '400px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '20px',
        fontSize: '16px',
        '@media (max-width: 600px)': {
            width: '100%',
            marginBottom: '10px'
        }
    }
}

export default StudentTable