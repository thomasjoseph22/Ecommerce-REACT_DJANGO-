import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found');
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/carts/my_cart/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                console.log('Cart data:', response.data);

                if (!response.data.items) {
                    console.error('Unexpected response structure:', response.data);
                } else {
                    setCart(response.data);
                }
            } catch (error) {
                console.error('There was an error fetching the cart!', error);
            }
        };

        fetchCart();
    }, []);

    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            const response = await axios.delete(`http://localhost:8000/api/carts/remove_from_cart/${productId}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            if (response.status === 204) {
                setCart(prevCart => {
                    const updatedItems = prevCart.items.map(item => {
                        if (item.product.id === productId && item.quantity > 1) {
                            return { ...item, quantity: item.quantity - 1 };
                        } else if (item.product.id === productId && item.quantity === 1) {
                            return null;
                        }
                        return item;
                    }).filter(item => item !== null);
                    return { ...prevCart, items: updatedItems };
                });
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('There was an error removing the item from the cart!', error);
        }
    };

    const calculateTotalPrice = () => {
        return cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);
    };

    const handlePurchase = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }
    
            const response = await axios.post('http://localhost:8000/api/orders/purchase/', { cart: cart.items }, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
    
            console.log('Purchase response:', response.data); // Check the response data
    
            if (response.status === 201) {
                alert('Purchase successful!');
                if (response.data.order_id) { // Ensure the correct field is used
                    navigate(`/order/${response.data.order_id}`); // Redirect to order detail page
                } else {
                    console.error('Order ID not found in response');
                }
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('There was an error completing the purchase!', error);
        }
    };
    

    if (!cart) {
        return <div>Loading...</div>;
    }

    const mediaBaseUrl = 'http://localhost:8000';

    return (
        <div className="container mt-4">
            <h1>Your Cart</h1>
            {cart.items && cart.items.length > 0 ? (
                <>
                    <ul className="list-group">
                        {cart.items.map(item => {
                            const imageUrl = item.product.image1 ? `${mediaBaseUrl}${item.product.image1}` : '';

                            console.log('Product image URL:', imageUrl); // Log the image URL

                            return (
                                <li key={item.product.id} className="list-group-item d-flex align-items-center">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={item.product.name}
                                            style={{ width: '200px', height: '100px', objectFit: 'cover', marginRight: '20px' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100px', height: '100px', marginRight: '20px' }}>
                                            <p>No Image Available</p>
                                        </div>
                                    )}
                                    <div className='ml-5'>
                                        <h3>{item.product.name}</h3>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.product.price}</p>
                                        <p>Total Price: ${item.quantity * item.product.price}</p>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.product.id)}>Delete</button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <h3 className="mt-4">Overall Total Price: ${calculateTotalPrice()}</h3>
                    <button className="btn btn-primary mt-3" onClick={handlePurchase}>Purchase</button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
