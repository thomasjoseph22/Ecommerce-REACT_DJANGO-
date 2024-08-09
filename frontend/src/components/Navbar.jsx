import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const Navbar = () => {
    const { isLoggedIn, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navStyle = {
        background: '#333',
        padding: '10px 20px',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const ulStyle = {
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0,
        padding: 0,
    };

    const liStyle = {
        margin: 0,
    };

    const linkStyle = {
        color: '#fff',
        textDecoration: 'none',
        padding: '8px 15px',
        borderRadius: '4px',
        transition: 'background 0.3s ease',
    };

    const linkHoverStyle = {
        background: '#555',
    };

    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li style={liStyle}>
                    <Link
                        to="/"
                        style={linkStyle}
                        onMouseEnter={e => e.target.style.background = linkHoverStyle.background}
                        onMouseLeave={e => e.target.style.background = ''}
                    >
                        Home
                    </Link>
                </li>
                {!isLoggedIn && (
                    <>
                        <li style={liStyle}>
                            <Link
                                to="/register"
                                style={linkStyle}
                                onMouseEnter={e => e.target.style.background = linkHoverStyle.background}
                                onMouseLeave={e => e.target.style.background = ''}
                            >
                                Register
                            </Link>
                        </li>
                        <li style={liStyle}>
                            <Link
                                to="/login"
                                style={linkStyle}
                                onMouseEnter={e => e.target.style.background = linkHoverStyle.background}
                                onMouseLeave={e => e.target.style.background = ''}
                            >
                                Login
                            </Link>
                        </li>
                    </>
                )}
                <li style={liStyle}>
                    <Link
                        to="/products"
                        style={linkStyle}
                        onMouseEnter={e => e.target.style.background = linkHoverStyle.background}
                        onMouseLeave={e => e.target.style.background = ''}
                    >
                        Products
                    </Link>
                </li>
                {isAdmin && (
                    <>
                        <li style={liStyle}>
                            <Link
                                to="/admin/products"
                                style={linkStyle}
                                onMouseEnter={e => e.target.style.background = linkHoverStyle.background}
                                onMouseLeave={e => e.target.style.background = ''}
                            >
                                Admin Products
                            </Link>
                        </li>
                        <li style={liStyle}>
                            <Link
                                to="/admin/categories"
                                style={linkStyle}
                                onMouseEnter={e => e.target.style.background = linkHoverStyle.background}
                                onMouseLeave={e => e.target.style.background = ''}
                            >
                                Add Categories
                            </Link>
                        </li>
                        <li style={liStyle}>
                            <Link
                                to="/admin/product"
                                style={linkStyle}
                                onMouseEnter={e => e.target.style.background = linkHoverStyle.background}
                                onMouseLeave={e => e.target.style.background = ''}
                            >
                                Add Product
                            </Link>
                        </li>
                    </>
                )}
                <li style={liStyle}>
                    <Link
                        to="/cart"
                        style={linkStyle}
                        onMouseEnter={e => e.target.style.background = linkHoverStyle.background}
                        onMouseLeave={e => e.target.style.background = ''}
                    >
                        Cart
                    </Link>
                </li>
            </ul>
            {isLoggedIn && (
                <button onClick={handleLogout} style={{ ...linkStyle, background: '#f00' }}>
                    Logout
                </button>
            )}
        </nav>
    );
};

export default Navbar;
