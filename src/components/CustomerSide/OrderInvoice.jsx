import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCart, retrieveCheckoutSession } from "../../redux/CartSlice";
import "./OrderInvoice.css";
import easyinvoice from "easyinvoice";
import Header from "./Header";


const OrderInvoice = () => {
    const location = useLocation();
    const id = location.state.id;
    const { orderDetails } = useSelector((state) => state.cartItem);
    console.log(id);
    const [totalPrice, setTotalPrice] = useState()
    const dispatch = useDispatch();
    const cartItems = location.state.cartItems;
    const userId = localStorage.getItem("userId");
    const totalAmount = orderDetails.session?.amount_total;
    console.log("totalAmount", totalAmount);
    const date = new Date();
    const newDate = new Date(date);
    const currentDate = newDate.toDateString();
    const delhiveryDate = new Date(date);
    delhiveryDate.setDate(date.getDate() + 5);





    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(retrieveCheckoutSession({ id, userId }));
                if (cartItems && cartItems?.[0]) {
                    let totalPrice = 0;
                    cartItems.forEach((cart) => {
                      cart.items.forEach((item) => {
                        if (item.productDetails && item.productDetails.price) {
                            totalPrice += (item.productDetails.price - (item.productDetails.price * item.productDetails.discount / 100));
                        }
                      });
                    });
                    setTotalPrice(totalPrice);
                  }
                await dispatch(getCart(userId));

            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        };

        fetchData();
    }, [dispatch, id, cartItems, userId]);

    const handleDownloadInvoice = async () => {
        const items = cartItems[0].items.map(item => ({
            quantity: item.quantity,
            description: item.productDetails.name,
            tax: 0,
            price: (item.productDetails.price - (item.productDetails.price * item.productDetails.discount / 100)).toFixed(2), // Use discounted price
        }));
    
        let invoiceDate = 'Invoice Date';
        if (orderDetails.session.created) {
            const createdDate = new Date(orderDetails.session.created * 1000);
            invoiceDate = `${createdDate.getMonth() + 1}/${createdDate.getDate()}/${createdDate.getFullYear()}`;
        }
    
        const data = {
            documentTitle: 'INVOICE',
            currency: orderDetails.session.currency || 'USD',
            taxNotation: 'vat',
            marginTop: 25,
            marginRight: 25,
            marginLeft: 25,
            marginBottom: 25,
            sender: {
                company: 'Amazon.in',
                address: 'Amazon',
                zip: '671321',
                city: 'Mumbai',
                country: 'India',
            },
            client: {
                company: orderDetails.session.customer_details.name || 'Customer Name',
                address: orderDetails.session.customer_details.email || 'Customer Email',
                zip: orderDetails.session.customer_details.address.postal_code || 'Customer Postal Code',
                city: orderDetails.session.customer_details.address.city || 'Customer City',
                country: orderDetails.session.customer_details.address.country || 'Customer Country',
            },
            invoiceNumber: orderDetails.session.id || 'Invoice Number',
            information: {
                date: invoiceDate,
            },
            products: items,
            bottomNotice: 'Thank you for shopping with us. For any inquiries, please contact support@customer.com.',
        };
    
        try {
            const result = await easyinvoice.createInvoice(data);
            easyinvoice.download(`invoice.pdf`, result.pdf);
        } catch (error) {
            console.error('Error creating or downloading the invoice:', error);
        }
    };

    console.log("id", id);
    console.log("userId", userId);
    console.log("cartItems", cartItems);
    return (
        <div>
            <Header/>
        <div className="Order">
            
            <div className="ordered">
                <div className="order_products">
                    {cartItems[0].items.map((item) => (
                        <div className="orderedProducts">
                            <div className="order-img">
                                <img
                                    className="orderedImg"
                                    src={`http://localhost:5001/images/${item.productDetails.images[0]}`}
                                    alt="/"
                                />
                            </div>
                            <div className="ProductDetails">
                                <h3>{item.productDetails.name}</h3>
                                <p>{item.productDetails.description}</p>
                                <div className='orderedProductSub'>
                                    <span>${(item.productDetails.price - (item.productDetails.price * item.productDetails.discount / 100)).toFixed(2)}</span>
                                    <span>Qty: {item.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="order_summary">
                <h2>Order Summary</h2>
                <div className="summaryDetails">
                    <div className="summaryHead">
                        <h4>Status: {orderDetails.session?.payment_status}</h4>
                        <span>Date: {currentDate}</span>,
                        <span>Delivery Date: {delhiveryDate.toDateString()}</span>
                    </div>
                    <div className="summaryHead">
                        <h4>Billing Address: </h4>
                        <span> {orderDetails.session?.shipping_details.name}</span>
                        <div className="shippingAddress">
                            <span>
                                {orderDetails.session?.shipping_details.address.line1}
                            </span>,
                            <span>
                                {orderDetails.session?.shipping_details.address.line2}
                            </span>,
                            <span>{orderDetails.session?.shipping_details.address.city}</span>,
                            <span>
                                {orderDetails.session?.shipping_details.address.state}{" "}
                            </span>
                        </div>
                        <span>
                            {orderDetails.session?.shipping_details.address.country}{" "}
                            {orderDetails.session?.shipping_details.address.postal_code}
                        </span>
                    </div>
                    <div className="summaryHead">
                        <h4>Shipping Address: </h4>
                        <span> {orderDetails.session?.shipping_details.name}</span>
                        <div className="shippingAddress">
                            <span>
                                {orderDetails.session?.shipping_details.address.line1}
                            </span>,
                            <span>
                                {orderDetails.session?.shipping_details.address.line2}
                            </span>
                            <span>{orderDetails.session?.shipping_details.address.city}</span>,
                            <span>
                                {orderDetails.session?.shipping_details.address.state}{" "}
                            </span>
                        </div>
                        <span>
                            {orderDetails.session?.shipping_details.address.country}{" "}
                            {orderDetails.session?.shipping_details.address.postal_code}
                        </span>
                    </div>
                    <div className="summaryStatus">
                        <h4>Order Payment </h4>
                        <span>Status: {orderDetails.session?.payment_status}</span>
                        <span>Items: {cartItems[0].totalQuantity}</span>
                        <span>Tax: $0</span>
                        <span className="total">Order Total: ${totalPrice}</span>
                    </div>
                </div>
                <div className="footer">
                <button className="download-invoice-button" onClick={handleDownloadInvoice}>Download Invoice</button>
                </div>
            </div>
            
        </div>
        
        
        </div>  
    );
};

export default OrderInvoice;
