import React from 'react'
import "./Headera.css"
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem('token');
        
        navigate('/loging');
    };

    const handleAdminORder = ()=>{
        navigate('/admin/order')
    }
const handleAdmincustomers =()=>{
    navigate('/admin/customers/')
}
const handleHome =()=>{
    navigate('/adminpanel')
}
    return (
        <div className='header-container'>
            <div className='header-logo'>
                <h1 onClick={() => handleHome()}>LOGO</h1>
            </div>
            <div className='header-search'>
                <input type="search" placeholder="Search for products" />
                <button>Search</button>
            </div>
            <div className='header-actions'>
                <button onClick={handleAdmincustomers}>Customers</button>
                <button onClick={handleAdminORder} >Orders</button>
                <button onClick={handleLogout}>Logout</button>
                
            </div>
        </div>
    )
}

export default Header