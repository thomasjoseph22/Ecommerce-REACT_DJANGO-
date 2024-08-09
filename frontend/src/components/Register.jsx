import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors = [];
        if (!formData.username) errors.push('Username is required.');
        if (!formData.password) errors.push('Password is required.');
        if (!formData.email) errors.push('Email is required.');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.push('Email is invalid.');
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }
        axios.post('http://localhost:8000/api/accounts/register/', formData)
            .then(response => {
                setSuccessMessage('Registration Successful');
                alert('Registration Successful'); // Show alert on successful registration
                setErrorMessages([]); // Clear error messages
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div style={containerStyle}>
            <div style={overlayStyle}>
                <h2 style={headingStyle}>Register</h2>
                {errorMessages.length > 0 && (
                    <div style={errorContainerStyle}>
                        {errorMessages.map((error, index) => (
                            <p key={index} style={errorStyle}>{error}</p>
                        ))}
                    </div>
                )}
                {successMessage && <p style={successStyle}>{successMessage}</p>}
                <form onSubmit={handleSubmit} style={formStyle}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        style={inputStyle}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        style={inputStyle}
                    />
                    <button type="submit" style={buttonStyle}>Register</button>
                </form>
            </div>
        </div>
    );
};

// Inline styling
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/006/852/804/original/abstract-blue-background-simple-design-for-your-website-free-vector.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const overlayStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
    marginBottom: '20px',
    fontSize: '24px',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
};

const inputStyle = {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
};

const buttonStyle = {
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

const buttonHoverStyle = {
    backgroundColor: '#0056b3',
};

const errorContainerStyle = {
    marginBottom: '15px',
    color: '#d9534f',
    border: '1px solid #d9534f',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#f9d6d5',
};

const errorStyle = {
    margin: '0',
};

const successStyle = {
    color: '#28a745',
    fontSize: '16px',
    marginBottom: '15px',
};

export default Register;
