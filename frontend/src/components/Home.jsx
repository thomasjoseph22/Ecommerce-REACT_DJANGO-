// components/Home.jsx
import React from 'react';

const Home = () => {
    return (
        <div style={homeStyle}>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of the application.</p>
        </div>
    );
};

// Inline styling for the Home component
const homeStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Ensure it fills the viewport height
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
};

export default Home;
