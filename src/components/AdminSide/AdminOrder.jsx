import React, { useEffect } from 'react'
import Header from '../AdminSide/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../redux/AdminSlice';
import './AdminOrder.css'

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import OrderPagination from './OrderPagination';

const AdminOrder = () => {
    const currentPage = useSelector((state) => state.admin.currentPage);
    const itemsPerPage = useSelector((state) => state.admin.itemsPerPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector((state) => state.admin);

    useEffect(() => {
        const params = {
            currentPage,
            itemsPerPage,
            
        };
        dispatch(getAllOrders(params))
    }, [dispatch, currentPage, itemsPerPage]);

console.log("orders",orders);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');

    };
    const handleOrderClick = (orderId) => {
        navigate('/admin/User_order/', { state: { orderId } })
    }
    console.log(orders);

    return (
        <div>
            <Header />
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
                        {Array.isArray(orders?.Orders) && orders.Orders.map((order, index)  => (
                                <tr key={order._id}>
                                    <td>{index +1 + (currentPage - 1) * itemsPerPage}</td>
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

            <OrderPagination />
        </div>
    )
}

export default AdminOrder