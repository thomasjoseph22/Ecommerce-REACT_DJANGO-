import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });

        axios.get('http://localhost:8000/api/products/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    };

    const pageStyle = {
        backgroundImage: 'url(https://wallpapercave.com/wp/wp4676576.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        color: '#fff',
        padding: '50px 0'
    };

    const rowStyle = {
        gap: '5px'
    };

    const cardStyle = {
        maxWidth: '250px',
        margin: '0 auto'
    };

    const handlePreview = (id) => {
        navigate(`/product/${id}`);
    };

    const filteredProducts = products.filter(product => {
        const category = categories.find(cat => cat.id === product.category);
        return (
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (category && category.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    return (
        <div style={pageStyle}>
            

            <div className="container mt-5 pt-5">
                <div className="text-center mb-4">
                    <h1>Products</h1>
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <div className="input-group" style={{ maxWidth: '600px', width: '100%' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by category or product name"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <Carousel className="mb-4" variant="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn11.bigcommerce.com/s-xyp4jdqv/images/stencil/original/image-manager/shop-toys-link-image-v2.png?t=1711630969"
                            alt="First slide"
                            style={{ height: '500px', objectFit: 'cover' }}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://www.computronicuae.com/cdn/shop/files/G713PV-9161G04_2048x2048.jpg?v=1706030129"
                            alt="Second slide"
                            style={{ height: '500px', objectFit: 'cover' }}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://backend.mobilizujeme.cz/wp-content/uploads/2023/01/samsung-galaxy-S23-ultra-render-ahmad-qwaider.jpg"
                            alt="Third slide"
                            style={{ height: '500px', objectFit: 'cover' }}
                        />
                    </Carousel.Item>
                </Carousel>
                {categories.map(category => (
                    <div key={category.id} className="mb-4">
                        <h3>{category.name}</h3>
                        <div className="row" style={rowStyle}>
                            {filteredProducts.filter(product => product.category === category.id).map(product => (
                                <div key={product.id} className="col-md-3">
                                    <div className="card h-100" style={cardStyle}>
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{product.name}</h5>
                                            <img 
                                                src={product.image1} 
                                                alt={product.name} 
                                                className="img-fluid mb-3"
                                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                            />
                                            <button 
                                                className="btn btn-secondary mt-auto"
                                                onClick={() => handlePreview(product.id)}
                                            >
                                                Preview
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
