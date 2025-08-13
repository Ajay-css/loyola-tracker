import React, { useState } from 'react'
import './Login.css' // Assuming you have a CSS file for styling the Login page
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast' // Assuming you're using react-hot-toast for notifications

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password
            });
            if (res.data) {
                // Handle successful login, e.g., redirect to dashboard
                console.log('Login successful');
                toast.success('Login successful!');
                navigate('/dashboard'); // Redirect to the dashboard or home page
            }
        } catch (error) {
            console.error('Login failed', error);
            toast.error('Login failed. Please check your credentials.');
            // Handle login failure, e.g., show an error message
        }
    }

    return (
        <div>
            <div className="login-container" style={{ padding: '20px', backgroundColor: '#ffffffff', borderRadius: '8px', width: '300px', margin: 'auto', marginTop: '50px' }}>
                <h1 style={{ color: '#000000', marginBottom: "20px" }}>Please Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ marginBottom: '20px', padding: '8px', width: '95%' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ marginBottom: '20px', padding: '8px', width: '95%' }}
                    />
                    <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', width: '100%', cursor: 'pointer' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login