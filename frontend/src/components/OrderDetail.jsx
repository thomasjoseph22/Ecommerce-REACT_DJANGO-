import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderDetail = () => {
    const { orderId } = useParams(); // Extract order ID from URL
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found');
                    return;
                }

                const response = await axios.get(`http://localhost:8000/api/orders/${orderId}/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                console.log('Order data:', response.data); // Debug log

                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError('There was an error fetching the order details.');
            }
        };

        fetchOrder();
    }, [orderId]);

    if (error) return <Container><div>{error}</div></Container>;
    if (!order) return <Container><div>Loading...</div></Container>;

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <Card>
                        <Card.Header>
                            <h1>Order Details</h1>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>Order ID:</strong> {order.id}<br />
                                <strong>Total Price:</strong> ${order.total_price.toFixed(2)}<br />
                                <strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}
                            </Card.Text>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map(item => (
                                        <tr key={item.product.id}>
                                            <td>{item.product.name}</td>
                                            <td>${item.product.price.toFixed(2)}</td>
                                            <td>{item.quantity}</td>
                                            <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderDetail;
