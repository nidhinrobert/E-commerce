import React, { useEffect } from 'react'
import "./Headera.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getCustomers, setSearchValue } from '../../redux/AdminSlice';
import { useState } from 'react';

const Header = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { currentPage, itemsPerPage, search } = useSelector((state) => state.admin)
    const [searchValue, setSearchValueLocal] = useState('');

    useEffect(() => {
        dispatch(getCustomers({ search, currentPage, itemsPerPage }))
    }, [dispatch, currentPage, search, itemsPerPage]);

    const searchChange = (e) => {
        const newSearch = e.target.value;
        setSearchValueLocal(newSearch);
        dispatch(setSearchValue(newSearch))
        dispatch(getCustomers({ search: newSearch, currentPage: 1, itemsPerPage }))

    }
    const searchChangeOrder = (e)=>{
        const newSearchOrder = e.target.value;
        setSearchValueLocal(newSearchOrder);
        dispatch(setSearchValue(newSearchOrder))
        dispatch(getAllOrders({search:newSearchOrder,currentPage:1,itemsPerPage}))
    }


    const handleLogout = () => {

        localStorage.removeItem('token');

        navigate('/loging');
    };

    const handleAdminORder = () => {
        navigate('/admin/order')
        window.location.reload();
    }
    const handleAdmincustomers = () => {
        navigate('/admin/customers/')
        window.location.reload();
    }
    const handleHome = () => {
        navigate('/adminpanel')
    }

    const isCustomerPage = () => {
        return location.pathname.includes('/admin/customers/')
    }
    const isProductPage = () => {
        return location.pathname.includes('/admin/product');
    }
    const isOrderPage = () => {
        return location.pathname.includes('/admin/order');
    }



    return (
        <div className='header-container'>
            <div className='header-logo'>
                <h1 onClick={() => handleHome()}>LOGO</h1>
            </div>
            <div className='header-search'>
                {isCustomerPage() && (
                    <>
                        <input type="search" value={searchValue} onChange={ searchChange } placeholder="Search for customer" />
                        <button>Search</button>
                    </>
                )}
                {isProductPage() && (
                    <>
                        <input type="search" placeholder="Search for products" />
                        <button>Search</button>
                    </>
                )}
                {isOrderPage() && (
                    <>
                        <input type="search" value={searchValue} onChange={searchChangeOrder} placeholder="Search for order" />
                        <button>Search</button>
                    </>
                )}


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