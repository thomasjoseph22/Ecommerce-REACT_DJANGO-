import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import AdminRegister from './components/Admin/AdminRegister';
import AdminLogin from './components/Admin/AdminLogin';
import ProductPage from './components/ProductPage';
import AdminProduct from './components/Admin/Product';
import Category from './components/Admin/Category';
import UserList from './components/Admin/UserList'; // Import the UserList component
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import OrderDetail from './components/OrderDetail';
import AdminOrdersPage from './components/Admin/AdminOrdersPage';

const App = () => (
  <Router>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/users" element={<PrivateRoute element={UserList} />} /> {/* Add this line */}
          <Route path="/products" element={<PrivateRoute element={ProductPage} />} />
          <Route path="/admin/products" element={<PrivateRoute element={AdminProduct} />} />
          <Route path="/admin/categories" element={<PrivateRoute element={Category} />} />
          <Route path="/product/:id" element={<PrivateRoute element={ProductDetail} />} />
          <Route path="/cart" element={<PrivateRoute element={CartPage} />} />
          <Route path="/order/:orderId" element={<PrivateRoute element={OrderDetail} />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;
