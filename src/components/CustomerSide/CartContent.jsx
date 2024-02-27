import React, { useEffect, useState } from 'react'
import "./Cart.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckoutSession, deleteCart, getCart, setIsProductCount, updateQuantity } from '../../redux/CartSlice';
import { useLocation } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

const CartContent = () => {

    const [cartDatas, setCartDatas] = useState('')
    const [removeModalVisible, setRemoveModalVisible] = useState(false); 
    const [productIdToRemove, setProductIdToRemove] = useState(null);

    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.cartItem?.cartItems?.userCarts);




    
    const userId = localStorage.getItem('userId')
   

    useEffect(() => {
        cartItem?.map((item) => {
            setCartDatas(item?.items)
        })
    }, [cartItem])


    useEffect(() => {
        dispatch(getCart(userId))
    }, [dispatch, userId]);
  

    console.log("cartitem",cartItem);
    console.log("cartdata",cartDatas);
    
  
    
    

    const updateQuantityHandler = async (productId, action) => {
        try {
            await dispatch(updateQuantity({ userId, productId, action }))
            dispatch(getCart(userId));
        } catch (error) {
            console.error('failed to update quantity:', error)
        }
    }

    const handleRemoveClick = (productId) => {
        setProductIdToRemove(productId);
        setRemoveModalVisible(true);
    }
    const handleConfirmRemove = async () => {
        try {
            await dispatch(deleteCart({ userId, productId: productIdToRemove }));
        } catch (error) {
            console.error('failed to delete', error);
        }
        setRemoveModalVisible(false);
        dispatch(getCart(userId));


    };


    const handleCancelRemove = () => {
        setRemoveModalVisible(false);

    };



    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };
    const calculateDiscountedPrice = (price, discount) => {
        if (!price || !discount) return '';
        const discountedPrice = price - (price * discount / 100);
        return discountedPrice.toFixed(2);
    };
    
    const totalAmount = cartDatas&&cartDatas.reduce((total, item) => {
        const discountedPrice = calculateDiscountedPrice(item.productDetails.price, item.productDetails.discount);
        const totalPriceForItem = discountedPrice * item.quantity;
        return total + totalPriceForItem;
    }, 0);

    const makePayment = async (cartItems) => {
        try {
            // Convert totalAmount to cents
            const totalAmountCents = Math.round(totalAmount * 100);
            
            
            await dispatch(createCheckoutSession({ cartItems:cartItem, userId, totalAmount: totalAmountCents }));
        } catch (error) {
            console.error('Error making payment:', error);
            // Handle error gracefully, e.g., show a message to the user
        }
    }
    

 console.log("amount",totalAmount);
 console.log("user",userId);



    return (
        <div>
            <div className='products_container'>
                <div className='product_detailed'>
                    {cartDatas && cartDatas?.map((item) => (
                        <div className='product-card' key={item._id}>
                            {console.log("id", item?.productDetails?.name)}
                            <div className='Card'>
                                <div className='image-box'>
                                    <img src={`http://localhost:5001/images/${item.productDetails.images[0]}`} alt="" />

                                </div>
                                <div className="product-details">
                                    <h3 className='product-name'>{item?.productDetails?.name}</h3>
                                    <div className='product-price'>
                                        <span className='discounted-prices'>{formatCurrency(calculateDiscountedPrice(item.productDetails.price, item.productDetails.discount) * item.quantity)}</span>
                                        <span className='discount'>{item.productDetails.discount}% off</span>
                                        <span className='actual-price'>{formatCurrency(item.productDetails.price)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='details_footer'>

                                <button className='decrement-btn' onClick={() => updateQuantityHandler(item.productDetails._id, 'decrement')}><FontAwesomeIcon icon={faMinus} /></button>
                                <div className='box'>{item.quantity}</div>

                                <button className='increment-btn' onClick={() => updateQuantityHandler(item.productDetails._id, 'increment')}><FontAwesomeIcon icon={faPlus} /></button>
                                <button className='remove_btn' onClick={() => handleRemoveClick(item.productDetails._id)}>Remove</button>

                            </div>
                        </div>
                    ))}
                </div>
                <div className='checkout'>
                    <div className='checkout_box'>
                        <h4>Total Amount :{formatCurrency(totalAmount)} </h4>
                        <button onClick={() => makePayment({ cartItem })}className='placing'>Place Order</button>
                    </div>
                </div>
            </div>
            {removeModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Are you sure you want to remove this item?</h2>
                        <button onClick={handleConfirmRemove}>Yes</button>
                        <button onClick={handleCancelRemove}>No</button>

                    </div>
                </div>
            )}
        </div>
    )
}

export default CartContent