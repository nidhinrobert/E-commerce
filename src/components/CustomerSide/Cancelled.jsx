import React from 'react';
import './SuccessfulPayment.css'; 
import { useNavigate } from 'react-router-dom';

const Cancelled = () => {
    const navigate = useNavigate()

    const onOk =()=>{
        navigate('/cart')
    }
    return (
        <div className="cancelled-container">
            <h2>Payment Failed</h2>
            <p>Your payment has been failed to process. Try Again!</p>
            <div className="buttons-container">
                
                <button className="ok-button" onClick={onOk}>OK</button>
            </div>
        </div>
    );
};

export default Cancelled;
