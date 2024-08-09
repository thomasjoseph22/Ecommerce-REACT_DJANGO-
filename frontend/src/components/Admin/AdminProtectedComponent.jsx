import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProtectedComponent = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
            navigate('/admin/login'); // Redirect to login if not admin
        }
    }, [navigate]);

    return children;
};

export default AdminProtectedComponent;
