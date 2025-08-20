import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://loyola-tracker-backend.onrender.com/api/auth/login",
                { email, password },
                { withCredentials: true } // Important for cookies
            );

            if (res.data) {
                toast.success("Login successful!");
                console.log("User:", res.data.user);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login failed", error.response?.data || error.message);
            toast.error(
                error.response?.data?.message || "Login failed. Please check your credentials."
            );
        }
    };

    return (
        <div className="login-container" style={{
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            width: "300px",
            margin: "auto",
            marginTop: "50px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
        }}>
            <h1 style={{ color: "#000000", marginBottom: "20px", textAlign: "center" }}>
                Please Login
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ marginBottom: "15px", padding: "10px", width: "95%" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ marginBottom: "15px", padding: "10px", width: "95%" }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "10px 15px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        width: "100%",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;