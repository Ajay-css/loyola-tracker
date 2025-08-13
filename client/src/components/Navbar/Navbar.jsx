import React from 'react'
import './Navbar.css' // Assuming you have a CSS file for styling the Navbar
import { Link } from 'react-router-dom'
import Login from '../../pages/Login/Login'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" style={{ color : "white" , textDecoration : "none" }}>
                        <h1>Loyola Study Students Tracker</h1>
                    </Link>
                    <Login />
                </div>
            </nav>
        </div>
    )
}

export default Navbar