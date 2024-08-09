import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/accounts/login/', { username, password })
        .then(response => {
            localStorage.setItem('token', response.data.token);
            navigate('/products');
        })
        .catch(error => {
            console.error('There was an error logging in!', error);
            alert('Login failed!');
        });
    };

    // Styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(https://img.freepik.com/premium-vector/retro-background-pop-art-style-vector-groovy-vintage_945009-135.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        boxSizing: 'border-box'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        width: '100%',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff'
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
        transition: 'background-color 0.3s ease'
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3'
    };

    return (
        <div style={containerStyle}>
            <form 
                onSubmit={handleLogin}
                style={formStyle}
            >
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" 
                    required 
                    style={inputStyle}
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                    style={inputStyle}
                />
                <button 
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={e => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = ''}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
