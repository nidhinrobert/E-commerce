import React, { useEffect } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getCustomers, setCurrentPage } from '../../redux/AdminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye } from '@fortawesome/free-solid-svg-icons';
import Pagination from './Pagination';
import { Alert } from 'bootstrap';

const AdminCustomers = () => {

const {Customers}= useSelector((state)=>state.admin);
const currentPage = useSelector((state) => state.admin.currentPage);
const itemsPerPage = useSelector((state) => state.admin.itemsPerPage);
const search = useSelector((state) => state.admin.search);
const dispatch = useDispatch();
const navigate= useNavigate();



useEffect(() => {
  
  dispatch(setCurrentPage(currentPage));

  const params = {
    currentPage,
    itemsPerPage,
    search,
  };
  dispatch(getCustomers(params))
}, [dispatch, currentPage, search, itemsPerPage]);




const handleCustomerDetails = (userId) => {
  navigate(`/admin/customer_details/${userId}`);
  console.log(userId);
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
                                            {Array.isArray(Customers?.Users) && Customers.Users.map((customer, index) => (
                                                    <tr key={customer._id}>
                                                        <td>{index +1 + (currentPage - 1) * itemsPerPage}</td>
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
      <Pagination/>
    </div>
  )
}

export default AdminCustomers