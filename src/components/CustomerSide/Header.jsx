import React, { useEffect, useState } from 'react';
import "../../App.css";
import "../Header.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../redux/CartSlice';
import { getProduct } from '../../redux/ProductSlice';
import { setSearchValue } from '../../redux/ProductSlice';
    
const Header = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {search}= useSelector((state)=>state.productItem)
    const [searchValue, setSearchValueLocal] = useState('');
    const categoryId = useLocation().state?.categoryId;
    const productCount = useSelector((state) => state.cartItem.productCount);

    console.log("productCount",productCount);
    const userId = localStorage.getItem('userId')

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const handleCart =()=>{
        navigate('/cart')
    }
    const handleOrder =()=>{
        navigate('/user/order')
    }

    const handleHome =()=>{
        navigate('/')
    }
    useEffect(() => {
        dispatch(getProduct({ categoryId,search }));
    }, [dispatch, categoryId,search]);

    const searchChange = (e) => {
        const newSearch = e.target.value;
        setSearchValueLocal(newSearch);
        dispatch(setSearchValue(newSearch))
        dispatch(getProduct({ search: newSearch, categoryId }))
    }

    useEffect(() => {
        dispatch(getCart(userId))
    }, [dispatch, userId]);
    console.log(userId);

    const handleProductSearch=()=>{
        return location.pathname.includes('/product')
    }


    return (
        <div className='header-container'>
            <div className='header-logo'>
                <h1 onClick={() => handleHome()}>LOGO</h1>
            </div>
            <div className='header-search'>
                {handleProductSearch()&&(
                    <>
                <input type="search" value={searchValue} onChange={ searchChange }  placeholder="Search for products" />
                <button>Search</button>
                </>
                )}
            </div>
            <div className='header-actions'>
                <button onClick={() => handleOrder()}>Orders</button>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={() => handleCart()}><span className='count'>{productCount}</span><FontAwesomeIcon icon={faCartShopping} />Cart</button>
            </div>
        </div>
    );
};

export default Header;
