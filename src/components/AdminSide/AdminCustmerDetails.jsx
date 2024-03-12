import React, { useEffect } from 'react'
import Header from './Header'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder } from '../../redux/CartSlice';
import "./AdminCustomerdetails.css"

const AdminCustmerDetails = () => {

    const location = useLocation();
    const {userId}=useParams();
    const dispatch = useDispatch();
    const { UserOrders } = useSelector((state) => state.cartItem);
    

    useEffect(() => {
        dispatch(getUserOrder(userId));
    }, [dispatch, userId])
console.log(userId);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    console.log(UserOrders);
    return (
        <div>
            <Header />
            <div className='tableBody'>
                <div className='ProductSection'>
                    <div className='AdminCustomerInfo'>
                        <span className='customerId'>Customer ID: {userId}</span>
                        {UserOrders.order && UserOrders.order[0] && (
                            <span className='customerId'>Customer Email: {UserOrders.order[0].customerEmail}</span>
                        )} </div>
                    {UserOrders.order && UserOrders.order.map((order) => (
                        <div className='AdminCustomerDetails' key={order._id}>
                            <div className='customerInfoDetails'>
                                <span>Order ID: {order._id}</span>
                                <span>Order Date: {formatDate(order.orderDate)}</span>
                                <span>Order Status: {order.orderStatus}</span>
                            </div>

                            <table className='customerdetailstable'>
                                <thead>
                                    <tr>
                                        <th>Sl.No</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.products.map((customer, index) => (
                                        <tr key={customer._id}>
                                            <td>{index + 1}</td>
                                            <td> <div className='productBox'>
                                                <img className='productImg' src={`http://localhost:5001/images/${customer.product[0]?.images[0]}`} alt="" />
                                                {customer.product[0]?.name}
                                            </div></td>
                                            <td>{customer.quantity}</td>
                                            <td>${((customer.product[0].price - (customer.product[0].price * customer.product[0].discount / 100)) * customer.quantity).toFixed(2)}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default AdminCustmerDetails