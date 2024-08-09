import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/accounts/admin/register/', formData)
            .then(response => setSuccessMessage('Admin Registration Successful'))
            .catch(error => console.error('There was an error!', error));
    };

    const containerStyle = {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '4px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        marginTop: '10px'
    };

    return (
        <div style={containerStyle}>
            <h2>Admin Register</h2>
            {successMessage && <p>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                    style={inputStyle}
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    style={inputStyle}
                />
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Register</button>
            </form>
        </div>
    );
};

export default AdminRegister;
