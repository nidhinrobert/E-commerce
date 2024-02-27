import React from 'react'
import Header from './Header'
import OrderListing from './OrderListing'

const Order = () => {
  return (
    <div>
        <Header/>
        <h2>Orders</h2>
        <OrderListing/>
    </div>
  )
}

export default Order