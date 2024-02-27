import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProduct, getProductbyId, setIsgetProduct } from '../../redux/ProductSlice';
import { useLocation, useNavigate } from "react-router-dom";
import ProductCss from "./Product.module.css"

const ProductListing = () => {
    const dispatch = useDispatch();
    const productItems = useSelector((state) => state.productItem.productItems);
    const navigate = useNavigate();
    const { categoryId, categoryName } = useLocation().state;
    
    useEffect(() => {
        dispatch(getProduct({ categoryId }));
    }, [dispatch, categoryId]);

    const handleProduct = (product) => {
        navigate('/productdetails', {
            state: {
                productId: product._id,
                productName: product.name,
                productImages: product.images,
                productPrice: product.price,
                productDiscount: product.discount,
                productSpecifications: product.specifications,
                productDescription: product.description
            }
        });
    };

    const calculateDiscountedPrice = (price, discount) => {
        if (!price || !discount) return '';
        return (price - (price * discount / 100)).toFixed(2);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    return (
        <div className={ProductCss.product_listing_container}>
            <h2 className={ProductCss.category_name}>{categoryName}</h2>
            <div className={ProductCss.product_content}>
                {Array.isArray(productItems) && productItems.map((product, index) => (
                    <div className={ProductCss.product_box }key={index}>
                        <button onClick={() => handleProduct(product)} className='product-btn'>
                            <img className={ProductCss.product_image} src={`http://localhost:5001/images/${product.images[0]}`} alt="" />
                        </button>
                        <div className={ProductCss.product_details}>
                            <h3 className={ProductCss.product_name}>{product.name}</h3>
                            <div className={ProductCss.product_price}>
                                <span className={ProductCss.discounted_prices}> {formatCurrency(calculateDiscountedPrice(product.price, product.discount))}</span>
                                <span className={ProductCss.discount}>{product.discount}% off</span>
                                <span className={ProductCss.actual_price}> {formatCurrency(product.price)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListing;
