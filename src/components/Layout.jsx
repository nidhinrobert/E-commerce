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
                <Route path="/logout" element={<Navigate to="/login" />} end /> {/* Logout route */}


                <Route path="/loging" element={<Login />} />
                <Route path="/adminpanel" element={token ? <Adminpanel /> : <Navigate to="/loging" />} />
                <Route path="/admin/product/" element={<Product />} />
                <Route path="/adminlogout" element={<Navigate to="/loging" />} end /> {/* Logout route */}
            </Routes>
        </div>
    );
};

export default Layout;
