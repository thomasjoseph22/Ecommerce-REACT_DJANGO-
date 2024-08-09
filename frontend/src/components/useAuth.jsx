import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isStaff = localStorage.getItem('is_staff') === 'true';
        setIsLoggedIn(!!token);
        setIsAdmin(isStaff);
    }, []);

    const login = (token, isStaff) => {
        localStorage.setItem('token', token);
        localStorage.setItem('is_staff', isStaff);
        setIsLoggedIn(true);
        setIsAdmin(isStaff);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('is_staff');
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return { isLoggedIn, isAdmin, login, logout };
};

export default useAuth;
