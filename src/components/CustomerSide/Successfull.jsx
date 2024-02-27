import React from 'react';
import './SuccessfulPayment.css'; 
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessfulPayment = () => {
    const navigate = useNavigate()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const cartItems = searchParams.get('cartItems');
    const parsedData = JSON.parse(decodeURIComponent(cartItems));
    
    return (
        <div className="success-container">
            <h2>Payment Successful</h2>
            <p>Your payment has been successfully processed. Thank you for your purchase!</p>
            <div className="buttons-container">
                
                <button className="ok-button" onClick={() =>navigate('/user/orderInvoice' ,{state:{cartItems:parsedData,id:id}})}>OK</button>
            </div>
        </div>
    );
};

export default SuccessfulPayment;
