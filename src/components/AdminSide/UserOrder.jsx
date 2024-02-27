import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getOrderById } from '../../redux/AdminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser, faTruck, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import './UserOrder.css'

const UserOrder = () => {
    const location = useLocation();
    const dispatch = useDispatch();


    const orderId = location.state.orderId;
    const { orderById } = useSelector((state) => state.admin);


    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);

    console.log(orderById);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };
    
    const calculateTotalAmount = () => {
        let total = 0;
        orderById.products?.forEach(order => {
          const totalPricePerProduct = (order.product[0].price - (order.product[0].price * order.product[0].discount / 100)) * order.quantity;
          total += totalPricePerProduct;
        });
        return total.toFixed(2);
    };
    
  
  
  const totalAmount = calculateTotalAmount();
  

    return (
        <div>
            <Header />
            <div className='detail_constainer'>
                <h2>Order Details</h2>
                <div className='orderSection'>
                    <div className='orderHeader'>
                        <div className='orderSubHead'>
                            <div className='orderDate'>
                                <span className="material-symbols-outlined">
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                </span>
                                <h4 className='OrderInfo'>  {formatDate(orderById.orderDate)}</h4>
                            </div>
                            <span className='OrderInfo'>
                                Order ID: {orderById._id}
                            </span>
                        </div>
                    </div>
                    <div className='ordersDetails'>
                        <div className='userOrderDetails'>
                            <div className='orderinfo'>
                                <div className='customerInfoIcon'>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div className='orderInfoContent'>
                                    <span>Customer</span>
                                    <div>{orderById.customerEmail}</div>
                                    <div>{orderById.userId}</div>
                                </div>

                            </div>
                            <div className='orderinfo'>
                                <div className='orderInfoIcon'>
                                    <FontAwesomeIcon icon={faTruck} />
                                </div>
                                <div className='orderInfoContent'>
                                    <span> Order info</span>
                                    <div className='shippingAddress'> Shipping:{orderById.shippingAddress?.city}
                                        <span> {orderById.shippingAddress?.country}</span>
                                        <span>{orderById.shippingAddress?.line1}</span>
                                        <span>{orderById.shippingAddress?.line2} {orderById.shippingAddress?.state} {orderById.shippingAddress?.postal_code}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='orderinfo'>
                                <div className='customerInfoIcon'>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </div>
                                <div className='orderInfoContent'>
                                    <span>Deliver to</span>
                                    <div className='shippingAddress'>Address: {orderById.billingAddress?.city}
                                        <span> {orderById.billingAddress?.country}</span>
                                        <span> {orderById.billingAddress?.line1}</span>
                                        <span> {orderById.billingAddress?.line2} {orderById.billingAddress?.state} {orderById.billingAddress?.postal_code}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='orderDetailsTables'>
                            <table className='UserProducts'>
                                <thead className='Product '>
                                    <tr className='Products'>
                                        <th>Product</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderById.products?.map((order) => (
                                        <tr key={order._id}>
                                            <td>
                                                <div className='productBox'>
                                                    <img className='productImg' src={`http://localhost:5001/${order.product[0]?.images[0]}`} alt="" />
                                                    {order.product[0]?.name}
                                                </div>
                                            </td>
                                            <td>${order.product[0]?.price}</td>
                                            <td>{order.quantity}</td>

                                            <td>${((order.product[0].price - (order.product[0].price * order.product[0].discount / 100)) * order.quantity).toFixed(2)}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='orderedProductTotal'>
                                <span> Subtotal: ${totalAmount}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserOrder