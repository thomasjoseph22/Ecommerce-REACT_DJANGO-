import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css'


const AdminLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear previous errors
        console.log('Submitting form data:', formData);  // Debug line

        try {
            const response = await axios.post('http://localhost:8000/api/accounts/admin/login/', formData);
            console.log('Login successful:', response.data); // Debug line
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/products');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError('Incorrect username or password.');
                } else {
                    console.error('Response error data:', error.response.data);
                    console.error('Response error status:', error.response.status);
                }
            } else if (error.request) {
                console.error('Request error data:', error.request);
            } else {
                console.error('General error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
