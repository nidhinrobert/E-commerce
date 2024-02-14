import React from 'react'
import "../App.css"
import "./Header.css"
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleLogout = () => {
        
        localStorage.removeItem('token');
        
        navigate('/login');
    };
    return (
        <div className='nav-bar'>
            <div className='Logo'>
                <h2>LOGO</h2>
                </div>
                <div className='search'>
                    <input type="search" />
                    <button>Search</button>
                </div>
                <div>
                    
                    <button onClick={handleLogout}>Logout</button>
                </div>

          
        </div>
    )
}

export default Header