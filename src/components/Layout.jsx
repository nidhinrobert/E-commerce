import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import Adminpanel from './Adminpanel';
import Login from "./AdminSign/Login";
import Product from './AdminSide/Product';
import ListProduct from "./CustomerSide/ListProduct"
import Signup from './CustomerSide/Signup';
import UserLogin from './CustomerSide/UserLogin';
import ProductDetails from './CustomerSide/ProductDetails';
import Cart from './CustomerSide/Cart';
import Successfull from './CustomerSide/Successfull';
import Cancelled from './CustomerSide/Cancelled';
import Order from './CustomerSide/Order';
import OrderInvoice from './CustomerSide/OrderInvoice';
import AdminOrder from './AdminSide/AdminOrder';
import AdminCustomers from './AdminSide/AdminCustomers';
import UserOrder from './AdminSide/UserOrder';
import AdminCustmerDetails from './AdminSide/AdminCustmerDetails';

const Layout = () => {
    const token = localStorage.getItem('token');

    return (
        <div>
            <Routes>
            <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/" element={token ? <Homepage /> : <Navigate to="/login" />} />
                <Route path="/product" element={<ListProduct />} />
                <Route path="/productdetails" element={<ProductDetails />} />
                <Route path="/successfull" element={<Successfull />} />
                <Route path="/cancelled" element={<Cancelled />} />
                <Route path="/user/order" element={<Order />} />
                <Route path="/user/orderInvoice" element={<OrderInvoice />} />


                <Route path="/cart" element={<Cart />} />
                <Route path="/logout" element={<Navigate to="/login" />} end /> {/* Logout route */}


                <Route path="/loging" element={<Login />} />
                <Route path="/adminpanel" element={token ? <Adminpanel /> : <Navigate to="/loging" />} />
                <Route path="/admin/product/" element={<Product />} />
                <Route path="/admin/order/" element={<AdminOrder />} />
                <Route path="/admin/customers/" element={<AdminCustomers />} />
                <Route path="/admin/User_order/" element={<UserOrder />} />
                <Route path="/admin/customer_details/" element={<AdminCustmerDetails />} />
                <Route path="/adminlogout" element={<Navigate to="/loging" />} end /> 
            </Routes>
        </div>
    );
};

export default Layout;
