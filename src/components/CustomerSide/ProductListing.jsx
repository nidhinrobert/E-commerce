
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProduct, getProductbyId, setIsgetProduct } from '../../redux/ProductSlice';



import { useLocation, useNavigate } from "react-router-dom";
import "./Product.css"


const ProductListing = () => {

    const dispatch = useDispatch();
    const productItems = useSelector((state) => state.productItem.productItems);

  
    const navigate = useNavigate()
    const { categoryId, categoryName } = useLocation().state;
    
    useEffect(() => {
        dispatch(getProduct({ categoryId }));
    }, [dispatch, categoryId]);


    const handleProduct = (product)=>{
        navigate('/productdetails',{state:{productId:product._id,
        productName:product.name,
        productImages: product.images,
        productPrice:product.price,
        productDiscount:product.discount,
        productSpecifications:product.specifications,
        productDescription:product.description}})
    }



    return (
        <div className='product'>
            <h3>{categoryName}</h3>



            <div className='productContent'>
            {Array.isArray(productItems) && productItems.map((product, index) => (
    <div className='product-box' key={index}>
        <div className='img-box'>
            {product.images.map((image, imageIndex) => (
                <button onClick={()=> handleProduct(product)} className='Product_prof' key={imageIndex}>
                    <img className="image" src={`http://localhost:5001/images/${image}`} alt="" />
                </button>
            ))}
        </div>
        <h5 key={`name-${index}`}>{product.name}</h5>
        <h6 key={`price-${index}`}>{product.price}</h6>
        <h6 key={`discount-${index}`}>{product.discount}</h6>
    </div>
))}
            </div>

        </div>
    );
};

export default ProductListing;
