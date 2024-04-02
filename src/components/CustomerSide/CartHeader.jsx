import React from 'react';
import "../../App.css";
import "../Header.css";
import { useNavigate } from 'react-router-dom';

const CartHeader = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const handleHome =()=>{
        navigate('/')
    }

    return (
        <div className='header-container'>
            <div className='header-logo' onClick={handleHome}>
                <h1>LOGO</h1>
            </div>
            <div className='header-search'>
                <input type="search" placeholder="Search for products" />
                <button>Search</button>
            </div>
            <div className='header-actions'>
                <button onClick={handleLogout}>Logout</button>
                
            </div>
        </div>
    );
};

export default CartHeader;
