import React, { useEffect, useState } from 'react';
import "./ProductProfile.css";
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, getProductbyId } from '../../redux/ProductSlice';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../../redux/CartSlice';


const ProductsProfile = () => {
    const dispatch = useDispatch();
    const { productId,productName, productPrice, productDiscount, productSpecifications, productDescription, productImages } = useLocation().state;
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        dispatch(getProduct());
        
        if (productImages && productImages.length > 0) {
            setPreviewImage(productImages[0]);
        }
    }, [dispatch, productImages]);

    const handlePreview = (image) => {
        setPreviewImage(image);
    };
     const userId = localStorage.getItem('userId');
 
   
   

    const cartAdd = async () => {
        try {
            const quantity = 1;
            console.log('Adding to cart:', {userId, productId });
            await dispatch(addToCart({ userId, productId,quantity }));
           
            console.log('Added to cart successfully.');
            window.alert('Product added to cart successfully!');
            window.location.reload();
            
   
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
        }).format(amount);
    };

    const calculateDiscountedPrice = (price, discount) => {
        if (!price || !discount) return '';
        const discountedPrice = price - (price * discount / 100);
        return discountedPrice.toFixed(2);
    };

    return (
        <div className='product-profile-container'>
            <div className='product-images'>
                <div className='thumbnails'>
                    {productImages && productImages.map((image, index) => (
                        <img 
                            key={index}
                            src={`http://localhost:5001/images/${image}`}
                            alt={`Product ${index}`}
                            className="thumbnail"
                            onClick={() => handlePreview(image)} 
                        />
                    ))}
                </div>
                {previewImage && (
                    <div className="preview-box">
                        <img
                            src={`http://localhost:5001/images/${previewImage}`}
                            alt="Preview"
                            className="preview-image"
                        />
                    </div>
                )}
            </div>
            <div className='product-details'>
                <h1>{productName}</h1>
                <div className='price-details'>
                <div className='discounted-price'>
    {formatCurrency(calculateDiscountedPrice(productPrice, productDiscount))}
     </div> 
  
   <span className='discount'> {productDiscount}% Off</span>
  <h2 className='actual-price'> {formatCurrency(productPrice)}</h2>
</div>
                <h3>Specifications</h3>
                <p>{productSpecifications}</p>
                <h3>Description</h3>
                <p>{productDescription}</p>
                <button className='add-to-cart-btn' onClick={cartAdd}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductsProfile;
