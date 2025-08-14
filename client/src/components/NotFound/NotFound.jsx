import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={styles.container}>
        <h1 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Page Not Found</h1>
        <p style={{ textAlign: 'center' }}>The page you are looking for does not exist.</p>
        <p style={{ textAlign: 'center' }}>
            <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>Go back to Home</Link>
        </p>
    </div>
  )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        color: '#333',
        'media (max-width: 600px)': {
            padding: '20px',
        },
    }
    }

export default NotFound