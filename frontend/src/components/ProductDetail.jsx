import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!id) {
            console.error('No product ID found');
            return;
        }

        axios.get(`http://localhost:8000/api/products/products/${id}/`)
            .then(response => {
                console.log('Product data:', response.data);
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    
        axios.get('http://localhost:8000/api/products/categories/')
            .then(response => {
                console.log('Categories data:', response.data);
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [id]);

    const handleAddToCart = async (productId, quantity) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            alert('You must be logged in to add items to the cart.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8000/api/carts/add_to_cart/', {
                product_id: productId,
                quantity: parseInt(quantity, 10),  // Parse quantity as integer
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            console.log('Product added to cart:', response.data);
            alert('Product added to cart!');
        } catch (error) {
            console.error('There was an error adding the product to the cart!', error.response ? error.response.data : error.message);
            alert('Failed to add product to cart.');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const images = [product.image1, product.image2, product.image3].filter(img => img);
    const category = categories.find(cat => cat.id === product.category) || { name: 'Uncategorized' };

    return (
        <div 
            style={{ 
                backgroundImage: 'url("https://wallpaper-house.com/data/out/21/wallpaper2you_7572.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                padding: '20px'
            }}
        >
            <div className="container" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '8px', padding: '20px' }}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="d-flex flex-column align-items-center">
                            {images.length > 0 && (
                                <img
                                    src={images[0]}
                                    className="mb-3"
                                    alt="Product image 1"
                                    style={{ width: '700px', height: '400px', objectFit: 'cover' }}
                                />
                            )}
                            {images.length > 1 && (
                                <div className="d-flex w-100">
                                    {images.slice(1).map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            className="mr-0"
                                            alt={`Product image ${index + 2}`}
                                            style={{ width: '50%', height: '300px', objectFit: 'cover' }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Category:</strong> {category.name}</p>
                        <div className="mt-3">
                            <input 
                                type="number" 
                                value={quantity} 
                                onChange={(e) => setQuantity(e.target.value)} 
                                min="1" 
                                className="form-control mb-2" 
                                style={{ width: '100px' }}
                            />
                            <button className="btn btn-primary" onClick={() => handleAddToCart(product.id, quantity)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
