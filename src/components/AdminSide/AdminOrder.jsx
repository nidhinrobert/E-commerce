import React, { useEffect } from 'react'
import Header from '../AdminSide/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../redux/AdminSlice';
import './AdminOrder.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye } from '@fortawesome/free-solid-svg-icons';

const AdminOrder = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const {orders}  = useSelector((state)=> state.admin);

useEffect(()=>{
    dispatch(getAllOrders())
},[dispatch])
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
    
};
const handleOrderClick =(orderId)=>{
navigate('/admin/User_order/', { state: { orderId } })
}


  return (
    <div>
        <Header/>
            <div className='OrderContainer'>
                <h2>Orders</h2>
                <div className='AdminOrderDetails'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Sl.No</th>
                                                    <th>Order ID</th>
                                                    <th>Email</th>
                                                    <th>Total</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders && orders?.map((order, index) => (
                                                    <tr key={order._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{order._id}</td>
                                                        <td>{order.customerEmail}</td>
                                                        <td>{`₹${order.totalAmount}`}</td>
                                                        <td>{formatDate(order.orderDate)}</td>
                                                        <td ><span className='AdminOrderStatus'>{order.orderStatus}</span></td>
                                                        <td className='AdminOrderTable' onClick={() => handleOrderClick(order._id)}>
                                                        <FontAwesomeIcon icon={faEye} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
            </div>


    </div>
  )
}

export default AdminOrder