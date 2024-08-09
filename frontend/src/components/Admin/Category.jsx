import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminProtectedComponent from './AdminProtectedComponent';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleAddCategory = () => {
        axios.post('http://localhost:8000/api/products/categories/', { name: newCategory })
            .then(response => {
                setCategories([...categories, response.data]);
                setNewCategory('');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleDeleteCategory = (id) => {
        axios.delete(`http://localhost:8000/api/products/categories/${id}/`)
            .then(response => {
                setCategories(categories.filter(category => category.id !== id));
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    // Inline styles
    const containerStyle = {
        padding: '20px',
        maxWidth: '100vw',
        margin: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundImage: 'url("https://wallpaper.forfun.com/fetch/16/1649074ecd03634e05639d767e131258.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Full viewport height
        color: 'white',
    };

    const formContainerStyle = {
        display: 'flex',
        marginBottom: '20px',
    };

    const inputFieldStyle = {
        flex: 1,
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginRight: '10px',
    };

    const addButtonStyle = {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const addButtonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    const thStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        backgroundColor: '#007bff',
        color: '#fff',
        textAlign: 'left',
    };

    const tdStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark transparent background
    };

    const evenRowStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker transparent background for even rows
    };

    const deleteButtonStyle = {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const deleteButtonHoverStyle = {
        backgroundColor: '#c82333',
    };

    return (
        <AdminProtectedComponent>
            <div style={containerStyle}>
                <h2>Categories</h2>
                <div style={formContainerStyle}>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New Category"
                        style={inputFieldStyle}
                    />
                    <button
                        onClick={handleAddCategory}
                        style={addButtonStyle}
                        onMouseEnter={e => e.target.style.backgroundColor = addButtonHoverStyle.backgroundColor}
                        onMouseLeave={e => e.target.style.backgroundColor = ''}
                    >
                        Add Category
                    </button>
                </div>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Category Name</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id} style={index % 2 === 0 ? evenRowStyle : {}}>
                                <td style={tdStyle}>{category.name}</td>
                                <td style={tdStyle}>
                                    <button
                                        onClick={() => handleDeleteCategory(category.id)}
                                        style={deleteButtonStyle}
                                        onMouseEnter={e => e.target.style.backgroundColor = deleteButtonHoverStyle.backgroundColor}
                                        onMouseLeave={e => e.target.style.backgroundColor = ''}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminProtectedComponent>
    );
};

export default Category;
