// src/components/Product.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminProtectedComponent from './AdminProtectedComponent';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        image1: null,
        image2: null,
        image3: null,
    });
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products/products/');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products/categories/');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image1', formData.image1);
        formDataToSend.append('image2', formData.image2);
        formDataToSend.append('image3', formData.image3);

        try {
            if (editMode) {
                await axios.put(`http://localhost:8000/api/products/products/${editProductId}/`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setEditMode(false);
                setEditProductId(null);
            } else {
                await axios.post('http://localhost:8000/api/products/products/', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            fetchProducts();
            setFormData({
                name: '',
                category: '',
                price: '',
                description: '',
                image1: null,
                image2: null,
                image3: null,
            });
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            description: product.description,
            image1: null,
            image2: null,
            image3: null,
        });
        setEditMode(true);
        setEditProductId(product.id);
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:8000/api/products/products/${productId}/`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Inline styles
    const containerStyle = {
        padding: '20px',
        maxWidth: '1200px',
        margin: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundImage: 'url("https://png.pngtree.com/background/20230409/original/pngtree-sky-colorful-clouds-cartoon-background-picture-image_2372596.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        minHeight: '100vh', // Full viewport height
    };

    const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    };

    const inputFieldStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    };

    const fileInputStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
        marginTop: '20px',
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
        color: 'white',
    };

    const evenRowStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker transparent background for even rows
    };

    const imgStyle = {
        width: '100px', // Consistent image size
        height: 'auto',
        marginRight: '10px',
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
                <h2>Products</h2>
                <form onSubmit={handleSubmit} style={formContainerStyle}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        style={inputFieldStyle}
                        required
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        style={inputFieldStyle}
                        required
                    >
                        <option value="">Select Category</option>
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No categories available</option>
                        )}
                    </select>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        style={inputFieldStyle}
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        style={inputFieldStyle}
                        required
                    />
                    <input
                        type="file"
                        name="image1"
                        onChange={handleChange}
                        style={fileInputStyle}
                        required={!editMode}
                    />
                    <input
                        type="file"
                        name="image2"
                        onChange={handleChange}
                        style={fileInputStyle}
                        required={!editMode}
                    />
                    <input
                        type="file"
                        name="image3"
                        onChange={handleChange}
                        style={fileInputStyle}
                        required={!editMode}
                    />
                    <button
                        type="submit"
                        style={addButtonStyle}
                        onMouseEnter={e => e.target.style.backgroundColor = addButtonHoverStyle.backgroundColor}
                        onMouseLeave={e => e.target.style.backgroundColor = ''}
                        disabled={categories.length === 0}
                    >
                        {editMode ? 'Update' : 'Add'} Product
                    </button>
                </form>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Price</th>
                            <th style={thStyle}>Description</th>
                            <th style={thStyle}>Images</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id} style={index % 2 === 0 ? evenRowStyle : null}>
                                <td style={tdStyle}>{product.name}</td>
                                <td style={tdStyle}>{product.category}</td>
                                <td style={tdStyle}>${product.price}</td>
                                <td style={tdStyle}>{product.description}</td>
                                <td style={tdStyle}>
                                    {product.image1 && <img src={product.image1} alt="Image 1" style={imgStyle} />}
                                    {product.image2 && <img src={product.image2} alt="Image 2" style={imgStyle} />}
                                    {product.image3 && <img src={product.image3} alt="Image 3" style={imgStyle} />}
                                </td>
                                <td style={tdStyle}>
                                    <button onClick={() => handleEdit(product)} style={deleteButtonStyle}>Edit</button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        style={{ ...deleteButtonStyle, marginLeft: '10px' }}
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

export default Product;
