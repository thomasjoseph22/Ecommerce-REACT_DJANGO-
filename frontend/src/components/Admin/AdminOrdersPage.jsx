import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found');
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/orders/admin/orders/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                setOrders(response.data);
            } catch (error) {
                console.error('There was an error fetching the orders!', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Orders</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Items</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.username}</td> {/* Display username instead of ID */}
                            <td>${order.total_price}</td>
                            <td>{new Date(order.created_at).toLocaleString()}</td>
                            <td>
                                <ul>
                                    {order.items.map(item => (
                                        <li key={item.product.id}>
                                            {item.product.name} (x{item.quantity})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrdersPage;
