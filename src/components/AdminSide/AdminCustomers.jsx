import React, { useEffect } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getCustomers } from '../../redux/AdminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye } from '@fortawesome/free-solid-svg-icons';

const AdminCustomers = () => {

const {Customers}= useSelector((state)=>state.admin);
const dispatch = useDispatch();
const navigate= useNavigate();


useEffect(() => {
  dispatch(getCustomers())
}, [dispatch]);
const handleCustomerDetails = (userId) => {
  navigate('/admin/customer_details/',{state: { userId }})
}

  return (
    <div>
      <Header/>
      <div className='customer_container'>
        <h2>Customers</h2>
        <div className='AdminOrderDetails'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Sl.No</th>
                                                    <th>Customer ID</th>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Customers?.map((customer,index) => (
                                                    <tr key={customer._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{customer._id}</td>
                                                        <td>{customer.name}</td>
                                                        <td>{customer.email}</td>
                                                        
                                                        <td onClick={() => handleCustomerDetails(customer._id)}><FontAwesomeIcon icon={faEye} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
      </div>
    </div>
  )
}

export default AdminCustomers